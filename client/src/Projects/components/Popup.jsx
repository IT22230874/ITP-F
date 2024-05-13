import React, { useState } from 'react';
import axios from 'axios';

function Popup({ data, onClose }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    // Validation for each field
    const { name, email, location, budget, startdate, enddate, status, clientname, description } = formData;
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regular expression for name and clientname (allowing only letters and spaces)
    const nameRegex = /^[A-Za-z\s]+$/;
    // Regular expression for budget (allowing only numbers)
    const budgetRegex = /^[0-9]+$/;
    
    if (
      name === "" ||
      email === "" ||
      location === "" ||
      budget === "" ||
      startdate === "" ||
      enddate === "" ||
      status === "" ||
      clientname === "" ||
      description === ""
    ) {
      alert("All fields are required!");
      return false;
    }
    
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return false;
    }
    
    if (!nameRegex.test(name)) {
      alert("Name should contain only letters and spaces!");
      return false;
    }
    
    if (!nameRegex.test(clientname)) {
      alert("Client name should contain only letters and spaces!");
      return false;
    }
    
    if (!budgetRegex.test(budget)) {
      alert("Budget should contain only numbers!");
      return false;
    }
    
    return true;
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id } = formData; // Assuming _id is available in formData
    try {
      await axios.patch(`/api/project/updateproject/${_id}`, formData);
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="popupcontainer" style={{ background: "#0000007e", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="popup" style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "8px", maxWidth: "500px", width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Update Project</h2>
        <button className="close" onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", cursor: "pointer", fontSize: "20px" }}>✕</button>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginRight: "20px", flex: 1 }}>
              <div>
                <label style={{ fontWeight: "bold" }}>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Budget:</label>
                <input type="text" name="budget" value={formData.budget} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Start Date:</label>
                <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>End Date:</label>
                <input type="date" name="enddate" value={formData.enddate} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div>
                <label style={{ fontWeight: "bold" }}>Status:</label>
                <input type="text" name="status" value={formData.status} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Is Tender:</label>
                <select name="isTender" value={formData.isTender} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}>
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
                </select>
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Client Name:</label>
                <input type="text" name="clientname" value={formData.clientname} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box", height: "100px" }} />
              </div>
            </div>
          </div>
          {/* Add more fields as needed */}
          <button type="submit" className="add" style={{ width: "100%", padding: "15px", borderRadius: "5px", border: "none", background: "#4267b2", color: "#fff", cursor: "pointer", marginTop: "20px" }}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
