import React, { useState } from "react";
import PageIntroduction from "../PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import AddItemForm from "../Forms/AddItemForm";
import InventoryTable from "../Tables/InventoryTable";
import MachinaryTable from "../Tables/MachinaryTable";
import AddMachineForm from "../Forms/AddMachineForm";
import axios from "axios";

function InventoryContent() {
  const [displayForm, setDisplayForm] = useState(false);
  const [swapTable, setSwapTable] = useState(false);
  const [heading, setHeading] = useState("Inventory");
  const [displayOtherForm, setDsiplayOtherForm] = useState(false);

  const handleButtonClick = () => {
    if (heading === "Inventory") {
      setDisplayForm(!displayForm);
    } else if (heading === "Machinary") {
      setDsiplayOtherForm(!displayOtherForm);
    }
  };

  const swapTableFun = () => {
    setSwapTable(!swapTable);
    setHeading(swapTable ? "Inventory" : "Machinary");
  };

  const getpdf = async () => {
    try {
      // Make a GET request to the server-side route for PDF generation
      const response = await axios.get("/api/machinary/getpdf", {
        responseType: "blob",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");

      // Append the link to the body and trigger a click event
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the link element and revoke the URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div className="dashboard">
      <PageIntroduction
        heading={heading}
        btname="Add New"
        handleClick={handleButtonClick}
      />
      <div className="navbar">
        <button
          type="button"
          disabled={!swapTable}
          className="button"
          onClick={swapTableFun}
        >
          Inventory
        </button>
        <button
          type="button"
          disabled={swapTable}
          className="button"
          onClick={swapTableFun}
        >
          Machinary
        </button>
        <button type="button" className="button" onClick={getpdf}>
          Get Report
        </button>
      </div>

      {displayForm && (
        <div className="formContainer">
          <AddItemForm handleClick={handleButtonClick} />
        </div>
      )}

      {displayOtherForm && (
        <div className="formContainer">
          <AddMachineForm handleClick={handleButtonClick} />
        </div>
      )}

      {!swapTable ? <InventoryTable /> : <MachinaryTable />}
    </div>
  );
}

export default InventoryContent;
