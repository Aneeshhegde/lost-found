import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import LostFoundItems from "./LostFoundItems";
import LostItems from "./LostItems";
import FoundItems from "./FoundItems";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const LostAndFoundList = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${Base_URL}/item`);
      console.log(res);
      setItems(res.data.gotItem);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item) => {
    if (props.req === "lost") {
      return <LostItems key={item._id} item={item} />;
    } else if (props.req === "found") {
      return <FoundItems key={item._id} item={item} />;
    } else {
      return <LostFoundItems key={item._id} item={item} />;
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "2rem",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
    animation: "fadeInUp 0.6s ease-out",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "800",
    marginBottom: "0.5rem",
    textTransform: "capitalize",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#666",
    fontWeight: "400",
    fontStyle: "italic",
  };

  const itemsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "2rem",
    maxWidth: "1400px",
    margin: "0 auto",
    animation: "fadeIn 0.8s ease-out",
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

  const emptyIconStyle = {
    fontSize: "4rem",
    marginBottom: "1rem",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            {props.req ? `${props.req} Items` : "All Items"}
          </h1>
          <p style={subtitleStyle}>
            💡 If your items aren't visible, make sure you raise a concern first
          </p>
        </div>
        
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={emptyIconStyle}>📦</div>
            <h2>No Items Found</h2>
            <p style={{ color: "#666", marginTop: "1rem" }}>
              There are currently no {props.req || ""} items to display.
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

export default LostAndFoundList;
