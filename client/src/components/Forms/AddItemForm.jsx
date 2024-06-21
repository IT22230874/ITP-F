import React, { useState } from "react";
import axios from "axios";

function AddItemForm({ handleClick }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Validate inputs based on id (name, budget, unitofmeasure, quantity, minStock, payee, date, description)

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/inventory/additem", formData);
      const data = res.data;

      if (!data.success) {
        setError(data.message);
        setSuccessMessage(null);
      } else {
        setSuccessMessage(data.message);
        setError(null);
        setFormData({});
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow p-6">
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
        <form
          className="p-4 md:p-5 grid grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {error && (
            <p className="error col-span-2 text-sm mt-1 mb-2 text-red-600">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="success col-span-2">{successMessage}</p>
          )}
          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700"
            >
              Budget:
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              required
              value={formData.budget || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="unitofmeasure"
              className="block text-sm font-medium text-gray-700"
            >
              Unit of Measure:
            </label>
            <select
              id="unitofmeasure"
              name="unitofmeasure"
              required
              value={formData.unitofmeasure || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-md"
              style={{ maxWidth: "69%" }}
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
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity:
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity || ""}
              required
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="minStock"
              className="block text-sm font-medium text-gray-700"
            >
              Min Stock:
            </label>
            <input
              type="text"
              id="minStock"
              name="minStock"
              value={formData.minStock || ""}
              required
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="payee"
              className="block text-sm font-medium text-gray-700"
            >
              Payee:
            </label>
            <input
              type="text"
              id="payee"
              name="payee"
              value={formData.payee || ""}
              required
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-md"
              style={{ maxWidth: "69%" }}
            />
          </div>
          <div className="form-group col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description || ""}
              onChange={handleChange}
              className="border border-gray-300 ml-2 p-2 w-full h-24 resize-none"
            />
          </div>
          <div className="form-group col-span-2">
            <button
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
            >
              {loading ? "Wait..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemForm;
