import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBarMenu from "../components/Globle/SideBarMenu";
import Header from "../components/Globle/Header";
import Analytics from "../components/Globle/Analytics";
import "../styles/pages/HomePageStyles.css";
import { MdMenu } from "react-icons/md";
import Swal from "sweetalert2";

function Home() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userProfile = localStorage.getItem("profile");
    if (userProfile) {
      setProfile(userProfile);
    } else {
      Swal.fire({
        title: "Please login first!",
        icon: "warning",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(() => {
        navigate("/login");
      });
    }
  }, [navigate]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("profile");
    navigate("/login");
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
        {profile && <Header profile={profile} onLogout={handleLogout} />}
        <Analytics />
      </div>
    </div>
  );
}

export default Home;
