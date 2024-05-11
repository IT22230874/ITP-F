const express = require("express");
const {
  additem,
  displayItemDetails,
  getAllItemNames,
  deleteItem,
  updateItem,
} = require("../controllers/inventory.controller.js");

const router = express.Router();

router.post("/additem", additem);
router.post("/itemtable", displayItemDetails);
router.get("/itemnames", getAllItemNames);
router.delete("/deleteitem/:id", deleteItem);
router.patch("/updateitem/:id", updateItem);

module.exports = router;
