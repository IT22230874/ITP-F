import React from "react";
import { IoIosMan } from "react-icons/io";

function AnalysisCard({ heading, number }) {
  return (
    <div  style={{borderRadius:"10px",marginTop:"20px" ,height:"100px",width:'250px'}}>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{paddingBottom:"10px",paddingTop:"10px"}}>
        <h5 class="mb-2 text-xl font-normaltracking-tight text-gray-500 dark:text-white">{heading}</h5>
        <div className="flex justify-between items-center">
          <p className="font-normal text-xl text-gray-700 dark:text-gray-400">{number}</p>
          <IoIosMan className="text-gray-500 dark:text-white" style={{ fontSize: "2rem" }} />
        </div>
      </div>
    </div>
  );
}

export default AnalysisCard;
