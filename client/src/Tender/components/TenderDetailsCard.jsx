import * as React from "react";

function TenderDetailsCard() {
  return (
    <div className="flex flex-col px-4 py-3 text-xl rounded-xl bg-zinc-600 max-w-[825px]">
      <div className="text-3xl font-bold text-black max-md:max-w-full">
        Construction of Residential Complex
      </div>
      <div className="mt-4 text-neutral-800 max-md:max-w-full">
        The Mahinda rajapakshe invites sealed bids from eligible and qualified
        contractors for the construction of a residential complex located at
        [Project Location]. The project aims to develop a modern residential
        complex consisting of [Number of Units] residential units with
        associated infrastructure and amenities.
      </div>
      <div className="flex gap-1.5 justify-between px-0.5 mt-4 text-lg font-semibold max-md:flex-wrap max-md:max-w-full">
        <div className="text-pink-400">
          <span className="text-pink-400 ">Published on:</span> 2022/03/04
        </div>
        <div className="text-orange-600">
          <span className="text-orange-600 ">Closing on:</span> 2022/03/04
        </div>
        <div className="text-neutral-800">
          <span className="">Location:</span> Western Colombo
        </div>
      </div>
      <div className="flex gap-3 mt-4 font-extrabold text-white max-md:flex-wrap">
        <div className="justify-center px-8 py-2 bg-cyan-600 rounded-lg max-md:px-5 max-md:max-w-full">
          Download tender document
        </div>
        <div className="justify-center px-16 py-2 bg-lime-600 rounded-lg max-md:px-5">
          Submit Bid
        </div>
      </div>
    </div>
  );
}


export default TenderDetailsCard;