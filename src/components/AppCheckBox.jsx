import { Box, Checkbox } from "@mui/material";
import BlankCheckBoxIcon from "icons/BlankCheckBoxIcon";
import CheckBoxIcon from "icons/CheckBoxIcon";
import React from "react";
import { TableContent } from "./Typography";

const AppCheckBox = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        direction: "row",
        alignItems: "center",
      }}
    >
      <Checkbox
        {...props}
        disableRipple
        sx={{ backgroundColor: "#ffffff" }}
        checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />}
        icon={<BlankCheckBoxIcon fontSize="small" color="disabled" />}
      />
      {props.label && <TableContent ml={1}>{props.label}</TableContent>}
    </Box>
  );
};

export default AppCheckBox;
