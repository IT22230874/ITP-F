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
    <div className="form">
      <p>{message}</p>
      <h2>Publish Tender</h2>
      <form onSubmit={handleSubmit} className="publishForm">
        <div className="">
          <label htmlFor="publishdate">Published Date</label>
          <input
            type="date"
            id="publishdate"
            name="publishdate"
            value={formData.publishdate || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="closedate">Close Date</label>
          <input
            type="date"
            id="closedate"
            name="closedate"
            value={formData.closedate || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
          <div className="form-actions">
            <button type="submit">Publish Tender</button>
            <button type="button" className="close" onClick={close}>
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BidsDisplay;
