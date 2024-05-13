import React, { useState, useRef } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import axios from "axios";
import AnalysisSection from "./AnalysisSection";
import RequestTable from "./RequestTable";
import RentTable from "./RentTable";
import MachineryDisplay from "./MachineryDisplay";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/logo.png";

function RentContent() {
  const tableRef = useRef(null);
  const [displayForm, setDisplayForm] = useState(false);
  const [swapTable, setSwapTable] = useState(false);
  const [heading, setHeading] = useState("Requests");
  const [displayOtherForm, setDisplayOtherForm] = useState(false);

  const handleButtonClick = () => {
    if (heading === "Requests") {
      setDisplayForm(!displayForm);
    } else if (heading === "Rentals") {
      setDisplayOtherForm(!displayOtherForm);
    }
  };

  const swapTableFun = () => {
    setSwapTable(!swapTable);
    setHeading(swapTable ? "Requests" : "Rentals");
  };

  const getpdf = () => {
    const table = document.querySelector("table");
    const doc = new jsPDF("p", "pt", "a4");

    const actionColumn = table.querySelector(".actions");
    if (actionColumn) actionColumn.style.display = "none";

    // Add logo
    const img = new Image();
    img.src = logo; // Assuming 'logo' is imported as an image
    doc.addImage(img, "PNG", 40, 10, 150, 50); // Adjust the position and size as needed

   
      
      // Add table after logo
      addTableToPDF(doc, table, actionColumn);

      // Save PDF
      if (actionColumn) actionColumn.style.display = "table-cell";
      doc.save("rent_report.pdf");
  
  };

const addTableToPDF = (doc, table, actionColumn) => {
  const columns = [
    "Rent ID",
    "Client Name",
    "Start Date",
    "End Date",
    "Payment Status",
    "Total Installments",
    "Installments to Receive",
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
    <div className="dashboard">
      <PageIntroduction
        heading={heading}
        btname="Machines"
        handleClick={handleButtonClick}
      />
      <AnalysisSection />
      <div className="navbar">
        <button
          type="button"
          disabled={!swapTable}
          className="button"
          onClick={swapTableFun}
        >
          Requests
        </button>
        <button
          type="button"
          disabled={swapTable}
          className="button"
          onClick={swapTableFun}
        >
          Rents
        </button>
        <button type="button" className="button" onClick={getpdf}>
          Get Report
        </button>
      </div>

      {displayForm && (
        <div className="formContainer">
          <MachineryDisplay handleClick={handleButtonClick} />
        </div>
      )}

      {displayOtherForm && (
        <div className="formContainer">
          <MachineryDisplay handleClick={handleButtonClick} />
        </div>
      )}

      {!swapTable ? <RequestTable tableRef={tableRef} /> : <RentTable tableRef={tableRef} />}
    </div>
  );
}

export default RentContent;
