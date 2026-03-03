import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import DisplayPersonalItems from "./DisplayPersonalItems";
import { jwtDecode } from "jwt-decode";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const PersonalItems = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }

        const decodedToken = decodeJwtToken(authToken);
        const userId = decodedToken.sub;

        const response = await axios.get(`${Base_URL}/item/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        setItems(response.data.gotItems);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const decodeJwtToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  };

  const renderItem = (item) => {
    return <DisplayPersonalItems key={item._id} item={item} />;
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "2rem",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "800",
    marginBottom: "0.5rem",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#666",
    fontWeight: "400",
    fontStyle: "italic",
  };

  const itemsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.25rem",
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "2rem auto",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>My Items</h1>
          <p style={subtitleStyle}>
            💡 If your items aren't visible, make sure you raise a concern first
          </p>
        </div>
        
        {isLoading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
            <h2>No Items Found</h2>
            <p style={{ color: "#666", marginTop: "1rem" }}>
              You haven't reported any lost or found items yet.
            </p>
          </div>
        ) : (
          <div style={itemsGridStyle}>
            {items.map((item) => renderItem(item))}
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalItems;
