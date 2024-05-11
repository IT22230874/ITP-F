import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw, FiEye, FiTrash2, FiDollarSign, FiPrinter } from "react-icons/fi";
import Popup from "./Popup"; // Assuming you have a Popup component for displaying details
import jsPDF from 'jspdf';

function ProjectFinanceTable() {
  const [projectFinanceData, setProjectFinanceData] = useState([]);
  const [filteredProjectFinanceData, setFilteredProjectFinanceData] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterProjectName, setFilterProjectName] = useState("");
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProjectFinanceData();
  }, [filterStartDate, filterEndDate, filterProjectName]);

  const fetchData = () => {
    axios
      .get("/api/finance/project-finances")
      .then((response) => {
        setProjectFinanceData(response.data);
        setFilteredProjectFinanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project finance data:", error);
      });
  };

  const filterProjectFinanceData = () => {
    let filteredData = projectFinanceData;

    if (filterStartDate.trim() !== "") {
      filteredData = filteredData.filter((finance) =>
        finance.startdate.includes(filterStartDate)
      );
    }

    if (filterEndDate.trim() !== "") {
      filteredData = filteredData.filter((finance) =>
        finance.enddate.includes(filterEndDate)
      );
    }

    if (filterProjectName.trim() !== "") {
      filteredData = filteredData.filter((finance) =>
        finance.projectname.toLowerCase().includes(filterProjectName.toLowerCase())
      );
    }

    setFilteredProjectFinanceData(filteredData);
  };

  const handleResetFilter = () => {
    setFilterStartDate("");
    setFilterEndDate("");
    setFilterProjectName("");
  };

  const handleView = async (id) => {
    try {
      setPopupData(id);
    } catch (error) {
      console.error("Error fetching project finance details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/finance/project-finance/${id}`);
      const updatedData = projectFinanceData.filter((finance) => finance._id !== id);
      setProjectFinanceData(updatedData);
      setFilteredProjectFinanceData(updatedData);
      fetchData();
    } catch (error) {
      console.error("Error deleting project finance:", error);
    }
  };

  const handleMakePayment = async (id) => {
    try {
      await axios.post(`/api/finance/project-finance/${id}/income`, { date: new Date() });
      // Payment successful, maybe update UI or show a message
      fetchData();
    } catch (error) {
      console.error("Error making payment for project finance:", error);
    }
  };

  const generateInvoice = (popupData) => {
    if (popupData) {
      const doc = new jsPDF();
  
      // Add invoice title
      doc.setFontSize(24);
      doc.text("Invoice", 50, 20);
  
      // Add project finance details
      doc.setFontSize(16);
      doc.text(`Project Name: ${popupData.projectname}`, 50, 40);
  
      // Add other details
      const currentDate = new Date().toLocaleDateString();
      const paymentNumber = popupData.finished + 1;
      const businessName = "Shan Constructions";
      const totalAmount = popupData.amount;
      const paidAmount = (popupData.finished + 1) * popupData.amountperinstallment;
  
      doc.text(`Date: ${currentDate}`, 50, 60);
      doc.text(`Payment Number: ${paymentNumber}`, 50, 80);
      doc.text(`Business Name: ${businessName}`, 50, 100);
      doc.text(`Total Amount: ${totalAmount}`, 50, 120);
      doc.text(`Paid Amount: ${paidAmount}`, 50, 140);
  
      // Save the PDF
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      // Create a hidden link and simulate click event
      const hiddenLink = document.createElement('a');
      hiddenLink.href = pdfUrl;
      hiddenLink.download = 'invoice.pdf';
      hiddenLink.style.display = 'none';
      document.body.appendChild(hiddenLink);
      hiddenLink.click();
  
      // Clean up
      document.body.removeChild(hiddenLink);
      URL.revokeObjectURL(pdfUrl);
    }
  };
  

  return (
    <div>

      <div className="filter">
        <span><FiFilter /></span>
        <span>Filter By</span>
        <input
          type="text"
          value={filterStartDate}
          placeholder="Start Date"
          onChange={(e) => setFilterStartDate(e.target.value)}
        />
        <input
          type="text"
          value={filterEndDate}
          placeholder="End Date"
          onChange={(e) => setFilterEndDate(e.target.value)}
        />
        <input
          type="text"
          value={filterProjectName}
          placeholder="Project Name"
          onChange={(e) => setFilterProjectName(e.target.value)}
        />
        <button type="button" onClick={handleResetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Payee</th>
            <th>Department</th>
            <th>Description</th>
            <th>Installments</th>
            <th>installments to get</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjectFinanceData.map((finance) => (
            <tr key={finance._id}>
              <td>{finance.startdate}</td>
              <td>{finance.enddate}</td>
              <td>{finance.amount}</td>
              <td>{finance.projectid}</td>
              <td>{finance.projectname}</td>
              <td>{finance.payee}</td>
              <td>{finance.department}</td>
              <td>{finance.description}</td>
              <td>{finance.installments}</td>
              <td>{finance.installments - finance.finished}</td>
              <td>
                <button onClick={() => handleView(finance)}>
                  <FiEye />
                </button>
                <button onClick={() => handleDelete(finance._id)}>
                  <FiTrash2 />
                </button>
                <button onClick={() => handleMakePayment(finance._id)}>
                  <FiDollarSign />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupData && (
        <Popup
          data={popupData}
          onClose={() => setPopupData(null)}
          onGenerateInvoice={generateInvoice}
        />
      )}
    </div>
  );
}

export default ProjectFinanceTable;
