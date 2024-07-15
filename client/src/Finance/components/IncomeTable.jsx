import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/logo.png";
import { HiOutlineDocumentReport } from "react-icons/hi";

function IncomeTable() {
  const [incomeData, setIncomeData] = useState([]);
  const [filteredIncomeData, setFilteredIncomeData] = useState([]);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDescription, setFilterDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterIncomeData();
  }, [filterDepartment, filterDescription]);

  const fetchData = () => {
    axios
      .get("/api/finance/income")
      .then((response) => {
        setIncomeData(response.data);
        setFilteredIncomeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching income data:", error);
      });
  };

  const filterIncomeData = () => {
    let filteredData = incomeData;

    if (filterDepartment.trim() !== "") {
      filteredData = filteredData.filter((income) =>
        income.department.toLowerCase().includes(filterDepartment.toLowerCase())
      );
    }

    if (filterDescription.trim() !== "") {
      filteredData = filteredData.filter((income) =>
        income.source.toLowerCase().includes(filterDescription.toLowerCase())
      );
    }

    setFilteredIncomeData(filteredData);
  };

  const handleResetFilter = () => {
    setFilterDepartment("");
    setFilterDescription("");
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
        doc.text("Income Report", pageWidth / 2, startY, { align: "center" });

        // Add table after the letterhead and title
        addTableToPDF(doc, table, startY + 30); // Adjust starting Y position for the table

        // Save PDF
        if (actionColumn) actionColumn.style.display = "table-cell";
        doc.save("income_report.pdf");
    }; 
};

const addTableToPDF = (doc, table, actionColumn) => {
  const columns = [
    "Date",
    "Amount",
    "Department",
    "Description",
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
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-blue-500"><FiFilter /></span>
        <span className="text-lg font-semibold">Filter By</span>
        <input
          type="text"
          value={filterDepartment}
          placeholder="Filter by Department"
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={filterDescription}
          placeholder="Filter by Source"
          onChange={(e) => setFilterDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleResetFilter}
          className="flex items-center px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          <FiRefreshCcw className="mr-2" />
          Reset Filter
        </button>
        <button
          type="button"
          onClick={getpdf}
          className="flex items-center px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          <HiOutlineDocumentReport className="mr-2" />
          Get Report
        </button>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                {/* <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Source</th> */}
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncomeData.map((income) => (
                <tr key={income._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{income.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{income.amount}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{income.source}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{income.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{income.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IncomeTable;
