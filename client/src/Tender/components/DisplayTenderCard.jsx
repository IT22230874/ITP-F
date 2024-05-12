import React from "react";

function DisplayTenderCard() {
  return (
    <div className="flex flex-col flex-wrap content-end p-5 text-2xl font-semibold bg-red-600 rounded-xl max-w-[989px]">
      <div className="text-black max-md:max-w-full">
        Repair of buildings /balance Works, Construction of Rentaining Wall/
        Safety Fence, <br />
        Construction of po ultry Cages ..etc
        <br />
        <br />
      </div>
      <div className="flex gap-5 justify-between mt-4 max-md:flex-wrap max-md:max-w-full">
        <div className="text-lime-600">ID:T0456Y</div>
        <div className="text-pink-400">Published on:2024-03-28</div>
        <div className="text-orange-600">Closing in:2024-04-24</div>
      </div>
      <div className="justify-center self-start px-7 py-2 text-base text-white bg-cyan-600 rounded-lg max-md:px-5">
        Submit Bid
      </div>
    </div>
  );
}

export default DisplayTenderCard;