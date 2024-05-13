import React, { useState, useEffect } from "react";
import axios from "axios";

const EmailForm = ({close}) => {
  const [clientEmails, setClientEmails] = useState([]);
  const [formData, setFormData] = useState({
    clientEmail: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    // Fetch client emails from API
    const fetchClientEmails = async () => {
      try {
        const response = await axios.get("/api/project/projects");
        setClientEmails(response.data.data);
        console.log(clientEmails);
      } catch (error) {
        console.error("Error fetching client emails:", error);
      }
    };

    fetchClientEmails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email with form data
      await axios.post("/api/email/send", formData);
      console.log("Email sent successfully");
      // Clear form data after sending email
      setFormData({
        clientEmail: "",
        title: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div
      className="popupcontainer"
      style={{ background: "#00000093", border: "none" }}
    >
      <div className="popup" style={{ border: "none", borderColor: "none", padding: "15px 30px" }}>
        <div
          style={{
            borderRadius: "5px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Email Form</h2>
          <button type="button" style={{ borderRadius: "5px", color: "gray" , border: "none", outline: "none",background:"inherit", fontSize: "20px"}} onClick={()=> {close()}}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="clientEmail">Client Email:</label>
            <select
              id="clientEmail"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
            >
              <option value="">Select Client Email</option>
              <option value="vihanm0120@gmail.com">vihanm0120@gmail.com</option>
              {clientEmails.map((dataset) => (
                <option key={dataset._id} value={dataset.email}>
                  {dataset.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>

          <button type="submit" className="add" style={{ borderRadius: "5px" , width: "100%", background: "#285feb", marginLeft: "-1px"}}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
