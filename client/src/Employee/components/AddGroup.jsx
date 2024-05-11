import React, { useState } from 'react';
import axios from 'axios';

function AddGroup() {
  const [groupName, setGroupName] = useState('');

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/employee/group', { name: groupName })
      .then((response) => {
        console.log('Group added successfully:', response.data);
        // Optionally, you can perform any UI updates or navigation after adding the group
      })
      .catch((error) => {
        console.error('Error adding group:', error);
      });
  };

  return (
    <div>
      <h2>Add Group</h2>
      <form onSubmit={handleSubmit}>
        <label>Group Name:</label>
        <input type="text" value={groupName} onChange={handleChange} required />
        <button type="submit">Add Group</button>
      </form>
    </div>
  );
}

export default AddGroup;
