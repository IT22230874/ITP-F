import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import { FaEye, FaMoneyBillAlt, FaTrashAlt } from "react-icons/fa";
import TenderItem from "./TenderItem";

function PublishedTable() {
  const [rentData, setRentData] = useState([]);
  const [filteredRentData, setFilteredRentData] = useState([]);
  const [selectedRentId, setSelectedRentId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClientName, setFilterClientName] = useState("");

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    filterRentData();
  }, [filterStatus, filterClientName]);

  const fetchdata = () => {
    axios
    .get("/api/tender/publishtenderdisplay")
    .then((response) => {
      setRentData(response.data);
      setFilteredRentData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching rent data:", error);
    });
  }

  const filterRentData = () => {
    let filteredData = rentData;

    if (filterStatus !== "all") {
      filteredData = filteredData.filter(
        (rent) => rent.status === filterStatus
      );
    }

    if (filterClientName.trim() !== "") {
      filteredData = filteredData.filter((rent) =>
        rent.title.toLowerCase().includes(filterClientName.toLowerCase())
      );
    }

    setFilteredRentData(filteredData);
  };


  const handleDelete = (id) => {
    axios
      .delete(`/api/tender/delete/${id}`)
      .then((response) => {
        console.log("Rent deleted successfully:", response.data);
           // Remove the rent from the UI or refetch rent data
      const updatedRentData = rentData.filter(rent => rent._id !== id);
      setRentData(updatedRentData);
      setFilteredRentData(updatedRentData);
      fetchdata();
      })
      .catch((error) => {
        console.error("Error deleting rent:", error);
      });
  };

  const handleView = (tenderid) => {
    setSelectedRentId(tenderid);
    filterRentData();
  };

  const handleResetFilter = () => {
    setFilterStatus("all");
    setFilterClientName("");
  };

  return (
    <div>
      <h2>Published Table</h2>

      <div className="rentFil filter">
        <span><FiFilter /></span>
        <span>Filter By</span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="bidded">Bidded</option>
          <option value="ongoing">Ongoing</option>
          <option value="finished">Finished</option>
          <option value="expired">Expired</option>
        </select>
        <input
          type="text"
          value={filterClientName}
          placeholder="Filter by title"
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
            <th>Tender ID</th>
            <th>Title</th>
            <th>Published Date</th>
            <th>CLosing Date</th>
            <th> Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRentData.map((tender) => (
            <tr key={tender._id}>
              <td>000{tender.tid}</td>
              <td>{tender.title}</td>
              <td>{tender.publishdate}</td>
              <td>{tender.closedate}</td>
              <td>{tender.status}</td>
              <td>
          
         
                  <button className="delete" onClick={() => handleDelete(tender._id)}>
                    <FaTrashAlt />
                  </button>
         
                <button className="viewbtn" onClick={() => handleView(tender)}><FaEye /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRentId && (
        <TenderItem
          tender={selectedRentId}
          onClose={() => setSelectedRentId(null)}
        />
      )}
    </div>
  );
}

export default PublishedTable;
