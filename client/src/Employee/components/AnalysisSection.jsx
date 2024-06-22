import React, { useState, useEffect } from "react";
import axios from "axios";
import AnalysisCard from "./AnalysisCard";

function AnalysisSection() {
  const [analysisData, setAnalysisData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/employee/attendance/summary")
      .then((response) => {
        setAnalysisData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching analysis data:", error);
      });
  }, []);

  return (
    <div className="analysis">
 
        <AnalysisCard
          heading="Employee"
          number={analysisData.numberOfEmployees}
        />
    </div>
  );
}

export default AnalysisSection;
