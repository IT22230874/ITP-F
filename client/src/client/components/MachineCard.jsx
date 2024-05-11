import React, { useState, useEffect } from "react";
import axios from "axios";

function MachineCard({ imagename, heading, priceperday, machineid }) {
  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const daysDiff =
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
      const cost = priceperday * daysDiff;
      setTotalCost(cost);
    }
  }, [startDate, endDate, priceperday]);

  const handleRequest = () => {
    setShowPopup(!showPopup);
  };

  const handleConfirm = async () => {
    try {
      const profileDataString = localStorage.getItem("profile");
      if (!profileDataString) {
        console.error("Profile data not found in localStorage");
        return;
      }

      console.log(profileDataString);

      const profileData = profileDataString;

      console.log(profileData);
      if (!profileData) {
        console.error("Invalid profile data");
        return;
      }

      const clientid = profileData;
      console.log(clientid, machineid, startDate, endDate, totalCost);
      const requestData = {
        clientid,
        machineid,
        startdate: startDate,
        enddate: endDate,
        amount: totalCost,
      };

      const response = await axios.post("/api/rent/addrequest/", requestData);
      console.log("Request added successfully:", response.data);
    } catch (error) {
      console.error("Error adding request:", error);
    }
  };

  return (
    <div className="card">
      <img src={imagename} alt={heading} />
      <p>{heading}</p>
      <button type="button" onClick={handleRequest}>
        Request
      </button>
      {showPopup && (
        <div className="popup">
          <button type="button" className="close" onClick={handleRequest}>
            {" "}
            x
          </button>
          <h2>Machine Details</h2>
          <p>Price per day: {priceperday}</p>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button type="button" onClick={handleConfirm}>
            Confirm
          </button>
          <p>Total Cost: {totalCost}</p>
        </div>
      )}
    </div>
  );
}

export default MachineCard;
