import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const TendersTable = () => {
  const [tenders, setTenders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch tenders data from API
    const fetchTenders = async () => {
      try {
        const response = await axios.get("/api/tender/displayrecievedtender/");
        setTenders(response.data);
        setFilteredData(response.data); // Initialize filtered data with all tenders
      } catch (error) {
        console.error("Error fetching tenders:", error);
      }
    };

    fetchTenders();
  }, []);

  // Function to handle view button click
  const handleView = (tender) => {
    // Implement your logic for viewing the tender
    console.log("Viewing tender:", tender);
  };

  // Function to handle update button click
  const handleUpdate = (tender) => {
    // Implement your logic for updating the tender
    console.log("Updating tender:", tender);
  };

  // Function to handle delete button click
  const handleDelete = async (tenderId) => {
    try {
      // Delete the tender
      await axios.delete(`/api/tender/${tenderId}`);
      // Remove the tender from the local state
      setTenders(prevTenders => prevTenders.filter(tender => tender._id !== tenderId));
      setFilteredData(prevTenders => prevTenders.filter(tender => tender._id !== tenderId));
      console.log("Tender deleted successfully");
    } catch (error) {
      console.error("Error deleting tender:", error);
    }
  };

  // Function to handle filtering
  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = tenders.filter(tender =>
      tender.name.toLowerCase().includes(keyword) ||
      tender.clientname.toLowerCase().includes(keyword) ||
      tender.status.toLowerCase().includes(keyword)
    );
    setFilteredData(filtered);
  };

  return (
    <div  style={{marginTop: "-35px"}}>
      <h2>Tenders</h2>
      <input type="text" placeholder="Search..." onChange={handleFilter} />

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
          {filteredData.map((tender) => (
            <tr key={tender._id}>
              <td>000{tender.pid}</td>
              <td>{tender.name}</td>
              <td>{tender.clientname}</td>
              <td>{tender.startdate}</td>
              <td>{tender.status}</td>
              <td>
                <button onClick={() => handleView(tender)} className="viewbtn">
                  <FaEye />
                </button>
                <button onClick={() => handleUpdate(tender)} className="editbtn">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(tender._id)} className="deletebtn">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TendersTable;
