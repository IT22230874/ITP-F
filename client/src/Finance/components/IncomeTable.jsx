import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";

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

  return (
    <div>
      <div className="filter">
        <span><FiFilter /></span>
        <span>Filter By</span>
        <input
          type="text"
          value={filterDepartment}
          placeholder="Filter by Department"
          onChange={(e) => setFilterDepartment(e.target.value)}
        />
        <input
          type="text"
          value={filterDescription}
          placeholder="Filter by source"
          onChange={(e) => setFilterDescription(e.target.value)}
        />
        <button type="button" onClick={handleResetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Source</th>
            <th>Department</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncomeData.map((income) => (
            <tr key={income._id}>
              <td>{income.date}</td>
              <td>{income.amount}</td>
              <td>{income.source}</td>
              <td>{income.department}</td>
              <td>{income.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeTable;
