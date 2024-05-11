import React, { useState } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import AnalysisSection from "./AnalysisSection";
import RecievedTable from "./RecievedTable";
import PublishedTable from "./PublishedTable";
import Bidtable from "./Bidtable";
import axios from "axios";
import BidsDisplay from "./BidsDisplay";


function TenderContent() {
  const [selectedTable, setSelectedTable] = useState("recieved");
  const [publish, setPublish] = useState(false);

  const handleTableChange = (tableName) => {
    setSelectedTable(tableName);
  };

  const getpdf = async () => {
    try {
      // Make a GET request to the server-side route for PDF generation
      const response = await axios.get("/api/tender/getpdf", {
        responseType: "blob",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TenderReport.pdf");

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

  const displayForm = () => {
    setPublish(!publish);
  }

  return (
    <div className="dashboard">
      <PageIntroduction
        heading={
          selectedTable === "recieved"
            ? "Recieved Tenders"
            : selectedTable === "published"
            ? "Published Tenders"
            : "Bids"
        }
        btname="publish a tender"
        handleClick={() => displayForm()}
      />
      <AnalysisSection />
      <div className="navbar">
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("recieved")}
        >
          Recieved Tenders
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("published")}
        >
          Published Tenders
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleTableChange("bids")}
        >
          Bids
        </button>
        <button type="button" className="button" onClick={getpdf}>
          Get Report
        </button>
      </div>

      {selectedTable === "recieved" && <RecievedTable />}
      {selectedTable === "published" && <PublishedTable />}
      {selectedTable === "bids" && <Bidtable />}

      
        {publish && (
          <div className="formcontainer">
            <BidsDisplay close={displayForm}/>
          </div>
        )}
    </div>
  );
}

export default TenderContent;
