import React, { useState } from "react";

function AddMachineForm({ handleClick }) {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    quantity: "",
    payee: "",
    date: "",
    description: "",
    priceperday: "",
    image: null, // For storing the selected image file
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    // If the input is a file input for image, update the image property with the file
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        image: e.target.files[0], // Get the first file from the selected files
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
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

      const res = await fetch("/api/machinary/addmachine", {
        method: "POST",
        body: formDataToSend, // Send FormData object instead of JSON
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="bg-white p-4 rounded border border-black" onSubmit={handleSubmit}>
      <button type="button" className="closebtn" onClick={handleClick}>
        x
      </button>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <div className="form-group">
        <label htmlFor="name">Machine Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="budget">Budget:</label>
        <input
          type="text"
          id="budget"
          name="budget"
          required
          value={formData.budget}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="priceperday">Price:</label>
        <input
          type="number"
          id="priceperday"
          name="priceperday"
          value={formData.priceperday}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="payee">Payee:</label>
        <input
          type="text"
          id="payee"
          name="payee"
          value={formData.payee}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          required
          onChange={handleChange}
        />
      </div>
      <button disabled={loading} className="button" type="submit">
        {loading ? "Wait..." : "Add Item"}
      </button>
    </form>
  );
}

export default AddMachineForm;
