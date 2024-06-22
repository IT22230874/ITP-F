import React, { useState } from "react";
import axios from "axios";
import BidForm from "./BidForm";

function TenderCard({
  heading,
  tenderid,
  publishdate,
  closedate,
  location,
  description,
}) {
  const [showBidForm, setShowBidForm] = useState(false);

  const handleBidClick = () => {
    setShowBidForm(true);
  };

  const handleCloseBidForm = () => {
    setShowBidForm(false);
  };

  return (
    <div className="flex flex-col px-4 py-3 text-xl rounded-xl bg-white  shadow-md  mb-4">
      <div className="text-3xl font-bold text-black max-md:max-w-full">
        {heading}
      </div>
      <div className="mt-4 text-neutral-800 max-md:max-w-full">
        {description}
      </div>
      <div className="flex gap-1.5 justify-between px-0.5 mt-4 text-lg font-semibold max-md:flex-wrap max-md:max-w-full">
        <div className="text-green-500">
          <span className="text-green-500 ">Published on:</span> {publishdate}
        </div>
        <div className="text-red-600">
          <span className="text-red-600 ">Closing on:</span> {closedate}
        </div>
        <div className="text-neutral-800">
          <span>Location:</span> {location}
        </div>
      </div>
      <div className="flex gap-3 mt-4 font-semibold text-white max-md:flex-wrap">
        {/*<button className="justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg max-md:px-5 max-md:max-w-full"
        onClick={handleBidClick}>
          Download
        </button>*/}
        <button
          className="justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg max-md:px-5"
          onClick={handleBidClick}
        >
          Submit Bid
        </button>
      </div>
      {showBidForm && (
        <BidForm
          tenderId={tenderid}
          title={heading}
          onClose={handleCloseBidForm}
        />
      )}
    </div>
  );
}

export default TenderCard;
