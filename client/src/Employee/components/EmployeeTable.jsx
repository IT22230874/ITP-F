import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiRefreshCcw } from "react-icons/fi";
import { FaTrashAlt, FaEdit, FaUserPlus, FaUserMinus, FaQrcode } from "react-icons/fa";
import EmployeeDetails from "./EmployeeItem";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/logo.png";
import { HiOutlineDocumentReport } from "react-icons/hi";

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

  const handleAddGroupTable = () => {
    setAddGroupTableVisible(false);
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

  const getpdf = () => {
    const table = document.querySelector("table");
    const doc = new jsPDF("p", "pt", "a4");

    const actionColumn = table.querySelector(".actions");
    if (actionColumn) actionColumn.style.display = "none";

    // Add letterhead
    const img = new Image();
    img.src = logo; // Assuming 'logo' is imported as a letterhead image

    img.onload = () => {
        // Adjust the position and size of the letterhead to span the width of the page
        const pageWidth = doc.internal.pageSize.getWidth();
        const letterheadHeight = 130; // Adjust this based on your letterhead image aspect ratio
        doc.addImage(img, "PNG", 0, 0, pageWidth, letterheadHeight);

        // Add some top margin below the letterhead
        const startY = letterheadHeight + 20;

        // Add report title
        doc.setFont("Arial", "bold");
        doc.setFontSize(18);
        doc.text("Attendance Report", pageWidth / 2, startY, { align: "center" });

        // Add table after the letterhead and title
        addTableToPDF(doc, table, startY + 30); // Adjust starting Y position for the table

        // Save PDF
        if (actionColumn) actionColumn.style.display = "table-cell";
        doc.save("employee_report.pdf");
    };
};

const addTableToPDF = (doc, table, startY) => {
    const columns = [
        "Employee ID",
        "First Name",
        "Last Name",
        "Age",
        "Position",
        "Email",
        "Group Id"
    ];
    const rows = table.querySelectorAll("tbody tr");
    const tableData = [];

    rows.forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell, index) => {
            if (index === 0) {
                rowData.push("000" + cell.textContent.trim());
            } else if (index >= 1 && index <= 6) {
                rowData.push(cell.textContent.trim());
            }
        });
        tableData.push(rowData);
    });

    doc.autoTable({
        head: [columns],
        body: tableData,
        startY: startY, // Use the provided startY position to place the table
        theme: "striped",
        styles: {
            overflow: "linebreak",
            columnWidth: "wrap",
            font: "Arial",
            fontSize: 10,
            halign: "center",
            valign: "middle"
        },
        headStyles: {
            fillColor: [22, 160, 133], // Custom header color
            textColor: [255, 255, 255], // Custom header text color
            fontSize: 12,
            fontStyle: "bold"
        },
        bodyStyles: {
            fillColor: [245, 245, 245] // Custom body color for better readability
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255] // Alternate row color
        }
    });
};


  return (
    <div>
      <div class="mt-10 font-bold">
        <h2>Employee Table</h2>
        </div>
      

      <div className="filter border border-gray-300 rounded-lg bg-white  p-4">
        <div className="flex h-15">
          <span>Filter By Position:</span>
          <input
            type="text"
            value={filterPosition}
            placeholder="Enter position"
            onChange={(e) => setFilterPosition(e.target.value)}
            
          />
        </div>
        
        <div className="flex h-15">
        <span>Filter By Group ID:</span>
        <input
          type="text"
          value={filterGid || ""}
          placeholder="Enter Group ID"
          onChange={(e) => setFilterGid(e.target.value === "" ? null : parseInt(e.target.value))}
        />
        </div>
         
        <button type="button" onClick={handleResetFilter} className="ml-5  !bg-red-500 !text-white gap-x-5 h-15 flex items-center justify-center" >
          <FiRefreshCcw />
          Reset Filter
        </button>
        <button type="button" onClick={getpdf} className="ml-5  !bg-red-500 !text-white gap-x-5 h-15 flex items-center justify-center" >
        <HiOutlineDocumentReport />
          Get Report
        </button>
        
      </div>

      <table style={{ width: '110%' }} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Employee ID</th>
            <th scope="col" class="px-6 py-3">First Name</th>
            <th scope="col" class="px-6 py-3">Last Name</th>
            <th scope="col" class="px-6 py-3">Age</th>
            <th scope="col" class="px-6 py-3">Position</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Group ID</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployeeData.map((employee) => (
            <tr key={employee._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{employee.emp_id}</td>
              <td className="px-6 py-4">{employee.fname}</td>
              <td className="px-6 py-4">{employee.lname}</td>
              <td className="px-6 py-4">{employee.age}</td>
              <td className="px-6 py-4">{employee.position}</td>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">{employee.gid}</td>
              <td className="px-6 py-4">
                <button className="delete mx-2" onClick={() => handleDelete(employee._id)}>
                  <FaTrashAlt className="text-red-500"/>
                </button>
                <button className="edit mx-2" onClick={() => handleEdit(employee)}>
                  <FaEdit className="text-blue-500"/>
                </button>
                {employee.gid === 'null' ? (
                  <button className="add-to-group mx-2" onClick={() => handleAddToGroup(employee._id)}>
                    <FaUserPlus className="text-black"/>
                  </button>
                ) : (
                  <button className="remove-from-group mx-2" onClick={() => handleRemoveFromGroup(employee._id)}>
                    <FaUserMinus />
                  </button>
                )}
                <button className="get-qr-function mx-2" onClick={() => handleGetQRFunction(employee._id)}>
                <FaQrcode />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {addGroupPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded border border-black">
          <label for="Add group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Group ID:</label>
          <input type="text" value={groupIdInput} onChange={handleGroupIdInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button onClick={handleAddGroupSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">Submit</button>
          <button onClick={handleAddGroupPopupClose} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">Cancel</button>
        </div>
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
