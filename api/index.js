const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth.route.js");
const inventoryRouter = require("./routes/inventory.route.js");
const machinaryRouter = require("./routes/machinary.route.js");
const rentRouter = require("./routes/rent.route.js");
const projectRouter = require("./routes/project.route.js");
const tenderRouter = require("./routes/tender.route.js");
const employeeRouter = require("./routes/employee.route.js");
const financeRouter = require("./routes/finance.route.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((error) => {
    console.error(error);
  });

app.use("/api/auth", authRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/machinary", machinaryRouter);
app.use("/api/rent", rentRouter);
app.use("/api/project", projectRouter);
app.use("/api/tender", tenderRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/finance", financeRouter);
app.use("/api/project", projectRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
