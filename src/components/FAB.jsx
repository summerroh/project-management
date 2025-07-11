import React, { useState } from "react";
import { Box, Fab, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import insta from "assets/fab-insta.png";
import kakao from "assets/fab-kakao.png";
import naver from "assets/fab-naver.png";
import youtube from "assets/fab-youtube.png";

export default function FAB({ marginBottom }) {
  const theme = useTheme();
  const [isFabClicked, setIsFabClicked] = useState(false);

  return (
    <>
      {isFabClicked && (
        <Box
          sx={{
            position: "fixed",
            bottom: 70,
            right: 20,
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
            zIndex: 9999,
            marginBottom: marginBottom ? marginBottom : 0,
          }}
        >
          <img src={insta} alt="icon 1" style={{ width: 44 }} />
          <img
            src={naver}
            alt="icon 2"
            style={{ width: 44, marginBottom: 5 }}
          />
          <img
            src={youtube}
            alt="icon 3"
            style={{ width: 44, marginBottom: 5 }}
          />
          <img
            src={kakao}
            alt="icon 4"
            style={{ width: 44, marginBottom: 5 }}
          />
        </Box>
      )}
      <Fab
        color="primary"
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          paddingY: 0,
          height: 40,
          backgroundColor: "#024EA2",
          color: "#ffffff",
          fontWeight: 500,
          fontSize: 16,
          marginBottom: marginBottom ? marginBottom : 0,
          zIndex: 20,
          "&:hover": {
            backgroundColor: theme.palette.primary.darkBlueHover,
          },
        }}
        onClick={() => setIsFabClicked(!isFabClicked)}
      >
        상담
        <AddIcon sx={{ ml: 0.5, fontSize: "medium" }} />
      </Fab>
    </>
  );
}
