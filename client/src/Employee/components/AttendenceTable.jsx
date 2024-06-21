import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";

function AttendenceTable() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);
  const [filterEmpId, setFilterEmpId] = useState("");

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    filterAttendanceData();
  }, [filterEmpId]);

  const fetchAttendanceData = () => {
    axios
      .get("/api/employee/attendance/details")
      .then((response) => {
        setAttendanceData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  };

  const filterAttendanceData = () => {
    let filteredData = attendanceData;

    if (filterEmpId !== null) {
      filteredData = filteredData.filter((attendance) => attendance.emp_id === filterEmpId);
    }

    setFilteredAttendanceData(filteredData);
  };

  const handleResetFilter = () => {
    setFilterEmpId("");
  };

  return (
    <div>
      <div class="mt-10 font-bold">
        <h2>Attendance Table</h2>
      </div>

      <div className="filter">
        <span><FiFilter /></span>
        <span>Filter By</span>
        <input
          type="text"
          value={filterEmpId}
          placeholder="Filter by Employee ID"
          onChange={(e) => setFilterEmpId(e.target.value)}
        />

        <button type="button" onClick={handleResetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>      

      <table>
        <thead>
          <tr>
            <th>Emp Id</th>
            <th>Name</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendanceData.map((attendance) => (
            <tr key={attendance._id}>
              <td>{attendance.emp_id}</td>
              <td>{attendance.fname}</td>
              <td>{attendance.date}</td>
              <td>{attendance.check_in_time}</td>
              <td>{attendance.check_out_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendenceTable;
