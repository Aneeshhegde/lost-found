import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GroupInfo from "./GroupInfo";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";

const Base_URL = config.baseURL;

const HomePage = () => {
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) return;

        const decodedToken = jwtDecode(authToken);
        const userId = decodedToken.sub;

        const response = await axios.get(`${Base_URL}/fetchuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        setUserDetails(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // --- Styling ---
  const container = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  const card = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "3rem",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    maxWidth: "650px",
    width: "100%",
    marginTop: "2rem",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    animation: "fadeInUp 0.6s ease-out",
  };

  const heading = {
    fontSize: "3rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "1.5rem",
    fontWeight: "800",
    letterSpacing: "-1px",
  };

  const paragraph = {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    lineHeight: "1.8",
    color: "#444",
    fontWeight: "400",
  };

  const button = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    padding: "14px 36px",
    borderRadius: "50px",
    border: "none",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "600",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const buttonHover = {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 30px rgba(102, 126, 234, 0.6)",
  };

  const userInfoCard = {
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    maxWidth: "550px",
    width: "100%",
    marginTop: "2rem",
    textAlign: "left",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  };

  const userField = {
    fontSize: "1.05rem",
    marginBottom: "1rem",
    color: "#333",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  };

  const label = {
    fontWeight: "700",
    color: "#667eea",
    minWidth: "140px",
    fontSize: "0.95rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  return (
    <>
      <Navbar />
      <div style={container}>
        <div style={card}>
          <h1 style={heading}>Lost & Found Tracking System</h1>

          {!user || !userDetails ? (
            <>
              <p style={paragraph}>
                Please sign in to track or raise a concern.
              </p>
              <Link to="/sign-in">
                <button
                  style={{ ...button, ...(hovered ? buttonHover : {}) }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  Sign In
                </button>
              </Link>
            </>
          ) : (
            <>
              <p style={paragraph}>
                Welcome{" "}
                <b>
                  {userDetails.data.gotUser.username} (
                  {userDetails.data.gotUser.rollno})
                </b>
                , ready to report or find your item?
              </p>
              <Link to="/raise-a-concern">
                <button
                  style={{ ...button, ...(hovered ? buttonHover : {}) }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  Raise Concern
                </button>
              </Link>

              {/* 👤 User Info Card */}
              <div style={userInfoCard}>
                <p style={userField}>
                  <span style={label}>Name:</span>{" "}
                  {userDetails.data.gotUser.username}
                </p>
                <p style={userField}>
                  <span style={label}>Roll Number:</span>{" "}
                  {userDetails.data.gotUser.rollno}
                </p>
                <p style={userField}>
                  <span style={label}>Email:</span>{" "}
                  {userDetails.data.gotUser.email}
                </p>
                <p style={userField}>
                  <span style={label}>Joined On:</span>{" "}
                  {new Date(
                    userDetails.data.gotUser.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: "5rem", width: "100%", maxWidth: "800px" }}>
          <GroupInfo />
        </div>
      </div>
    </>
  );
};

export default HomePage;
