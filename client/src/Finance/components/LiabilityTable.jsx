import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw, FiEye, FiTrash2, FiDollarSign, FiPrinter } from "react-icons/fi";
import Popup from "./Popup"; // Assuming you have a Popup component for displaying details
import jsPDF from 'jspdf';
import Popsup from "./Popsup";

function LiabilitiesTable() {
  const [liabilitiesData, setLiabilitiesData] = useState([]);
  const [filteredLiabilitiesData, setFilteredLiabilitiesData] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterPayee, setFilterPayee] = useState("");
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterLiabilitiesData();
  }, [filterStartDate, filterEndDate, filterPayee]);

  const fetchData = () => {
    axios
      .get("/api/finance/liability")
      .then((response) => {
        setLiabilitiesData(response.data);
        setFilteredLiabilitiesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching liabilities data:", error);
      });
  };

  const filterLiabilitiesData = () => {
    let filteredData = liabilitiesData;

    if (filterStartDate.trim() !== "") {
      filteredData = filteredData.filter((liability) =>
        liability.startdate.includes(filterStartDate)
      );
    }

    if (filterEndDate.trim() !== "") {
      filteredData = filteredData.filter((liability) =>
        liability.enddate.includes(filterEndDate)
      );
    }

    if (filterPayee.trim() !== "") {
      filteredData = filteredData.filter((liability) =>
        liability.payee.toLowerCase().includes(filterPayee.toLowerCase())
      );
    }

    setFilteredLiabilitiesData(filteredData);
  };

  const handleResetFilter = () => {
    setFilterStartDate("");
    setFilterEndDate("");
    setFilterPayee("");
  };

  const handleView = async (id) => {
    try {
      setPopupData(id);
    } catch (error) {
      console.error("Error fetching liability details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/finance/liabilities/${id}`);
      const updatedData = liabilitiesData.filter((liability) => liability._id !== id);
      setLiabilitiesData(updatedData);
      setFilteredLiabilitiesData(updatedData);
      fetchData();
    } catch (error) {
      console.error("Error deleting liability:", error);
    }
  };

  const handleMakePayment = async (id) => {
    try {
      await axios.post(`/api/finance/liabilities/${id}/pay`, { date: new Date() });
      // Payment successful, maybe update UI or show a message
      fetchData();
    } catch (error) {
      console.error("Error making payment for liability:", error);
    }
  };

  return (
    <div>
 

      <div className="filter">
        <span><FiFilter /></span>
        <span>Filter By</span>
        <input
          type="text"
          value={filterStartDate}
          placeholder="Start Date"
          onChange={(e) => setFilterStartDate(e.target.value)}
        />
        <input
          type="text"
          value={filterEndDate}
          placeholder="End Date"
          onChange={(e) => setFilterEndDate(e.target.value)}
        />
        <input
          type="text"
          value={filterPayee}
          placeholder="Payee"
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
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Payee</th>
            <th>Department</th>
            <th>Description</th>
            <th>Installments</th>
            <th>Remaining Installments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLiabilitiesData.map((liability) => (
            <tr key={liability._id}>
              <td>{liability.startdate}</td>
              <td>{liability.enddate}</td>
              <td>{liability.amount}</td>
              <td>{liability.payee}</td>
              <td>{liability.department}</td>
              <td>{liability.description}</td>
              <td>{liability.installments}</td>
              <td>{liability.installments - liability.finished}</td>
              <td>
                <button onClick={() => handleView(liability)}>
                  <FiEye />
                </button>
                <button onClick={() => handleDelete(liability._id)}>
                  <FiTrash2 />
                </button>
                <button onClick={() => handleMakePayment(liability._id)}>
                  <FiDollarSign />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupData && (
        <Popsup
          data={popupData}
          onClose={() => setPopupData(null)}
        />
      )}
    </div>
  );
}

export default LiabilitiesTable;
