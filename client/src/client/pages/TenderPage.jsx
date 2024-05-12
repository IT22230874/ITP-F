import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import MachineDisplay from "../components/MachineDisplay";
import "../styles/RentPage.css";
import TenderDisplay from "../components/TenderDisplay";

function TenderPage() {
  return (
    <>
      <Navbar />
      <div className="client dashboard p-12">
        <span className="text-2xl font-semibold text-gray-700 p-4 lg:ml-2">
          Tenders
        </span>
        <TenderDisplay style={{ overflowY: "scroll" }} />
      </div>
      <Footer />
    </>
  );
}

export default TenderPage;
