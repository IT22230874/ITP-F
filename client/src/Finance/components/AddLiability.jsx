import React, { useState } from "react";
import axios from "axios";

function AddLiability({closeForm}) {
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
<div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
  <div className="bg-white rounded-lg p-8 max-w-lg w-full">
    <h2 className="text-2xl font-semibold mb-6">Add Liability</h2>
    
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date:</label>
        <input type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date:</label>
        <input type="date" value={enddate} onChange={(e) => setEndDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Payee:</label>
        <input type="text" value={payee} onChange={(e) => setPayee(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Department:</label>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Installments:</label>
        <input type="number" value={installments} onChange={(e) => setInstallments(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount per Installment:</label>
        <input type="number" value={amountperinstallment} onChange={(e) => setAmountPerInstallment(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
      </div>
      <div className="col-span-2 flex justify-end">
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Liability</button>
        <button type="button" onClick={()=>{closeForm()}} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Close</button>
      </div>
    </form>
  </div>
</div>



  );
}

export default AddLiability;
