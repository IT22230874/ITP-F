import React, { useState } from "react";
import axios from "axios";

function AddItemForm({ handleClick }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Check if the input is for the quantity or budget field
    if (id === "quantity" || id === "budget") {
      // Validate if the input is a number
      if (!/^\d+$/.test(value)) {
        setError(
          id === "quantity"
            ? "Quantity must be a number."
            : "Budget must be a number."
        );
      } else {
        setError(null); // Clear error if the input is valid
      }
    }

    // Check if the input is for the payee field
    if (id === "payee") {
      // Validate if the input contains only letters
      if (!/^[a-zA-Z]+$/.test(value)) {
        setError("Payee must contain only letters.");
      } else {
        setError(null); // Clear error if the input is valid
      }
    }

    // Check if the input is for the item name field
    if (id === "name") {
      // Validate if the input contains only letters
      if (!/^[a-zA-Z]+$/.test(value)) {
        setError("Item must contain only letters.");
      } else {
        setError(null); // Clear error if the input is valid
      }
    }

    // Update formData
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/inventory/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        setLoading(false);
        setError(data.message);
        setSuccessMessage(null);
        return;
      }

      setLoading(false);
      setError(null);
      setSuccessMessage(data.message);
      setFormData({});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">Add New Item</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={handleClick}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          {error && (
            <p className="error text-sm mt-1 mb-2 text-red-600">{error}</p>
          )}
          {successMessage && <p className="success">{successMessage}</p>}
          <div className="form-group">
            <label htmlFor="name">Item Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name || ""}
              onChange={handleChange}
              onKeyPress={(e) => {
                const regex = /^[a-zA-Z]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                  setError("Item must contain only letters.");
                }
              }}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget:</label>
            <input
              type="text"
              id="budget"
              name="budget"
              required
              value={formData.budget || ""}
              onChange={handleChange}
              onKeyPress={(e) => {
                const regex = /^[0-9\b]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                  setError("Budget must be a number.");
                }
              }}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitofmeasure">Unit of Measure:</label>
            <select
              id="unitofmeasure"
              name="unitofmeasure"
              required
              value={formData.unitofmeasure || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 mb-4 w-full"
            >
              <option value="">Select unit...</option>
              <option value="kg">Kilogram</option>
              <option value="m3">Meter Qube</option>
              <option value="l">Leters</option>
              <option value="packs">Packets</option>
              <option value="blocks">Blocks</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity || ""}
              required
              onChange={handleChange}
              onKeyPress={(e) => {
                const regex = /^[0-9\b]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                  setError("Quantity must be a number.");
                }
              }}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="payee">Payee:</label>
            <input
              type="text"
              id="payee"
              name="payee"
              value={formData.payee || ""}
              required
              onChange={handleChange}
              onKeyPress={(e) => {
                const regex = /^[a-zA-Z]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                  setError("Payee must contain only letters.");
                }
              }}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              required
              value={formData.description || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {loading ? "wait..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemForm;
