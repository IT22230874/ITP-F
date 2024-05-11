import React, { useState } from 'react';
import axios from 'axios';

function AddProjectForm({ close }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    budget: '',
    startdate: '',
    enddate: '',
    isTender: true,
    clientname: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeForm = () => {
    close(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/project/addproject', formData);
      const newProject = response.data;
      // Reset the form
      setFormData({
        name: '',
        location: '',
        budget: '',
        startdate: '',
        enddate: '',
        isTender: true,
        clientname: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="add-project-form">
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Budget:</label>
          <input type="text" name="budget" value={formData.budget} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input type="date" name="enddate" value={formData.enddate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Is Tender:</label>
          <select name="isTender" value={formData.isTender} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Client Name:</label>
          <input type="text" name="clientname" value={formData.clientname} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <button type="submit" className='add'>Add Project</button>
        <button type="button" className="close"onClick={closeForm}>close</button>
      </form>
    </div>
  );
}

export default AddProjectForm;
