import React, { useState, useEffect } from "react";
import axios from "axios";
import AnalysisCard from "./AnalysisCard";

function AnalysisSection() {
  const [analysisData, setAnalysisData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/rent/analysis/")
      .then((response) => {
        setAnalysisData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching analysis data:", error);
      });
  }, []);

  return (
    <div className="analysis">
      {analysisData.map((item) => (
        <AnalysisCard
          key={item.heading}
          heading={item.heading}
          number={item.amount}
        />
      ))}
    </div>
  );
}

export default AnalysisSection;
