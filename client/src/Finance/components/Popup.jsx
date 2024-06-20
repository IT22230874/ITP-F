import React from "react";
import { FiX, FiPrinter } from "react-icons/fi";

function Popup({ data, onClose, onGenerateInvoice }) {
  const handleGenerateInvoice = () => {
    onGenerateInvoice(data); // Call the onGenerateInvoice callback with data
  };

  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const closeButtonIconStyle = {
    fontSize: "20px",
  };

  return (
    <div style={popupStyle}>
      <span style={closeButtonStyle} onClick={onClose}><FiX style={closeButtonIconStyle} /></span>
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
      <button style={buttonStyle} onClick={handleGenerateInvoice}><FiPrinter style={{ marginRight: "5px" }} /> Generate Invoice</button>
    </div>
  );
}

export default Popup;
