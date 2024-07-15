import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/logo.png';

export default function Paycomplete() {
  const [machineName, setMachineName] = useState('');

  useEffect(() => {
    // Fetch machine name when component mounts
    fetchMachineName();
  }, []);

  const fetchMachineName = async () => {
    // Retrieve machine ID from localStorage
    const requestDetails = JSON.parse(localStorage.getItem('requestDetails'));
    const { machineid } = requestDetails;

    try {
      // Fetch machine name from backend API
      const response = await fetch(`/api/machinary/getmachine/${machineid}`); 
      if (response.ok) {
        const data = await response.json();
        console.error('data.name',data);

        setMachineName(data.name);
      } else {
        console.error('Failed to fetch machine name');
      }
    } catch (error) {
      console.error('Error fetching machine name:', error);
    }
  };

  const generateInvoice = () => {
    // Retrieve values from localStorage
    const requestDetails = JSON.parse(localStorage.getItem('requestDetails'));
    const { amount, enddate, machineid, startdate } = requestDetails;

    // Initialize jsPDF
    const doc = new jsPDF();

    // Logo
    doc.addImage(logo, 'PNG', 15, 15, 30, 10);

    // Invoice details
    doc.setFontSize(12);
    doc.text('Invoice', 170, 20);
    doc.text('Invoice Date: ' + new Date().toLocaleDateString(), 140, 30);

    // Table
    const headers = [['Description', 'Details']];
    const data = [
      ['Amount', `Rs.${amount}`],
      ['Machine Name', machineName], // Display machine name here
      ['Start Date', startdate],
      ['End Date', enddate],
    ];

    doc.autoTable({
      startY: 40,
      head: headers,
      body: data,
    });

    // Save the PDF
    doc.save('receipt.pdf');
  };

 
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">

        <div className="bg-white shadow-lg rounded-lg p-6 md:max-w-md w-full">
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">Payment Done!</h3>
            <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p>Have a great day!</p>
            <div className="py-10 text-center">
              <a
                href="/rents"
                className="px-12 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                GO BACK
              </a>
              <button
          type="button"
          onClick={generateInvoice}
          className="px-12 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ml-2"
        >
          Get Receipt
        </button>
            </div>
          </div>
        </div>
      </div>
  );
}
