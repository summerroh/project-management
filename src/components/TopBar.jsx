import { useState } from "react";
import Box from "@mui/material/Box";

import { H3, H5, Small } from "./Typography";
import { ChevronLeft } from "react-feather";
import FlexRowAlign from "./flexbox/FlexRowAlign";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

export default function TopBar({ title }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FlexRowAlign pb={isMobile ? 2 : 4} sx={{ backgroundColor: "white" }}>
      <Box
        onClick={() => navigate(-1)}
        sx={{ position: "absolute", left: 10, marginTop: "5px" }}
      >
        <ChevronLeft />
      </Box>
      <H3 sx={{ fontWeight: 700, textAlign: "center" }}>{title}</H3>
    </FlexRowAlign>
  );
}
