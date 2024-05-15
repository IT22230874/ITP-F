import React, { useState } from "react";
import axios from "axios";

function AddExpense({closeForm}) {
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
<div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
  <div className="bg-white p-8 rounded-md max-w-3xl w-full">
    <h2 className="text-2xl font-semibold mb-6">Add Expense</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
        <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label htmlFor="payee" className="block text-sm font-medium text-gray-700">Payee:</label>
        <input id="payee" type="text" value={payee} onChange={(e) => setPayee(e.target.value)} required className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
        <input id="department" type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="col-span-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
        <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="col-span-2 flex justify-end">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Expense</button>
        <button type="button" onClick={()=>{closeForm()}} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2">Close</button>
      </div>
    </form>
  </div>
</div>



  );
}

export default AddExpense;
