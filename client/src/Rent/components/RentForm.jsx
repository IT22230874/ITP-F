import React from "react";
import axios from "axios";

function RentForm({ requestData, onSubmit, onCancel }) {
  const handleRentSubmit = () => {
    // Prepare data to be sent in the request
    const rentData = {
      machineid: requestData.machineid,
      reqid: requestData._id, // Assuming reqid is available in requestData
      startdate: requestData.startdate,
      enddate: requestData.enddate,
      status: "rented", // Assuming status is hardcoded to "rented"
      amount: requestData.amount, // Assuming amount is available in requestData
    };

    console.log(rentData);

    // Send POST request to the backend
    axios
      .post("/api/rent/addrent", rentData)
      .then((response) => {
        console.log("Rent request submitted successfully:", response.data);

        onCancel(); // Close the form
        // You can add logic here to handle success, such as showing a success message
        onSubmit(); // Close the form after successful submission
      })
      .catch((error) => {
        console.error("Error submitting rent request:", error);
        // You can add logic here to handle errors, such as showing an error message
      });
  };

  return (
    <div className="popupcontainer">
      <div className="popup">
        <h2>Rent Form</h2>
        <label>Rent ID:</label>
        <input type="text" value={requestData.reqid} disabled />
        <label>Start Date:</label>
        <input type="text" value={requestData.startdate} disabled />
        <label>End Date:</label>
        <input type="text" value={requestData.enddate} disabled />

        <label>Total:</label>
        <input type="text" value={requestData.amount} disabled />
        <label>Machine ID:</label>
        <input type="text" value={requestData.machineid} disabled />
        <div className="buttonscontainer">
          <button onClick={handleRentSubmit} className="add">
            Add Rent
          </button>
          <button onClick={onCancel} className="close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RentForm;
