import React, { useState } from "react";
import SideBarMenu from "../../components/Globle/SideBarMenu";
import Header from "../../components/Globle/Header";
import "../../styles/pages/HomePageStyles.css";
import { MdMenu } from "react-icons/md";
import FinanceContent from "../components/FinanceContent"; // Assuming FinanceContent is the component for the finance subsystem

function FinanceDashboard() {
  const [showMenu, setShowMenu] = useState(true);
  const profile = localStorage.getItem("profile");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("profile");
  };

  return (
    <div className="Home">
      <div className="header">
        <div className="menu-toggle" onClick={toggleMenu}>
          <MdMenu />
          <span>Menu</span>
        </div>
      </div>

      {showMenu && <SideBarMenu />}
      <div className="main">
        <Header profile={profile} fun={handleLogout} />

        <FinanceContent /> {/* Replace TenderContent with FinanceContent */}
      </div>
    </div>
  );
}

export default FinanceDashboard;
