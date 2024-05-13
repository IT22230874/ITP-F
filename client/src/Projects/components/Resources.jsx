import React from "react";
import { RiMachineLine, RiArchiveLine, RiUserLine } from "react-icons/ri";

function Resource() {
  return (
    <div className="resource-popup">
      <div className="resource-card">
        <RiMachineLine size={50} color="#536DFE" />
        <h3>Machines</h3>
        <p>Description about machines...</p>
      </div>
      <div className="resource-card">
        <RiArchiveLine size={50} color="#FF6B6B" />
        <h3>Inventory</h3>
        <p>Description about inventory...</p>
      </div>
      <div className="resource-card">
        <RiUserLine size={50} color="#FF9FF3" />
        <h3>Employees</h3>
        <p>Description about employees...</p>
      </div>
    </div>
  );
}

export default Resource;
