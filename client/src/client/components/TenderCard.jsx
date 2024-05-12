import * as React from "react";

function TenderCard({
  heading,
  tenderid,
  publishdate,
  closedate,
  location,
  description,
}) {
  return (
    <div className="flex flex-col px-4 py-3 text-xl rounded-xl bg-white  shadow-md  mb-4">
      <div className="text-3xl font-bold text-black max-md:max-w-full">
        {heading}
      </div>
      <div className="mt-4 text-neutral-800 max-md:max-w-full">
        {description}
      </div>
      <div className="flex gap-1.5 justify-between px-0.5 mt-4 text-lg font-semibold max-md:flex-wrap max-md:max-w-full">
        <div className="text-pink-400">
          <span className="text-pink-400 ">Published on:</span> {publishdate}
        </div>
        <div className="text-orange-600">
          <span className="text-orange-600 ">Closing on:</span> {closedate}
        </div>
        <div className="text-neutral-800">
          <span>Location:</span> {location}
        </div>
      </div>
      <div className="flex gap-3 mt-4 font-semibold text-white max-md:flex-wrap">
        <button className="justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg max-md:px-5 max-md:max-w-full">
          Download
        </button>
        <button className="justify-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg max-md:px-5">
          Submit Bid
        </button>
      </div>
    </div>
  );
}

export default TenderCard;
