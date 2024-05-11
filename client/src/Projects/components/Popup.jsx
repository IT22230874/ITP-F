import React, { useState } from 'react';
import axios from 'axios';

function Popup({ data,  onClose }) {
  const [formData, setFormData] = useState(data);

  const divStyle = {
    height: "70vh",
    overflow: "scroll",
    paddingTop: "100px",	
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    <div className="popupcontainer">
      <div className="popup"  style={divStyle}>
        <h2>Update Project</h2>
        <button className="close" onClick={onClose}>Close</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div>
            <label>Budget:</label>
            <input type="text" name="budget" value={formData.budget} onChange={handleChange} />
          </div>
          <div>
            <label>Start Date:</label>
            <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" name="enddate" value={formData.enddate} onChange={handleChange} />
          </div>
          <div>
            <label>Status:</label>
            <input type="text" name="status" value={formData.status} onChange={handleChange} />
          </div>
          <div>
            <label>Is Tender:</label>
            <select name="isTender" value={formData.isTender} onChange={handleChange}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label>Client Name:</label>
            <input type="text" name="clientname" value={formData.clientname} onChange={handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>
          {/* Add more fields as needed */}
          <button type="submit" className='add'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
