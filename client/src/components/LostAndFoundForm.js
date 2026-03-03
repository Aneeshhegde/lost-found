// import React, { useState, useEffect } from "react";
// import "./LostAndFoundForm.css";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import config from "./config";

// const Base_URL = config.baseURL;
// function LostAndFoundForm() {
//   const [userId, setUserId] = useState(null);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const authToken = localStorage.getItem("authToken");

//         if (!authToken) {
//           console.error("No authentication token found");
//           return;
//         }

//         const decodedToken = decodeJwtToken(authToken);

//         // console.log('decodedToken:', decodedToken);
//         const userId = decodedToken.sub;
//         setUserId(decodedToken.sub);

//         const response = await axios.get(`${Base_URL}/fetchuser/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             withCredentials: true,
//           },
//         });

//         console.log(response);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const decodeJwtToken = (token) => {
//     try {
//       return jwtDecode(token);
//     } catch (error) {
//       console.error("Error decoding JWT token:", error);
//       return null;
//     }
//   };

//   const navigate = useNavigate();
//   const [itemname, setItemName] = useState("");
//   const [itemdescription, setItemDescription] = useState("");
//   const [concerntype, setConcernType] = useState("lost");

//   const convertToBase64 = (e) => {
//     const files = Array.from(e.target.files);

//     const promises = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//       });
//     });

//     Promise.all(promises)
//       .then((imageData) => {
//         setImages([...images, ...imageData]);
//       })
//       .catch((error) => {
//         console.error("Error reading images:", error);
//       });
//   };

//   const handleItemNameChange = (e) => {
//     setItemName(e.target.value);
//   };

//   const handleItemDescriptionChange = (e) => {
//     setItemDescription(e.target.value);
//   };

//   const handleConcernTypeChange = (e) => {
//     setConcernType(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Images:", images);

//     const data = {
//       itemname: itemname,
//       itemdescription: itemdescription,
//       concerntype: concerntype,
//       images: images,
//     };

//     try {
//       await axios.post(`${Base_URL}/item/${userId}`, data);
//       setItemName("");
//       setItemDescription("");
//       setConcernType("lost");
//       setImages([]);

//       alert("Item has been added successfully");

//       navigate("/my-items/");
//     } catch (error) {
//       console.error("Error submitting item:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="lost-and-found-form">
//         <h2>Report Lost or Found Item</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="itemname">Item Name:</label>
//             <input
//               type="text"
//               id="itemname"
//               name="itemname"
//               value={itemname}
//               onChange={handleItemNameChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="itemdescription">Item Description:</label>
//             <textarea
//               id="itemdescription"
//               name="itemdescription"
//               value={itemdescription}
//               onChange={handleItemDescriptionChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="concerntype">Concern Type:</label>
//             <select
//               id="concerntype"
//               name="concerntype"
//               value={concerntype}
//               onChange={handleConcernTypeChange}
//               className="form-group1"
//               style={{ maxWidth: "105%" }}
//             >
//               <option value="lost">Lost</option>
//               <option value="found">Found</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="proofPhotos">Proof Photos:</label>
//             <input
//               type="file"
//               id="proofPhotos"
//               name="proofPhotos"
//               accept="image/*"
//               multiple
//               onChange={convertToBase64}
//             />
//             {images.length > 0 && (
//               <>
//                 <b>Preview:</b>
//                 <div className="image-preview">
//                   {images.map((img, index) => (
//                     <img
//                       key={index}
//                       width={100}
//                       height={100}
//                       src={img}
//                       alt={`Preview ${index}`}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//           <button
//             className="submit-button"
//             type="submit"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default LostAndFoundForm;

import React, { useState, useEffect } from "react";
import "./LostAndFoundForm.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";

const Base_URL = config.baseURL;

function LostAndFoundForm() {
  const [userId, setUserId] = useState(null);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const [itemname, setItemName] = useState("");
  const [itemdescription, setItemDescription] = useState("");
  const [concerntype, setConcernType] = useState("lost");
  const [phonenumber, setPhoneNumber] = useState("");
  const [usn, setUsn] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }

        const decodedToken = decodeJwtToken(authToken);
        const userId = decodedToken?.sub;

        if (!userId) {
          console.error("Unable to decode user ID from token.");
          return;
        }

        setUserId(userId);

        const response = await axios.get(`${Base_URL}/fetchuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });

        console.log("Fetched user:", response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
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

  const convertToBase64 = (e) => {
    const files = Array.from(e.target.files);

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((imageData) => {
        setImages([...images, ...imageData]);
      })
      .catch((error) => {
        console.error("Error reading images:", error);
      });
  };

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleItemDescriptionChange = (e) => setItemDescription(e.target.value);
  const handleConcernTypeChange = (e) => setConcernType(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleUsnChange = (e) => setUsn(e.target.value.toUpperCase());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID not loaded yet. Please wait a moment and try again.");
      return;
    }

    const data = {
      itemname,
      itemdescription,
      concerntype,
      phonenumber,
      usn,
      images,
    };

    console.log("Submitting data:", data);

    try {
      await axios.post(`${Base_URL}/item/${userId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      alert("Item has been added successfully");

      // Clear form
      setItemName("");
      setItemDescription("");
      setConcernType("lost");
      setPhoneNumber("");
      setUsn("");
      setImages([]);

      navigate("/my-items/");
    } catch (error) {
      if (error.response) {
        console.error("Backend error response:", error.response.data);
        
        // Handle validation errors from express-validator
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
          alert(`Validation Error:\n${errorMessages}`);
        } else {
          alert(`Error: ${error.response.data.message || "Something went wrong!"}`);
        }
      } else {
        console.error("Error submitting item:", error);
        alert("An error occurred while submitting the item.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <div className="lost-and-found-form">
          <div className="form-header">
            <h2>📋 Report Lost or Found Item</h2>
            <p className="form-subtitle">Help us reunite items with their owners</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="itemname">📦 Item Name *</label>
                <input
                  type="text"
                  id="itemname"
                  name="itemname"
                  value={itemname}
                  onChange={handleItemNameChange}
                  placeholder="e.g., Blue Wallet, iPhone 13"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="concerntype">🏷️ Type *</label>
                <select
                  id="concerntype"
                  name="concerntype"
                  value={concerntype}
                  onChange={handleConcernTypeChange}
                >
                  <option value="lost">🔴 Lost</option>
                  <option value="found">🟢 Found</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="itemdescription">📝 Item Description *</label>
              <textarea
                id="itemdescription"
                name="itemdescription"
                value={itemdescription}
                onChange={handleItemDescriptionChange}
                placeholder="Provide detailed description (color, brand, unique features, where it was lost/found, etc.)"
                required
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="usn">🎓 Your USN *</label>
                <input
                  type="text"
                  id="usn"
                  name="usn"
                  value={usn}
                  onChange={handleUsnChange}
                  placeholder="e.g., 4NI21CS001"
                  required
                  pattern="[A-Z0-9]+"
                  title="Please enter a valid USN (uppercase letters and numbers)"
                />
                <small className="field-hint">This will only be visible to admin</small>
              </div>

              <div className="form-group">
                <label htmlFor="phonenumber">📱 WhatsApp Number *</label>
                <input
                  type="tel"
                  id="phonenumber"
                  name="phonenumber"
                  value={phonenumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="+91 9876543210"
                  required
                  minLength="10"
                  maxLength="15"
                />
                <small className="field-hint">Include country code</small>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="proofPhotos">📷 Proof Photos (Optional)</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="proofPhotos"
                  name="proofPhotos"
                  accept="image/*"
                  multiple
                  onChange={convertToBase64}
                  className="file-input"
                />
                <label htmlFor="proofPhotos" className="file-upload-label">
                  <span className="upload-icon">📁</span>
                  <span className="upload-text">
                    {images.length > 0 ? `${images.length} image(s) selected` : 'Click to upload images'}
                  </span>
                </label>
              </div>
              {images.length > 0 && (
                <div className="image-preview">
                  {images.map((img, index) => (
                    <div key={index} className="preview-image-wrapper">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="preview-image"
                      />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="submit-button" type="submit">
              <span className="button-icon">✓</span>
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LostAndFoundForm;
