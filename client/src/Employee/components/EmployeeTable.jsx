import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiRefreshCcw } from "react-icons/fi";
import { FaTrashAlt, FaEdit, FaUserPlus, FaUserMinus, FaQrcode } from "react-icons/fa";
import EmployeeDetails from "./EmployeeItem";

function EmployeeTable() {
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredEmployeeData, setFilteredEmployeeData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [filterPosition, setFilterPosition] = useState("");
  const [filterGid, setFilterGid] = useState(null);
  const [addGroupPopupVisible, setAddGroupPopupVisible] = useState(false);
  const [groupIdInput, setGroupIdInput] = useState("");
  const [addtogroup, setaddtogroup] = useState("");

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    filterEmployeeData();
  }, [filterPosition, filterGid]);

  const fetchEmployeeData = () => {
    axios
      .get("/api/employee/employees")
      .then((response) => {
        setEmployeeData(response.data.data);
        setFilteredEmployeeData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  const filterEmployeeData = () => {
    let filteredData = employeeData;

    if (filterPosition.trim() !== "") {
      filteredData = filteredData.filter((employee) =>
        employee.position.toLowerCase().includes(filterPosition.toLowerCase())
      );
    }

    if (filterGid !== null) {
      filteredData = filteredData.filter((employee) => employee.gid === filterGid);
    }

    setFilteredEmployeeData(filteredData);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/employee/employee/${id}`)
      .then((response) => {
        console.log("Employee deleted successfully:", response.data);
        fetchEmployeeData();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleEdit = (id) => {
    setSelectedEmployeeId(id);
  };

  const handleAddToGroup = (id) => {
    setaddtogroup(id);
    setAddGroupPopupVisible(true);
  };

  const handleRemoveFromGroup = (id) => {
    axios
      .delete(`/api/employee/group/member/${id}`)
      .then((response) => {
        console.log("Employee removed from group successfully:", response.data);
        fetchEmployeeData();
      })
      .catch((error) => {
        console.error("Error removing employee from group:", error);
      });
  };

  const handleGetQRFunction = (id) => {
    axios
      .post(`/api/employee/attendance/qr`, { id: id })
      .then((response) => {
        console.log("QR function executed successfully:", response.data);
        const { qrCode, filename } = response.data;
  
        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = filename;
  
        // Trigger the download
        link.click();
      })
      .catch((error) => {
        console.error("Error executing QR function:", error);
      });
  };
  

  const handleResetFilter = () => {
    setFilterPosition("");
    setFilterGid(null);
  };

  const handleAddGroupPopupClose = () => {
    setAddGroupPopupVisible(false);
    setSelectedEmployeeId(null);
    setGroupIdInput("");
  };

  const handleGroupIdInputChange = (e) => {
    setGroupIdInput(e.target.value);
  };

  const handleAddGroupSubmit = () => {
    axios
      .patch(`/api/employee/group/member/${addtogroup}`, { gid: groupIdInput })
      .then((response) => {
        console.log("Employee added to group successfully:", response.data);
        fetchEmployeeData();
        handleAddGroupPopupClose();
      })
      .catch((error) => {
        console.error("Error adding employee to group:", error);
      });
  };

  return (
    <div>
      <div class="mt-10 font-bold">
        <h2>Employee Table</h2>
        </div>
      

      <div className="filter">
        <span>Filter By Position:</span>
        <input
          type="text"
          value={filterPosition}
          placeholder="Enter position"
          onChange={(e) => setFilterPosition(e.target.value)}
        />
        <span>Filter By Group ID:</span>
        <input
          type="text"
          value={filterGid || ""}
          placeholder="Enter Group ID"
          onChange={(e) => setFilterGid(e.target.value === "" ? null : parseInt(e.target.value))}
        />
        <button type="button" onClick={handleResetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Email</th>
            <th>Group ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployeeData.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.fname}</td>
              <td>{employee.lname}</td>
              <td>{employee.age}</td>
              <td>{employee.position}</td>
              <td>{employee.email}</td>
              <td>{employee.gid}</td>
              <td>
                <button className="delete" onClick={() => handleDelete(employee._id)}>
                  <FaTrashAlt />
                </button>
                <button className="edit" onClick={() => handleEdit(employee)}>
                  <FaEdit />
                </button>
                {employee.gid === 'null' ? (
                  <button className="add-to-group" onClick={() => handleAddToGroup(employee._id)}>
                    <FaUserPlus />
                  </button>
                ) : (
                  <button className="remove-from-group" onClick={() => handleRemoveFromGroup(employee._id)}>
                    <FaUserMinus />
                  </button>
                )}
                <button className="get-qr-function" onClick={() => handleGetQRFunction(employee._id)}>
                <FaQrcode />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {addGroupPopupVisible && (
        <div className="popup">
          <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Enter Group ID</h3>
          <input type="text" value={groupIdInput} onChange={handleGroupIdInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button onClick={handleAddGroupSubmit}>Submit</button>
          <button onClick={handleAddGroupPopupClose}>Cancel</button>
        </div>
      )}

      {selectedEmployeeId && (
        <div className="popupcontainer">
          <EmployeeDetails employeeId={selectedEmployeeId} close={setSelectedEmployeeId} />
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
