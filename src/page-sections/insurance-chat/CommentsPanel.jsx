import {
  Avatar,
  Box,
  Card,
  IconButton,
  InputAdornment,
  styled,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import avatar5 from "assets/avatar-5.png";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { H6, H7, Tiny } from "components/Typography";
import GreySearchBar from "layouts/layout-parts/GreySearchBar";
import { History, MessageSquareText, Search, Send, X } from "lucide-react";
import { useCallback, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const navbarHeight = 116;

const commentsData = [
  {
    id: 1,
    image: avatar5,
    name: "Project Manager",
    followers: 1234,
    time: "10:17 AM Today",
    content: "Please check the project progress status.",
  },
  {
    id: 2,
    image: avatar5,
    name: "Frontend Developer",
    followers: 5678,
    time: "10:17 AM Today",
    content: "UI component work has been completed.",
  },
  {
    id: 3,
    image: avatar5,
    name: "Backend Developer",
    followers: 9012,
    time: "10:17 AM Today",
    content: "API endpoint testing is required.",
  },
  {
    id: 4,
    image: avatar5,
    name: "QA Engineer",
    followers: 3456,
    time: "10:17 AM Today",
    content: "Currently writing test cases.",
  },
];

// styled components
const StyledCard = styled(Card)(({ theme, isMobileMenu }) => ({
  display: "flex",
  alignItems: "center",
  height: `calc(100vh - ${navbarHeight}px)`,
  flexDirection: "column",
  borderRadius: 0,
  position: "relative",
  overflow: "auto",
  border: "none",
  borderLeft: `1px solid #E1E1E1`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    borderColor: theme.palette.action.disabled,
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
  backgroundColor: theme.palette.primary.lightBlueBackground,
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.disabled,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.disabled,
    borderWidth: 1,
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
}));

export default function CommentsPanel({
  setRightPanel,
  onResize,
  isMobileMenu,
  setShowCommentWindow,
  disableResize,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const [selectedTab, setSelectedTab] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [panelWidth, setPanelWidth] = useState(2.5);
  const resizeRef = useRef(null);
  const [newComment, setNewComment] = useState("");

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (resizeRef.current && !isPanelCollapsed) {
        const newWidth = window.innerWidth - e.clientX;
        const newWidthInXl = (newWidth / window.innerWidth) * 12;
        if (newWidthInXl >= 2 && newWidthInXl <= 6) {
          setPanelWidth(newWidthInXl);
          onResize(newWidthInXl);
        }
      }
    },
    [onResize, isPanelCollapsed]
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const togglePanel = useCallback(() => {
    if (isPanelCollapsed) {
      setIsPanelCollapsed(false);
      setTimeout(() => setIsContentVisible(true), 150);
      onResize(panelWidth);
    } else {
      setIsContentVisible(false);
      setTimeout(() => setIsPanelCollapsed(true), 300);
      onResize(0.4);
    }
  }, [isPanelCollapsed, onResize, panelWidth]);

  useEffect(() => {
    if (isPanelCollapsed) {
      setIsContentVisible(false);
    } else {
      setIsContentVisible(true);
    }
  }, [isPanelCollapsed]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement comment submission logic
    console.log("Submitting comment:", newComment);
    setNewComment("");
  };

  if (isTablet && !isMobileMenu) return null;

  return (
    <StyledCard
      sx={{
        backgroundColor: isPanelCollapsed
          ? theme.palette.primary.white
          : theme.palette.primary.white,
        ...(isMobileMenu && {
          height: "100%",
        }),
      }}
    >
      {!disableResize && (
        <Box
          ref={resizeRef}
          onMouseDown={handleMouseDown}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "5px",
            cursor: "col-resize",
            zIndex: 1000,
            backgroundColor: "transparent",
            // backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
      )}

      {isPanelCollapsed && !isMobileMenu && (
        <FlexBox>
          <FlexBox
            sx={{
              width: "50px",
              height: "40px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={togglePanel}
              sx={{
                width: "30px",
                height: "30px",
                padding: 0,
              }}
            >
              <ChevronLeft size={22} color={theme.palette.primary.grey} />
            </IconButton>
          </FlexBox>
        </FlexBox>
      )}

      {!isPanelCollapsed && isSearchOpen && (
        <Box
          sx={{
            padding: "1rem 1rem",
            width: "100%",
            position: "relative",
          }}
        >
          <GreySearchBar isMobile={isMobile} />
        </Box>
      )}

      {!isPanelCollapsed && (
        <ContentWrapper
          sx={{
            opacity: isContentVisible ? 1 : 0,
            transform: isContentVisible ? "translateX(0)" : "translateX(-20px)",
            height: "100%",
            width: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ width: "100%", flexGrow: 1, overflowY: "auto", padding: 0 }}
          >
            <FlexBox
              width="100%"
              sx={{
                padding: 0,
                justifyContent: isMobileMenu ? "space-between" : "flex-start",
                alignItems: "center",
                borderBottom: `1px solid #E1E1E1`,
              }}
            >
              {!isMobileMenu && (
                <FlexBox
                  sx={{
                    width: "40px",
                    height: "36px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={togglePanel}
                    sx={{
                      width: "30px",
                      height: "30px",
                      padding: 0,
                    }}
                  >
                    {isPanelCollapsed ? (
                      <ChevronLeft
                        size={22}
                        color={theme.palette.primary.grey}
                      />
                    ) : (
                      <ChevronRight
                        size={22}
                        color={theme.palette.primary.grey}
                      />
                    )}
                  </IconButton>
                </FlexBox>
              )}

              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{
                  minHeight: "40px",
                  height: "40px",
                  padding: "0px 0px 0px 14px",
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.palette.primary.violet,
                  },
                }}
              >
                <Tab
                  label="All Comments"
                  sx={{
                    padding: "6px 0px 6px 0px",
                    fontSize: 14.5,
                    color:
                      selectedTab === 0
                        ? theme.palette.primary.violet
                        : theme.palette.primary.grey,
                    minHeight: "40px",
                    "&.Mui-selected": {
                      color: theme.palette.primary.violet,
                    },
                  }}
                />
                <Tab
                  label="Author Comments"
                  sx={{
                    fontSize: 14.5,
                    color:
                      selectedTab === 1
                        ? theme.palette.primary.violet
                        : theme.palette.primary.grey,
                    minHeight: "40px",
                    "&.Mui-selected": {
                      color: theme.palette.primary.violet,
                    },
                  }}
                />
              </Tabs>
              {isMobileMenu && (
                <IconButton
                  onClick={() => setShowCommentWindow(false)}
                  sx={{
                    // padding: "10px",
                    marginRight: "1rem",
                  }}
                >
                  <X size={20} color={theme.palette.primary.grey} />
                </IconButton>
              )}
            </FlexBox>

            {commentsData.map((comment) => (
              <FlexBox
                sx={{
                  cursor: "pointer",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  width: "100%",
                  padding: "1rem",
                  borderBottom: `1px solid #e1e1e1`,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.grey800,
                  },
                }}
              >
                <Box
                  key={comment.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={comment.image}
                      alt={comment.name}
                      sx={{ mr: 1 }}
                    />
                    <Box>
                      <H6>{comment.name}</H6>
                      <Tiny color="text.secondary">{comment.time}</Tiny>
                    </Box>
                  </Box>
                </Box>
                <H7 sx={{ textAlign: "left" }}>{comment.content}</H7>
              </FlexBox>
            ))}
          </Box>

          <StyledTextField
            type="text"
            name="newComment"
                            placeholder="Enter your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              backgroundColor: theme.palette.primary.grey800,
              "& .MuiOutlinedInput-input::placeholder": {
                fontWeight: 300,
                fontSize: 15.5,
                color: "#B5B7C0",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Send
                    size={20}
                    color={theme.palette.primary.grey400}
                    style={{ cursor: "pointer", marginLeft: 8 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </ContentWrapper>
      )}
    </StyledCard>
  );
}
