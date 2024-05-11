import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import RentForm from "./RentForm";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import { FaEye, FaTrashAlt } from "react-icons/fa"; // View and delete icons
import { BsFillPersonFill } from "react-icons/bs"; // Rent icon

import "../styles/rentStyle.css";

function RequestTable() {
  const [requestData, setRequestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterClient, setFilterClient] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRentForm, setShowRentForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/rent/displayrequest/");
      const requests = response.data; // Corrected
      setRequestData(requests);
      setFilteredData(requests);
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };

  useEffect(() => {
    filterData();
  }, [requestData, filterClient, filterStatus]);

  const filterData = () => {
    let filtered = [...requestData]; // Corrected to create a new array

    if (filterClient.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.clientname.toLowerCase().includes(filterClient.toLowerCase())
      );
    }

    if (filterStatus.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.machinename.toLowerCase().includes(filterStatus.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setFilterClient("");
    setFilterStatus("");
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`/api/rent/deleterequest/${id}`);
      fetchData();
      setRequestData((prevData) => prevData.filter((item) => item.id !== id));
      setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
      console.log("Request deleted successfully:", reqid);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRent = (request) => {
    setSelectedRequest(request);
    setShowRentForm(true);
    setShowPopup(false); // Close the popup for viewing details
  };

  const handleCloseRentForm = () => {
    setShowRentForm(false);
    fetchData();
  };

  return (
    <div>
      <div className=" rentFil filter">
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
          placeholder="Filter by Machine Name"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        />

        <button type="button" onClick={resetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Client Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((request) => (
            <tr key={request._id}>
              <td>{request.machinename}</td>
              <td>{request.clientname}</td>
              <td>{request.startdate}</td>
              <td>{request.enddate}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleView(request)} className="viewbtn">
                  <FaEye />
                </button>
                <button
                  onClick={() => handleDelete(request._id)}
                  className="delete"
                >
                  <FaTrashAlt />
                </button>
                <button onClick={() => handleRent(request)} className="rent">
                  <BsFillPersonFill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showRentForm && (
        <RentForm
          requestData={selectedRequest}
          onCancel={handleCloseRentForm}
        />
      )}
      {showPopup && (
        <Popup requestData={selectedRequest} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default RequestTable;
