import React, { useState } from "react";
import axios from "axios";
import config from "./config";

const Base_URL = config.baseURL;

const FoundItems = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userHostel, setUserHostel] = useState("");
  const [proofOfClaim, setProofOfClaim] = useState("");

  if (!item || item.concerntype !== "found") return null;

  const containerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#1f1f1f",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    height: "100%",
    transition: "all 0.3s ease",
  };

  const imageStyle = {
    width: "100%",
    height: "180px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    objectFit: "cover",
    marginBottom: "0.5rem",
  };

  const buttonStyle = {
    backgroundColor: "#0074D9",
    color: "#fff",
    border: "none",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    marginTop: "auto",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "450px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const submitButtonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  const closeStyle = {
    alignSelf: "flex-end",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#999",
    cursor: "pointer",
  };

  const handleClaim = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmitClaim = async (_id) => {
    if (!proofOfClaim) {
      alert("Please provide proof of claim.");
      return;
    }

    const data = {
      claimantname: userName,
      mobilenumber: userMobile,
      hostelname: userHostel,
      proofofclaim: proofOfClaim,
      itemdetails: `${item.itemname} - ${item.itemdescription}`,
    };

    try {
      await axios.post(`${Base_URL}/claimant`, data);
      alert("Item successfully claimed. Please ensure it's yours.");
      await axios.delete(`${Base_URL}/item/${_id}`);
      closeModal();
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert("Failed to submit claim. Please try again.");
    }
  };

  return (
    <>
      <div 
        style={containerStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
        }}
      >
        <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.5rem", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>📦 {item.itemname}</h2>
        
        {item.images?.length > 0 && (
          <div>
            <img src={item.images[0]} alt="item" style={imageStyle} />
            {item.images.length > 1 && (
              <p style={{ fontSize: "0.7rem", color: "#999", marginTop: "0.25rem" }}>
                +{item.images.length - 1} more image{item.images.length > 2 ? 's' : ''}
              </p>
            )}
          </div>
        )}
        
        <p style={{ fontSize: "0.85rem", lineHeight: "1.5", color: "#666", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{item.itemdescription}</p>
        <p style={{ fontSize: "0.75rem", color: "#999", fontStyle: "italic" }}>📌 {item.concerntype.toUpperCase()}</p>

        <button style={buttonStyle} onClick={handleClaim}>
          ✅ Claim Item
        </button>
      </div>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <span onClick={closeModal} style={closeStyle}>
              &times;
            </span>
            <h3>📝 Claim Form</h3>
            <input
              type="text"
              placeholder="Your Name"
              style={inputStyle}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              style={inputStyle}
              value={userMobile}
              onChange={(e) => setUserMobile(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hostel Name"
              style={inputStyle}
              value={userHostel}
              onChange={(e) => setUserHostel(e.target.value)}
            />
            <input
              type="text"
              placeholder="Proof of Claim"
              style={inputStyle}
              value={proofOfClaim}
              onChange={(e) => setProofOfClaim(e.target.value)}
            />
            <button
              style={submitButtonStyle}
              onClick={() => handleSubmitClaim(item._id)}
            >
              Submit Claim
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FoundItems;
