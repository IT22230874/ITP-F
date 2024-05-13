import React, { useState, useEffect } from "react";
import { FaProjectDiagram, FaPlusCircle, FaCheckCircle, FaSpinner } from 'react-icons/fa'; // Importing Font Awesome icons
import "../styles/project.css";

const AnalysisSection = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('api/project/analysis')
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  return (
    <div className="project-stats-container">
      {stats && (
        <div className="project-stat-card">
          <div className="card-top white-bg">
            <FaProjectDiagram size={24} />
            <p>Total Projects</p>
          </div>
          <div className="card-bottom facebook-blue-bg">
            <p>{stats.totalProjects}</p>
          </div>
        </div>
      )}

      {stats && (
        <div className="project-stat-card">
          <div className="card-top white-bg">
            <FaPlusCircle size={24} />
            <p>New Projects</p>
          </div>
          <div className="card-bottom facebook-blue-bg">
            <p>{stats.newProjects}</p>
          </div>
        </div>
      )}

      {stats && (
        <div className="project-stat-card">
          <div className="card-top white-bg">
            <FaCheckCircle size={24} />
            <p>Finished Projects</p>
          </div>
          <div className="card-bottom facebook-blue-bg">
            <p>{stats.finishedProjects}</p>
          </div>
        </div>
      )}

      {stats && (
        <div className="project-stat-card">
          <div className="card-top white-bg">
            <FaSpinner size={24} />
            <p>Ongoing Projects</p>
          </div>
          <div className="card-bottom facebook-blue-bg">
            <p>{stats.ongoingProjects}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisSection;
