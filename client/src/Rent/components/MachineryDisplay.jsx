import React, { useState, useEffect } from "react";
import axios from "axios";

function MachineryDisplay({handleClick}) {
  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("/api/rent/machines")
      .then((response) => {
        setMachines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching machines:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMachines = machines.filter((machine) =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="machiesearch popupcontainer">
      <h2>Machinery Availability check</h2>
      <div className="filter">
        <input
          type="text"
          placeholder="Search by machine name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type="button" className="close"onClick={handleClick}>close</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Status</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredMachines.map((machine) => (
            <tr key={machine._id}>
              <td>{machine.name}</td>
              <td>{machine.stock}</td>
              <td>{machine.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MachineryDisplay;
