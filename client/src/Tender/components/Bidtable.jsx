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
  const [filterTenderTitle, setFilterTenderTitle] = useState("");
  const [lowestBid, setLowestBid] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRentData();
  }, [filterStatus, filterTenderTitle]);

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

    if (filterTenderTitle.trim() !== "") {
      filteredData = filteredData.filter((rent) =>
        rent.tenderTitle.toLowerCase().includes(filterTenderTitle.toLowerCase())
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
      console.error("Error deleting bid:", error);
    }
  };

  const handleView = (tenderid) => {
    setSelectedRentId(tenderid);
    fetchData();
  };

  const handleResetFilter = () => {
    setFilterStatus("all");
    setFilterTenderTitle("");
    fetchData();
  };

  const handleCalculate = () => {
    if (filteredRentData.length === 0) {
      setLowestBid(null);
      return;
    }
    const lowestBidItem = filteredRentData.reduce((prev, current) =>
      prev.bidamount < current.bidamount ? prev : current
    );
    setLowestBid(lowestBidItem);
  };

  const handleCloseLowestBid = () => {
    setLowestBid(null);
  };

  return (
    <div className="mt-8">
      <div className="border border-gray-300 rounded-lg bg-white p-4 mb-4 flex items-center gap-4">
        <span className="flex items-center text-gray-500 font-medium">
          <FiFilter />
          <span className="ml-2">Filter By</span>
        </span>
        <input
          type="text"
          value={filterTenderTitle}
          placeholder="Tender title"
          onChange={(e) => setFilterTenderTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <button
          type="button"
          onClick={handleCalculate}
          className="bg-green-500 text-white flex items-center gap-2 py-2 px-4 rounded hover:bg-green-600 focus:outline-none"
        >
          Calculate
        </button>

        <button
          type="button"
          onClick={handleResetFilter}
          className="ml-80 bg-red-500 text-white flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
        >
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bid ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bid Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Organization Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredRentData.map((tender) => (
            <tr key={tender._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-900">
                000{tender.bidid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {tender.tenderTitle}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {tender.bidamount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {tender.organizationname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {tender.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(tender._id)}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="text-blue-600 hover:text-blue-900 ml-2"
                  onClick={() => handleView(tender)}
                >
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

      {lowestBid && (
        <div className="mt-4 p-4 bg-blue-100 rounded relative">
          <h3 className="text-xl font-bold">
            Lowest Bid Amount: {lowestBid.bidamount}
          </h3>
          <p>Tender: {lowestBid.tenderTitle}</p>
          <p>Organization: {lowestBid.organizationname}</p>
          <button
            onClick={handleCloseLowestBid}
            className="absolute top-2 right-6 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default Bidtable;
