import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  List,
  ListItemButton,
  styled,
  useMediaQuery,
  useTheme,
  Switch,
} from "@mui/material";
import Scrollbar from "components/ScrollBar";
import { ButtonText, H5, H6, H8, Small, Tiny } from "components/Typography";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import LayoutDrawer from "layouts/layout-parts/LayoutDrawer";
import LoginModal from "pages/login-modal";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FlexBox from "../../components/flexbox/FlexBox";
import { sideMenuList1, sideMenuList2 } from "../layout-parts/navList";
import AccordionMenu from "./AccordionMenu";

import img1 from "assets/img1.png";
import logo from "assets/sugar_logo.png";

let width = 230;

// custom styled components
const SidebarWrapper = styled(Box)(({ theme, show }) => ({
  left: show ? 0 : -230,
  // top: headerHeight,
  width: width,
  height: "100%",
  position: "fixed",
  boxShadow: theme.shadows[2],
  transition: "left 0.3s ease",
  zIndex: theme.zIndex.drawer,
  backgroundColor: theme.palette.background.paper,
}));
const StyledLogo = styled(Box)(() => ({
  marginBottom: "1rem",
  marginLeft: "-10px",
}));
const StyledListItemButton = styled(ListItemButton)(({ active, theme }) => ({
  padding: "12px 24px",
  marginBottom: 8,
}));

const SubMenuItem = styled(FlexBox)(({ theme, active }) => ({
  cursor: "pointer",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  padding: "0.6rem 1rem",
  borderRadius: 10,

  "& div": {
    backgroundColor: active
      ? theme.palette.primary.lightBlueBackground
      : theme.palette.grey[600],
  },
  "& small": {
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.lightBlueBackground,
  },
  "&::before": {
    left: 0,
    width: 2,
    content: '""',
    height: "100%",
    borderRadius: 5,
    position: "absolute",
    opacity: active ? 1 : 0,
    transition: "opacity 0.3s ease",
    backgroundColor: theme.palette.primary.lightBlueBackground,
  },
})); // root component

const InvisibleTrigger = styled(Box)(({ theme }) => ({
  position: "fixed",
  left: 0,
  top: 0,
  width: "10px",
  height: "100%",
  zIndex: theme.zIndex.drawer + 1,
}));

const DashboardSidebar = (props) => {
  const theme = useTheme();
  const { showSideBar, setShowSideBar, showMobileSideBar, closeMobileSideBar } =
    props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState("");
  const downMd = useMediaQuery((theme) => theme.breakpoints.down(1200)); // active accordion
  const [saasMenuOpen, setSaasMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAlternateSidebar, setShowAlternateSidebar] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [sideMenuData, setSideMenuData] = useState(sideMenuList1);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const location = useLocation();

  // useEffect(() => {
  //   const isInCommunityTab = sideMenuList2.some(
  //     (item) =>
  //       item.path === pathname ||
  //       (item.children &&
  //         item.children.some((child) => child.path === pathname))
  //   );
  //   const isInClassTab = sideMenuList1.some(
  //     (item) =>
  //       item.path === pathname ||
  //       (item.children &&
  //         item.children.some((child) => child.path === pathname))
  //   );

  //   if (isInCommunityTab) {
  //     setSelectedTab("커뮤니티");
  //     setSideMenuData(sideMenuList2);
  //   } else if (isInClassTab) {
  //     setSelectedTab("정닥터 클래스");
  //     setSideMenuData(sideMenuList1);
  //   }
  // }, [pathname]);

  const saasMenuItems = [
    { title: "Sub Menu 1", path: "/saas/submenu-item-1" },
    { title: "Sub Menu 2", path: "/saas/submenu-item-2" },
  ];

  const handleSaasMenuClick = (path) => {
    setSaasMenuOpen((prevOpen) => !prevOpen);
    if (path) navigate(path);
  };

  const handleSaasArrowClick = () => {
    setSaasMenuOpen((prevOpen) => !prevOpen);
  };

  const activeAccordion = () => {
    sideMenuList1.forEach((list) => {
      if (list.children && list.children.length > 0) {
        const findItem = list.children.find((item) => item.path === pathname);
        if (findItem) setExpanded(list.title);
      }
    });
  };

  useEffect(activeAccordion, [pathname]);

  const handleAccordionChange = (panel) => (_, expand) => {
    setExpanded(expand ? panel : false);
  };

  const handleSubMenuItem = (path) => {
    if (path) navigate(path);
  };

  const activeRoute = (path) => (path === pathname ? 1 : 0); // common side bar content

  const handleToggleSidebar = () => {
    setShowAlternateSidebar(!showAlternateSidebar);
  };

  // Show Sidebar on hover starts
  const [isHovering, setIsHovering] = useState(false);
  const sidebarVisible = useRef(false);
  const sidebarRef = useRef(null);

  const handleMouseEnter = () => {
    if (!downMd) {
      setIsHovering(true);
      setShowSideBar(true);
    }
  };

  const handleMouseLeave = () => {
    if (!downMd) {
      setIsHovering(false);
      setShowSideBar(false);
    }
  };
  // Show Sidebar on hover ends

  const mainSidebarContent = (
    <List
      sx={{
        height: "100%",
      }}
    >
      {/* 드롭다운 메뉴 */}
      {sideMenuData.map((item, index) => {
        if (item.children && item.children.length > 0) {
          return (
            <AccordionMenu
              key={`accordion-${item.title || index}`}
              title={item.title}
              path={item.path}
              expandedItem={expanded}
              handleChange={handleAccordionChange}
              active={item.path === pathname}
              accordionHeader={
                <FlexBox alignItems="center" sx={{ width: "100%" }}>
                  <ListItemButton
                    key={index}
                    to={item.path}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",

                      "&:hover": {
                        backgroundColor: "initial",
                      },
                    }}
                  >
                    <FlexRowAlign>
                      <img
                        src={
                          item.path === pathname ? item.selectedIcon : item.icon
                        }
                        alt="check"
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "fill",
                          borderRadius: 10,
                        }}
                      />
                      <H6
                        lineHeight={1}
                        fontWeight={500}
                        ml={1}
                        sx={{
                          color:
                            item.path === pathname
                              ? theme.palette.primary.darkBlue
                              : "inherit",
                        }}
                      >
                        {t(item.title)}
                      </H6>
                    </FlexRowAlign>

                    <FlexBox
                      sx={{
                        width: "19px",
                        height: "19px",
                        borderRadius: 100,
                        backgroundColor: "#EDEDED",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ButtonText
                        lineHeight={1}
                        fontWeight={500}
                        sx={{
                          background: theme.palette.gradient.purpletoblue,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {item.children.length}
                      </ButtonText>
                    </FlexBox>
                  </ListItemButton>
                </FlexBox>
              }
            >
              {item.children.map((menuItem, childIndex) => {
                if (!menuItem.subChildren) {
                  if (menuItem.name === "SaaS") {
                    return (
                      <div key={`saas-${childIndex}`}>
                        {Boolean(activeRoute(menuItem.path)) && (
                          <Box
                            sx={{
                              width: "6px",
                              height: "24px",
                              background:
                                theme.palette.gradient.purpletobluetobottom,
                              borderTopRightRadius: 5,
                              borderBottomRightRadius: 5,
                              position: "absolute",
                              left: 0,
                              top: "10px",
                            }}
                          />
                        )}

                        <SubMenuItem
                          active={activeRoute(menuItem.path)}
                          onClick={() => handleSaasMenuClick("/dashboard/saas")}
                        >
                          <H6
                            sx={{
                              color: activeRoute(menuItem.path)
                                ? theme.palette.primary.darkBlue
                                : "#151515",
                            }}
                          >
                            SaaS
                          </H6>
                          <Box onClick={handleSaasArrowClick}>
                            <ArrowForwardIosSharpIcon
                              onClick={handleSaasArrowClick}
                              sx={{
                                top: 14,
                                position: "absolute",
                                right: 18,
                                fontSize: "0.9rem",
                                color: "#5C5E64",
                                transform: saasMenuOpen
                                  ? "rotate(90deg)"
                                  : "none",
                              }}
                            />
                          </Box>
                        </SubMenuItem>

                        {/* Dropdown content */}
                        <Collapse
                          in={saasMenuOpen}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {/* Render submenu items */}
                            {saasMenuItems.map((item, index) => (
                              <ListItemButton
                                key={index}
                                // component={Link}
                                to={item.path}
                                sx={{ pl: 4, borderRadius: 2 }}
                              >
                                <H6 sx={{ fontWeight: 500 }}>{item.title}</H6>
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      </div>
                    );
                  }
                  return (
                    <SubMenuItem
                      key={`submenu-${menuItem.title || childIndex}`}
                      active={activeRoute(menuItem.path)}
                      onClick={() => handleSubMenuItem(menuItem.path)}
                    >
                      <H6
                        sx={{
                          color: activeRoute(menuItem.path)
                            ? theme.palette.primary.darkBlue
                            : theme.palette.primary.dark,
                        }}
                      >
                        {t(menuItem.title)}
                      </H6>
                    </SubMenuItem>
                  );
                }
                return null; // Handle case where subChildren exist if needed
              })}
            </AccordionMenu>
          );
        }

        if (item.title === "divider") {
          return (
            <Divider
              key={`divider-${index}`}
              sx={{ borderColor: "#E1E1E1", my: 2 }}
            />
          );
        }

        // 일반 메뉴
        return (
          <StyledListItemButton
            key={`menu-${item.title || index}`}
            disableRipple
            active={item.path === pathname ? 1 : 0}
            onClick={() => {
              setExpanded(false);
              handleSubMenuItem(item.path);
            }}
          >
            {item.path === pathname && (
              <Box
                sx={{
                  width: "6px",
                  height: "24px",
                  background: theme.palette.gradient.purpletobluetobottom,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  position: "absolute",
                  left: 0,
                }}
              />
            )}

            <img
              src={item.path === pathname ? item.selectedIcon : item.icon}
              alt="check"
              style={{
                width: "24px",
                height: "24px",
                objectFit: "fill",
                borderRadius: 10,
              }}
            />
            <H6
              ml={1}
              lineHeight={1}
              fontWeight={500}
              sx={{
                color:
                  item.path === pathname
                    ? theme.palette.primary.darkBlue
                    : "inherit",
              }}
            >
              {t(item.title)}
            </H6>
          </StyledListItemButton>
        );
      })}

      <Divider
        sx={{
          borderColor: "#E1E1E1",
          mb: 2,
        }}
      />
    </List>
  );

  const sideBarContent = (
    <Scrollbar autoHide clickOnTrack={false}>
      <LoginModal open={showLoginModal} setShowLoginModal={setShowLoginModal} />

      {/* LOGO */}
      <FlexBox
        ml={1.5}
        mt={2}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <StyledLogo>
          <NavLink to={`/dashboard`}>
            <img
              width={100}
              src={logo}
              alt={"logo"}
              style={{
                cursor: "pointer",
                marginLeft: "2px",
                marginBottom: "0px",
              }}
            />
          </NavLink>
        </StyledLogo>
        {/* <Button
        variant="contained"
        size="small"
        sx={{
          height: isMobile ? "28px" : "34px",
          maxWidth: isMobile ? "54px" : "60px",
          minWidth: isMobile ? "54px" : "60px",
          marginTop: isMobile ? "8px" : "4px",
  
          fontSize: 14.5,
          borderRadius: 2,
       background: theme.palette.gradient.purpletoblue,
        }}
      >
        <H6
          fontWeight={600}
          onClick={() => setShowLoginModal(true)}
          style={{ cursor: "pointer", whiteSpace: "nowrap" }}
        >
          로그인
        </H6>
      </Button> */}
      </FlexBox>

      <Box mx={2} mb={2}>
        {isLoggedin ? (
          <H6>로그아웃</H6>
        ) : (
          <H6
            onClick={() => {
              setShowLoginModal(true);
              setIsLoggedin(true);
            }}
            mr={1.2}
            mb={1}
            sx={{
              color: theme.palette.primary.darkBlue,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            로그인
          </H6>
        )}

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/dashboard/texteditor")}
          sx={{
            height: "38px",
            fontSize: 14.5,
            width: "100%",
            borderRadius: 2,
            background: theme.palette.gradient.purpletoblue,
            // backgroundColor: "primary.darkBlue",
            // "&:hover": {
            //   backgroundColor: "primary.darkBlueHover",
            // },
          }}
        >
          <ButtonText>글쓰기</ButtonText>
        </Button>
      </Box>

      {mainSidebarContent}
    </Scrollbar>
  );

  // for mobile device
  if (downMd) {
    return (
      <LayoutDrawer open={showMobileSideBar} onClose={closeMobileSideBar}>
        {sideBarContent}
      </LayoutDrawer>
    );
  }

  return (
    <>
      {/* <InvisibleTrigger onMouseEnter={handleMouseEnter} /> */}
      <SidebarWrapper
        show={showSideBar || isHovering ? 1 : 0}
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {sideBarContent}
      </SidebarWrapper>
    </>
  );
};

export default DashboardSidebar;
