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

function FinanceContent() {
  const [selectedTable, setSelectedTable] = useState("income");
  const [publish, setPublish] = useState(false);

  const handleTableChange = (tableName) => {
    setSelectedTable(tableName);
  };

  const displayForm = () => {
    setPublish(!publish);
  }

  return (
    <div className="dashboard">
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
        btname="publish"
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
      </div>

      {selectedTable === "income" && <IncomeTable />}
      {selectedTable === "expense" && <ExpenseTable />}
      {selectedTable === "projects" && <ProjectFinanceTable />}
      {selectedTable === "liabilities" && <LiabilitiesTable />}

      {publish && (
        <div className="popup-container">
          {selectedTable === "income" && (<div className="popup">
          <AddIncome />
          </div>)}
          {selectedTable === "expense" && (<div className="popup"><AddExpense /> </div>)}
          {selectedTable === "liabilities" && (<div className="popup"><AddLiability /> </div>)}
          {/* Similar logic for AddLiabilitiesForm */}
        </div>
      )}
    </div>
  );
}

export default FinanceContent;
