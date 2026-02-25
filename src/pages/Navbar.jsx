import React from "react";

export default function Navbar({ onRefresh }) {
  return (
    <div
      style={{
        backgroundColor: "#1da1f2",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <h3 style={{ margin: 0 }}>Tweet App</h3>

      <button
        onClick={onRefresh}
        style={{
          backgroundColor: "white",
          color: "#1da1f2",
          border: "none",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Refresh Tweets
      </button>
    </div>
  );
}