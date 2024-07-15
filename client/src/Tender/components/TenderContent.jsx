import React, { useState } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import AnalysisSection from "./AnalysisSection";
import RecievedTable from "./RecievedTable";
import PublishedTable from "./PublishedTable";
import Bidtable from "./Bidtable";
import axios from "axios";
import BidsDisplay from "./BidsDisplay";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/logo.png";


function TenderContent() {
  const [selectedTable, setSelectedTable] = useState("recieved");
  const [publish, setPublish] = useState(false);

  const handleTableChange = (tableName) => {
    setSelectedTable(tableName);
  };

  const getpdf = () => {
    const table = document.querySelector("table"); // Assuming your table has 'table' tag
    const doc = new jsPDF("p", "pt", "a4");
  
    // Hide action column before taking the screenshot
    const actionColumn = table.querySelector(".actions");
    if (actionColumn) {
      actionColumn.style.display = "none";
    }
  
    // Add logo
    const img = new Image();
    img.src = logo; // Assuming 'logo' is imported as an image
    img.onload = () => {
      doc.addImage(img, "PNG", 40, 10, 120, 50); // Adjust the position and size as needed
      // Add table styling
      const columns = ["Tender ID", "Title", "Published Date", "Closing Date", "Status"];
      const rows = table.querySelectorAll("tbody tr");
      const tableData = [];
      rows.forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell) => {
          rowData.push(cell.textContent.trim());
        });
        tableData.push(rowData);
      });
  
      doc.autoTable({
        head: [columns],
        body: tableData,
        startY: 120,
        theme: "grid",
        styles: {
          overflow: "linebreak",
          columnWidth: "wrap",
          font: "Arial",
          fontSize: 10,
          halign: "center",
          valign: "middle",
        },
      });
  
      // Show action column again
      if (actionColumn) {
        actionColumn.style.display = "table-cell";
      }
  
      // Save the PDF
      doc.save("tender_report.pdf");
    };
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
        btname="Publish a Tender"
        handleClick={() => displayForm()}


      />
      {/*<AnalysisSection />*/}
      <div className="navbar">
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-800"
          onClick={() => handleTableChange("recieved")}
        >
          Recieved Tenders
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-800"
          onClick={() => handleTableChange("published")}
        >
          Published Tenders
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-800"
          onClick={() => handleTableChange("bids")}
        >
          Bids
        </button>
        <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-800" onClick={getpdf}>
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
