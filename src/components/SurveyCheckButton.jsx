import React, { useState } from "react";
import { Button, Box, useTheme } from "@mui/material"; // Assuming you're using Material-UI components
import AppCheckBox from "./AppCheckBox"; // Assuming you have a custom checkbox component
import { H7 } from "./Typography";

export default function SurveyCheckButton({ title }) {
  const [isChecked, setIsChecked] = useState(false);
  const theme = useTheme();

  const handleButtonClick = () => {
    setIsChecked(!isChecked); // Toggle the state of isChecked
  };

  return (
    <Button
      item
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: isChecked
          ? "#EAEDF7"
          : theme.palette.primary.lightBlueBackground,
        border: "1px solid #E1E1E1",
        // height: "50px",
        paddingTop: 1.5,
        paddingBottom: 1.5,
        paddingLeft: 1.5,
        paddingRight: 1.5,
        borderRadius: 2,
        justifyContent: "flex-start",
        transition: "background-color 0s",
        "&:hover": {
          backgroundColor: "#EAEDF7",
        },
      }}
      onClick={handleButtonClick} // Call handleButtonClick when the button is clicked
      disableRipple // Disable the ripple effect
    >
      <Box
        sx={{
          display: "flex",
          direction: "row",
          alignItems: "center",
        }}
      >
        <AppCheckBox checked={isChecked} />{" "}
        {/* Pass isChecked as the checked prop */}
        <H7 ml={1} sx={{ textAlign: "left", lineHeight: 1.4 }}>
          {title}
        </H7>
      </Box>
    </Button>
  );
}
