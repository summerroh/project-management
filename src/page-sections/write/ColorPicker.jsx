import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

export default function ColorPicker({ color, onChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleColorChange = (newColor) => {
    onChange(newColor);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

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
      <HexColorPicker color={color} onChange={handleColorChange} />
      <HexColorInput
        color={color}
        onChange={handleColorChange}
        style={{
          border: "1px solid #e1e1e1",
          width: "200px",
          height: "30px",
          marginTop: "6px",
          borderRadius: "10px",
          paddingLeft: "10px",
        }}
      />
    </div>
  );
}
