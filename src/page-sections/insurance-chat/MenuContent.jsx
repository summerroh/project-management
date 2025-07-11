import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Scrollbar from "components/ScrollBar";
import { ButtonText, H6, H8, Small, Tiny } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AccordionMenu from "layouts/layout-v1/AccordionMenu";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuData } from "./menu-data";

// custom styled components
const SidebarWrapper = styled(Box)(({ theme }) => ({
  left: 0, // Always show the sidebar
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
}));

const StyledListItemButton = styled(ListItemButton)(({ active, theme }) => ({
  padding: "12px 24px",
  marginBottom: 2,
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
}));

export default function MenuContent() {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState("");
  const [saasMenuOpen, setSaasMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sideMenuData, setSideMenuData] = useState(MenuData);

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
    MenuData.forEach((list) => {
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

  const mainSidebarContent = (
    <List
      sx={{
        height: "100%",
      }}
    >
      <Divider
        sx={{
          borderColor: "#E1E1E1",
          mb: 2,
        }}
      />

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
                      {/* <img
                        src={
                          item.path === pathname ? item.selectedIcon : item.icon
                        }
                        alt="icon"
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "fill",
                          borderRadius: 10,
                        }}
                      /> */}
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

            {/* <img
              src={item.path === pathname ? item.selectedIcon : item.icon}
              alt="icon"
              style={{
                width: "24px",
                height: "24px",
                objectFit: "fill",
                borderRadius: 10,
              }}
            /> */}

            {item.sectionTitle ? (
              <Tiny lineHeight={0.8}>{item.title}</Tiny>
            ) : (
              <H6
                //   ml={1}
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
            )}
          </StyledListItemButton>
        );
      })}

      <Divider
        sx={{
          borderColor: "#E1E1E1",
        }}
      />
    </List>
  );

  const sideBarContent = (
    <Scrollbar autoHide clickOnTrack={false}>
      {mainSidebarContent}
    </Scrollbar>
  );

  return <SidebarWrapper>{sideBarContent}</SidebarWrapper>;
}
