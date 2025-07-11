import { Box, useTheme } from "@mui/material";
import React from "react";

export default function Personacon({
  src,
  index,
  selectedPersonacon,
  setSelectedPersonacon,
}) {
  const theme = useTheme();
  const isSelected = src === selectedPersonacon;

  return (
    <Box
      onClick={() => setSelectedPersonacon(src)}
      sx={{
        cursor: "pointer",
        width: "50px",
        height: "50px",
        borderRadius: 100,
        backgroundColor: isSelected
          ? "#E9EEFC"
          : theme.palette.primary.lightBlueBackground,
        border: "1px solid #E1E1E1",
        borderColor: isSelected
          ? theme.palette.action.disabled
          : theme.palette.action.disabled,

        padding: "5px",
      }}
    >
      <img
        src={src}
        alt="personacon"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 100,
        }}
      />
    </Box>
  );
}
