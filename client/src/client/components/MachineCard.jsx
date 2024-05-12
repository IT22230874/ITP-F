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

      const profileData = profileDataString;

      if (!profileData) {
        console.error("Invalid profile data");
        return;
      }

      const clientid = profileData;
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
    <>
      <div className="max-w-sm w-72 bg-white border border-gray-200 rounded-lg shadow ">
        <img
          className="rounded-t-lg w-full h-60 object-cover"
          src="https://picsum.photos/id/63/200/300
          "
          alt={heading}
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {heading}
          </h5>
          <p className="mb-3 font-normal text-gray-700">
            Price per day: {priceperday}
          </p>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleRequest}
          >
            Request
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="max-w-md w-full md:w-auto bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Machine Details
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={handleRequest}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <label className="block mb-2">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <label className="block mb-2">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm
              </button>
              <p className="mt-4">Total Cost: {totalCost}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MachineCard;
