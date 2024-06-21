import React, { useState } from "react";
import PageIntroduction from "../PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import AddItemForm from "../Forms/AddItemForm";
import InventoryTable from "../Tables/InventoryTable";
import MachinaryTable from "../Tables/MachinaryTable";
import AddMachineForm from "../Forms/AddMachineForm";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/logo.png";
import "jspdf-autotable";

function InventoryContent() {
  const [displayForm, setDisplayForm] = useState(false);
  const [swapTable, setSwapTable] = useState(false);
  const [heading, setHeading] = useState("Inventory");
  const [displayOtherForm, setDsiplayOtherForm] = useState(false);

  const handleButtonClick = () => {
    if (heading === "Inventory") {
      setDisplayForm(!displayForm);
    } else if (heading === "Machinary") {
      setDsiplayOtherForm(!displayOtherForm);
    }
  };

  const swapTableFun = () => {
    setSwapTable(!swapTable);
    setHeading(swapTable ? "Inventory" : "Machinary");
  };

  const getpdf = () => {
    if (heading === "Inventory") {
      const table = document.querySelector("table"); // Assuming your table has 'table' tag
      const doc = new jsPDF("p", "pt", "a4");

      // Hide action column before taking the screenshot
      const actionColumn = table.querySelector(".action");
      actionColumn.style.display = "none";

      // Add logo
      const img = new Image();
      img.src = logo; // Assuming 'logo' is imported as an image
      doc.addImage(img, "PNG", 40, 10, 120, 50); // Adjust the position and size as needed

      // Add table styling
      const columns = ["ID", "Name", "Quantity", "stock"];
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
      doc.save("Inventory_report.pdf");
    } else if (heading === "Machinary") {
      const table = document.querySelector("table"); // Assuming your table has 'table' tag
      const doc = new jsPDF("p", "pt", "a4");

      // // Hide action column before taking the screenshot
      // const actionColumn = table.querySelector(".action");
      // actionColumn.style.display = "none";

      // Add logo
      const img = new Image();
      img.src = logo; // Assuming 'logo' is imported as an image
      doc.addImage(img, "PNG", 40, 10, 120, 50); // Adjust the position and size as needed

      // Add table styling
      const columns = ["ID", "Name", "Quantity", "Stock", "Price"];
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
      //actionColumn.style.display = "table-cell";

      // Save the PDF
      doc.save("Machinary_report.pdf");
    }
  };

  return (
    <div className="dashboard">
      <PageIntroduction
        heading={heading}
        btname="Add New"
        handleClick={handleButtonClick}
      />
      <div className="navbar">
        <button
          type="button"
          disabled={!swapTable}
          className="button"
          onClick={swapTableFun}
        >
          Inventory
        </button>
        <button
          type="button"
          disabled={swapTable}
          className="button"
          onClick={swapTableFun}
        >
          Machinary
        </button>
        <button type="button" className="button" onClick={getpdf}>
          Get Report
        </button>
      </div>

      {displayForm && (
        <div className="formContainer ">
          <AddItemForm handleClick={handleButtonClick} />
        </div>
      )}

      {displayOtherForm && (
        <div className="formContainer">
          <AddMachineForm handleClick={handleButtonClick} />
        </div>
      )}

      {!swapTable ? <InventoryTable /> : <MachinaryTable />}
    </div>
  );
}

export default InventoryContent;
