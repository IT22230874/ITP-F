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
      // Optionally handle success message or redirection
      console.log("Tender published successfully!");
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error publishing tender:", error);
      setMessage("Error publishing tender");
    }
  };

  return (
    <div className="form bg-white p-8 rounded-md shadow-md">
    <p className="text-red-500">{message}</p>
    <h2 className="text-2xl font-bold mb-4">Publish Tender</h2>
    <form onSubmit={handleSubmit} className="publishForm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="publishdate" className="block text-sm font-medium text-gray-700">Published Date</label>
          <input
            type="date"
            id="publishdate"
            name="publishdate"
            value={formData.publishdate || ""}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="closedate" className="block text-sm font-medium text-gray-700">Close Date</label>
          <input
            type="date"
            id="closedate"
            name="closedate"
            value={formData.closedate || ""}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
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
        <div className="col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
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
        <div className="col-span-2 flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Publish Tender</button>
          <button type="button" className="bg-gray-300 text-gray-700 py-2 px-4 ml-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400" onClick={close}>Close</button>
        </div>
      </div>
    </form>
  </div>
  
  );
}

export default BidsDisplay;
