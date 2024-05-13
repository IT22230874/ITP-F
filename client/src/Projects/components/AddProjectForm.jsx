import React, { useState } from "react";
import axios from "axios";

function AddProjectForm({ close }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    budget: "",
    startdate: "",
    enddate: "",
    isTender: "false",
    clientname: "",
    description: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validation for name field
    if (name === "name") {
      // Regular expression to allow only alphabets and spaces
      const regex = /^[a-zA-Z\s]*$/;
      if (value === "" || regex.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const closeForm = () => {
    close(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/project/addproject", formData);
      const newProject = response.data;
      // Reset the form
      setFormData({
        name: "",
        location: "",
        budget: "",
        startdate: "",
        enddate: "",
        isTender: true,
        clientname: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div
      className="popup"
      style={{ padding: "40px", borderRadius: "8px", height: "80vh",boxShadow: "none", paddingBottom: "60px" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
                 <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <h2>Add Project</h2>
            <button
              type="button"
              className="close"
              onClick={closeForm}
              style={{
                padding: "10px 20px",
                borderRadius: "4px",
                background: "transparent",
                color: "gray",
                border: "none",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "15px",
          }}
        >
 
          <div style={{ width: "45%" }}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ width: "45%" }}>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <div style={{ width: "45%" }}>
            <label>Budget:</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ width: "45%" }}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <div style={{ width: "45%" }}>
            <label>Start Date:</label>
            <input
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ width: "45%" }}>
            <label>End Date:</label>
            <input
              type="date"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <div style={{ width: "45%" }}>
            <label>Is Tender:</label>
            <select
              name="isTender"
              value={formData.isTender}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div style={{ width: "45%" }}>
            <label>Client Name:</label>
            <input
              type="text"
              name="clientname"
              value={formData.clientname}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "15px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <button
            type="submit"
            className="add"
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              background: "#4267b2",
              color: "white",
              border: "none",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;
