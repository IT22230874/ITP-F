import React, { useState, useEffect } from "react";
import axios from "axios";
import AnalysisCard from "./AnalysisCard";
import monthlyexpenses from "./monthlyexpenses";

function AnalysisSection() {
  const [analysisData, setAnalysisData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/finance/analysis/")
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
      <div>
      <iframe
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      }}
      width="240"
      height="180"
      src="https://charts.mongodb.com/charts-project-0-shyqbfp/embed/charts?id=66796847-dde3-433c-817d-cbfff31439d7&maxDataAge=3600&theme=light&autoRefresh=true"
      title="MongoDB Chart"
    ></iframe>
      </div>
      <div>
      <iframe
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      }}
      width="540"
      height="300"
      src="https://charts.mongodb.com/charts-project-0-shyqbfp/embed/charts?id=66797609-f3fb-40f6-8f76-3334678c500f&maxDataAge=60&theme=light&autoRefresh=true"
      title="MongoDB Chart"
    ></iframe>
      </div>
      <div>
      <iframe
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      }}
      width="240"
      height="180"
      src="https://charts.mongodb.com/charts-project-0-shyqbfp/embed/charts?id=667967e1-ae06-4623-8ba8-e32a517e8178&maxDataAge=60&theme=light&autoRefresh=true"
      title="MongoDB Chart"
    ></iframe>
      </div>

    </div>
  );
}

export default AnalysisSection;
