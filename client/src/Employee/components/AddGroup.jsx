import React, { useState } from 'react';
import axios from 'axios';

function AddGroup({close}) {
  const [groupName, setGroupName] = useState('');

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleClose = () => {
    close()
  }

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
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <h2>Add Group</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded border border-black">
        <label for="Add group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Group Name:</label>
        <input type="text" value={groupName} onChange={handleChange} required className= "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4">Add Group</button>
        <button type="button" onClick={handleClose} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">Close</button>
      </form>
    </div>
  );
}

export default AddGroup;
