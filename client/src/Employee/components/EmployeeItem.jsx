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
    <div className="formcontainer">
      <div className="view popup">
        <label>First Name</label>
        <input type="text" name="fname" readOnly value={employeeId.fname} />
        <label>Last Name</label>
        <input type="text" name="lname" readOnly value={employeeId.lname} />
        <label>Age</label>
        <input type="text" name="age" readOnly value={employeeId.age} />
        <label>Telephone</label>
        <input type="text" name="tel" value={updatedEmployee.tel} onChange={handleChange} />
        <label>Email</label>
        <input type="text" name="email" value={updatedEmployee.email} onChange={handleChange} />
        <label>Position</label>
        <input type="text" name="position" value={updatedEmployee.position} onChange={handleChange} />
        <label>NIC</label>
        <input type="text" name="nic" readOnly value={employeeId.nic} />
        <label>Date of Birth</label>
        <input type="text" name="dob" readOnly value={employeeId.dob} />
        <label>Address</label>
        <input type="text" name="address" value={updatedEmployee.address} onChange={handleChange} />
        <label>Join Date</label>
        <input type="text" name="joindate" readOnly value={employeeId.joindate} />
        <label>Group ID</label>
        <input type="text" name="gid" readOnly value={employeeId.gid} />
        <label>Salary</label>
        <input type="text" name="salary" value={updatedEmployee.salary} onChange={handleChange} />

        <button className="update" onClick={handleUpdateEmployee}>Update</button>
        <button className="close" onClick={handleclose}>Close</button>
      </div>
    </div>
  );
}

export default EmployeeDetails;
