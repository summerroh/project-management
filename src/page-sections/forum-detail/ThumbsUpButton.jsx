import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ThumbsUp } from "react-feather";
import { useTheme } from "@mui/material";

export default function ThumbsUpButton() {
  const [isPressed, setIsPressed] = useState(false);
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => setIsPressed(!isPressed)}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "34px",
        fontSize: 15,
        color: isPressed ? theme.palette.primary.darkBlue : "primary.grey2",
        maxWidth: 70,
        borderRadius: 2,
        fontWeight: 500,
        backgroundColor: isPressed
          ? theme.palette.primary.lightBlueBackground
          : "transparent",
        minWidth: "fit-content",
        padding: "0.6rem 0.8rem",
      }}
    >
      <ThumbsUp
        color={isPressed ? theme.palette.primary.darkBlue : "#636469"}
        size={18}
        style={{ marginRight: "4px", marginBottom: "2px" }}
      />
      5
    </Button>
  );
}
