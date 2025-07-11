import { Box, CircularProgress } from "@mui/material";
import NProgress from "nprogress";
import React, { useEffect } from "react";

const LoadingScreen = () => {
  NProgress.configure({
    showSpinner: false,
  });

  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
