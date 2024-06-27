const ExpenseModel = require("../modules/Expenses.model.js");
const InventoryModel = require("../modules/Inventoryitem.model.js");
const errorHandler = require("../utils/error.js");

const additem = async (req, res, next) => {
  try {
    const {
      name,
      budget,
      unitofmeasure,
      quantity,
      payee,
      date,
      description,
      minStock,
    } = req.body;

    // Check if any required field is missing
    if (
      !name ||
      !budget ||
      !unitofmeasure ||
      !quantity ||
      !payee ||
      !date ||
      !description ||
      minStock === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let itemid = await InventoryModel.findOne().sort({ itemid: -1 }).limit(1);
    itemid = itemid ? itemid.itemid + 1 : 1;

    const stock = "available";

    const newItem = new InventoryModel({
      name,
      quantity,
      unitofmeasure,
      itemid,
      stock,
      minStock,
    });

    await newItem.save();

    let expenseid = await ExpenseModel.findOne()
      .sort({ expenseid: -1 })
      .limit(1);
    expenseid = expenseid ? expenseid.expenseid + 1 : 1;

    const department = "inventory";

    const newExpense = new ExpenseModel({
      expenseid,
      amount: budget,
      date,
      payee,
      department,
      description,
    });

    await newExpense.save();

    res
      .status(201)
      .json({ success: true, message: "Item was successfully added" });
  } catch (error) {
    next(error);
  }
};

const displayItemDetails = async (req, res, next) => {
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

    const items = await InventoryModel.find(query);

    if (items.length > 0) {
      return res.status(200).json(items);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    next(error);
  }
};

const getAllItemNames = async (req, res, next) => {
  try {
    const items = await InventoryModel.find({}, "name");

    if (items.length > 0) {
      const names = items.map((item) => item.name);
      return res.status(200).json(names);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await InventoryModel.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully", id });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      //budget,
      unitofmeasure,
      quantity,
      //payee,
      //date,
      //description,
      stock,
      minStock,
    } = req.body;

    // Check if any required field is missing
    if (
      !name ||
      //!budget ||
      !unitofmeasure ||
      !quantity ||
      // !payee ||
      //!date ||
      //!description ||
      !stock ||
      minStock === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // Fetch the existing item before update
    const existingItem = await InventoryModel.findById(id);

    // Compare the updated fields to check if any changes were made
    const isUpdated =
      name !== existingItem.name ||
      unitofmeasure !== existingItem.unitofmeasure ||
      quantity !== existingItem.quantity ||
      stock !== existingItem.stock ||
      minStock !== existingItem.minStock;

    // If no changes were made, return a response indicating no update was performed
    if (!isUpdated) {
      return res
        .status(200)
        .json({
          success: false,
          message: "No changes detected, item not updated",
          data: existingItem,
        });
    }

    // Find the item by ID and update its fields
    const updatedItem = await InventoryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          quantity,
          unitofmeasure,
          stock,
          minStock,
        },
      },
      { new: true }
    );

    // // Create a new expense record
    // let latestExpense = await ExpenseModel.findOne()
    //   .sort({ expenseid: -1 })
    //   .limit(1);
    // let expenseid = latestExpense ? latestExpense.expenseid + 1 : 1;

    // const department = "inventory";

    // const newExpense = new ExpenseModel({
    //   expenseid,
    //   amount: budget,
    //   date,
    //   payee,
    //   department,
    //   description,
    // });

    // await newExpense.save();

    res.json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  additem,
  displayItemDetails,
  getAllItemNames,
  deleteItem,
  updateItem,
};
