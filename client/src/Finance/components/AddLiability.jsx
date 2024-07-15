import React, { useState } from "react";
import axios from "axios";

function AddLiability({ closeForm }) {
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

    // Validate that start date is not a future date
    const today = new Date().toISOString().split("T")[0];
    if (startdate > today) {
      alert("Start date cannot be a future date.");
      return;
    }

    // Validate that end date is not before start date
    if (enddate < startdate) {
      alert("End date cannot be before start date.");
      return;
    }

    // Validate payee and department input
    const lettersOnly = /^[A-Za-z\s]+$/;
    if (!lettersOnly.test(payee)) {
      alert("Payee can only contain letters.");
      return;
    }
    if (!lettersOnly.test(department)) {
      alert("Department can only contain letters.");
      return;
    }

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
      <div className="bg-white p-8 rounded shadow-md">
        <div style={{ alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h2 className="text-2xl font-bold mb-10">Add Liability</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-10">
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startdate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                value={enddate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label>Payee:</label>
              <input
                type="text"
                value={payee}
                onChange={(e) => {
                  if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                    setPayee(e.target.value);
                  }
                }}
                required
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label>Department:</label>
              <input
                type="text"
                value={department}
                onChange={(e) => {
                  if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                    setDepartment(e.target.value);
                  }
                }}
                required
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label>Installments:</label>
              <input
                type="number"
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
                required
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div>
              <label>Amount per Installment:</label>
              <input
                type="number"
                value={amountperinstallment}
                onChange={(e) => setAmountPerInstallment(e.target.value)}
                required
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div className="col-span-2 flex gap-10">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded"
              >
                Add Liability
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLiability;
