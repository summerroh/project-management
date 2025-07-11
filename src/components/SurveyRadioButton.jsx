import { Box, Button, useTheme } from "@mui/material"; // Assuming you're using Material-UI components
import { H7 } from "./Typography";

export default function SurveyRadioButton({ title, isChecked, setIsChecked }) {
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
        <H7 ml={1} sx={{ textAlign: "left", lineHeight: 1.4 }}>
          {title}
        </H7>
      </Box>
    </Button>
  );
}
