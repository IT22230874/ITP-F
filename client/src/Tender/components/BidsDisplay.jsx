import React, { useState } from "react";
import axios from "axios";

function BidsDisplay({ close }) {
  const [formData, setFormData] = useState({
    publishdate: "",
    closedate: "",
    location: "",
    description: "",
    title: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/tender/publishtender", formData);
      console.log("Tender published successfully!");
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error publishing tender:", error);
      setMessage("Error publishing tender");
    }
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md max-w-lg mx-auto">
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <h2 className="text-2xl font-bold mb-4">Publish Tender</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="publishdate" className="block text-sm font-medium text-gray-700">
            Published Date
          </label>
          <input
            type="date"
            id="publishdate"
            name="publishdate"
            value={formData.publishdate || ""}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            max={new Date().toISOString().split('T')[0]}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="closedate" className="block text-sm font-medium text-gray-700">
            Close Date
          </label>
          <input
            type="date"
            id="closedate"
            name="closedate"
            value={formData.closedate || ""}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Publish Tender
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={close}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default BidsDisplay;
