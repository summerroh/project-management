import React from "react";
import SearchIcon from "icons/SearchIcon";
import { Box, Button, InputAdornment, InputBase, Slide } from "@mui/material"; // --------------------------------------------------------

// --------------------------------------------------------
const SearchBar = ({ open, handleClose }) => {
  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          gap: 2,
          left: 0,
          top: -16,
          height: 60,
          zIndex: 9999,
          boxShadow: 1,
          width: "100%",
          display: "flex",
          padding: "0 1rem",
          borderRadius: "4px",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "background.paper",
        }}
      >
        <InputBase
          autoFocus
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: "text.disabled",
                }}
              />
            </InputAdornment>
          }
          sx={{
            fontSize: 15,
            fontWeight: 500,
            flexGrow: 1,
          }}
        />

        <Button variant="contained" onClick={handleClose}>
          Search
        </Button>
      </Box>
    </Slide>
  );
};

export default SearchBar;
