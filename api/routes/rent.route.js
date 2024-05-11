const express = require("express");
const {
  displayRequests,
  deleteRequest,
  addrent,
  displayRents,
  updateenddate,
  makepayment,
  deleteRentalLog,
  analysis,
  getpdf,
} = require("../controllers/RentalSubSystem/rent.controller.js");
const {
  displayToClient,
  rentRequest,
  startChat,
  sendMessage,
  deleteMessage,
  updateMessage,
  addclient,
} = require("../controllers/RentalSubSystem/clientsiderent.controller.js");

const router = express.Router();

router.get("/displaymachines", displayToClient);
router.post("/addrequest", rentRequest);
router.post("/addrent", addrent);
router.delete("/deleterequest/:id", deleteRequest);
router.delete("/delete/:id", deleteRentalLog);
router.get("/displayrequest", displayRequests);
router.get("/analysis", analysis);
router.get("/getpdf", getpdf);
router.get("/addclient", addclient);
router.get("/machines", displayToClient);
router.get("/displayrent", displayRents);
router.post("/payment/:id", makepayment);
router.patch("/extendenddate/:id", updateenddate);

module.exports = router;
