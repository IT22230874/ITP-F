import React, { useState } from "react";
import "../../styles/forms/AddUsers.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const path = "/api/auth/signin";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      setError(data.message);
      if (data.success === false) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);

      localStorage.setItem("profile", data._id);
      localStorage.setItem("position", data.position);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="loginform form">
      {error && <p className="message">{error}</p>}

      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={handleChange}
          value={formData.username || ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
          value={formData.password || ""}
        />
      </div>
      <button disabled={loading} className="button" type="submit">
        {loading ? "Pending..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
