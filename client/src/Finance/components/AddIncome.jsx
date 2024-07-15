import React, { useState } from "react";
import axios from "axios";

function AddIncome({ closeForm }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Set to today's date in YYYY-MM-DD format
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("Online Payment"); // Hardcoded description
  const [department, setDepartment] = useState("Rental"); // Hardcoded department
  const [errors, setErrors] = useState({
    date: "",
    amount: "",
    source: "",
  });

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    const minDate = new Date("2000-01-01");

    if (selectedDate > today) {
      return "Date cannot be a future date.";
    }

    if (selectedDate < minDate) {
      return "Date cannot be before January 1, 2000.";
    }

    return "";
  };

  const validateAmount = (amount) => {
    if (amount <= 0) {
      return "Amount must be greater than zero.";
    }
    return "";
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setErrors((prevErrors) => ({
      ...prevErrors,
      date: validateDate(newDate),
    }));
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    setErrors((prevErrors) => ({
      ...prevErrors,
      amount: validateAmount(newAmount),
    }));
  };

  const handleSourceChange = (e) => {
    const newSource = e.target.value;
    setSource(newSource);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateError = validateDate(date);
    const amountError = validateAmount(amount);

    if (dateError || amountError) {
      setErrors({
        date: dateError,
        amount: amountError,
        source: errors.source,
      });
      return;
    }

    try {
      await axios.post("/api/finance/incomes", {
        date,
        amount,
        source,
        department,
        description,
      });
      alert("Income added successfully!");
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-md">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h2 className="text-2xl font-bold mb-4">Add Income</h2>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 col-span-2 rounded"
            onClick={closeForm}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              required
              className="w-full border rounded py-2 px-3"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              required
              className="w-full border rounded py-2 px-3"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>
          <div>
            <label htmlFor="source">Source:</label>
            <input
              id="source"
              type="text"
              value={source}
              onChange={handleSourceChange}
              required
              className="w-full border rounded py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input
              id="department"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full border rounded py-2 px-3"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border rounded py-2 px-3"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 col-span-2 rounded">
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddIncome;
