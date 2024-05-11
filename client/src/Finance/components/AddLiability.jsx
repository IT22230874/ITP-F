import React, { useState } from "react";
import axios from "axios";

function AddLiability() {
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [installments, setInstallments] = useState("");
  const [amountperinstallment, setAmountPerInstallment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/finance/liabilities", {
        startdate,
        enddate,
        amount,
        payee,
        department,
        description,
        installments,
        amountperinstallment,
      });
      // Clear form fields after successful submission
      setStartDate("");
      setEndDate("");
      setAmount("");
      setPayee("");
      setDepartment("");
      setDescription("");
      setInstallments("");
      setAmountPerInstallment("");
      alert("Liability added successfully!");
    } catch (error) {
      console.error("Error adding liability:", error);
      alert("Failed to add liability. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Liability</h2>
      <form onSubmit={handleSubmit}>
        <label>Start Date:</label>
        <input type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} required />
        <label>End Date:</label>
        <input type="date" value={enddate} onChange={(e) => setEndDate(e.target.value)} required />
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <label>Payee:</label>
        <input type="text" value={payee} onChange={(e) => setPayee(e.target.value)} required />
        <label>Department:</label>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>Installments:</label>
        <input type="number" value={installments} onChange={(e) => setInstallments(e.target.value)} required />
        <label>Amount per Installment:</label>
        <input type="number" value={amountperinstallment} onChange={(e) => setAmountPerInstallment(e.target.value)} required />
        <button type="submit">Add Liability</button>
      </form>
    </div>
  );
}

export default AddLiability;
