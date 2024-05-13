import React, { useState } from "react";
import axios from "axios";

function AddIncome() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/finance/incomes", {
        date,
        amount,
        source,
        department,
        description,
      });
      // Clear form fields after successful submission
      setDate("");
      setAmount("");
      setSource("");
      setDepartment("");
      setDescription("");
      alert("Income added successfully!");
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Income</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date">Date:</label>
            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full border rounded py-2 px-3" />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full border rounded py-2 px-3" />
          </div>
          <div>
            <label htmlFor="source">Source:</label>
            <input id="source" type="text" value={source} onChange={(e) => setSource(e.target.value)} required className="w-full border rounded py-2 px-3" />
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input id="department" type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required className="w-full border rounded py-2 px-3" />
          </div>
          <div className="col-span-2">
            <label htmlFor="description">Description:</label>
            <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border rounded py-2 px-3" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 col-span-2 rounded">Add Income</button>
        </form>
      </div>
    </div>
  );
}

export default AddIncome;
