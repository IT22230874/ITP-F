import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import { FaEye } from "react-icons/fa"; 

function RecievedTable() {
  const [requestData, setRequestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterClient, setFilterClient] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterName, setFilterName] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/tender/displayrecievedtender/");
      const requests = response.data;
      setRequestData(requests);
      setFilteredData(requests);
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };

  useEffect(() => {
    filterData();
  }, [requestData, filterClient, filterStatus, filterName]);

  const filterData = () => {
    let filtered = [...requestData];

    if (filterClient.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.clientname.toLowerCase().includes(filterClient.toLowerCase())
      );
    }

    if (filterStatus.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.status.toLowerCase().includes(filterStatus.toLowerCase())
      );
    }

    if (filterName.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setFilterClient("");
    setFilterStatus("");
    setFilterName("");
  };

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    fetchData();
  };

  return (
    <div className="mt-8"> {/* Adjust this margin to fit your layout */}
      <div className="border border-gray-300 rounded-lg bg-white p-4 mb-4 flex items-center gap-4">
        <span className="flex items-center text-gray-500 font-medium">
          <FiFilter />
          <span className="ml-2">Filter By</span>
        </span>
        <input
          type="text"
          value={filterClient}
          placeholder="Filter by Client Name"
          onChange={(e) => setFilterClient(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={filterStatus}
          placeholder="Filter by Status"
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={filterName}
          placeholder="Filter by Tender Name"
          onChange={(e) => setFilterName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={resetFilter}
          className="ml-4 bg-red-500 text-white flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
        >
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tender Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Received On
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((request) => (
            <tr key={request._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-900">
                000{request.pid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {request.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {request.clientname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {request.startdate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {request.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => handleView(request)}
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <Popup requestData={selectedRequest} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default RecievedTable;
