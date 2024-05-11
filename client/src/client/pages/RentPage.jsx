import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import MachineDisplay from "../components/MachineDisplay";
import "../styles/RentPage.css";

function RentPage() {
  return (
    <div className="client dashboard">
      <Navbar />
      <h1>Rent Machinary</h1>
      <MachineDisplay style={{ overflowY: 'scroll' }} />
      <Footer />
    </div>
  );
}

export default RentPage;
