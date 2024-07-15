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
    <div className="mt-10">
      <div className="filter flex items-center space-x-4 mb-4">
        <span><FiFilter className="h-6" /></span>
        <span className="text-lg font-semibold">Filter By</span>
        <input
          type="text"
          value={filterStartDate}
          placeholder="Start Date"
          onChange={(e) => setFilterStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={filterEndDate}
          placeholder="End Date"
          onChange={(e) => setFilterEndDate(e.target.value)}
          className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={filterPayee}
          placeholder="Payee"
          onChange={(e) => setFilterPayee(e.target.value)}
          className="p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleResetFilter}
          className="flex items-center px-4 py-2 text-sm text-white bg-red-400 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
        >
          <FiRefreshCcw className="mr-2" />
          Reset Filter
        </button>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-6 py-3 text-left">Start Date</th>
                <th className="px-6 py-3 text-left">End Date</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Payee</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Installments</th>
                <th className="px-4 py-3 text-left">Remaining Installments</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLiabilitiesData.map((liability) => (
                <tr key={liability._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{liability.startdate}</td>
                  <td className="px-6 py-4">{liability.enddate}</td>
                  <td className="px-4 py-4">{liability.amount}</td>
                  <td className="px-4 py-4">{liability.payee}</td>
                  <td className="px-4 py-4">{liability.department}</td>
                  <td className="px-4 py-4">{liability.description}</td>
                  <td className="px-4 py-4">{liability.installments}</td>
                  <td className="px-4 py-4">{liability.installments - liability.finished}</td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(liability)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleDelete(liability._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        onClick={() => handleMakePayment(liability._id)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FiDollarSign />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
