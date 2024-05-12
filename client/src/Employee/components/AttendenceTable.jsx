import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceTable() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);
  const [filterEmpId, setFilterEmpId] = useState('');
  const [totalWorkingHours, setTotalWorkingHours] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [salaryData, setSalaryData] = useState(null);
  const [salaryPaid, setSalaryPaid] = useState(false);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    filterAttendanceData();
    fetchSalaryData();
  }, [filterEmpId]);

  const fetchAttendanceData = () => {
    axios.get('/api/employee/attendance/details')
      .then(response => {
        setAttendanceData(response.data.data);
        setFilteredAttendanceData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  };

  const fetchSalaryData = () => {
    if (filterEmpId.trim() !== '') {
      axios.get(`/api/employee/salary/${filterEmpId}`)
        .then(response => {
          setSalaryData(response.data);
          // Check if salary is paid for the current month
          const currentMonth = new Date().getMonth() + 1;
          const isSalaryPaid = response.data.month === currentMonth;
          setSalaryPaid(isSalaryPaid);
        })
        .catch(error => {
          console.error('Error fetching salary data:', error);
        });

      // Fetch salaryPerDay from employee collection
      axios.get(`/api/employee/${filterEmpId}`)
        .then(response => {
          const employeeData = response.data;
          // Assuming salaryPerDay is a field in the employee collection
          setSalaryData(prevState => ({
            ...prevState,
            salaryPerDay: employeeData.salaryPerDay
          }));
        })
        .catch(error => {
          console.error('Error fetching employee data:', error);
        });
    } else {
      setSalaryData(null);
      setSalaryPaid(false);
    }
  };

  const filterAttendanceData = () => {
    let filteredData = attendanceData;

    if (filterEmpId.trim() !== '') {
      filteredData = filteredData.filter(attendance => attendance.empid === filterEmpId);
      // Calculate total working hours
      const totalHours = filteredData.reduce((total, attendance) => {
        const hours = calculateWorkingHours(attendance.arrival, attendance.departure);
        return total + hours;
      }, 0);
      setTotalWorkingHours(totalHours);
    } else {
      setTotalWorkingHours(null);
    }

    setFilteredAttendanceData(filteredData);
  };

  const calculateWorkingHours = (arrival, departure) => {
    if (!arrival || !departure) return 0;
  
    // Convert arrival and departure strings to Date objects
    const arrivalTime = new Date(arrival);
    const departureTime = new Date(departure);
  
    // Check if the conversion resulted in valid Date objects
    if (isNaN(arrivalTime.getTime()) || isNaN(departureTime.getTime())) {
      console.error("Invalid date format");
      return 0;
    }
  
    // Calculate the time difference in milliseconds
    const millisecondsDifference = departureTime.getTime() - arrivalTime.getTime();
  
    // Calculate the hours difference
    const hoursDifference = millisecondsDifference / (1000 * 60 * 60);
  
    return hoursDifference;
  };
  
  

  const handleFilterByEmpId = (e) => {
    setFilterEmpId(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterEmpId('');
  };

  const handlePaySalary = () => {
    // Logic for paying salary
    console.log('Salary paid!');
    // You can add the logic here to pay the salary
    // Send the empid and calculated salary to the salary endpoint
    if (filterEmpId && salaryData) {
      const salaryAmount = totalWorkingHours * salaryData.salaryPerDay;
      axios.post('/api/employee/salary/pay', { empId: filterEmpId, salaryAmount })
        .then(response => {
          console.log('Salary paid successfully:', response.data);
          // Update the UI or perform any other action upon successful payment
        })
        .catch(error => {
          console.error('Error paying salary:', error);
        });
    }
  };

  return (
    <div>
            <div class="mt-10 font-bold">
        <h2>Attendence Table</h2>
        </div>
      <div className="filter">
        <input
          type="text"
          placeholder="Filter by Employee ID"
          value={filterEmpId}
          onChange={handleFilterByEmpId}
        />
        <button onClick={handleClearFilter}>Clear Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Attendance Type</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
            <th>Working Hours</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendanceData.map((attendance) => (
            <tr key={attendance._id}>
              <td>{attendance.empid}</td>
              <td>{attendance.date}</td>
              <td>{attendance.attendencetype}</td>
              <td>{attendance.arrival}</td>
              <td>{attendance.departure}</td>
              <td>{calculateWorkingHours(attendance.arrival, attendance.departure)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalWorkingHours !== null && (
        <div className="popup">
          <h3>Total Working Hours: {totalWorkingHours}</h3>
          {salaryData && (
            <div>
              <p>Salary for {salaryData.monthName} {salaryData.year}: {salaryData.amount}</p>
              <p>Per Day Salary: {salaryData.salaryPerDay}</p>
              {!salaryPaid && <button onClick={handlePaySalary}>Pay Salary</button>}
              {salaryPaid && <p>Salary already paid for {salaryData.monthName} {salaryData.year}</p>}
            </div>
          )}
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AttendanceTable;
