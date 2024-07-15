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
  <div className="bg-white p-8 rounded shadow-md">
    <div style={{alignItems: "center",justifyContent: "space-between", width: "100%"}}>
    <h2 className="text-2xl font-bold mb-10">Add Expense</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="date" >Date:</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full border rounded py-2 px-3" />
      </div>
      <div>
        <label htmlFor="amount" >Amount:</label>
        <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full border rounded py-2 px-3" />
      </div>
      <div>
        <label htmlFor="payee" >Payee:</label>
        <input id="payee" type="text" value={payee} onChange={(e) => setPayee(e.target.value)} required className="w-full border rounded py-2 px-3" />
      </div>
      <div>
        <label htmlFor="department" >Department:</label>
        <input id="department" type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required className="w-full border rounded py-2 px-3" />
      </div>
      <div className="col-span-2">
        <label htmlFor="description" >Description:</label>
        <textarea id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border rounded py-2 px-3 " />
      </div>
      
      <div className="col-span-2 flex gap-4">
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add Expense</button>
        <button type="button" onClick={()=>{closeForm()}} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Close</button>
      </div>
    </form>
    </div>
  </div>
</div>



  );
}

export default AddExpense;
