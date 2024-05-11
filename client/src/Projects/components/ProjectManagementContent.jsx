import React, { useState } from "react";
import PageIntroduction from "../../components/PageIntroduction/PageIntroduction";
import "../../styles/pages/InventoryDashboard.css";
import AnalysisSection from "./AnalysisSection";
import ProjectsTable from "./ProjectsTable"; // Import ProjectsTable component
import AddProjectForm from "./AddProjectForm";
import axios from 'axios'


function ProjectManagementContent() {
  const [publish, setPublish] = useState(false);

  const displayForm = () => {
    setPublish(!publish);
  };

  const divStyle = {
    height: "70vh",
    overflow: "scroll",
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
      link.setAttribute("download", "ProjectReport.pdf");
  
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
        heading="Projects"
        btname="Add Project"
        handleClick={() => displayForm()}
      />
      <div className="navbar">
      <button type="button" className="button" onClick={getpdf}>
          Get Report
        </button>
      </div>

      <ProjectsTable />

      {publish && (
  <div className="popupcontainer">
    <div className="popup"  style={divStyle}>
      <AddProjectForm close={() => setPublish(false)} />
    </div>
  </div>
)}

    </div>
  );
}

export default ProjectManagementContent;
