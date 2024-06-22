import React, { useState } from "react";
import axios from "axios";

function AddMachineForm({ handleClick }) {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    quantity: "",
    payee: "",
    date: "",
    description: "",
    priceperday: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // If the input is a file input for image, update the image property with the file
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }

    // Check if the input is for the quantity, budget, priceperday, or name field
    if (id === "quantity" || id === "budget" || id === "priceperday") {
      // Validate if the input is a number
      if (!/^\d+$/.test(value)) {
        setError(
          id === "quantity"
            ? "Quantity must be a number."
            : id === "budget"
            ? "Budget must be a number."
            : "Price per day must be a number."
        );
      } else {
        setError(null); // Clear error if the input is valid
      }
    }

    // Check if the input is for the payee or name field
    if (id === "payee" || id === "name") {
      // Validate if the input contains only letters
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError(
          id === "payee"
            ? "Payee must contain only letters."
            : "Machine name must contain only letters."
        );
      } else {
        setError(null); // Clear error if the input is valid
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData(); // Create a FormData object

      // Append each field in the form data
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const res = await axios.post("/api/machinary/addmachine", formDataToSend);
      const data = res.data;

      if (!data.success) {
        setLoading(false);
        setError(data.message);
        setSuccessMessage(null);
      } else {
        setLoading(false);
        setError(null);
        setSuccessMessage(data.message);
        setFormData({
          name: "",
          budget: "",
          quantity: "",
          payee: "",
          date: "",
          description: "",
          priceperday: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Add New Machine
          </h3>
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
              Machine Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
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
              value={formData.budget}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              required
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="priceperday"
              className="block text-sm font-medium text-gray-700"
            >
              Price Per Day:
            </label>
            <input
              type="number"
              id="priceperday"
              name="priceperday"
              value={formData.priceperday}
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
              value={formData.payee}
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
              value={formData.date}
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
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 ml-2 p-2 w-full h-24 resize-none"
            />
          </div>
          <div className="form-group col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mr-10"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              required
              onChange={handleChange}
              className="hidden" // Hide the original input
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center w-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Select Image
            </label>
          </div>

          <div className="form-group col-span-2">
            <button
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
            >
              {loading ? "Wait..." : "Add Machine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMachineForm;
