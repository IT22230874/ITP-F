//imports

import React, { useState } from "react";
import "../../styles/forms/forms.css";
import "../../styles/forms/AddItemForm.css";
import { AddFunction } from "../../middleware/create";

//create user form
function AddUsersForm() {
  //usestate to store formdata ,errror and loading event
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //path to backend
  const path = "/api/auth/signup";

  //function that store form data into a object
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //request
  const handleSubmit = (e) => {
    e.preventDefault();
    AddFunction(formData, setLoading, setError, setFormData, path);
  };

  //jsx form
  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="message">{error}</p>}
      <div className="form-group">
        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          required
          onChange={handleChange}
          value={formData.fname || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          required
          onChange={handleChange}
          value={formData.lname || ""}
        />
      </div>
      <div className="form-group">
        <div className="form-group ">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            className="shorterinputs"
            required
            onChange={handleChange}
            value={formData.age || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tel">Tel:</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            className="shorterinputs"
            required
            onChange={handleChange}
            value={formData.tel || ""}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="position">Position:</label>
        <input
          type="text"
          id="position"
          name="position"
          required
          onChange={handleChange}
          value={formData.position || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={handleChange}
          value={formData.username || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
          value={formData.password || ""}
        />
      </div>
      <button disabled={loading} className="button" type="submit">
        {loading ? "Loading..." : "Add User"}
      </button>
    </form>
  );
}

export default AddUsersForm;
