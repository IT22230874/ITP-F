import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";

function ExpenseTable() {
  const [expenseData, setExpenseData] = useState([]);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterPayee, setFilterPayee] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterExpenseData();
  }, [filterDate, filterDepartment, filterPayee]);

  const fetchData = () => {
    axios
      .get("/api/finance/expense")
      .then((response) => {
        setExpenseData(response.data);
        console.log(response);
        setFilteredExpenseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expense data:", error);
      });
  };

  console.log(filteredExpenseData);

  const filterExpenseData = () => {
    let filteredData = expenseData;

    if (filterDate.trim() !== "") {
      filteredData = filteredData.filter((expense) =>
        expense.date.includes(filterDate)
      );
    }

    if (filterDepartment.trim() !== "") {
      filteredData = filteredData.filter((expense) =>
        expense.department.toLowerCase().includes(filterDepartment.toLowerCase())
      );
    }

    if (filterPayee.trim() !== "") {
      filteredData = filteredData.filter((expense) =>
        expense.payee.toLowerCase().includes(filterPayee.toLowerCase())
      );
    }

    setFilteredExpenseData(filteredData);
  };

  const handleResetFilter = () => {
    setFilterDate("");
    setFilterDepartment("");
    setFilterPayee("");
  };

  return (
    <div>
    

      <div className="filter">
        <span><FiFilter /></span>
        <span>Filter By</span>
        <input
          type="text"
          value={filterDate}
          placeholder="Filter by Date"
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <input
          type="text"
          value={filterDepartment}
          placeholder="Filter by Department"
          onChange={(e) => setFilterDepartment(e.target.value)}
        />
        <input
          type="text"
          value={filterPayee}
          placeholder="Filter by Payee"
          onChange={(e) => setFilterPayee(e.target.value)}
        />
        <button type="button" onClick={handleResetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payee</th>
            <th>Department</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenseData.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.expenseid}</td>
              <td>{expense.date}</td>
              <td>{expense.amount}</td>
              <td>{expense.payee}</td>
              <td>{expense.department}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
