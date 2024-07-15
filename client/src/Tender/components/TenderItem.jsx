import React, { useState } from "react";
import axios from "axios";

function RentItem({ tender, onClose }) {
  const [newStatus, setNewStatus] = useState("");
  const [extend, setExtend] = useState(false);

  const handleUpdateStatus = () => {
    axios
      .patch(`/api/tender/edittender/${tender._id}`, { status: newStatus })
      .then((response) => {
        console.log("Status updated successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleExtendForm = () => {
    setExtend(!extend);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Tender Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" readOnly value={tender.title} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tender ID</label>
            <input type="text" name="id" readOnly value={tender.tid} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Published Date</label>
            <input type="text" name="publishdate" readOnly value={tender.publishdate} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Closing Date</label>
            <input type="text" name="startdate" readOnly value={tender.closedate} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" readOnly value={tender.location} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <input type="text" name="status" readOnly value={tender.status} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" readOnly value={tender.description} rows={4} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
        </div>

        <button type="button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-sm" onClick={handleExtendForm}>Update Status</button>
        
        {extend && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Status:</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="bidded">Bidded</option>
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
              <option value="expired">Expired</option>
            </select>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-sm" onClick={handleUpdateStatus}>Update</button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-400 text-sm" type="button" onClick={handleExtendForm}>Close</button>
            </div>
          </div>
        )}

        <button className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-400 text-sm" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default RentItem;
