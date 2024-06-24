const path = require("path");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Setup the transporter using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailSender = async (req, res) => {
  const { recipientEmail, itemName, currentQuantity, minStockLevel } = req.body;

  try {
    // Render email template
    const emailTemplatePath = path.join(
      __dirname,
      "templates",
      "emailTemplate.ejs"
    );

    //testing
    console.log("Loading template from:", emailTemplatePath);

    const emailTemplate = await ejs.renderFile(emailTemplatePath, {
      itemName,
      currentQuantity,
      minStockLevel,
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `Stock Alert: ${itemName}`,
      html: emailTemplate,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = mailSender;
