const MachinaryModel = require("../../modules/Machinary.model");
const ChatModel = require("../../modules/RentSubSystem/Chat.model");
const ChatSaveModel = require("../../modules/RentSubSystem/ChatSave.model");
const ClientModel = require("../../modules/RentSubSystem/Client.model");
const RentModel = require("../../modules/RentSubSystem/Rental.model");
const RequestModel = require("../../modules/RentSubSystem/Request.model");

const displayToClient = async (req, res, next) => {
  try {
    const machine = await MachinaryModel.find();

    if (machine.length > 0) {
      return res.status(200).json(machine);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    next(error);
  }
};

const rentRequest = async (req, res, next) => {
  try {
    const {machineid, startdate, enddate, amount } = req.body;
    console.log(
        machineid +
        " --------" +
        startdate +
        " --------" +
        enddate +
        " --------" +
        amount
    );

    // Perform validation of request data here
    if (!machineid || !startdate || !enddate || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // let id = clientid;

    // // Check if client and machine exist
    // const client = await ClientModel.findOne({ _id: id });
    // console.log(client);
    // if (!client) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Client not found" });
    // }
    // const clientname = client.fname;

    id = machineid;

    const machine = await MachinaryModel.findOne({ _id: id });
    console.log(machine);
    if (!machine) {
      return res
        .status(404)
        .json({ success: false, message: "Machine not found" });
    }
    const machinename = machine.name;

    // Generate unique request ID
    const lastRequest = await RequestModel.findOne().sort({ reqid: -1 });
    const reqid = lastRequest ? lastRequest.reqid + 1 : 1;

    console.log(" methanata awa");
    // Create and save the request
    const status = "requested";
    const addingRequest = new RequestModel({
      machineid,
      machinename,
      startdate,
      enddate,
      status,
      amount,
      reqid,
    });

    await addingRequest.save();

    res
      .status(200)
      .json({ success: true, message: "Request was sent successfully" });
  } catch (error) {
    console.error("Error in rentRequest:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
    const [machines, clients, requests, rents] = await Promise.all([
      MachinaryModel.find(),
      ClientModel.find(),
      RequestModel.find(),
      RentModel.find(),
    ]);

    doc.font("Helvetica").fontSize(20).text("Rental Report", {
      underline: true,
    });

    // Add content to the PDF document
    doc.font("Helvetica").fontSize(16).text("Machines:", { underline: true });

    machines.forEach((machine) => {
      doc.text(`${machine.name}: ${machine.quantity}`);
      // Add other fields as needed
    });

    doc.moveDown().text("Clients:", { underline: true });

    clients.forEach((client) => {
      doc.text(`${client.username}: ${client.fname}`);
      // Add other fields as needed
    });
    requests.forEach((request) => {
      doc.text(`${request.startdate}: ${request.enddate}`);
      // Add other fields as needed
    });
    rents.forEach((rent) => {
      doc.text(`${rent.startdate}: ${rent.enddate}`);
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

const startChat = async (req, res, next) => {
  try {
    const { clientid } = req.body;

    let relationid = await ChatModel.findOne()
      .sort({ relationid: -1 })
      .limit(1);
    relationid = relationid ? relationid.relationid + 1 : 1;

    const partner = "Rental Manager";

    const newChat = new ChatModel({
      relationid,
      starter: clientid,
      partner,
    });

    await newChat.save();

    res
      .status(200)
      .json({ success: true, message: "Chat started successfully" });
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { relationid, message } = req.body;

    const starter = true;
    const partner = false;

    const time = new Date();

    let messageid = await ChatSaveModel.findOne()
      .sort({ messageid: -1 })
      .limit(1);
    messageid = messageid ? messageid.messageid + 1 : 1;

    const newMessage = new ChatSaveModel({
      relationid,
      starter,
      partner,
      message,
      messageid,
      time,
    });

    await newMessage.save();

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { messageid } = req.params;
    await ChatSaveModel.findByIdAndDelete(messageid);
    res.json({ message: "Message deleted successfully", id: messageid });
  } catch (error) {
    next(error);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const { messageid } = req.params;
    const { message } = req.body;

    // Find the item by ID and update its fields
    const updatedMsg = await ChatSaveModel.findByIdAndUpdate(
      messageid,
      {
        $set: {
          message,
        },
      },
      { new: true }
    );

    res.json({
      message: "Message updated successfully",
      data: updatedMsg,
    });
  } catch (error) {
    next(error);
  }
};

const addclient = async (req, res, next) => {
  try {
    const { username, password, fname, lname, email, tel } = req.body;

    const newClient = new ClientModel({
      username,
      password,
      fname,
      lname,
      email,
      tel,
    });

    await newClient.save();

    res.json({ message: "succes adding client" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  displayToClient,
  rentRequest,
  startChat,
  sendMessage,
  deleteMessage,
  updateMessage,
  addclient,
};
