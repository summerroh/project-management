import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

export default function ColorPalette({ color, onChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleColorChange = (newColor) => {
    onChange(newColor);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  // Updated color array with the new values in the specified order
  const colors = [
    "#151515",
    "#787878",
    "#C2C2C2",
    "#EEEEEE",
    "#FFFFFF",
    "#FECCBE",
    "#FEEFC5",
    "#E4F0D5",
    "#B8E9FF",
    "#E0BFE6",
    "#FD8A69",
    "#FFCD4A",
    "#AFD485",
    "#58CCFF",
    "#B96BC6",
    "#FC5230",
    "#FD9F28",
    "#7DB249",
    "#18A8F1",
    "#9A30AE",
    "#D94925",
    "#FD6F22",
    "#568A35",
    "#1187CF",
    "#692498",
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: "200px",
        left: isMobile ? "20px" : "auto",
        zIndex: 1000,
        background: "white",
        padding: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "5px",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "5px",
        }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: color,
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
}
