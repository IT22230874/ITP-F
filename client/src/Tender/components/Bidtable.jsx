import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import BidItem from "./BidItem";

function Bidtable() {
  const [rentData, setRentData] = useState([]);
  const [filteredRentData, setFilteredRentData] = useState([]);
  const [selectedRentId, setSelectedRentId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClientName, setFilterClientName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRentData();
  }, [filterStatus, filterClientName]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/tender/displaybid");
      const bids = response.data;
      // Fetch tender details for each bid
      const bidsWithData = await Promise.all(
        bids.map(async (bid) => {
          try {
            const tenderResponse = await axios.get(
              `/api/tender/getTender/${bid.tender}`
            );
            const tender = tenderResponse.data.data;
            console.log(tender.title);
            return { ...bid, tenderTitle: tender.title };
          } catch (error) {
            console.error(`Error fetching tender ${bid.tender}:`, error);
            return { ...bid, tenderTitle: "Unknown" }; // Handle error scenario
          }
        })
      );
      setRentData(bidsWithData);
      setFilteredRentData(bidsWithData);
    } catch (error) {
      console.error("Error fetching bid data:", error);
    }
  };

  const filterRentData = () => {
    let filteredData = [...rentData];

    if (filterStatus !== "all") {
      filteredData = filteredData.filter(
        (rent) => rent.status === filterStatus
      );
    }

    if (filterClientName.trim() !== "") {
      filteredData = filteredData.filter((rent) =>
        rent.clientname.toLowerCase().includes(filterClientName.toLowerCase())
      );
    }

    setFilteredRentData(filteredData);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tender/deletebid/${id}`);
      const updatedRentData = rentData.filter((rent) => rent._id !== id);
      setRentData(updatedRentData);
      setFilteredRentData(updatedRentData);
      fetchData();
    } catch (error) {
      console.error("Error deleting rent:", error);
    }
  };

  const handleView = (tenderid) => {
    setSelectedRentId(tenderid);
    fetchData();
  };

  const handleResetFilter = () => {
    setFilterStatus("all");
    setFilterClientName("");
    fetchData();
  };

  return (
    <div>
      <h2>Bid Table</h2>

      <div className="rentFil filter">
        <span>
          <FiFilter />
        </span>
        <span>Filter By</span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="not completed">Not Complete</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          value={filterClientName}
          placeholder="Filter by client name"
          onChange={(e) => setFilterClientName(e.target.value)}
        />
        <button type="button" onClick={handleResetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Bid ID</th>
            <th>Tender</th>
            <th>Organization Name</th>
            <th>Contact</th>
            <th> Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRentData.map((tender) => (
            <tr key={tender._id}>
              <td>{tender.bidid}</td>
              <td>{tender.tenderTitle}</td>
              <td>{tender.organizationname}</td>
              <td>{tender.tel}</td>
              <td>{tender.email}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(tender._id)}
                >
                  <FaTrashAlt />
                </button>
                <button className="viewbtn" onClick={() => handleView(tender)}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRentId && (
        <BidItem
          tender={selectedRentId}
          onClose={() => setSelectedRentId(null)}
        />
      )}
    </div>
  );
}

export default Bidtable;
