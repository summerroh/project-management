import { useTheme } from "@emotion/react";
import { Box, IconButton, styled, useMediaQuery } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { H6 } from "components/Typography";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Folder,
  Menu,
  SquarePen,
} from "lucide-react";
import { useState } from "react";
import MenuContent from "./MenuContent";

const navbarHeight = 67;

const StyledCard = styled(Box)(({}) => ({
  display: "flex",
  height: `calc(100vh - ${navbarHeight}px)`,
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  transition: "width 0.3s ease-in-out",
  borderRight: `1px solid #E1E1E1`,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
}));

export default function MenuPanel({ setIsLeftPanelCollapsed }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activityFilter, setActivityFilter] = useState("All My Activities");
  const [userFilter, setUserFilter] = useState("All Users");
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleLogoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);

  const togglePanel = () => {
    if (isPanelCollapsed) {
      setIsPanelCollapsed(false);
      setTimeout(() => setIsContentVisible(true), 150);
    } else {
      setIsContentVisible(false);
      setTimeout(() => setIsPanelCollapsed(true), 300);
    }
    setIsLeftPanelCollapsed(!isPanelCollapsed);
  };

  if (isTablet) return null;

  return (
    <StyledCard
      sx={{
        width: "100%",
        backgroundColor: isPanelCollapsed
          ? theme.palette.primary.grey2
          : theme.palette.primary.white,
      }}
    >
      {/* 접기버튼 있는 상단 메뉴 */}
      {/* <Box
        sx={{
          width: "100%",
          padding: "0.8rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          height: "50px",
          backgroundColor: theme.palette.primary.grey2,
        }}
      >
        <IconButton
          onClick={togglePanel}
          sx={{ color: theme.palette.primary.white, paddingLeft: 0 }}
        >
          {isPanelCollapsed ? (
            <ChevronRight size={22} />
          ) : (
            <ChevronLeft size={22} />
          )}
        </IconButton>

        <ContentWrapper
          sx={{
            opacity: isContentVisible ? 1 : 0,
            transform: isContentVisible ? "translateX(0)" : "translateX(-20px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!isPanelCollapsed && (
            <>
              <FlexBox
                gap={0.6}
                style={{ cursor: "pointer" }}
                onClick={handleLogoClick}
              >
                <H6 sx={{ color: theme.palette.primary.white }}>
                  Syntra
                </H6>
                <ChevronDown size={22} color={theme.palette.primary.white} />
              </FlexBox>

              <FlexBox gap={1}>
                <Menu
                  size={22}
                  color={theme.palette.primary.grey400}
                  style={{ cursor: "pointer" }}
                  onClick={handleMenuClick}
                />
                <SquarePen
                  size={20}
                  color={theme.palette.primary.grey400}
                  style={{ cursor: "pointer" }}
                />
              </FlexBox>
            </>
          )}
        </ContentWrapper>
      </Box> */}

      <ContentWrapper
        sx={{
          opacity: isContentVisible ? 1 : 0,
          transform: isContentVisible ? "translateX(0)" : "translateX(-20px)",
          height: "100%",
          overflow: "auto",
        }}
      >
        {!isPanelCollapsed && (
          <>
            <Box
              sx={{ flexDirection: "column", display: "flex", width: "100%" }}
            >
              <FlexRowAlign
                mt={1.5}
                mb={0.5}
                px={2.5}
                gap={1}
                sx={{
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Folder size={20} color={theme.palette.primary.grey300} />
                <H6>Projects</H6>
              </FlexRowAlign>

              <MenuContent />
            </Box>
          </>
        )}
      </ContentWrapper>
    </StyledCard>
  );
}
