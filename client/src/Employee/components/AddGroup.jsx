import React, { useState } from 'react';
import axios from 'axios';

function AddGroup({ close }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message on input change
  };

  const handleClose = () => {
    close();
  };

  const checkGroupName = async (name) => {
    try {
      const response = await axios.get(`/api/employee/group?name=${name}`);
      return response.data.exists; // Adjust based on your backend response
    } catch (error) {
      console.error('Error checking group name:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nameExists = await checkGroupName(formData.name);
      if (nameExists) {
        setError('Group name already exists. Please choose a different name.');
        return;
      }

      // Proceed with form submission
      await axios.post('/api/employee/group', formData);
      console.log('Group added successfully');
      // Optionally, you can perform any UI updates or navigation after adding the group
      close(); // Close the form after successful submission
    } catch (error) {
      console.error('Error adding group:', error);
      setError('An error occurred while adding the group. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <form onSubmit={handleSubmit} className="bg-white p-20 rounded border border-black">
        <h5 className="text-xl font-bold dark:text-white mb-8">Create New Group</h5>
        <div className="mb-4">
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-900 dark:text-white mb-5">Group Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {/* <div className="mb-4 mt-10">
          <label htmlFor="groupDescription" className="block text-sm font-medium text-gray-900 dark:text-white mb-5">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div> */}
        <br></br>
        <br></br>

        <div className='mt-10'>
          <button type="submit" className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Group</button>
          <button type="button" onClick={handleClose} className="ml-4 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Close</button>
        </div>
      </form>
    </div>
  );
}

export default AddGroup;
