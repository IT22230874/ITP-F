import React from "react";

function Popsup({ data, onClose }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>Liability Details</h2>
        <p><strong>Start Date:</strong> {data.startdate}</p>
        <p><strong>End Date:</strong> {data.enddate}</p>
        <p><strong>Amount:</strong> {data.amount}</p>
        <p><strong>Payee:</strong> {data.payee}</p>
        <p><strong>Department:</strong> {data.department}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Installments:</strong> {data.installments}</p>
        <p><strong>Remaining Installments:</strong> {data.installments - data.finished}</p>
      </div>
    </div>
  );
}

export default Popsup;
