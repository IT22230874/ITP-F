import React, { useState } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import axios from "axios";
import AnalysisSection from "./AnalysisSection";
import RequestTable from "./RequestTable";
import RentTable from "./RentTable";
import MachineryDisplay from "./MachineryDisplay";
import jsPDF from "jspdf";
import "jspdf-autotable";

function RentContent() {
  const [displayForm, setDisplayForm] = useState(false);
  const [swapTable, setSwapTable] = useState(false);
  const [heading, setHeading] = useState("Requests");
  const [displayOtherForm, setDsiplayOtherForm] = useState(false);

  const handleButtonClick = () => {
    if (heading === "Requests") {
      setDisplayForm(!displayForm);
    } else if (heading === "Rentals") {
      setDsiplayOtherForm(!displayOtherForm);
    }
  };

  const swapTableFun = () => {
    setSwapTable(!swapTable);
    setHeading(swapTable ? "Requests" : "Rentals");
  };



  const generatePDF = (tableRef) => {
    const table = tableRef.current; // Assuming you pass a ref to the table element
    const doc = new jsPDF("p", "pt", "a4");
  
    // Hide action column before taking the screenshot
    const actionColumn = table.querySelector(".actions");
    actionColumn.style.display = "none";
  
    // Add table styling
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
      row.querySelectorAll("td").forEach((cell) => {
        rowData.push(cell.textContent.trim());
      });
      tableData.push(rowData);
    });
  
    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 120,
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
  
    // Show action column again
    actionColumn.style.display = "table-cell";
  
    // Save the PDF
    doc.save("rent_report.pdf");
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

      {!swapTable ? <RequestTable /> : <RentTable />}
    </div>
  );
}

export default RentContent;
