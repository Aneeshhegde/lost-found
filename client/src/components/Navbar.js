// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { logout, selectUser } from "../utils/userSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = useSelector(selectUser);

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   // const user = localStorage.getItem("authToken");

//   const handleToggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     // localStorage.removeItem("authToken");
//     dispatch(logout());
//     navigate("/home").then(() => {
//       // window.location.reload(true);
//       // alert("Successfully logged out");
//     });
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.matchMedia("(max-width: 1000px)").matches);
//     };

//     // Check screen size on mount
//     checkScreenSize();

//     // Add event listener for changes in screen size
//     window.addEventListener("resize", checkScreenSize);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//     };
//   }, []);

//   const navbarStyle = {
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#0077B6",
//     color: "white",
//     padding: "10px 20px",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
//     height: "50px",
//     margin: "auto",
//   };

//   const linkContainerStyle = {
//     display: !isSmallScreen ? "flex" : "none",
//     justifyContent: "center",
//   };

//   const linkStyle = {
//     color: "white",
//     textDecoration: "none",
//     fontSize: "16px",
//     fontWeight: "bold",
//     margin: isSmallScreen ? "10px 0" : "10px 50px",
//     transition: "color 0.3s",
//     display: isSmallScreen ? "block" : "inline-block",
//   };

//   const iconStyle = {
//     cursor: "pointer",
//     display: isSmallScreen ? "block" : "none",
//     marginTop: "15px",
//   };

//   const menuStyle = {
//     display: isSmallScreen ? (menuOpen ? "flex" : "none") : "none", // Updated condition
//     flexDirection: "column",
//     alignItems: "center",
//     position: "absolute",
//     width: "90%",
//     margin: "auto",
//     top: "72px",
//     left: "0",
//     right: "0",
//     backgroundColor: "#0077B6",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
//     zIndex: 1, // Ensure menu is on top
//     transition: "0.5s ease-in-out",
//   };

//   return (
//     <div style={navbarStyle}>
//       <div>
//         <div style={linkContainerStyle}>
//           <Link to="/home" style={linkStyle}>
//             Home
//           </Link>
//           {user && (
//             <>
//               <Link to="/my-items" style={linkStyle}>
//                 My Items
//               </Link>
//               <Link to="/all-items" style={linkStyle}>
//                 All Items
//               </Link>
//               <Link to="/all-items/lost" style={linkStyle}>
//                 Lost
//               </Link>
//               <Link to="/all-items/found" style={linkStyle}>
//                 Found
//               </Link>
//               <Link to="/raise-a-concern" style={linkStyle}>
//                 Raise a concern
//               </Link>
//               <Link to="/helpers" style={linkStyle}>
//                 Helpers
//               </Link>
//               <Link to="/claimants" style={linkStyle}>
//                 Claimers
//               </Link>
//               <Link to="/" style={linkStyle} onClick={handleLogout}>
//                 Logout
//               </Link>
//             </>
//           )}
//           {!user && (
//             <>
//               <Link to="/sign-up" style={linkStyle}>
//                 Sign Up
//               </Link>
//               <Link to="/sign-in" style={linkStyle}>
//                 Sign In
//               </Link>
//             </>
//           )}
//         </div>
//         <span style={iconStyle} onClick={handleToggleMenu}>
//           {menuOpen ? "✕" : "☰"}
//         </span>
//       </div>
//       <div style={menuStyle}>
//         <Link to="/home" style={linkStyle}>
//           Home
//         </Link>
//         {user && (
//           <>
//             <Link to="/my-items" style={linkStyle}>
//               My Items
//             </Link>
//             <Link to="/all-items" style={linkStyle}>
//               All Items
//             </Link>
//             <Link to="/all-items/lost" style={linkStyle}>
//               Lost
//             </Link>
//             <Link to="/all-items/found" style={linkStyle}>
//               Found
//             </Link>
//             <Link to="/raise-a-concern" style={linkStyle}>
//               Raise a concern
//             </Link>
//             <Link to="/helpers" style={linkStyle}>
//               Helpers
//             </Link>
//             <Link to="/claimants" style={linkStyle}>
//               Claimers
//             </Link>
//             <Link to="/" style={linkStyle} onClick={handleLogout}>
//               Logout
//             </Link>
//           </>
//         )}
//         {!user && (
//           <>
//             <Link to="/sign-up" style={linkStyle}>
//               Sign Up
//             </Link>
//             <Link to="/sign-in" style={linkStyle}>
//               Sign In
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 1000px)").matches);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    dispatch(logout());
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    navigate("/home");
  };

  const handleAdminClick = () => {
    setShowAdminModal(true);
  };

  const handleAdminLogin = () => {
    // Admin credentials - you can change these
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";
    
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      setShowAdminModal(false);
      setAdminPassword("");
      
      // Go directly to admin portal (no user login required)
      navigate("/admin");
    } else {
      alert("Incorrect password! Please try again.");
      setAdminPassword("");
    }
  };

  const closeModal = () => {
    setShowAdminModal(false);
    setAdminPassword("");
  };

  // Check if user is admin on mount
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "15px 30px",
    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
    height: "70px",
    position: "sticky",
    top: 0,
    zIndex: 999,
    backdropFilter: "blur(10px)",
  };

  const linkContainerStyle = {
    display: !isSmallScreen ? "flex" : "none",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  };

  const linkStyle = (path) => ({
    background: isActive(path) 
      ? "rgba(255, 255, 255, 0.25)" 
      : "rgba(255, 255, 255, 0.1)",
    color: "white",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "600",
    padding: "10px 18px",
    margin: "0",
    borderRadius: "25px",
    transition: "all 0.3s ease",
    display: "inline-block",
    border: isActive(path) ? "2px solid rgba(255, 255, 255, 0.5)" : "2px solid transparent",
    cursor: "pointer",
    boxShadow: isActive(path)
      ? "0 4px 15px rgba(255, 255, 255, 0.2)"
      : "none",
    backdropFilter: "blur(10px)",
    textTransform: "capitalize",
    letterSpacing: "0.3px",
  });

  const iconStyle = {
    cursor: "pointer",
    display: isSmallScreen ? "block" : "none",
    fontSize: "22px",
    color: "#fff",
  };

  const menuStyle = {
    display: isSmallScreen ? (menuOpen ? "flex" : "none") : "none",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    top: "60px",
    left: "0",
    backgroundColor: "#0077B6",
    zIndex: 100,
    padding: "10px 0",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  };

  const links = [
    { path: "/home", label: "Home" },
    { path: "/my-items", label: "My Items", auth: true },
    { path: "/all-items", label: "All Items", auth: true },
    { path: "/all-items/lost", label: "Lost", auth: true },
    { path: "/all-items/found", label: "Found", auth: true },
    { path: "/raise-a-concern", label: "Raise Concern", auth: true },
    { path: "/sign-up", label: "Sign Up", auth: false },
    { path: "/sign-in", label: "Sign In", auth: false },
  ];

  const handleAdminAccessBeforeLogin = () => {
    // Show admin login modal even before user login
    setShowAdminModal(true);
  };

  return (
    <div style={navbarStyle}>
      <div style={linkContainerStyle}>
        {links
          .filter((link) => user ? link.auth !== false : link.auth !== true)
          .map((link) => (
            <Link key={link.path} to={link.path} style={linkStyle(link.path)}>
              {link.label}
            </Link>
          ))}
        {!user && (
          <button
            onClick={handleAdminAccessBeforeLogin}
            style={{
              ...linkStyle("/admin"),
              backgroundColor: isAdmin ? "#51cf66" : "#ff6b6b",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isAdmin ? "✅ Admin Portal" : "🔐 Admin"}
          </button>
        )}
        {user && (
          <Link to="/" style={linkStyle("/")} onClick={handleLogout}>
            Logout
          </Link>
        )}
        
      </div>

      <span style={iconStyle} onClick={handleToggleMenu}>
        {menuOpen ? "✕" : "☰"}
      </span>

      <div style={menuStyle}>
        {links
          .filter((link) => user ? link.auth !== false : link.auth !== true)
          .map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={linkStyle(link.path)}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        {!user && (
          <button
            onClick={() => {
              setMenuOpen(false);
              handleAdminAccessBeforeLogin();
            }}
            style={{
              ...linkStyle("/admin"),
              backgroundColor: isAdmin ? "#51cf66" : "#ff6b6b",
              color: "white",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {isAdmin ? "✅ Admin Portal" : "🔐 Admin"}
          </button>
        )}
        {user && (
          <Link
            to="/"
            style={linkStyle("/")}
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
          >
            Logout
          </Link>
        )}
        
      </div>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
              width: "400px",
              maxWidth: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>
              🔐 Admin Login
            </h2>
            <p style={{ color: "#7f8c8d", marginBottom: "20px", textAlign: "center" }}>
              Enter admin password to access the admin portal
            </p>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              autoFocus
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleAdminLogin}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              <button
                onClick={closeModal}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#95a5a6",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
