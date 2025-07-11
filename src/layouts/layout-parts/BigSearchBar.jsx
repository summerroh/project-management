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
  useMediaQuery,
  Button,
} from "@mui/material";
import SearchIcon from "icons/SearchIcon";
import { useEffect, useRef, useState } from "react";
import logo from "assets/course/logo-sag.png";
import Lottie from "lottie-react";
import fire from "assets/jiwongum/main2/fire.json";
import { H3, H8, Small } from "components/Typography";
import FlexRowAlign from "components/flexbox/FlexRowAlign";

const BigSearchBar = ({ open, handleClose, isHeader }) => {
  const theme = useTheme();
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState(0); // New state for current set of searches
  const lessThan1500 = useMediaQuery("(max-width:1500px)");
  const lessThan1200 = useMediaQuery("(max-width:1200px)");
  const lessThan1300 = useMediaQuery("(max-width:1300px)");
  const lessThan900 = useMediaQuery("(max-width:900px)");
  const lessThan600 = useMediaQuery("(max-width:600px)");
  const lessThan400 = useMediaQuery("(max-width:400px)");
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

  useEffect(() => {
    if (lessThan600) {
      const interval = setInterval(() => {
        setCurrentSet((prevSet) => (prevSet === 0 ? 1 : 0));
      }, 2000); // Change every 2 seconds

      return () => clearInterval(interval);
    }
  }, [lessThan600]);

  const StyledInputContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    maxWidth: "1100px",
    alignItems: "center",
    height: "40px",
  }));

  const GradientBorderSVG = styled("svg")(({ theme }) => ({
    position: "absolute",
    top: -5,
    left: -5,
    width: "calc(100% + 10px)",
    height: "calc(100% + 10px)",
    pointerEvents: "none",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: "100%",
    height: "36px",
    fontSize: 14,
    fontWeight: 500,
    paddingTop: "3px",
    paddingLeft: "16px",
    paddingRight: "8px",
    position: "relative",
    zIndex: 1,
    background: "none",
    "& input::placeholder": {
      fontWeight: 400,
      fontSize: 15,
      color: "#B5B7C0",
    },
  }));

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const SearchPanel = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 2,
    display: "flex",
    marginTop: "8px",
    boxShadow: "0 10px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #E0E0E0",
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

  const displayedSearches = lessThan600
    ? popularSearches.slice(currentSet * 5, currentSet * 5 + 5)
    : popularSearches;

  return (
    <StyledInputContainer>
      <GradientBorderSVG
        viewBox={
          isHeader && lessThan1300
            ? `0 0 740 140`
            : isHeader && lessThan1500
            ? `0 0 840 140`
            : isHeader
            ? `0 0 1040 140`
            : lessThan400
            ? `0 0 740 140`
            : lessThan600
            ? `0 0 1140 140`
            : lessThan900
            ? `0 0 1540 140`
            : lessThan1200
            ? `0 0 1940 140`
            : lessThan1500
            ? `0 0 1840 140`
            : `0 0 2040 140`
        }
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#B187FF", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "#5C92D2",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feFlood floodColor="rgba(0,0,0,0.3)" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          x="15"
          y="15"
          width="calc(100% - 30px)"
          height="calc(100% - 30px)"
          fill="white"
        />
        <rect
          x="15"
          y="15"
          width="calc(100% - 30px)"
          height="calc(100% - 30px)"
          fill="white"
          stroke="url(#gradient)"
          strokeWidth="2.5"
          rx={lessThan1500 ? 44 : 44}
          filter="url(#shadow)"
        />
      </GradientBorderSVG>
      <StyledInputBase
        inputRef={inputRef}
        placeholder="키워드를 검색해 보세요"
        onFocus={handleInputFocus}
        startAdornment={
          <StyledIconButton>
            <SearchIcon
              sx={{
                color: "#B5B7C0",
              }}
            />
          </StyledIconButton>
        }
      />
      {isSearchPanelOpen && (
        <SearchPanel ref={searchPanelRef}>
          <SearchPanelSection sx={{ flex: 1 }}>
            <Typography variant="subtitle1">최근 검색어</Typography>
            {/* Add recent searches list here */}
          </SearchPanelSection>
          <Box
            sx={{
              width: "1px",
              backgroundColor: "#E0E0E0",
              margin: "16px 0",
            }}
          />
          <SearchPanelSection sx={{ flex: 2 }}>
            <FlexRowAlign
              sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Lottie
                  renderer="svg"
                  animationData={fire}
                  loop={true}
                  autoplay={true}
                  style={{
                    width: "32px",
                    height: "36px",
                    paddingBottom: "12px",
                  }}
                />
                <Typography variant="subtitle1">인기 검색어</Typography>
              </Box>
              <Small
                sx={{ cursor: "pointer" }}
                onClick={() => setIsSearchPanelOpen(false)}
              >
                닫기
              </Small>
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
                          <strong>{index + 1 + currentSet * 5}.</strong>{" "}
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
        </SearchPanel>
      )}
    </StyledInputContainer>
  );
};

export default BigSearchBar;
