import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddEmployee({ closeForm }) {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    tel: '',
    email: '',
    position: '',
    nic: '',
    address: '',
    joindate: '',
    gid: '',
    salary: '',
  });

  const [errors, setErrors] = useState({});

  const handleClose = () => {
    closeForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input values on change and update the form data if valid
    if (validateField(name, value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    let isValid = true;

    switch (name) {
      case 'fname':
      case 'lname':
        if (/^[A-Za-z]*$/.test(value)) {
          newErrors[name] = '';
        } else {
          newErrors[name] = 'Only letters are allowed';
          isValid = false;
        }
        break;
        // case 'age':
        //   // Allow only numeric values and ensure age is between 18 and 60
        //   if (value === '' || (/^\d+$/.test(value) && (value.length < 2 || (Number(value) >= 18 && Number(value) <= 60)))) {
        //     newErrors[name] = '';
        //   } else {
        //     newErrors[name] = 'Age should be a number between 18 and 60';
        //     isValid = false;
        //   }
        //   break;
        

        
      case 'nic':
        if (/^[0-9]{0,10}$/.test(value) || /^[0-9]{9}[vV]?$/.test(value)) {
          newErrors[name] = '';
        } else {
          newErrors[name] = 'Valid NIC should be 10 digits or 9 digits followed by V or v';
          isValid = false;
        }
        break;
      case 'joindate':
        if (new Date(value) >= new Date('2000-01-01')) {
          newErrors[name] = '';
        } else {
          newErrors[name] = 'Join date cannot be before the year 2000';
          isValid = false;
        }
        break;
      case 'salary':
        if (value === '' || (Number(value) >= 0 && Number(value) <= 1000000)) {
          newErrors[name] = '';
        } else {
          newErrors[name] = 'Salary should not exceed 1000000';
          isValid = false;
        }
        break;
      case 'position':
        if (/^[A-Za-z]*$/.test(value)) {
          newErrors[name] = '';
        } else {
          newErrors[name] = 'Only letters are allowed';
          isValid = false;
        }
        break;
      case 'tel':
        if (/^[0-9]{0,10}$/.test(value)) {
          newErrors[name] = '';
        } else {
          newErrors[name] = 'Valid phone number should be 10 digits';
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateForm = () => {
    const validationErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key])) {
        validationErrors[key] = errors[key];
      }
    });

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios.post('/api/employee/employee', formData)
        .then((response) => {
          console.log('Employee added successfully:', response.data);
          // Optionally, you can perform any UI updates or navigation after adding the employee
        })
        .catch((error) => {
          console.error('Error adding employee:', error);
        });
    } else {
      console.error('Form validation failed', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded border border-black">
      <h5 className="text-xl font-bold dark:text-white mb-11">Add Employee</h5>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.fname && <p className="text-red-500 text-xs mt-1">{errors.fname}</p>}
        </div>
        <div>
          <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.lname && <p className="text-red-500 text-xs mt-1">{errors.lname}</p>}
        </div>
        <div>
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
                      min="18"
          max="60"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
          <input
            type="text"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0712345678"
          />
          {errors.tel && <p className="text-red-500 text-xs mt-1">{errors.tel}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
        </div>
        <div>
          <label htmlFor="nic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIC</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.nic && <p className="text-red-500 text-xs mt-1">{errors.nic}</p>}
        </div>
        <div>
          <label htmlFor="joindate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Join Date</label>
          <input
            type="date"
            id="joindate"
            name="joindate"
            value={formData.joindate}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.joindate && <p className="text-red-500 text-xs mt-1">{errors.joindate}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
        </div>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2 mt-10">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add
        </button>
        <button type="button" onClick={handleClose} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Close
        </button>
      </div>
    </form>
  );
}

export default AddEmployee;
