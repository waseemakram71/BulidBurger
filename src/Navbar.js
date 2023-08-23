import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./assects/logo-pic.png";
import { auth } from "./firebase"; // Import the auth object

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user state based on authentication status
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="nav">
      <img src={logo} alt="Logo" className="logo-image" />

      <div className="links">
        <NavLink className="nav-link" to="/">
          BuildBurger
        </NavLink>
        {user ? (
          <button
            className="nav-link"
            style={{ backgroundColor: "transparent", border: "none",paddingTop:"5px" }}
            onClick={() => auth.signOut()}
          >
            Signout
          </button>
        ) : (
          <NavLink className="nav-link" to="/signin">
            Authenticate
          </NavLink>
        )}
        <NavLink className="nav-link" to="/cart">
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
