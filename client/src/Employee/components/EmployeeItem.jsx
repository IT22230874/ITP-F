import React, { useState } from "react";
import axios from "axios";

function EmployeeDetails({ employeeId, close , fetch}) {
  const [updatedEmployee, setUpdatedEmployee] = useState({
    tel: employeeId.tel,
    email: employeeId.email,
    position: employeeId.position,
    address: employeeId.address,
    salary: employeeId.salary,
  });

  const handleUpdateEmployee = async () => {
    try {
      await axios.patch(`/api/employee/employee/${employeeId._id}`, updatedEmployee);
      console.log("Employee updated successfully");
      // You may want to trigger a refetch of employee data or update the UI in some way upon successful update

    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleclose = () => {
    close(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  return (
<div class="formcontainer" >
  
    <div class="view popup grid grid-cols-2 gap-4" >
      <h5 className="text-xl font-bold dark:text-white mb-5">Edit Employee Details</h5>
      <br></br>
      <br></br>   
        <div>
            <label class="block">First Name</label>
            <input type="text" name="fname" readOnly value={employeeId.fname} class="w-full border rounded py-1 px-3" disabled />
        </div>
        <div>
            <label class="block">Last Name</label>
            <input type="text" name="lname" readOnly value={employeeId.lname} class="w-full border rounded py-1 px-3" disabled />
        </div>
        <div>
            <label class="block">Age</label>
            <input type="text" name="age" readOnly value={employeeId.age} class="w-full border rounded py-1 px-3" disabled />
        </div>
        <div>
            <label class="block">Telephone</label>
            <input type="text" name="tel" value={updatedEmployee.tel} onChange={handleChange} class="w-full border rounded py-1 px-3" />
        </div>
        <div>
            <label class="block">Email</label>
            <input type="text" name="email" value={updatedEmployee.email} onChange={handleChange} class="w-full border rounded py-1 px-3" />
        </div>
        <div>
            <label class="block">Position</label>
            <input type="text" name="position" value={updatedEmployee.position} onChange={handleChange} class="w-full border rounded py-1 px-3" />
        </div>
        <div>
            <label class="block">NIC</label>
            <input type="text" name="nic" readOnly value={employeeId.nic} class="w-full border rounded py-1 px-3" disabled />
        </div>
        <div>
            <label class="block">Date of Birth</label>
            <input type="text" name="dob" readOnly value={employeeId.dob} class="w-full border rounded py-1 px-3" disabled />
        </div>
        <div>
            <label class="block">Address</label>
            <input type="text" name="address" value={updatedEmployee.address} onChange={handleChange} class="w-full border rounded py-1 px-3" />
        </div>
        <div>
            <label class="block">Join Date</label>
            <input type="text" name="joindate" readOnly value={employeeId.joindate} class="w-full border rounded py-1 px-3" disabled/>
        </div>
        <div>
            <label class="block">Group ID</label>
            <input type="text" name="gid" readOnly value={employeeId.gid} class="w-full border rounded py-1 px-3"disabled />
        </div>
        <div>
            <label class="block">Salary</label>
            <input type="number" name="salary" value={updatedEmployee.salary} onChange={handleChange} class="w-full border rounded py-1 px-3" />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4 ">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleUpdateEmployee}>Update</button>
            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleclose}>Close</button>
        </div>
    </div>
</div>
  );
}

export default EmployeeDetails;
