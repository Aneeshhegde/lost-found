import React, { useState } from "react";
import axios from "axios";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const DisplayPersonalItems = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleResolve = async (_id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${Base_URL}/item/${_id}`, { withCredentials: true });
      alert("Item has been successfully removed!");
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 💎 Glassmorphism Container Style
  const containerStyle = {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#1e1e1e",
    height: "100%",
    transition: "all 0.3s ease",
  };

  const headingStyle = {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "0.25rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };

  const paragraphStyle = {
    fontSize: "0.85rem",
    lineHeight: "1.5",
    color: "#666",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  };

  const imageContainer = {
    width: "100%",
    marginBottom: "0.5rem",
  };

  const imageStyle = {
    borderRadius: "8px",
    width: "100%",
    height: "180px",
    objectFit: "cover",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#005fa3" : "#0074D9",
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

  return (
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
      <h2 style={headingStyle}>🧾 {item.itemname}</h2>
      
      {item.images?.length > 0 && (
        <div style={imageContainer}>
          <img src={item.images[0]} alt="item" style={imageStyle} />
          {item.images.length > 1 && (
            <p style={{ fontSize: "0.7rem", color: "#999", marginTop: "0.25rem" }}>
              +{item.images.length - 1} more image{item.images.length > 2 ? 's' : ''}
            </p>
          )}
        </div>
      )}
      
      <p style={paragraphStyle}>{item.itemdescription}</p>
      <p style={{ fontSize: "0.75rem", color: "#999", fontStyle: "italic" }}>
        📌 {item.concerntype.toUpperCase()}
      </p>

      {isLoading ? (
        <Spinner />
      ) : (
        <button
          style={buttonStyle}
          onClick={() => handleResolve(item._id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ✅ Mark as Resolved
        </button>
      )}
    </div>
  );
};

export default DisplayPersonalItems;
