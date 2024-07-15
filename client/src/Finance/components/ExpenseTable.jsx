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
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-blue-500"><FiFilter /></span>
        <span className="text-lg font-semibold">Filter By</span>
        <input
          type="text"
          value={filterDate}
          placeholder="Filter by Date"
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={filterDepartment}
          placeholder="Filter by Department"
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={filterPayee}
          placeholder="Filter by Payee"
          onChange={(e) => setFilterPayee(e.target.value)}
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
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payee</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenseData.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{expense.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{expense.payee}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{expense.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTable;
