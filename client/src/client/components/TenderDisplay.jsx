import React, { useEffect, useState } from "react";
import axios from "axios";
import TenderCard from "./TenderCard";

function TenderDisplay() {
  const [tenderdata, setTenderData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tender/publishtenderdisplay")
      .then((response) => {
        setTenderData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {tenderdata.map((tender) => (
        <div key={tender._id} className="mx-auto max-w-5xl">
          <TenderCard
            heading={tender.title}
            tenderid={tender._id}
            publishdate={tender.publishdate}
            closedate={tender.closedate}
            location={tender.location}
            description={tender.description}
          />
        </div>
      ))}
    </div>
  );
}

export default TenderDisplay;
