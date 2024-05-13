import React from "react";

const GraphSection = () => {
  return (
    <div className="graphSection" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-evenly" , background: "#FFF", borderRadius: "10px"}}>
      <iframe
        style={{ background: "inherit", border: "none", outline: "none",  marginRight: "10px" }}
        width="300"
        height="300"
        src="https://charts.mongodb.com/charts-shanconstructions-nbdgu/embed/charts?id=66408293-dc15-4827-89b0-e161bf559dcb&maxDataAge=60&theme=light&autoRefresh=true"
        title="Chart1"
      ></iframe>
      <iframe
        style={{ background: "inherit", border: "none", outline: "none",   marginRight: "10px" }}
        width="300"
        height="300"
        src="https://charts.mongodb.com/charts-shanconstructions-nbdgu/embed/charts?id=66408411-07cf-42a9-8355-a463c1627fd8&maxDataAge=60&theme=light&autoRefresh=true"
        title="Chart2"
      ></iframe>
      <iframe
        style={{ background: "inherit", border: "none", borderRadius: "10px", marginRight: "10px" }}
        width="300"
        height="300"
        src="https://charts.mongodb.com/charts-shanconstructions-nbdgu/embed/charts?id=66408293-dc15-4827-89b0-e161bf559dcb&maxDataAge=60&theme=light&autoRefresh=true"
        title="Chart1"
      ></iframe>
    </div>
  );
};

export default GraphSection;
