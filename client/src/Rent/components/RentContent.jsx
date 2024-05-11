import React, { useState } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import axios from "axios";
import AnalysisSection from "./AnalysisSection";
import RequestTable from "./RequestTable";
import RentTable from "./RentTable";
import MachineryDisplay from "./MachineryDisplay";

function RentContent() {
  const [displayForm, setDisplayForm] = useState(false);
  const [swapTable, setSwapTable] = useState(false);
  const [heading, setHeading] = useState("Requests");
  const [displayOtherForm, setDsiplayOtherForm] = useState(false);

  const handleButtonClick = () => {
    if (heading === "Requests") {
      setDisplayForm(!displayForm);
    } else if (heading === "Rentals") {
      setDsiplayOtherForm(!displayOtherForm);
    }
  };

  const swapTableFun = () => {
    setSwapTable(!swapTable);
    setHeading(swapTable ? "Requests" : "Rentals");
  };

  const getpdf = async () => {
    try {
      // Make a GET request to the server-side route for PDF generation
      const response = await axios.get("/api/rent/getpdf", {
        responseType: "blob",
      });
  
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RentReport.pdf");
  
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
        btname="Machines"
        handleClick={handleButtonClick}
      />
      <AnalysisSection />
      <div className="navbar">
        <button
          type="button"
          disabled={!swapTable}
          className="button"
          onClick={swapTableFun}
        >
          Requests
        </button>
        <button
          type="button"
          disabled={swapTable}
          className="button"
          onClick={swapTableFun}
        >
          Rents
        </button>
        <button type="button" className="button" onClick={getpdf}>
          Get Report
        </button>
      </div>

      {displayForm && (
        <div className="formContainer">
          <MachineryDisplay handleClick={handleButtonClick} />
        </div>
      )}

      {displayOtherForm && (
        <div className="formContainer">
          <MachineryDisplay handleClick={handleButtonClick} />
        </div>
      )}

      {!swapTable ? <RequestTable /> : <RentTable />}
    </div>
  );
}

export default RentContent;
