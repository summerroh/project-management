import { DndContext, useDraggable } from "@dnd-kit/core";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  Popover,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import avatar5 from "assets/avatar-5.png";
import AlarmWindow from "components/AlarmWindow";
import FlexBox from "components/flexbox/FlexBox";
import WarningModal from "components/modal/alerts/WarningModal";
import { H2, H6, Tiny } from "components/Typography";
import {
  AlignLeft,
  Bell,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  MessageSquareText,
  Plus,
  Search,
  Settings,
  X,
} from "lucide-react";
import CommentsPanel from "page-sections/insurance-chat/CommentsPanel";
import { MenuData } from "page-sections/insurance-chat/menu-data";
import LoginModal from "pages/login-modal";
import SignupModal from "pages/signup-modal";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import GreySearchBar from "./GreySearchBar";
import ChatRoom from "page-sections/insurance-chat/ChatRoom";

const menus = [
  {
    name: "Projects",
    url: "/projects",
    children: [],
  },
  {
    name: "Board",
    url: "/board",
    children: [],
  },
  {
    name: "Dashboard",
    url: "/dashboard",
    children: [],
  },
  {
    name: "Table",
    url: "/table",
    children: [],
  },
  // {
  //   name: "Tax",
  //   url: "/tax-info",
  //   children: [],
  // },
];

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    padding: "4px 0 4px 0",
    minHeight: "auto",
    maxHeight: "46px",
  },
}));

const PanelContainer = styled(Box)({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  backgroundColor: "#fff",
  paddingTop: "8px",
  paddingBottom: "24px",
  borderRadius: "0px",
  zIndex: 1202,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Row = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  //   maxWidth: "1200px",
  width: "100%",
});

const Column = styled(Box)(({ theme, isFirst }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 16,
  borderRight: isFirst ? "none" : "1px solid #E1E1E1",
  background: isFirst ? "#EFF3FF" : "#FFFFFF",
  borderRadius: isFirst ? "10px" : "0px",
}));

const ColumnItem = styled(Box)(({ theme, isFirstColumn }) => ({
  fontSize: 15,
  fontWeight: 400,
  color: theme.palette.primary.dark,
  padding: "8px 16px",
  borderRadius: "10px",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: isFirstColumn ? "#D3DCFC" : theme.palette.primary.grey700,
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 9,
}));

const DashboardHeaderRoot = styled(AppBar)(({ theme, isLaptop }) => ({
  zIndex: 1201,
  boxShadow: "none",
  padding: isLaptop ? "0.5rem 1rem 0rem 1rem" : "0rem 1rem",
  width: "100%",
  backgroundColor: "#ffffff",
  color: theme.palette.text.primary,
  height: "auto",
  display: "flex",
  justifyContent: "center",
  position: "sticky",
  top: 0,
  borderBottom: "1px solid #E1E1E1",
}));

export default function InsuranceHeader(props) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const [showPanel, setShowPanel] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openSearchBar, setSearchBar] = useState(false);

  const [notificationWindowOpen, setNotificationWindowOpen] = useState(false);

  const handleNotificationClick = () => {
    if (notificationWindowOpen) {
      setIsExiting(true);
      setTimeout(() => {
        setNotificationWindowOpen(false);
        setIsExiting(false);
      }, 300);
    } else {
      setNotificationWindowOpen(true);
    }
  };

  const { setNodeRef, listeners, transform } = useDraggable({
    id: "draggable",
  });

  const location = useLocation();

  const [notificationCount, setNotificationCount] = useState(5);

  const [hoveredMainMenu, setHoveredMainMenu] = useState(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isExiting, setIsExiting] = useState(false);

  const handleMobileMenuToggle = () => {
    if (mobileMenuOpen) {
      setIsExiting(true);
      setTimeout(() => {
        setMobileMenuOpen(false);
        setIsExiting(false);
      }, 300);
    } else {
      setMobileMenuOpen(true);
    }
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    // Navigate to the corresponding URL
    navigate(menus[newValue].url);
  };

  const getCurrentMenuIndex = () => {
    const index = menus.findIndex((menu) =>
      location.pathname.startsWith(menu.url)
    );
    return index !== -1 ? index : 0; // Return 0 (클래스) if no match is found
  };

  const isMenuActive = (menuUrl) => {
    return location.pathname.startsWith(menuUrl);
  };

  const [warningModalOpen, setWarningModalOpen] = useState(false);

  const handleMenuClick = (url) => {
    setMobileMenuOpen(false);

    if (url === "comingsoon") {
      setWarningModalOpen(true);
    } else if (url.startsWith("http")) {
      // Open external links in a new tab/window
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      navigate(url);
    }
  };

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [chatWindowOpen, setChatWindowOpen] = useState(false);

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  const onCommentWindowClose = () => {
    setMobileMenuOpen(false);
    setShowCommentWindow(false);
  };

  const onChatWindowClose = () => {
    setMobileMenuOpen(false);
    setChatWindowOpen(false);
  };

  const MobilePanel = () => {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 1300,
          display: "flex",
          flexDirection: "column",
          height: "calc(100% + 2px)",
          overflow: "hidden",
          animation: isExiting
            ? "slideOut 0.3s ease-out"
            : "slideIn 0.3s ease-out",
          "@keyframes slideIn": {
            from: {
              transform: "translateX(100%)",
            },
            to: {
              transform: "translateX(0)",
            },
          },
          "@keyframes slideOut": {
            from: {
              transform: "translateX(0)",
            },
            to: {
              transform: "translateX(100%)",
            },
          },
        }}
      >
        {showCommentWindow ? (
          <CommentsPanel
            isMobileMenu={true}
            setShowCommentWindow={() => {
              setIsExiting(true);
              setTimeout(() => {
                onCommentWindowClose();
                setIsExiting(false);
              }, 300);
            }}
          />
        ) : chatWindowOpen ? (
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              borderBottom: `1px solid #E1E1E1`,
              height: `100%`,
              overflow: "auto",
              position: "relative",
            }}
          >
            <ChatRoom
              isMobileMenu={true}
              setChatWindowOpen={() => {
                setIsExiting(true);
                setTimeout(() => {
                  onChatWindowClose();
                  setIsExiting(false);
                }, 300);
              }}
            />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                borderBottom: "1px solid #E1E1E1",
              }}
            >
              <Avatar
                src={avatar5}
                alt="profile-photo"
                sx={{ width: 40, height: 40, marginRight: 1 }}
              />
              <H6 fontWeight={600} marginRight={1.5}>
                이한솔
              </H6>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ my: 1, mr: 1.5 }}
              />
              <H6
                mr={1}
                fontWeight={600}
                color="primary.darkBlue"
                onClick={() => navigate("/dashboard/accountinfo")}
              >
                마이페이지
              </H6>
              <H6 fontWeight={600} color="primary.darkBlue">
                내 강의실
              </H6>
              <IconButton
                onClick={handleMobileMenuToggle}
                sx={{ position: "absolute", top: 10, right: 10 }}
              >
                <X size={20} color={theme.palette.primary.grey} />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: "auto", padding: "20px" }}>
              {MenuData.map((item, index) => (
                <React.Fragment key={index}>
                  {item.sectionTitle ? (
                    <H6
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.dark,
                        mb: 1,
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                        "&::before": {
                          content: '""',
                          display: "inline-block",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: theme.palette.primary.dark,
                          marginRight: "8px",
                        },
                      }}
                    >
                      {item.title}
                    </H6>
                  ) : item.title === "divider" ? (
                    <Divider sx={{ my: 2 }} />
                  ) : (
                    <>
                      <Box
                        onClick={() => handleMenuClick(item.path)}
                        sx={{
                          cursor: "pointer",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.grey700,
                          },
                        }}
                      >
                        <Typography variant="body2">{item.title}</Typography>
                      </Box>

                      {item.children && (
                        <Grid container spacing={1} sx={{ ml: 3, mt: 0.5 }}>
                          {item.children
                            .slice(0, 2)
                            .map((child, childIndex) => (
                              <Grid item xs={6} key={childIndex}>
                                <Typography
                                  variant="body2"
                                  onClick={() => handleMenuClick(child.path)}
                                  sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                      color: theme.palette.primary.main,
                                    },
                                  }}
                                >
                                  {child.title}
                                </Typography>
                              </Grid>
                            ))}
                        </Grid>
                      )}
                    </>
                  )}
                </React.Fragment>
              ))}
            </Box>

            <Box
              sx={{
                backgroundColor: theme.palette.primary.darkBlue,
                padding: "15px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {["이용안내", "고객센터", "공지사항"].map((item, index) => (
                <React.Fragment key={index}>
                  <Box
                    component="span"
                    sx={{
                      color: "#fff",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </Box>
                  {index < 2 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        height: "1rem",
                        mx: 1,
                        mt: 0.5,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </>
        )}
      </Box>
    );
  };

  // Add this useEffect to reset showPanel when the location changes
  useEffect(() => {
    setShowPanel(false);
  }, [location]);

  const [showFullMenu, setShowFullMenu] = useState(false);
  const [showCommentWindow, setShowCommentWindow] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [mobileMenuOpen]);

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const handleLogoClick = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const isPopoverOpen = Boolean(popoverAnchorEl);

  return (
    <>
      {showFullMenu && !isTablet && <Overlay />}

      <DashboardHeaderRoot>
        <SignupModal
          open={showSignupModal}
          setShowSignupModal={setShowSignupModal}
        />
        <LoginModal
          open={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />

        {isLaptop && (
          <>
            <StyledToolBar>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NavLink to={`/naver/jiwongumMain2`}>
                  <H2
                    sx={{ fontWeight: 700, color: theme.palette.primary.dark }}
                  >
                    SwiftCloud
                  </H2>
                </NavLink>
              </Box>

              <ClickAwayListener onClickAway={() => setSearchBar(false)}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                    onClick={() => {
                      setShowCommentWindow(true);
                      setMobileMenuOpen(true);
                    }}
                  >
                    <MessageSquareText
                      size={23}
                      color={theme.palette.primary.dark}
                    />
                  </IconButton>

                  <IconButton
                    sx={{
                      height: 40,
                      width: 40,
                      marginBottom: "3px",
                    }}
                    onClick={() => {
                      setChatWindowOpen(true);
                      setMobileMenuOpen(true);
                    }}
                  >
                    <MessageCircle
                      size={23}
                      color={theme.palette.primary.dark}
                    />
                  </IconButton>

                  {/* <IconButton
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                    onClick={handleMobileSearchToggle}
                  >
                    <Search size={23} color={theme.palette.primary.dark} />
                  </IconButton> */}

                  <Box sx={{ position: "relative" }}>
                    <IconButton
                      sx={{
                        height: 40,
                        width: 40,
                      }}
                      onClick={() => {
                        setNotificationWindowOpen(true);
                      }}
                    >
                      <Badge
                        badgeContent={notificationCount}
                        color="error"
                        sx={{
                          "& .MuiBadge-badge": {
                            right: 4,
                            top: 3,
                            border: `2px solid ${theme.palette.background.paper}`,
                            padding: "0px 3px 2px 3px",
                          },
                        }}
                      >
                        <Bell size={23} color={theme.palette.primary.dark} />
                      </Badge>
                    </IconButton>

                    {notificationWindowOpen && (
                      <AlarmWindow
                        onClose={() => {
                          setIsExiting(true);
                          setTimeout(() => {
                            setNotificationWindowOpen(false);
                            setMobileMenuOpen(false);
                            setIsExiting(false);
                          }, 300);
                        }}
                        isExiting={isExiting}
                      />
                    )}
                  </Box>

                  <IconButton
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                    onClick={handleMobileMenuToggle}
                  >
                    <AlignLeft size={23} color={theme.palette.primary.dark} />
                  </IconButton>
                </Box>
              </ClickAwayListener>
            </StyledToolBar>

            {!isTablet && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  ml={1}
                  mr={2}
                  my={1}
                  sx={{
                    width: "100%",
                    minWidth: "400px",
                    padding: "0 0 0 0",
                    position: "relative",
                    zIndex: 1202,
                  }}
                >
                  <GreySearchBar isHeader={true} isMobile={isTablet} />
                </Box>

                <Box sx={{ position: "relative" }}>
                  <IconButton
                    sx={{
                      borderRadius: "10px",
                      border: "1px solid #E1E1E1",
                      height: 40,
                      width: 40,
                    }}
                    onClick={handleNotificationClick}
                  >
                    <Badge
                      badgeContent={notificationCount}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          right: 4,
                          top: 3,
                          border: `2px solid ${theme.palette.background.paper}`,
                          padding: "0px 3px 2px 3px",
                        },
                      }}
                    >
                      <Bell size={23} color={theme.palette.primary.dark} />
                    </Badge>
                  </IconButton>

                  {notificationWindowOpen && (
                    <AlarmWindow
                      onClose={() => setNotificationWindowOpen(false)}
                    />
                  )}
                </Box>

                <IconButton
                  sx={{
                    marginLeft: "10px",
                    borderRadius: "10px",
                    border: "1px solid #E1E1E1",
                    height: 40,
                    padding: "0 10px",
                  }}
                >
                  <FlexBox alignItems="center">
                    <Avatar
                      src={avatar5}
                      alt={"profile-photo"}
                      sx={{ mr: 0.5, width: 30, height: 30 }}
                    />
                  </FlexBox>
                </IconButton>
              </Box>
            )}
          </>
        )}

        {showFullMenu && !isTablet && (
          <PanelContainer
            onMouseEnter={() => setShowFullMenu(true)}
            onMouseLeave={() => {
              setShowFullMenu(false);
              setHoveredMainMenu(null);
              setHoveredSubMenu(null);
            }}
          >
            <Row>
              {menus.map((menu, menuIndex) => (
                <Column key={menuIndex} isFirst={menuIndex === 0}>
                  <ColumnItem isFirstColumn={menuIndex === 0}>
                    <H6 sx={{ fontWeight: 600 }}>{menu.name}</H6>
                    <ChevronRight
                      size={20}
                      color={theme.palette.primary.grey400}
                    />
                  </ColumnItem>
                  {menu.menus.map((subMenu, subIndex) => (
                    <ColumnItem key={subIndex} isFirstColumn={menuIndex === 0}>
                      <Box
                        component="span"
                        onClick={() => handleMenuClick(subMenu.url)}
                        sx={{
                          color: "inherit",
                          textDecoration: "none",
                          width: "100%",
                          cursor: "pointer",
                        }}
                      >
                        {subMenu.name}
                      </Box>
                    </ColumnItem>
                  ))}
                </Column>
              ))}
            </Row>
          </PanelContainer>
        )}

        <DndContext>
          <FlexBox
            sx={{ flexDirection: "column", alignItems: "center" }}
            onMouseLeave={() => {
              setHoveredMainMenu(null);
              setHoveredSubMenu(null);
              setShowPanel(false);
              setShowFullMenu(false);
            }}
          >
            {/* First row */}
            <StyledToolBar
              ref={setNodeRef}
              {...listeners}
              style={{
                width: "100%",
                overflow: "visible",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                display: "flex",
                flexDirection: "row",
                transform: transform
                  ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                  : undefined,
                WebkitOverflowScrolling: "touch",
              }}
            >
              {!isLaptop && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <>
                      <FlexBox
                        gap={0.6}
                        style={{
                          cursor: "pointer",
                          width: "190px",
                          alignItems: "center",
                        }}
                        onClick={handleLogoClick}
                      >
                        <FlexBox
                          mr={0.4}
                          onClick={handleLogoClick}
                          sx={{
                            backgroundColor: theme.palette.primary.white,
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            border: `1px solid #E1E1E1`,
                          }}
                        >
                          <img
                            src={"/static/logos/summer-logo.svg"}
                            width={"24px"}
                          />
                        </FlexBox>
                        <H6
                          sx={{
                            color: theme.palette.primary.dark,
                            fontWeight: 600,
                          }}
                        >
                          SwiftCloud
                        </H6>
                        <ChevronDown
                          size={22}
                          color={theme.palette.primary.dark}
                        />
                      </FlexBox>
                    </>

                    {menus.map((menu) => (
                      <H6
                        key={menu.name}
                        sx={{
                          whiteSpace: "nowrap",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {(menu.name === "Menu" ||
                          menu.name === "System") && (
                          <Settings
                            size={18}
                            style={{ marginLeft: "16px" }}
                            color={
                              isMenuActive(menu.url)
                                ? theme.palette.primary.darkBlue
                                : theme.palette.primary.dark
                            }
                          />
                        )}
                        <Box
                          component="span"
                          onClick={() => handleMenuClick(menu.url)}
                          sx={{
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            color: isMenuActive(menu.url)
                              ? theme.palette.primary.darkBlue
                              : "inherit",
                            marginLeft:
                              menu.name === "Menu" ||
                              menu.name === "System"
                                ? "4px"
                                : "20px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {menu.name}
                        </Box>
                      </H6>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      ml={1}
                      mr={2}
                      my={1}
                      sx={{
                        width: "100%",
                        minWidth: "400px",
                        padding: "0 0 0 0",
                        position: "relative",
                        zIndex: 1202,
                      }}
                    >
                      <GreySearchBar isHeader={true} isMobile={isTablet} />
                    </Box>

                    <Box sx={{ position: "relative" }}>
                      <IconButton
                        sx={{
                          borderRadius: "10px",
                          border: "1px solid #E1E1E1",
                          height: 40,
                          width: 40,
                        }}
                        onClick={handleNotificationClick}
                      >
                        <Badge
                          badgeContent={notificationCount}
                          color="error"
                          sx={{
                            "& .MuiBadge-badge": {
                              right: 4,
                              top: 3,
                              border: `2px solid ${theme.palette.background.paper}`,
                              padding: "0px 3px 2px 3px",
                            },
                          }}
                        >
                          <Bell size={23} color={theme.palette.primary.dark} />
                        </Badge>
                      </IconButton>

                      {notificationWindowOpen && (
                        <AlarmWindow
                          onClose={() => setNotificationWindowOpen(false)}
                        />
                      )}
                    </Box>

                    <IconButton
                      sx={{
                        marginLeft: "10px",
                        borderRadius: "10px",
                        border: "1px solid #E1E1E1",
                        height: 40,
                        padding: "0 10px",
                      }}
                    >
                      <FlexBox alignItems="center">
                        <Avatar
                          src={avatar5}
                          alt={"profile-photo"}
                          sx={{ mr: 0.5, width: 30, height: 30 }}
                        />
                      </FlexBox>
                    </IconButton>
                  </Box>
                </>
              )}
            </StyledToolBar>
          </FlexBox>
        </DndContext>
      </DashboardHeaderRoot>

      {mobileMenuOpen && <MobilePanel />}

      <WarningModal
        showModal={warningModalOpen}
        setShowModal={setWarningModalOpen}
        title="경고"
        messages={["아직 준비중인 서비스입니다."]}
      />

      <Popover
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <FlexBox sx={{ mb: 1 }}>
            <FlexBox
              mr={1}
              onClick={handleLogoClick}
              sx={{
                backgroundColor: theme.palette.primary.white,
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                border: `1px solid #E1E1E1`,
              }}
            >
              <img src={"/static/logos/summer-logo.svg"} width={"28px"} />
            </FlexBox>
            <FlexBox flexDirection={"column"}>
              <Tiny sx={{ color: theme.palette.primary.dark }}>
                SwiftCloud
              </Tiny>
              <Tiny sx={{ fontWeight: 400 }}>
                a7f3b9c2-e1d5-4f8a-9b6e-2c8d7f1e0a3x
              </Tiny>
            </FlexBox>
          </FlexBox>
          <FlexBox sx={{ alignItems: "center", mt: 1 }}>
            <FlexBox
              mr={1}
              sx={{
                backgroundColor: theme.palette.primary.grey,
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Plus size={22} color={theme.palette.primary.white} />
            </FlexBox>
            <Tiny
              sx={{
                color: theme.palette.primary.dark,
                cursor: "pointer",
              }}
            >
              워크스페이스 추가
            </Tiny>
          </FlexBox>
        </Box>
      </Popover>
    </>
  );
}
