// import React, { useState } from "react";
// import axios from "axios";
// import config from "./config";

// const Base_URL = config.baseURL;

// const LostItems = (props) => {
//   const { item } = props;

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [userName, setUserName] = useState("");
//   const [userMobile, setUserMobile] = useState("");
//   const [userHostel, setUserHostel] = useState("");
//   const [proofOfClaim, setProofOfClaim] = useState("");

//   const boxStyle = {
//     border: "1px solid #ccc",
//     padding: "10px",
//     borderRadius: "5px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     margin: "10px",
//     display: "flex",
//     flexDirection: "column",
//   };

//   const btnStyle = {
//     backgroundColor: "#0074D9",
//     color: "white",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   };

//   const btnStyleSubmit = {
//     backgroundColor: "green",
//     color: "white",
//     padding: "8px 15px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   };

//   const inputStyle = {
//     width: "90%",
//     height: "15px",
//     marginBottom: "5px",
//   };

//   const imageStyle = {
//     width: "100%",
//     maxHeight: "500px",
//     margin: "5px",
//   };

//   const largerScreenMediaQuery = window.matchMedia("(min-width: 768px)");

//   if (largerScreenMediaQuery.matches) {
//     imageStyle.maxWidth = "40%";
//   } else {
//     imageStyle.maxWidth = "100%";
//   }

//   const closeButtonStyle = {
//     cursor: "pointer",
//   };

//   const handleHelp = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = async () => {
//     setIsModalOpen(false);
//   };

//   const handleSubmitHelp = async (_id) => {
//     const data = {
//       helpername: userName,
//       mobilenumber: userMobile,
//       hostelname: userHostel,
//       itemdetails: `${item.itemname} - ${item.itemdescription}`,
//     };

//     await axios.post(`${Base_URL}/helper`, data);
//     alert(
//       "Thank you for contributing to the growth of our community. We are temporarily taking this item off the portal, with the hope that your assistance may aid in returning it to its original owner."
//     );
//     await axios.delete(`${Base_URL}/helper/${_id}`);
//     closeModal();
//     alert("Item has been successfully removed!");
//   };

//   if (item.concerntype !== "lost") {
//     return null;
//   }

//   return (
//     <div style={boxStyle}>
//       <div>
//         <h2>Name: {item.itemname}</h2>
//         <p>Description: {item.itemdescription}</p>
//         <p>
//           This item has been <b>{item.concerntype}</b>
//         </p>
//         {item.images && item.images.length > 0 && (
//           <div>
//             <p>Images:</p>
//             {item.images.map((image, index) => (
//               <img key={index} src={image} alt="png" style={imageStyle} />
//             ))}
//           </div>
//         )}
//       </div>
//       <button onClick={handleHelp} style={btnStyle}>
//         Help
//       </button>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span
//               className="close"
//               style={closeButtonStyle}
//               onClick={closeModal}
//             >
//               &times;
//             </span>
//             <h3>Enter Your Information</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               style={inputStyle}
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Mobile Number"
//               style={inputStyle}
//               value={userMobile}
//               onChange={(e) => setUserMobile(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Hostel Name"
//               style={inputStyle}
//               value={userHostel}
//               onChange={(e) => setUserHostel(e.target.value)}
//             />
//             {item.concerntype === "found" && (
//               <input
//                 type="text"
//                 placeholder="Proof of Claim"
//                 style={inputStyle}
//                 value={proofOfClaim}
//                 onChange={(e) => setProofOfClaim(e.target.value)}
//               />
//             )}
//             <button onClick={handleSubmitHelp(item._id)} style={btnStyleSubmit}>
//               Submit Help
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LostItems;

import React, { useState } from "react";
import axios from "axios";
import config from "./config";

const Base_URL = config.baseURL;

const LostItems = (props) => {
  const { item } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userHostel, setUserHostel] = useState("");
  const [proofOfClaim, setProofOfClaim] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 💎 Glassmorphism Styles
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
    backgroundColor: "#0074D9",
    color: "#fff",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none",
    width: "100%",
    marginTop: "auto",
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
  };

  const closeButtonStyle = {
    cursor: "pointer",
    fontSize: "20px",
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#333",
  };

  const handleHelp = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitHelp = async (_id) => {
    // Validate inputs
    if (!userName.trim() || !userMobile.trim() || !userHostel.trim()) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    setIsLoading(true);
    const data = {
      helpername: userName,
      mobilenumber: userMobile,
      hostelname: userHostel,
      itemdetails: `${item.itemname} - ${item.itemdescription}`,
    };

    try {
      const response = await axios.post(`${Base_URL}/helper`, data);
      
      if (response.data.success) {
        alert(
          "Thank you for helping to bring the item back! It will be temporarily removed from the portal."
        );
        await axios.delete(`${Base_URL}/item/${_id}`);
        closeModal();
        // Optionally reload the page to refresh the items list
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting help:", error);
      
      if (error.response) {
        if (error.response.status === 400) {
          // Validation error
          const errors = error.response.data.errors;
          if (errors && errors.length > 0) {
            alert(errors.map(err => err.msg).join("\n"));
          } else {
            alert("Invalid input. Please check your details.");
          }
        } else {
          alert(error.response.data.message || "There was an error submitting your help. Please try again.");
        }
      } else if (error.request) {
        alert("Cannot connect to server. Please make sure the server is running.");
      } else {
        alert("There was an error submitting your help. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (item.concerntype !== "lost") {
    return null;
  }

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

      <button style={buttonStyle} onClick={handleHelp}>
        I Can Help
      </button>

      {isModalOpen && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
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
              <input
                type="text"
                placeholder="Proof of Claim"
                style={inputStyle}
                value={proofOfClaim}
                onChange={(e) => setProofOfClaim(e.target.value)}
              />
            )}
            <button
              onClick={() => handleSubmitHelp(item._id)}
              style={buttonStyle}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Help"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Styles
const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  width: "400px",
  position: "relative",
  textAlign: "center",
};

export default LostItems;
