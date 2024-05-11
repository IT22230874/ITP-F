import React from "react";

function AnalysisCard({ heading, number }) {
  return (
    <div className="item">
      <div className="left">
        <p className="headin">{heading}</p>
        <p className="val">{number}</p>
      </div>
    </div>
  );
}

export default AnalysisCard;
