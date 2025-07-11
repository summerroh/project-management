import { useTheme } from "@emotion/react";
import { Box, Card, styled, useMediaQuery, IconButton } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import MySelect from "components/MySelect";
import { H6, H7, Tiny } from "components/Typography";
import GreySearchBar from "layouts/layout-parts/GreySearchBar";
import {
  History,
  MessageSquareText,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCallback, useRef, useState, useEffect } from "react";

const navbarHeight = 104;

const historyData = [
  {
    id: 1,
    time: "Sep 8, 10:15 AM",
    version: "v1.2.3",
    name: "Project Manager",
    action: "Project Created",
  },
  {
    id: 2,
    time: "Sep 8, 10:15 AM",
    version: "v1.2.2",
    name: "Frontend Developer",
    action: "UI Component Added",
  },
  {
    id: 3,
    time: "Sep 8, 10:15 AM",
    version: "v1.2.1",
    name: "Backend Developer",
    action: "API Endpoint Modified",
  },
  {
    id: 4,
    time: "Sep 8, 10:15 AM",
    version: "v1.2.0",
    name: "QA Engineer",
    action: "Test Case Updated",
  },
  {
    id: 5,
    time: "Sep 8, 10:15 AM",
    version: "v1.1.9",
    name: "DevOps Engineer",
    action: "Deployment Config Changed",
  },
  {
    id: 6,
    time: "Sep 8, 10:15 AM",
    version: "v1.1.8",
    name: "UX Designer",
    action: "Design System Updated",
  },
  {
    id: 7,
    time: "Sep 8, 10:15 AM",
    version: "v1.1.7",
    name: "Tech Lead",
    action: "Code Review Completed",
  },
  {
    id: 8,
    time: "Sep 8, 10:15 AM",
    version: "v1.1.6",
    name: "Senior Developer",
    action: "Performance Optimized",
  },
];

// ----------------------------------
// styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: `calc(100vh - ${navbarHeight}px)`,
  flexDirection: "column",
  border: "none",
  borderLeft: `1px solid #E1E1E1`,
  borderRadius: 0,
  position: "relative",
  overflow: "auto",
}));

export default function HistoryPanel({ setRightPanel, onResize }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const resizeRef = useRef(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [panelWidth, setPanelWidth] = useState(2.5);

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

  const ContentWrapper = styled(Box)(({ theme }) => ({
    transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
  }));

  return (
    <StyledCard
      sx={{
        backgroundColor: isPanelCollapsed
          ? theme.palette.primary.grey2
          : theme.palette.primary.white,
      }}
    >
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
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      />
      {/* 윗 메뉴 */}
      <Box
        sx={{
          height: "50px",
          width: "100%",
          backgroundColor: theme.palette.primary.grey2,
          padding: "0.8rem 1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onClick={togglePanel}
          sx={{ color: theme.palette.primary.white, paddingLeft: 0 }}
        >
          {isPanelCollapsed ? (
            <ChevronLeft size={22} />
          ) : (
            <ChevronRight size={22} />
          )}
        </IconButton>

        {!isPanelCollapsed && (
          <ContentWrapper
            sx={{
              opacity: isContentVisible ? 1 : 0,
              transform: isContentVisible
                ? "translateX(0)"
                : "translateX(-20px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FlexBox gap={0.6} style={{ cursor: "pointer" }}>
              <FlexRowAlign
                gap={1}
                sx={{
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <History size={22} color={theme.palette.primary.white} />
                <H6 sx={{ color: theme.palette.primary.white }}>History</H6>
              </FlexRowAlign>
            </FlexBox>

            <FlexBox gap={1}>
              <MessageSquareText
                onClick={() => setRightPanel("comment")}
                size={22}
                color={theme.palette.primary.grey400}
                style={{ cursor: "pointer" }}
              />
              <Search
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                size={20}
                color={theme.palette.primary.grey400}
                style={{ cursor: "pointer" }}
              />
              <X
                onClick={() => setRightPanel("comment")}
                size={22}
                color={theme.palette.primary.grey400}
                style={{ cursor: "pointer" }}
              />
            </FlexBox>
          </ContentWrapper>
        )}
      </Box>

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
          }}
        >
          <Box sx={{ width: "100%" }} mt={2}>
            <Box px={2} sx={{ overflow: "hidden" }}>
              <MySelect
                items={["Current Version", "Previous Version"]}
                width={"100%"}
                height={"40px"}
                placeholder={"Current Version"}
              />
            </Box>

            {historyData.map((comment) => (
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
                  <Box>
                    <H6>{comment.time}</H6>
                    <Tiny color="text.secondary">{comment.version}</Tiny>
                  </Box>
                </Box>

                <FlexRowAlign gap={0.5} justifyContent={"flex-start"}>
                  <Box
                    sx={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: theme.palette.primary.green,
                      borderRadius: "50%",
                    }}
                  />
                  <H7>{comment.name}</H7>
                </FlexRowAlign>
              </FlexBox>
            ))}
          </Box>
        </ContentWrapper>
      )}
    </StyledCard>
  );
}
