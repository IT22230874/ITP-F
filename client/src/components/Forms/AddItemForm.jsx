import React, { useState } from "react";

function AddItemForm({ handleClick }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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
    <form className="form" onSubmit={handleSubmit}>
      <button type="button" className="closebtn" onClick={handleClick}>
        x
      </button>
      {error && <p className="error">{error}</p>}
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
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity || ""}
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
          value={formData.payee || ""}
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
          value={formData.date || ""}
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
          value={formData.description || ""}
          onChange={handleChange}
        />
      </div>
      <button disabled={loading} className="button" type="submit">
        {loading ? "wait..." : "Add Item"}
      </button>
    </form>
  );
}

export default AddItemForm;
