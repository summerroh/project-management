import React from "react";
import { Box, InputBase, IconButton, styled } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import SearchIcon from "icons/SearchIcon";

export default function SearchBar({ placeholder }) {
  const [searchText, setSearchText] = React.useState("");
  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <Box
      sx={{
        gap: 2,
        height: 60,
        display: "flex",
        borderRadius: "4px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <InputBase
        fullWidth
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        startAdornment={
          <StyledIconButton onClick={() => {}}>
            <SearchIcon
              sx={{
                color: "#B5B7C0",
              }}
            />
          </StyledIconButton>
        }
        sx={{
          height: "36px",
          fontSize: 14.5,
          fontWeight: 500,
          flexGrow: 1,
          border: "1px solid #CDCDCD",
          borderRadius: 100,
          width: "100%",
          paddingLeft: 3,
          paddingRight: 1,
          backgroundColor: "#ffffff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          "& input::placeholder": {
            fontWeight: 400,
            fontSize: 15.5,
            color: "#B5B7C0",
          },
        }}
      />
    </Box>
  );
}
