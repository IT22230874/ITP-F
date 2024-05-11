import React, { useState } from 'react';
import axios from 'axios';
import '../styles/empForm.css'

function AddEmployee() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    tel: '',
    email: '',
    position: '',
    nic: '',
    dob: '',
    address: '',
    joindate: '',
    gid: '',
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/employee/employee', formData)
      .then((response) => {
        console.log('Employee added successfully:', response.data);
        // Optionally, you can perform any UI updates or navigation after adding the employee
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input type="text" id="fname" name="fname" value={formData.fname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input type="text" id="lname" name="lname" value={formData.lname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tel">Telephone:</label>
          <input type="text" id="tel" name="tel" value={formData.tel} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="nic">NIC:</label>
          <input type="text" id="nic" name="nic" value={formData.nic} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="joindate">Join Date:</label>
          <input type="date" id="joindate" name="joindate" value={formData.joindate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
