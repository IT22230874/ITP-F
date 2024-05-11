import React, { useEffect, useState } from "react";
import MachineCard from "./MachineCard";
import axios from "axios";

function MachineDisplay() {
  const [machinedata, setMachineData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/rent/displaymachines")
      .then((response) => {
        setMachineData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error);
      });
  }, []);

  return (
    <div className="main">
      <div className="machine-container">
        {machinedata.map((machine) => (
          <MachineCard
            key={machine._id}
            imagename={machine.URL}
            heading={machine.name}
            machineid={machine._id}
            priceperday={machine.priceperday}
          />
        ))}
      </div>
    </div>
  );
}

export default MachineDisplay;
