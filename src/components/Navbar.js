import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav style={{ padding: "10px", background: "#ddd" }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          marginRight: "10px",
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/posts"
        style={({ isActive }) => ({
          marginRight: "10px",
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Posts
      </NavLink>

      <NavLink
        to="/create-post"
        style={({ isActive }) => ({
          marginRight: "10px",
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Create Post
      </NavLink>

      <NavLink
        to="/dashboard"
        style={({ isActive }) => ({
          marginRight: "10px",
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Dashboard
      </NavLink>

      {isLoggedIn ? (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      ) : (
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            marginLeft: "10px",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
