import { styled, TextField } from "@mui/material";
import React from "react";
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
    height: "16px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    borderColor: theme.palette.action.disabled,
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.hover,
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontWeight: 600,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.disabled,
  },
  "& .MuiOutlinedInput-input::placeholder": {
    fontWeight: 300,
    fontSize: 15.5,
    color: "#B5B7C0",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.grey700,
  },
  "& .MuiInputBase-input.Mui-disabled::placeholder": {
    fontWeight: 400,
    color: theme.palette.primary.dark,
    opacity: 1,
  },
  backgroundColor: theme.palette.primary.lightBlueBackground,
}));

const AppTextField = (props) => {
  return <StyledTextField {...props} />;
};

export default AppTextField;
