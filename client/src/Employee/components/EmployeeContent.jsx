import React, { useState } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import AnalysisSection from "./AnalysisSection";
import EmployeeTable from "./EmployeeTable";
import AttendenceTable from "./AttendenceTable";
import axios from "axios";
import AddEmployeeForm from "./AddEmployee";
import AddGroup from "./AddGroup"; // Import AddGroup component
import { QrReader } from 'react-qr-reader';

function EmployeeContent() {
  const [selectedTable, setSelectedTable] = useState("employees");
  const [showForm, setShowForm] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false); // State to control Add Group component visibility

  const handleTableChange = (tableName) => {
    setSelectedTable(tableName);
  };

  const displayForm = () => {
    setShowForm(!showForm);
  };
  

  const toggleAddGroup = () => {
    setShowAddGroup(!showAddGroup); // Toggle the state to show/hide Add Group component
  };

  const handleScan = async (data) => {
    if (data) {
      setScannedData(data); // Set scanned data to state
      try {
        // Send scanned data to backend endpoint
        await axios.post("/api/employee/attendance", { scannedData: data });
      } catch (error) {
        console.error("Error sending scanned data to backend:", error);
      }
    }
  };




  return (
    <div className="dashboard">
      <PageIntroduction
        heading={
          selectedTable === "employees"
            ? "Employees"
            : "Attendance"
        }
        btname="Add Employee"
        handleClick={displayForm}
      />
      <AnalysisSection />
      <div className="navbar">
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("employees")}
        >
          Employees
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("attendance")}
        >
          Attendance
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleScan()}
        >
          ScanQr
        </button>

        <button type="button" className="button" onClick={toggleAddGroup}> {/* Add onClick handler for Add Group button */}
          Add Group
        </button>

        <button type="button" className="button"           onClick={() => handleTableChange("employees")}
> {/* Add onClick handler for Add Group button */}
Groups        </button>
        {/*<QrReader
          onScan={handleScan}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }
  
            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: '100%' }}
        />*/}
      </div>

      {selectedTable === "employees" && <EmployeeTable />}
      {selectedTable === "attendance" && <AttendenceTable />}

      {showForm && (
        <div className="formcontainer ">
          <AddEmployeeForm closeForm={displayForm} />
        </div>
      )}
      
        {showAddGroup && <AddGroup close={() => {toggleAddGroup ()}} />} {/* Render AddGroup component if showAddGroup state is true */}
      
    </div>
  );
}

export default EmployeeContent;
