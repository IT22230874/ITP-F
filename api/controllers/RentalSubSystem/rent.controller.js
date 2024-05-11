//const NotificationsModel = require("../modules/Notification.model.js");
const errorHandler = require("../../utils/error.js");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const { promisify } = require("util");
const ClientModel = require("../../modules/RentSubSystem/Client.model.js");
const RentModel = require("../../modules/RentSubSystem/Rental.model.js");
const IncomeModel = require("../../modules/Finance/Income.model.js");
const RequestModel = require("../../modules/RentSubSystem/Request.model.js");
const { finished } = require("stream");
const MachinaryModel = require("../../modules/Machinary.model.js");
const RentalNotoficationToClientModel = require("../../modules/RentSubSystem/RentalNotificationToClient.model.js");

const analysis = async (req, res, next) => {
  try {
    const requests = await RequestModel.countDocuments();
    const machines = await MachinaryModel.countDocuments();
    const clients = await ClientModel.countDocuments();
    const rents = await RentModel.countDocuments();

    const responseData = [
      {
        heading: "Requests",
        amount: requests,
      },
      {
        heading: "Machines",
        amount: machines,
      },
      {
        heading: "Clients",
        amount: clients,
      },
      {
        heading: "Rents",
        amount: rents,
      },
    ];

    return res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
};

// displaying requests to the rental manager
const displayRequests = async (req, res, next) => {
  try {
    const requests = await RequestModel.find();

    if (requests && requests.length > 0) {
      return res.status(200).json(requests);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    next(error);
  }
};

//delete request if items unable to rent
const deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const requestdata = await RequestModel.findOne({ _id: id });

    console.log(requestdata);

    const clientid = requestdata._id;
    const reqid = requestdata.reqid;

    const message = "Due to item unavailability your request was cancelled";

    const newCancelNotification = new RentalNotoficationToClientModel({
      reqid,
      clientid,
      message,
    });

    await newCancelNotification.save();

    await RequestModel.findByIdAndDelete(id);

    res.json({ message: "Request deleted successfully", id: reqid });
  } catch (error) {
    next(error);
  }
};

const addrent = async (req, res, next) => {
  try {
    const { clientid, machineid, reqid, startdate, enddate, amount } = req.body;

    // Generate rent ID
    let rentid = (await RentModel.countDocuments()) + 1;

    console.log(clientid, machineid, reqid, startdate, enddate, amount);

    // Calculate number of days between start date and end date
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDateObj = new Date(startdate);
    const endDateObj = new Date(enddate);
    const diffDays = Math.round(Math.abs((startDateObj - endDateObj) / oneDay));

    // Calculate the number of installments
    const installments = Math.ceil(diffDays / 30); // Assuming 30 days in a month

    let finished = 0;
    let status = "not completed";

    // Calculate the total amount
    const total = amount;
    const perinstallment = total / installments;

    const client = await ClientModel.findOne({_id: clientid})
    const clientname = client.fname;

    const newRent = new RentModel({
      rentid,
      clientid,
      clientname,
      startdate,
      enddate,
      installments,
      finished,
      status,
      total,
      perinstallment,
      machineid,
    });

    await newRent.save();

    // Delete the request
    await RequestModel.findByIdAndDelete(reqid);

    // Update machine status to "rented"
    await MachinaryModel.findByIdAndUpdate(
      machineid,
      { $set: { status: "rented" } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Rent was successfully added",
    });
  } catch (error) {
    console.error("Error adding rent:", error);
    next(error);
  }
};

//display all the rents
const displayRents = async (req, res, next) => {
  try {
    const rents = await RentModel.find();

    if (rents.length > 0) {
      return res.status(200).json(rents);
    } else {
      return res.status(404).json({ rents: "No data found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateenddate = async (req, res) => {
  try {
    const { id } = req.params;
    const { enddate } = req.body;

    const rentdetails = await RentModel.findById(id);
    const curenddate = rentdetails.enddate;

    // Calculate the number of days between the current end date and the new end date
    const startDate = new Date(curenddate);
    const endDate = new Date(enddate);
    const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    const machineid = rentdetails.machineid;
    const machine = await MachinaryModel.findById(machineid);
    const priceperday = machine.priceperday;

    // Calculate the total price based on the number of days and price per day
    let price = daysDifference * priceperday;
    price = rentdetails.total + price;

    const addedinstallments = Math.ceil(daysDifference/30);
    const installments = rentdetails.installments + addedinstallments;
    const perinstallment = price / installments;

    // Find the item by ID and update its fields
    const extendtime = await RentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          enddate,
          installments,
          total: price,
          perinstallment,
        },
      },
      { new: true }
    );

    res.json({
      message: "extend updated successfully",
      data: extendtime,
    });
  } catch (error) {
    console.error("Error updating extend status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//update installment to pay
const makepayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const requestdata = await RentModel.findOne({ _id: id });

    const finished = requestdata.finished + 1;
    const installments = requestdata.installments;

    let payment;

    if (installments === finished) {
      var status = "completed";

      // Find the item by ID and update its fields
      payment = await RentModel.findByIdAndUpdate(
        id,
        {
          $set: {
            finished,
            status,
          },
        },
        { new: true }
      );
    } else {
      // Find the item by ID and update its fields
      payment = await RentModel.findByIdAndUpdate(
        id,
        {
          $set: {
            finished,
          },
        },
        { new: true }
      );
    }

    const date = new Date();

    const amount = requestdata.perinstallment;
    const source = requestdata._id;
    const department = "rental";
    const description = `payament on rental ${id}`;
    
    console.log(amount + " " + source + " " + department + " " + description);

    const updateIncome = new IncomeModel({
      date,
      amount,
      source,
      department,
      description,
    });

    updateIncome.save();

    const responsedata = await RentModel.findOne({ _id: id });

    res.json({
      message: "payment updated successfully",
      data: responsedata,
    });
  } catch (error) {
    next(error);
  }
};

//delete rental log
const deleteRentalLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await RentModel.findByIdAndDelete({_id : id});
    res.json({ message: "Rent Log deleted successfully", id: id });
  } catch (error) {
    next(error);
  }
};


const generatePDF = async () => {
  try {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Add content to the PDF document
    doc.font("Helvetica").fontSize(20).text("Rental Report", { underline: true });



    // Fetch data from the database
    const rents = await RentModel.find();

    // Table header
    const tableHeader = ["Client Name", "Rent ID", "Start Date", "End Date", "Total", "Installments", "Finished"];

    // Draw table header
    const tableWidth = 500;
    const tableHeight = 20;
    const columnWidth = tableWidth / tableHeader.length;
    let startX = 50;
    const startY = 100;

    doc.fillColor("black").font("Helvetica-Bold").fontSize(12);
    tableHeader.forEach((header, index) => {
      doc.text(header, startX + index * columnWidth, startY);
    });

    // Table rows
    const startYData = startY + tableHeight;
    let currentY = startYData;
    const fontSize = 12;
    const padding = 5;

    doc.font("Helvetica").fontSize(fontSize);
    rents.forEach((rent, rowIndex) => {
      const rowData = [rent.clientname, rent.rentid, rent.startdate, rent.enddate, rent.total, rent.installments, rent.finished];
      rowData.forEach((data, colIndex) => {
        doc.text(data.toString(), startX + colIndex * columnWidth, currentY);
      });
      currentY += tableHeight + padding;
    });

    // Finalize the PDF document
    const buffer = await new Promise((resolve, reject) => {
      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.end();
    });

    return buffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

const getpdf = async (req, res, next) => {
  try {
    const pdfBuffer = await generatePDF();

    // Send the PDF file in the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=RentReport.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  displayRequests,
  deleteRequest,
  addrent,
  displayRents,
  updateenddate,
  makepayment,
  deleteRentalLog,
  analysis,
  getpdf,
};
