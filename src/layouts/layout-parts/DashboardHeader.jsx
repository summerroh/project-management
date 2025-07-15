import { DndContext, useDraggable } from "@dnd-kit/core";
import {
  AppBar,
  Box,
  Button,
  Divider,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PlaceholderAvatar from "components/PlaceholderAvatar";
import { ButtonText, H6 } from "components/Typography";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import { useAuth } from "contexts/AuthContext";
import { SettingsContext } from "contexts/settingsContext";
import LoginModal from "pages/login-modal";
import SignupModal from "pages/signup-modal";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next"; // Add this import
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LanguagePopover from "./popovers/LanguagePopover";

// ------------------------------------------------
const StyledToolBar = styled(Toolbar)(() => ({
  alignItems: "center",
  justifyContent: "space-between",
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

const DashboardHeader = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const [showPanel, setShowPanel] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openSearchBar, setSearchBar] = useState(false);
  const { settings, saveSettings } = useContext(SettingsContext);

  const { setNodeRef, listeners, transform } = useDraggable({
    id: "draggable",
  });

  const location = useLocation();

  const DashboardHeaderRoot = styled(AppBar)(({ theme }) => ({
    zIndex: 1201,
    boxShadow: "none",
    padding: isTablet ? "0.5rem 1rem" : "0rem 1rem",
    boxShadow: "0px 12px 12px rgba(0, 0, 0, 0.02)",
    width: "100%",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #E1E1E1",
    color: theme.palette.text.primary,
    height: "58px", // Add this line to set a consistent height
    display: "flex",
    justifyContent: "center",
    position: "sticky",
    top: 0,
  }));

  const { isLoggedIn, user, logout } = useAuth();
  console.log("Header: user: ", user);

  const handleLogout = async () => {
    try {
      await logout();
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to ensure state updates
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const { t } = useTranslation(); // Add this line

  return (
    <DashboardHeaderRoot>
      <SignupModal
        open={showSignupModal}
        setShowSignupModal={setShowSignupModal}
      />
      <LoginModal open={showLoginModal} setShowLoginModal={setShowLoginModal} />

      {isTablet && (
        <StyledToolBar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {downMd && (
              <Box
                sx={{
                  cursor: "pointer",
                }}
                onClick={setShowMobileSideBar}
              >
                <ToggleIcon />
                <ToggleIcon width={18} />
                <ToggleIcon width={9} />
              </Box>
            )} */}
            <NavLink to={`/intro`}>
              <img
                width="88px"
                src={"/static/logos/forsea-small.png"}
                alt={"logo"}
                style={{
                  cursor: "pointer",
                  marginLeft: "2px",
                }}
              />
            </NavLink>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ marginLeft: "10px", marginRight: "4px" }}
            />

            <NavLink to={`/intro`}>
              <img
                width="88px"
                src={"/static/logos/fukunari-small.png"}
                alt={"logo"}
                style={{
                  cursor: "pointer",
                  marginLeft: "2px",
                }}
              />
            </NavLink>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <LanguagePopover />
            </Box>
          </Box>
        </StyledToolBar>
      )}

      <DndContext>
        <StyledToolBar
          // onMouseEnter={() => setShowPanel(true)}
          // onMouseLeave={() => setShowPanel(false)}

          ref={setNodeRef}
          {...listeners}
          style={{
            width: "100%",
            overflow: "visible",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none",
            display: "flex", // Add this line
            flexDirection: "row", // For Internet Explorer and Edge
            transform: transform
              ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
              : undefined,
          }}
        >
          {!isTablet && (
            <>
              <Box
                sx={{
                  display: "flex",
                  width: "220px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingX: 2,
                }}
              >
                <NavLink to={`/about`}>
                  <img
                    width="88px"
                    src={"/static/logos/forsea-small.png"}
                    alt={"logo"}
                    style={{
                      cursor: "pointer",
                      marginLeft: "2px",
                    }}
                  />
                </NavLink>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginLeft: "10px", marginRight: "4px" }}
                />

                <NavLink to={`/about`}>
                  <img
                    width="88px"
                    src={"/static/logos/fukunari-small.png"}
                    alt={"logo"}
                    style={{
                      cursor: "pointer",
                      marginLeft: "2px",
                    }}
                  />
                </NavLink>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingX: 2,
                  gap: 3,
                }}
              >
                <NavLink
                  to="/about"
                  style={({ isActive }) => ({
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.primary.darkBlue,
                    textDecoration: "none",
                  })}
                >
                  <H6 fontWeight={600}>{t("header.company_introduction")}</H6>
                </NavLink>

                <NavLink
                  to="/forum"
                  style={({ isActive }) => ({
                    color:
                      isActive && location.pathname === "/forum"
                        ? theme.palette.primary.main
                        : theme.palette.primary.darkBlue,
                    textDecoration: "none",
                  })}
                >
                  <H6 fontWeight={600}>{t("header.board")}</H6>
                </NavLink>

                <NavLink
                  to="/forum/my-list"
                  style={({ isActive }) => ({
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.primary.darkBlue,
                    textDecoration: "none",
                  })}
                >
                  <H6 fontWeight={600}>{t("header.my_posts")}</H6>
                </NavLink>

                {isLoggedIn ? (
                  <H6
                    onClick={handleLogout}
                    fontWeight={600}
                    style={{
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      color: theme.palette.primary.darkBlue,
                    }}
                  >
                    {t("header.logout")}
                  </H6>
                ) : (
                  <H6
                    onClick={() => navigate("/login")}
                    fontWeight={600}
                    style={{
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      color: theme.palette.primary.darkBlue,
                    }}
                  >
                    {t("header.login")}
                  </H6>
                )}

                <Button
                  onClick={() => navigate("/forum/write")}
                  variant="contained"
                  size="small"
                  sx={{
                    height: "34px",
                    fontSize: 14.5,
                    borderRadius: 2,
                    maxWidth: "70px",
                    minWidth: "70px",
                    whiteSpace: "nowrap",
                    borderRadius: 2,
                    background: theme.palette.primary.darkBlue,
                    "&:hover": {
                      background: theme.palette.primary.darkBlueHover,
                    },
                  }}
                >
                  <ButtonText>{t("header.write")}</ButtonText>
                </Button>

                {isLoggedIn && (
                  <FlexBox alignItems="center" gap={1}>
                    <FlexBox style={{ width: "34px", height: "34px" }}>
                      {isLoggedIn && user?.profileImage ? (
                        <PlaceholderAvatar source={user.profileImage} />
                      ) : (
                        <PlaceholderAvatar />
                      )}
                    </FlexBox>
                    <H6
                      fontWeight={600}
                      style={{
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        color: theme.palette.primary.darkBlue,
                      }}
                    >
                      {user.userName}
                    </H6>
                  </FlexBox>
                )}

                <LanguagePopover />
              </Box>
            </>
          )}
        </StyledToolBar>
      </DndContext>
    </DashboardHeaderRoot>
  );
};

export default DashboardHeader;
