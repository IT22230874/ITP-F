import React, { useState } from "react";
import axios from "axios";

function AddExpense() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/finance/expenses", {
        date,
        amount,
        payee,
        department,
        description,
      });
      // Clear form fields after successful submission
      setDate("");
      setAmount("");
      setPayee("");
      setDepartment("");
      setDescription("");
      alert("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <label>Payee:</label>
        <input type="text" value={payee} onChange={(e) => setPayee(e.target.value)} required />
        <label>Department:</label>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
