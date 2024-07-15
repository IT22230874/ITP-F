import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw, FiEye, FiTrash2, FiDollarSign, FiPrinter } from "react-icons/fi";
import Popup from "./Popup"; // Assuming you have a Popup component for displaying details
import jsPDF from 'jspdf';
import Popsup from "./Popsup";

function PaymentsTable() {
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
    <div className="mt-10">
 

    <div className="filter">
      <span><FiFilter className="h-6" /></span>
      <span>Filter By</span>
      <input
      className="rounded-r"
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
      <button type="button" onClick={handleResetFilter} className="h-11 w-50 flex rounded-r !bg-red-400 ">
        <FiRefreshCcw  className="mr-5 mb-5"/>
        Reset Filter
      </button>
    </div>

    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-12 py-2">Start Date</th>
          <th className="px-12 py-2">End Date</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Payee</th>
          <th className="px-4 py-2">Department</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Installments</th>
          <th className="px-4 py-2">Remaining Installments</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredLiabilitiesData.map((liability) => (
          <tr key={liability._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td  className="px-4 py-2">{liability.startdate}</td>
            <td  className="px-4 py-2">{liability.enddate}</td>
            <td  className="px-4 py-2">{liability.amount}</td>
            <td  className="px-4 py-2">{liability.payee}</td>
            <td  className="px-4 py-2">{liability.department}</td>
            <td  className="px-4 py-2">{liability.description}</td>
            <td  className="px-4 py-2">{liability.installments}</td>
            <td  className="px-4 py-2">{liability.installments - liability.finished}</td>
            <td  className="px-4 py-2">
              <div className="flex space-x-2">
              <button onClick={() => handleView(liability)} className="!text-blue-500 hover:text-blue-700">
                <FiEye />
              </button>
              <button onClick={() => handleDelete(liability._id)} className="!text-red-500 hover:text-red-700">
                <FiTrash2 />
              </button>
              <button onClick={() => handleMakePayment(liability._id)} className="!text-green-500 hover:text-green-700">
                <FiDollarSign />
              </button>
              </div>
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

export default  PaymentsTable;
