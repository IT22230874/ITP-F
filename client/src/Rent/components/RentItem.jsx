import React, { useState, useEffect } from "react";
import axios from "axios";

function RentItem({ rent, onClose }) {
  const [rentData, setRentData] = useState(null);
  const [newEndDate, setNewEndDate] = useState("");
  const [extend, setExtend] = useState(false);

  useEffect(() => {
    // Fetch rent data by rent ID when the component mounts
    axios
      .get(`/api/rent/displaymachines`)
      .then((response) => {
        setRentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rent data:", error);
      });
  }, []);

  const handleExtendEndDate = () => {
    // Send request to extend end date to the backend
    axios
      .patch(`/api/rent/extendenddate/${rent._id}`, { enddate: newEndDate })
      .then((response) => {
        console.log("End date extended successfully:", response.data);
        // Optionally update UI or perform any other action upon successful end date extension
      })
      .catch((error) => {
        console.error("Error extending end date:", error);
      });
  };

  if (!rentData) {
    return <div>Loading...</div>; // Render loading state while rent data is being fetched
  }

  const hanldeExtendForm = () => {
    setExtend(!extend)
  }
  return (
 
      <div className="formcontainer">
        <div className="view popup">
        <h2>Rent Item</h2>
        <p>Rent ID: {rent.rentid}</p>
        <p>Client Name: {rent.clientname}</p>
        <p>Start Date: {rent.startdate}</p>
        <p>End Date: {rent.enddate}</p>
        <p>Number of Installments: {rent.installments}</p>
        <p>Number of payed Installments: {rent.finished}</p>
        <p>Amout per Installment: {rent.perinstallment}</p>
        <p>Machine Name: {rentData.name}</p>
        {/* Input field to update end date */}

        <button type="button" className="add" onClick={hanldeExtendForm}>Extend Rent</button>
        {extend && (
          <div className="popup">
            <label>New End Date:</label>
            <input
              type="date"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
            />
            <button className="add" onClick={handleExtendEndDate}>Extend End Date</button>
            <button className="close" type="button" onClick={hanldeExtendForm}>close</button>
          </div>
        )}
        <button className="close" onClick={onClose}>Close</button>
      </div>
      </div>
   
  );
}

export default RentItem;
