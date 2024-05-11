import React from "react";
import { FiX, FiPrinter } from "react-icons/fi";

function Popup({ data, onClose, onGenerateInvoice }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}><FiX /></span>
        <h2>Project Finance Details</h2>
        <p>Start Date: {data.startdate}</p>
        <p>End Date: {data.enddate}</p>
        <p>Amount: {data.amount}</p>
        <p>Project ID: {data.projectid}</p>
        <p>Project Name: {data.projectname}</p>
        <p>Payee: {data.payee}</p>
        <p>Department: {data.department}</p>
        <p>Description: {data.description}</p>
        <p>Installments: {data.installments}</p>
        <button onClick={onGenerateInvoice}><FiPrinter /> Generate Invoice</button>
      </div>
    </div>
  );
}

export default Popup;
