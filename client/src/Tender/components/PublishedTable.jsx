import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import TenderItem from "./TenderItem";
import "../styles/tenderStyle.css";

function PublishedTable() {
  const [rentData, setRentData] = useState([]);
  const [filteredRentData, setFilteredRentData] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
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
  };

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
        console.log("Tender deleted successfully:", response.data);
        const updatedRentData = rentData.filter((rent) => rent._id !== id);
        setRentData(updatedRentData);
        setFilteredRentData(updatedRentData);
      })
      .catch((error) => {
        console.error("Error deleting tender:", error);
      });
  };

  const handleView = (tender) => {
    setSelectedTender(tender);
  };

  const handleResetFilter = () => {
    setFilterStatus("all");
    setFilterClientName("");
  };

  return (
    <div className="mt-8">
      <div className="border border-gray-300 rounded-lg bg-white p-4 mb-4 flex items-center gap-4">
        <span className="flex items-center text-gray-500 font-medium">
          <FiFilter />
          <span className="ml-2">Filter By</span>
        </span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded"
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
          className="p-2 border border-gray-300 rounded"
        />
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
              Tender ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Published Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Closing Date
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
          {filteredRentData.map((tender) => (
            <tr key={tender._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-900">
                000{tender.tid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {tender.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {tender.publishdate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {tender.closedate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                {tender.status}
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
                  onClick={() => handleView(tender)} // Pass entire tender object to handleView
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTender && (
        <TenderItem
          tender={selectedTender} // Pass the selected tender object to TenderItem
          onClose={() => setSelectedTender(null)}
        />
      )}
    </div>
  );
}

export default PublishedTable;
