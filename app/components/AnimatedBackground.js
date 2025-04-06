"use client";

import React from "react";

const AnimatedBackground = ({ children }) => {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
