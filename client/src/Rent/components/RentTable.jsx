import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import { FaEye, FaMoneyBillAlt, FaTrashAlt } from "react-icons/fa";
import RentItem from "./RentItem";

function RentTable({ tableRef }) {
  const [rentData, setRentData] = useState([]);
  const [filteredRentData, setFilteredRentData] = useState([]);
  const [selectedRentId, setSelectedRentId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClientName, setFilterClientName] = useState("");

  useEffect(() => {
    axios
      .get("/api/rent/displayrent")
      .then((response) => {
        setRentData(response.data);
        setFilteredRentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rent data:", error);
      });
  }, []);

  useEffect(() => {
    filterRentData();
  }, [filterStatus, filterClientName]);

  const filterRentData = () => {
    let filteredData = rentData;

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

  const handleAddPayment = (id) => {
    axios
      .post(`/api/rent/payment/${id}`)
      .then((response) => {
        console.log("Payment added successfully:", response.data);
        // Update the payment status in the UI or refetch rent data
        const updatedRentData = rentData.map(rent => rent._id === id ? response.data : rent);
        setRentData(updatedRentData);
        setFilteredRentData(updatedRentData);
      })
      .catch((error) => {
        console.error("Error adding payment:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/rent/delete/${id}`)
      .then((response) => {
        console.log("Rent deleted successfully:", response.data);
           // Remove the rent from the UI or refetch rent data
      const updatedRentData = rentData.filter(rent => rent._id !== id);
      setRentData(updatedRentData);
      setFilteredRentData(updatedRentData);
      })
      .catch((error) => {
        console.error("Error deleting rent:", error);
      });
  };

  const handleView = (rentid) => {
    setSelectedRentId(rentid);
  };

  const handleResetFilter = () => {
    setFilterStatus("all");
    setFilterClientName("");
  };

  return (
    <div>
      <h2>Rent Table</h2>

      <div className="rentFil filter">
        <span><FiFilter /></span>
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

      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Rent ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment Status</th>
            <th>Total <br /> Installments</th>
            <th>Installments <br /> to Receive</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRentData.map((rent) => (
            <tr key={rent.rentid}>
              <td>000{rent.rentid}</td>
              <td>{rent.startdate}</td>
              <td>{rent.enddate}</td>
              <td>{rent.status}</td>
              <td>{rent.installments}</td>
              <td>
                {rent.installments - rent.finished > 0 ? 
                  rent.installments - rent.finished :
                  "Rent Over"
                }
              </td>
              <td>
                {rent.status === "not completed" && (
                  <button className="rent" onClick={() => handleAddPayment(rent._id)}>
                    <FaMoneyBillAlt />
                  </button>
                )}
                {rent.status === "completed" && (
                  <button className="delete" onClick={() => handleDelete(rent._id)}>
                    <FaTrashAlt />
                  </button>
                )}
                <button className="viewbtn" onClick={() => handleView(rent)}><FaEye /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRentId && (
        <RentItem
          rent={selectedRentId}
          onClose={() => setSelectedRentId(null)}
        />
      )}
    </div>
  );
}

export default RentTable;
