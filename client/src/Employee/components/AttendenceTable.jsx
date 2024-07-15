import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/logo.png";
import { HiOutlineDocumentReport } from "react-icons/hi";

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
        doc.save("attendence_report.pdf");
    }; 
};

const addTableToPDF = (doc, table, actionColumn) => {
  const columns = [
    "Empoyee ID",
    "Name",
    "Date",
    "Check In",
    "Check Out",
  ];
  const rows = table.querySelectorAll("tbody tr");
  const tableData = [];
  rows.forEach((row) => {
    const rowData = [];
    row.querySelectorAll("td").forEach((cell, index) => {
      if (index === 0) {
        rowData.push("000" + cell.textContent.trim());
      } else if (index === 1 || index === 2 || index === 3 || index === 4) {
        rowData.push(cell.textContent.trim());
      } else if (index === 5) {
        rowData.push(cell.textContent.trim());
      } else if (index === 6) {
        rowData.push(
          parseInt(cell.textContent.trim()) > 0
            ? cell.textContent.trim()
            : "Rent Over"
        );
      }
    });
    tableData.push(rowData);
  });

  doc.autoTable({
    head: [columns],
    body: tableData,
    startY: 200, // Adjust the Y position as needed
    theme: "grid",
    styles: {
      overflow: "linebreak",
      columnWidth: "wrap",
      font: "Arial",
      fontSize: 10,
      halign: "center",
      valign: "middle",
    },
  });
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
        <button type="button" onClick={getpdf}>
        <HiOutlineDocumentReport />
          Get Report
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
