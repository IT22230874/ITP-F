import React, { useState } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../styles/project.css";
import AnalysisSection from "./AnalysisSection";
import ProjectsTable from "./ProjectsTable";
import AddProjectForm from "./AddProjectForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/logo.png";
import TendersTable from "./TendersTable";
import EmailForm from "./EmailForm";
import GraphSection from "./GraphSection";
import "jspdf-autotable";


function ProjectManagementContent() {
  const [publish, setPublish] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showGraphs, setShowGraphs] = useState(true);
  const [showProjectsTable, setShowProjectsTable] = useState(false);
  const [showTendersTable, setShowTendersTable] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const displayForm = () => {
    setPublish(!publish);
  };

  const handleGraphsButtonClick = () => {
    setShowGraphs(true);
    setShowProjectsTable(false);
    setShowTendersTable(false);
  };

  const handleProjectsButtonClick = () => {
    setShowGraphs(false);
    setShowProjectsTable(true);
    setShowTendersTable(false);
  };

  const handleTendersButtonClick = () => {
    setShowGraphs(false);
    setShowProjectsTable(false);
    setShowTendersTable(true);
  };

  const generatePDF = () => {
    const table = document.querySelector("table"); // Assuming your table has 'table' tag
    const doc = new jsPDF("p", "pt", "a4");
  
    // Hide action column before taking the screenshot
    const actionColumn = table.querySelector(".actions");
    actionColumn.style.display = "none";
  
    // Add logo
    const img = new Image();
    img.src = logo; // Assuming 'logo' is imported as an image
    doc.addImage(img, "PNG", 40, 10, 120, 50); // Adjust the position and size as needed
  
  
  
    // Add table styling
    const columns = ["Name", "Location", "Budget", "Start Date", "End Date", "Status"];
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
    actionColumn.style.display = "table-cell";
  
    // Save the PDF
    doc.save("project_report.pdf");
  };
  
  

  return (
    <div className="dashboard" style={{ borderRadius: "8px", backgroundColor: "#d1d1d1" }}>
      <PageIntroduction heading="Projects" btname="Add Project" handleClick={() => displayForm()} />
      <AnalysisSection />
      <div className="navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", marginTop: "-30px", marginBottom: "30px" }}>
        <button type="button" className="button" style={{ background: "#4267B2", position: "relative", overflow: "hidden" }} onClick={handleGraphsButtonClick}>
          <span className="bubble"></span>
          Analysis
        </button>

        <button type="button" className="button" style={{ background: "#4267B2" }} onClick={handleProjectsButtonClick}>
          Other Projects
        </button>
        <button type="button" className="button" style={{ background: "#4267B2" }} onClick={handleButtonClick}>
          Contact Client
        </button>
        <button type="button" className="button" onClick={generatePDF} style={{ background: "#4267B2" }}>
          Get Report
        </button>
        {showForm && <EmailForm close={handleButtonClick} />}
      </div>

      <div id="pdf-content">
        {showGraphs && <GraphSection />}
        {showProjectsTable && <ProjectsTable />}
        {showTendersTable && <TendersTable />}
      </div>

      {publish && (
          <div className="popupcontainer" style={{background: '#00000093'}} >
            <AddProjectForm close={() => setPublish(false)} />
          </div>
      )}
    </div>
  );
}

export default ProjectManagementContent;
