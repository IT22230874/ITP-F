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
    <div>
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <label>Source:</label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} required />
        <label>Department:</label>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
}

export default AddIncome;
