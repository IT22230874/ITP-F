import React, { useState, useEffect } from "react";
import axios from "axios";

function RentItem({ tender, onClose }) {
  const [newStatus, setNewStatus] = useState("");
  const [extend, setExtend] = useState(false);

  const handleUpdateStatus = () => {
    // Send request to update status to the backend
    axios
      .patch(`/api/tender/edittender/${tender._id}`, { status: newStatus })
      .then((response) => {
        console.log("Status updated successfully:", response.data);
        // Optionally update UI or perform any other action upon successful status update
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
    <div className="formcontainer">
      <div className="view popup">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Title</label>
            <input type="text" name="title" readOnly value={tender.title} className="input" />
          </div>
          <div>
            <label className="block">Tender ID</label>
            <input type="text" name="id" readOnly value={tender.tid} className="input" />
          </div>
          <div>
            <label className="block">Published Date</label>
            <input type="text" name="publishdate" readOnly value={tender.publishdate} className="input" />
          </div>
          <div>
            <label className="block">Closing Date</label>
            <input type="text" name="startdate" readOnly value={tender.closedate} className="input" />
          </div>
          <div>
            <label className="block">Location</label>
            <input type="text" name="location" readOnly value={tender.location} className="input" />
          </div>
          <div>
            <label className="block">Status</label>
            <input type="text" name="status" readOnly value={tender.status} className="input" />
          </div>
          <div className="col-span-2">
            <label className="block">Description</label>
            <input type="text" name="description" readOnly value={tender.description} className="input" />
          </div>
        </div>

        {/* Form to update status */}
        <button type="button" className="add" onClick={handleExtendForm}>Update Status</button>
        {extend && (
          <div className="popup">
            <label>Status:</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="input"
            >
              <option value="bidded">Bidded</option>
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
              <option value="expired">Expired</option>
            </select>
            <button className="add" onClick={handleUpdateStatus}>Update</button>
            <button className="close" type="button" onClick={handleExtendForm}>Close</button>
          </div>
        )}

        <button className="close" onClick={onClose}>Close</button>
      </div>
    </div>
  );

}

export default RentItem;
