import React, { useState } from "react";
import SideBarMenu from "../../components/Globle/SideBarMenu";
import Header from "../../components/Globle/Header";
import "../../styles/pages/HomePageStyles.css";
import { FaBars } from 'react-icons/fa';
import ProjectManagementContent from "../components/ProjectManagementContent";

function ProjectManagementDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const profile = localStorage.getItem("profile");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("profile");
  };

  return (
    <div className="Home">
      <div style={{width: "fit-content", height: "fit-content", color: "#1d3770", background: "transparent", position: "fixed", top: "10px", left : "10px", zIndex: "7432"}} onClick={toggleMenu}>
        <FaBars />
        {/* Other content */}
      </div>

      {showMenu && <SideBarMenu />}
      <div className="main" style={{ margin: "0 auto" }}>
        <Header profile={profile} fun={handleLogout} />
        <ProjectManagementContent />
      </div>
    </div>
  );
}

export default ProjectManagementDashboard;
