const ExpenseModel = require("../modules/Expenses.model.js");
const InventoryModel = require("../modules/Inventoryitem.model.js");
const MachinaryModel = require("../modules/Machinary.model.js");
const NotificationsModel = require("../modules/Notification.model.js");
const errorHandler = require("../utils/error.js");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const { promisify } = require("util");

const addmachinary = async (req, res, next) => {
  try {
    const { name, budget, quantity, payee, date, description, priceperday } =
      req.body;

    // Check if any required field is missing
    if (
      !name ||
      !budget ||
      !quantity ||
      !payee ||
      !date ||
      !description ||
      !priceperday
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let machineid = await MachinaryModel.findOne()
      .sort({ machineid: -1 })
      .limit(1);
    machineid = machineid ? machineid.machineid + 1 : 1;

    const stock = "available";

    // Save the image URL in the 'machinery' folder in the 'assets' directory
    const imageURL = req.file ? req.file.filename : null;

    const newMachine = new MachinaryModel({
      name,
      quantity,
      date,
      machineid,
      stock,
      URL: imageURL, // Save the image URL in the database
      priceperday,
    });

    await newMachine.save();

    let expenseid = await ExpenseModel.findOne()
      .sort({ expenseid: -1 })
      .limit(1);
    expenseid = expenseid ? expenseid.expenseid + 1 : 1;

    const department = "machinary";

    const newExpense = new ExpenseModel({
      expenseid,
      amount: budget,
      date,
      payee,
      department,
      description,
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Machine was successfully added",
      imageURL,
    });
  } catch (error) {
    next(error);
  }
};

const displayMachineDetails = async (req, res, next) => {
  // Call the function to execute the updates
  updateMachineStatus();

  const { name, stock } = req.body;

  try {
    let query = {};

    if (name && stock) {
      query = { name, stock };
    } else if (name) {
      query = { name };
    } else if (stock) {
      query = { stock };
    }

    const machine = await MachinaryModel.find(query);

    if (machine.length > 0) {
      return res.status(200).json(machine);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateMachineStatus = async () => {
  try {
    // Get all machines from the database
    const machines = await MachinaryModel.find();

    // Get the current date
    const currentDate = new Date();

    // Loop through each machine
    machines.forEach(async (machine) => {
      // Calculate the difference in months between the current date and the date saved in the machine
      const savedDate = new Date(machine.date);
      const diffInMonths = Math.floor(
        (currentDate - savedDate) / (1000 * 60 * 60 * 24 * 30)
      );

      // Check if the difference is 3 months or more, and the current status is not "service"
      if (
        diffInMonths >= 3 &&
        (machine.stock !== "service" ||
          machine.stock !== "rented" ||
          machine.stock !== "unavailable")
      ) {
        // Update the date to current date
        machine.date = currentDate("y-m-d");

        // Change the status to service
        machine.stock = "service";

        // Update the machine document in the database
        await MachinaryModel.updateOne(
          { _id: machine._id },
          { $set: { date: currentDate, stock: "service" } }
        );
      }

      // If the current status is "rented" or "unavailable"
      if (machine.stock === "rented" || machine.stock === "unavailable") {
        // Create a notification message
        const notificationMessage = `Machine '${machine.name}' (${machine._id}) needs to be sent for service.`;

        // Create a new notification document
        const notification = new NotificationsModel({
          message: notificationMessage,
          department: "machinery",
          sender: "system",
        });

        // Save the notification in the database
        await notification.save();
      }
    });
  } catch (error) {
    console.error("Error updating machine status:", error);
  }
};

const getAllMachineNames = async (req, res, next) => {
  try {
    const machines = await MachinaryModel.find({}, "name");

    if (machines.length > 0) {
      const names = machines.map((machine) => machine.name);
      return res.status(200).json(names);
    } else {
      // Use a more appropriate status code for when no data is found
      return res.status(204).json({ message: "No data found" });
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

const deleteMachine = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MachinaryModel.findByIdAndDelete(id);
    res.json({ message: "machine deleted successfully", id });
  } catch (error) {
    next(error);
  }
};

const updateMachine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity, stock, priceperday } = req.body;
    console.log(id);
    console.log(name + " " + quantity + " " + stock + " " + priceperday);
    // Check if any required field is missing

    if (!name || !quantity || !stock || !priceperday) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    console.log("methanata awa");
    // Find the item by ID and update its fields
    const updatedItem = await MachinaryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          quantity,
          stock,
          priceperday,
        },
      },
      { new: true }
    );

    console.log("updated");

    res.json({
      message: "machine updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};
const generatePDF = async () => {
  try {
    // Create a new PDF document
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream("client/src/assets/report.pdf");

    // Pipe the PDF document to a file
    doc.pipe(writeStream);

    // Fetch data from the database
    const [machines, expenses, items] = await Promise.all([
      MachinaryModel.find(),
      ExpenseModel.find(),
      InventoryModel.find(),
    ]);

    doc
      .font("Helvetica")
      .fontSize(20)
      .text("Inventory , Machinery And Expenditure Report", {
        underline: true,
      });

    // Add content to the PDF document
    doc.font("Helvetica").fontSize(16).text("Expenses:", { underline: true });

    expenses.forEach((expense) => {
      doc.text(`${expense.date}: ${expense.description}`);
      // Add other fields as needed
    });

    doc.moveDown().text("Machines:", { underline: true });

    machines.forEach((machine) => {
      doc.text(`${machine.name}: ${machine.quantity}`);
      // Add other fields as needed
    });

    doc.moveDown().text("Items:", { underline: true });

    items.forEach((item) => {
      doc.text(`${item.name}: ${item.quantity}`);
      // Add other fields as needed
    });

    // Finalize the PDF document
    doc.end();

    console.log("PDF generated successfully");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const getpdf = async (req, res, next) => {
  try {
    await generatePDF();

    // Once the PDF is generated, send it to the client for download
    const file = `${__dirname}/../../client/src/assets/report.pdf`;
    const filename = "report.pdf";

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    const fileStream = fs.createReadStream(file);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Define the controller method to get machine name by ID
const getMachine = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the machine by ID in the database
    const machine = await MachinaryModel.findById(id);

    // If machine with given ID is found, return its name
    if (machine) {
      res.status(200).json({ name: machine.name });
    } else {
      res.status(404).json({ message: "Machine not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addmachinary,
  displayMachineDetails,
  getAllMachineNames,
  deleteMachine,
  updateMachine,
  getpdf,
  getMachine,
};