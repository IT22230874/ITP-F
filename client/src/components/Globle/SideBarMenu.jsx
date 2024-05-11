import React from "react";
import { Link } from "react-router-dom";
import "./sidebar-menu.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function SideBarMenu() {
  const position = localStorage.getItem("position");
  const navigate = useNavigate();

  const renderLink = (to, label, disabled) => {
    if (disabled) {
      return <span>{label}</span>;
    } else {
      return <Link to={to}>{label}</Link>;
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebarmenu">
      <p className="nameofcompnay">
        <span className="left">Shan</span>
        <span className="right">Construction</span>
      </p>
      {renderLink("/home", "Home", false)}
      {renderLink("/inventoryDashboard", "Inventory", position !== "inventory manager")}
      {renderLink("/rentDashboard", "Rent", position !== "rent manager")}
      {renderLink("/tenderDashboard", "Tender", position !== "tender manager")}
      {renderLink("/employeeDashboard", "Employee", position !== "employee manager")}
      {renderLink("/financeDashboard", "Finance", position !== "finance manager")}
      {renderLink("/projectDashboard", "Project", position !== "project manager")}
      {renderLink("/packageDashboard", "Package", position !== "package manager")}
      {renderLink("/clientDashboard", "Client", position !== "client manager")}
      <div className="sidebarmenu-bottom">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default SideBarMenu;
