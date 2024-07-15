import React from "react";
import Navbar from "../../client/components/navbar";
import Footer from "../../client/components/Footer";
import "../../client/styles/RentPage.css";
import CardPayment from "./CardPayment";

function PaymentPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="p-12 bg-white shadow-lg rounded-lg">
    <CardPayment />
  </div>
</div>

      <Footer />
    </>
  );
}

export default PaymentPage;
