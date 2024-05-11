import React from "react";

function Popup({ requestData, onClose }) {
  return (
    <div className="popupcontainer">
      <div className="popup">
        <h2>Tender Details</h2>
        <p>Project ID: {requestData.pid}</p>
        <p>Title: {requestData.name}</p>
        <p>Client name: {requestData.clientname}</p>
        <p>Location: {requestData.location}</p>
        <p>Budget: {requestData.budget}</p>
        <p>Startdate: {requestData.startdate}</p>
        <p>End date: {requestData.enddate}</p>
        <p>Status: {requestData.status}</p>
        <p>Description: {requestData.description}</p>
        <button onClick={onClose} className="close">
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
