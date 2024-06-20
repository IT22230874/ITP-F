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
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group">
              <label htmlFor="fname" className="block font-semibold mb-2">First Name:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                required
                onChange={handleChange}
                value={formData.fname || ""}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname" className="block font-semibold mb-2">Last Name:</label>
              <input
                type="text"
                id="lname"
                name="lname"
                required
                onChange={handleChange}
                value={formData.lname || ""}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="age" className="block font-semibold mb-2">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  onChange={handleChange}
                  value={formData.age || ""}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="form-group">
                <label htmlFor="tel" className="block font-semibold mb-2">Tel:</label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  required
                  onChange={handleChange}
                  value={formData.tel || ""}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block font-semibold mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email || ""}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="position" className="block font-semibold mb-2">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                required
                onChange={handleChange}
                value={formData.position || ""}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="block font-semibold mb-2">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                onChange={handleChange}
                value={formData.username || ""}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="block font-semibold mb-2">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={handleChange}
                value={formData.password || ""}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              disabled={loading}
              className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full mt-4 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              type="submit"
            >
              {loading ? "Loading..." : "Add User"}
            </button>
          </div>
        </form>
      );

}

export default AddUsersForm;
