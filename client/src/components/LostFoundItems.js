import React, { useState } from "react";
import axios from "axios";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const LostItems = (props) => {
  const { item } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userHostel, setUserHostel] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [proofOfClaim, setProofOfClaim] = useState("");

  const boxStyle = {
    background: "white",
    padding: "1.5rem",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    border: "1px solid rgba(102, 126, 234, 0.1)",
    animation: "fadeInUp 0.6s ease-out",
    position: "relative",
    overflow: "hidden",
  };

  const itemTypeIndicator = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background: item.concerntype === "lost" 
      ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)"
      : "linear-gradient(135deg, #51cf66 0%, #37b24d 100%)",
    color: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  };

  const btnStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "12px 24px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginTop: "1rem",
  };

  const btnStyleSubmit = {
    background: "linear-gradient(135deg, #51cf66 0%, #37b24d 100%)",
    color: "white",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(81, 207, 102, 0.3)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "1rem",
    borderRadius: "10px",
    border: "2px solid #e0e0e0",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "400px",
    margin: "1rem 0",
    borderRadius: "15px",
    objectFit: "cover",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  };

  if (window.matchMedia("(min-width: 768px)").matches) {
    imageStyle.maxWidth = "100%";
  }

  const closeButtonStyle = {
    cursor: "pointer",
  };

  const handleHelp = () => {
    setIsModalOpen(true);
  };

  const handleClaim = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitHelp = async (_id) => {
    setIsLoading(true);

    try {
      const data = {
        helpername: userName,
        mobilenumber: userMobile,
        hostelname: userHostel,
        itemdetails: `${item.itemname} - ${item.itemdescription}`,
      };

      await axios.post(`${Base_URL}/helper`, data);
      alert(
        "Thank you for contributing to the growth of our community. We are temporarily taking this item off the portal, with the hope that your assistance may aid in returning it to its original owner."
      );
      await axios.delete(`${Base_URL}/item/${_id}`);
      closeModal();
      alert("Item has been successfully removed!");
    } catch (error) {
      console.error("Error submitting help:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitClaim = async (_id) => {
    setIsLoading(true);

    try {
      if (!userName || !userMobile || !userEmail || !proofOfClaim) {
        alert("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      const data = {
        itemId: item._id,
        itemName: item.itemname,
        itemDescription: item.itemdescription,
        itemType: item.concerntype,
        claimantName: userName,
        claimantPhone: userMobile,
        claimantEmail: userEmail,
        claimDescription: proofOfClaim,
        itemOwnerPhone: item.phonenumber || "Not provided"
      };

      console.log("Submitting claim with data:", data);
      const response = await axios.post(`${Base_URL}/claim`, data);
      console.log("Claim response:", response.data);
      
      if (response.data.success) {
        alert("Claim submitted successfully! Admin will review and contact you via WhatsApp.");
        closeModal();
        // Reset form
        setUserName("");
        setUserMobile("");
        setUserEmail("");
        setProofOfClaim("");
        setUserHostel("");
      } else {
        alert("Error: " + (response.data.message || "Failed to submit claim"));
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert("Error submitting claim. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const itemTitleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "1rem",
    marginTop: "0.5rem",
  };

  const itemDescStyle = {
    fontSize: "1.05rem",
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "1rem",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#667eea",
  };

  return (
    <div style={boxStyle}>
      <div style={itemTypeIndicator}>
        {item.concerntype === "lost" ? "🔴 LOST" : "🟢 FOUND"}
      </div>
      
      <div>
        <h2 style={itemTitleStyle}>{item.itemname}</h2>
        <p style={itemDescStyle}>
          <span style={labelStyle}>Description:</span> {item.itemdescription}
        </p>
        <p style={{ fontSize: "0.9rem", color: "#888", fontStyle: "italic" }}>
          Reported on: {new Date(item.date).toLocaleDateString()}
        </p>
        {item.images && item.images.length > 0 && (
          <div>
            <p style={{ ...labelStyle, marginTop: "1rem", marginBottom: "0.5rem" }}>
              📷 Images:
            </p>
            {item.images.map((image, index) => (
              <img key={index} src={image} alt="Item" style={imageStyle} />
            ))}
          </div>
        )}
      </div>
      <button
        onClick={item.concerntype === "lost" ? handleHelp : handleClaim}
        style={btnStyle}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
        }}
      >
        {item.concerntype === "lost" ? "🤝 Help Find" : "🎯 Claim Item"}
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              style={closeButtonStyle}
              onClick={closeModal}
            >
              &times;
            </span>
            <h3>Enter Your Information</h3>
            <input
              type="text"
              placeholder="Name"
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
            {item.concerntype === "found" && (
              <>
                <input
                  type="email"
                  placeholder="Email Address"
                  style={inputStyle}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Proof of Claim (Describe why this item is yours)"
                  style={inputStyle}
                  value={proofOfClaim}
                  onChange={(e) => setProofOfClaim(e.target.value)}
                />
              </>
            )}

            {isLoading ? (
              <Spinner />
            ) : (
              <button
                onClick={
                  item.concerntype === "lost"
                    ? () => handleSubmitHelp(item._id)
                    : () => handleSubmitClaim(item._id)
                }
                style={btnStyleSubmit}
              >
                {item.concerntype === "lost" ? "Submit Help" : "Submit Claim"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItems;
