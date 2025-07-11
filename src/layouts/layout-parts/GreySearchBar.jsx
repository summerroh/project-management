import { useTheme } from "@emotion/react";
import {
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import fire from "assets/jiwongum/main2/fire.json";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import Lottie from "lottie-react";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function GreySearchBar({ isMobile }) {
  const theme = useTheme();
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const searchPanelRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    setIsSearchPanelOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(event.target) &&
        !event.target.closest("input")
      ) {
        setIsSearchPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const StyledInputContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    maxWidth: "1100px",
    alignItems: "center",
    height: "40px",
    backgroundColor: theme.palette.primary.grey700,
    borderRadius: "10px",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: "100%",
    height: "40px",
    fontSize: 14,
    fontWeight: 500,
    paddingLeft: "16px",
    paddingRight: "8px",
    position: "relative",
    zIndex: 1,
    background: "none",
    "& input::placeholder": {
      fontWeight: 400,
      fontSize: 15,
      color: theme.palette.primary.grey400,
    },
  }));

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: "8px",
    color: "#888888",
  }));

  const FloatingSearchPanel = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    maxHeight: "550px",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    marginTop: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #E0E0E0",
    overflowY: "auto",
  }));

  const SearchPanelSection = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: "16px",
  }));

  const popularSearches = [
    { text: "인기 검색어 1", status: "up" },
    { text: "인기 검색어 2", status: "new" },
    { text: "인기 검색어 3", status: "up" },
    { text: "인기 검색어 4", status: "new" },
    { text: "인기 검색어 5", status: "up" },
    { text: "인기 검색어 6", status: "up" },
    { text: "인기 검색어 7", status: "new" },
    { text: "인기 검색어 8", status: "up" },
    { text: "인기 검색어 9", status: "up" },
    { text: "인기 검색어 10", status: "up" },
  ];

  const displayedSearches = isMobile
    ? popularSearches.slice(currentSet * 5, currentSet * 5 + 5)
    : popularSearches;

  const SearchContent = () => (
    <FlexBox sx={{ flexDirection: isMobile ? "column" : "row" }}>
      <SearchPanelSection>
        <Typography variant="subtitle1">최근 검색어</Typography>
      </SearchPanelSection>

      <Box
        sx={{ height: "1px", backgroundColor: "#E0E0E0", margin: "8px 0" }}
      />

      <SearchPanelSection>
        <FlexRowAlign
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Lottie
              renderer="svg"
              animationData={fire}
              loop={true}
              autoplay={true}
              style={{
                width: "24px",
                height: "28px",
                paddingBottom: "8px",
              }}
            />
            <Typography variant="subtitle1">인기 검색어</Typography>
          </Box>
        </FlexRowAlign>
        <List>
          {displayedSearches.map((search, index) => (
            <ListItem key={index} dense>
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>
                      <strong
                        style={{
                          color:
                            index + 1 + currentSet * 5 > 5
                              ? theme.palette.primary.grey400
                              : "inherit",
                        }}
                      >
                        {index + 1 + currentSet * 5}
                      </strong>
                      {"\u00A0\u00A0"}
                      {search.text}
                    </span>
                    {search.status === "up" ? (
                      <span style={{ color: "red" }}>↑</span>
                    ) : (
                      <span style={{ color: "blue" }}>NEW</span>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </SearchPanelSection>
    </FlexBox>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <StyledInputContainer>
        <StyledInputBase
          inputRef={inputRef}
          placeholder="검색어를 입력하세요"
          onFocus={handleInputFocus}
          startAdornment={
            <StyledIconButton>
              <Search size={19} color={theme.palette.primary.grey400} />
            </StyledIconButton>
          }
        />
      </StyledInputContainer>

      {!isMobile && isSearchPanelOpen && (
        <FloatingSearchPanel ref={searchPanelRef}>
          <SearchContent />
        </FloatingSearchPanel>
      )}

      {isMobile && (
        <Box sx={{ flexGrow: 1, overflowY: "auto", marginTop: "16px" }}>
          <SearchContent />
        </Box>
      )}
    </Box>
  );
}
