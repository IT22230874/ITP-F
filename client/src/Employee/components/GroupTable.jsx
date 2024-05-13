import React, { useState, useEffect } from "react";
import axios from "axios";

function GroupTable() {
  const [groupsData, setGroupsData] = useState([]);
  //const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);
  //const [filterEmpId, setFilterEmpId] = useState("");

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // useEffect(() => {
  //   filterAttendanceData();
  //   fetchSalaryData();
  // }, [filterEmpId]);

  const fetchAttendanceData = () => {
    axios
      .get("/api/employee/groups")
      .then((response) => {
        setGroupsData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  };

  // const fetchSalaryData = () => {
  //   if (filterEmpId.trim() !== "") {
  //     axios
  //       .get(`/api/employee/salary/${filterEmpId}`)
  //       .then((response) => {
  //         setSalaryData(response.data);
  //         // Check if salary is paid for the current month
  //         const currentMonth = new Date().getMonth() + 1;
  //         const isSalaryPaid = response.data.month === currentMonth;
  //         setSalaryPaid(isSalaryPaid);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching salary data:", error);
  //       });

  //     // Fetch salaryPerDay from employee collection
  //     axios
  //       .get(`/api/employee/${filterEmpId}`)
  //       .then((response) => {
  //         const employeeData = response.data;
  //         // Assuming salaryPerDay is a field in the employee collection
  //         setSalaryData((prevState) => ({
  //           ...prevState,
  //           salaryPerDay: employeeData.salaryPerDay,
  //         }));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching employee data:", error);
  //       });
  //   } else {
  //     setSalaryData(null);
  //     setSalaryPaid(false);
  //   }
  // };

  // const filterAttendanceData = () => {
  //   let filteredData = attendanceData;

  //   if (filterEmpId.trim() !== "") {
  //     filteredData = filteredData.filter(
  //       (attendance) => attendance.empid === filterEmpId
  //     );
  //     // Calculate total working hours
  //     const totalHours = filteredData.reduce((total, attendance) => {
  //       const hours = calculateWorkingHours(
  //         attendance.arrival,
  //         attendance.departure
  //       );
  //       return total + hours;
  //     }, 0);
  //     setTotalWorkingHours(totalHours);
  //   } else {
  //     setTotalWorkingHours(null);
  //   }

  //   setFilteredAttendanceData(filteredData);
  // };

  // const handleFilterByEmpId = (e) => {
  //   setFilterEmpId(e.target.value);
  // };

  // const handleClearFilter = () => {
  //   setFilterEmpId("");
  // };

  return (
    <div>
      <div class="mt-10 font-bold">
        <h2>Attendence Table</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Group Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {groupsData.map((group) => (
            <tr key={group._id}>
              <td>{group.gid}</td>
              <td>{group.name}</td>
              <td>{group.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GroupTable;
