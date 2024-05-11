import React from "react";

function Popup({ requestData, onClose }) {
  return (
    <div className="popupcontainer">
      <div className="popup">
        <h2>Request Details</h2>
        <p>Machine Name: {requestData.machinename}</p>
        <p>Client Name: {requestData.clientname}</p>
        <p>Start Date: {requestData.startdate}</p>
        <p>End Date: {requestData.enddate}</p>
        <p>Status: {requestData.status}</p>
        <button onClick={onClose} className="close">
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
