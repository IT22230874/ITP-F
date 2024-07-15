import React, { useState } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import AnalysisSection from "./AnalysisSection";
import ExpenseTable from "./ExpenseTable";
import IncomeTable from "./IncomeTable";
import AddIncome from "./AddIncome"; // Import AddIncomeForm component
import AddExpense from "./AddExpense"; // Import AddExpenseForm component
import axios from "axios";
import ProjectFinanceTable from "./ProjectTable";
import LiabilitiesTable from "./LiabilityTable";
import AddLiability from "./AddLiability";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/logo.png";

function FinanceContent() {
  const [selectedTable, setSelectedTable] = useState("income");
  const [publish, setPublish] = useState(false);

  const handleTableChange = (tableName) => {
    setSelectedTable(tableName);
  };

  const displayForm = () => {
    setPublish(!publish);
  }

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
      doc.save("finance_report.pdf");
  
  };

const addTableToPDF = (doc, table, actionColumn) => {
  const columns = [
    "Date",
    "Amount",
    "Payee(as source)",
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
    <div className="dashboard">
      <AnalysisSection/>
      <PageIntroduction
        heading={
          selectedTable === "income"
            ? "Income"
            : selectedTable === "expense"
            ? "Expense"
            : selectedTable === "projects"
            ? "Projects"
            : "Liabilities"
        }
        btname="Add"
        handleClick={() => displayForm()}
      />
      <div className="navbar">
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("income")}
        >
          Income
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("expense")}
        >
          Expenses
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("projects")}
        >
          Projects
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("liabilities")}
        >
          Liabilities
        </button>
        <button type="button" className="button" onClick={getpdf}>
          Get Report
        </button>
        <button type="button" className="button" onClick={getpdf}>
          Payments
        </button>
      </div>

      {selectedTable === "income" && <IncomeTable />}
      {selectedTable === "expense" && <ExpenseTable />}
      {selectedTable === "projects" && <ProjectFinanceTable />}
      {selectedTable === "liabilities" && <LiabilitiesTable />}

      {publish && (
        <div className="popup-container">
          {selectedTable === "income" && (<div className="popup">
          <AddIncome closeForm={displayForm}/>
          </div>)}
          {selectedTable === "expense" && (<div className="popup"><AddExpense closeForm={displayForm} /> </div>)}
          {selectedTable === "liabilities" && (<div className="popup"><AddLiability closeForm={displayForm}/> </div>)}
          {/* Similar logic for AddLiabilitiesForm */}
        </div>
      )}
    </div>
  );
}

export default FinanceContent;
