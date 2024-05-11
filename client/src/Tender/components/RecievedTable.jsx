import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import { FaEye } from "react-icons/fa"; 

import "../styles/tenderStyle.css";

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
    <div>
      <div className="rentFil filter">
        <span>
          <FiFilter />
        </span>
        <span>Filter By</span>

        <input
          type="text"
          value={filterClient}
          placeholder="Filter by Client Name"
          onChange={(e) => setFilterClient(e.target.value)}
        />

        <input
          type="text"
          value={filterStatus}
          placeholder="Filter by Status"
          onChange={(e) => setFilterStatus(e.target.value)}
        />

        <input
          type="text"
          value={filterName}
          placeholder="Filter by Tender Name"
          onChange={(e) => setFilterName(e.target.value)}
        />

        <button type="button" onClick={resetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Tender Name</th>
            <th>Client Name</th>
            <th>Received On</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((request) => (
            <tr key={request._id}>
              <td>000{request.pid}</td>
              <td>{request.name}</td>
              <td>{request.clientname}</td>
              <td>{request.startdate}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleView(request)} className="viewbtn">
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
