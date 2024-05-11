import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addusers from "./pages/AddusersPage";
import Login from "./pages/Login";
import "./styles/forms/table.css";
import Home from "./pages/Home";
import InventoryDashboard from "./pages/inventoryDashboard";
import RentPage from "./client/pages/RentPage";
import RentDashboard from "./Rent/pages/RentDashboard";
import TenderDashboard from "./Tender/pages/TenderDashboard";
import EmployeeDashboard from "./Employee/pages/EmployeeDashboard";
import FinanceDashboard from "./Finance/pages/FinanceDashboard";
import ProjectManagementDashboard from "./Projects/pages/FinanceDashboard";
import Payment from "./Finance/pages/Payment";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/adduser" element={<Addusers />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventoryDashboard" element={<InventoryDashboard />} />
        <Route path="/rentDashboard" element={<RentDashboard />} />
        <Route path="/rents" element={<RentPage />} />
        <Route path="/tenderDashboard" element={<TenderDashboard />} />
        <Route path="/financeDashboard" element={<FinanceDashboard />} />
        <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/projectDashboard" element={<ProjectManagementDashboard />} />
        <Route path="/Payment" element={<Payment />} />

      </Routes>
    </Router>
  );
}

export default App;
