import React, { useEffect, useState } from "react";

function TenderDisplay() {
  const [tenderdata, setTenderData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/rent/displaymachines")
      .then((response) => {
        setTenderData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error);
      });
  }, []);

  return (
    <div>
      <div className="machine-container flex flex-wrap gap-6 justify-center p-4 lg:ml-20 ">
        {tenderdata.map((tender) => (
          <TenderCard
            key={tender._id}
            heading={tender.title}
            tenderid={tender._id}
            description={tender.description}
          />
        ))}
      </div>
    </div>
  );
}

export default TenderDisplay;
