import { useTheme } from "@emotion/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Popover,
  styled,
  useMediaQuery,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { H6, H7, Tiny } from "components/Typography";
import {
  ChevronDown,
  File,
  Folder,
  Menu,
  Plus,
  SquarePen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const navbarHeight = 117;

const historyData = [
  {
    id: 1,
    name: "폴더 1",
    subfolder: [
      {
        id: 1,
        name: "폴더 1-1",
      },
      {
        id: 2,
        name: "폴더 1-2",
      },
    ],
  },
  {
    id: 2,
    name: "폴더 2",
    subfolder: [
      {
        id: 1,
        name: "폴더 2-1",
      },
      {
        id: 2,
        name: "폴더 2-2",
      },
    ],
  },
  {
    id: 3,
    name: "폴더 3",
    subfolder: [
      {
        id: 1,
        name: "폴더 3-1",
      },
    ],
  },
  {
    id: 4,
    name: "폴더 4",
    subfolder: [
      {
        id: 1,
        name: "폴더 4-1",
      },
      {
        id: 2,
        name: "폴더 4-2",
      },
      {
        id: 3,
        name: "폴더 4-3",
      },
    ],
  },
  {
    id: 5,
    name: "폴더 5",
    subfolder: [
      {
        id: 1,
        name: "폴더 5-1",
      },
    ],
  },
];

const pageData = [
  {
    id: 1,
    name: "페이지 1",
  },
  {
    id: 2,
    name: "페이지 2",
  },
  {
    id: 3,
    name: "페이지 3",
  },
  {
    id: 4,
    name: "페이지 4",
  },
  {
    id: 5,
    name: "페이지 5",
  },
];

// ----------------------------------
// styled components
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

export default function PagesPanel({ setIsLeftPanelCollapsed }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activityFilter, setActivityFilter] = useState("모든 내 활동");
  const [userFilter, setUserFilter] = useState("모든 사용자");
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

  return (
    <StyledCard
      sx={{
        width: "100%",
        backgroundColor: isPanelCollapsed
          ? theme.palette.primary.grey2
          : theme.palette.primary.white,
      }}
    >
      <Box
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
                  Swift
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
      </Box>

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
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
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
                    <img
                      src={"/static/logo/logo-sugar-company.svg"}
                      width={"34px"}
                    />
                  </FlexBox>
                  <FlexBox flexDirection={"column"}>
                    <Tiny sx={{ color: theme.palette.primary.dark }}>
                      Swift
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
                    Add Workspace
                  </Tiny>
                </FlexBox>
              </Box>
            </Popover>

            <Popover
              open={menuOpen}
              anchorEl={menuAnchorEl}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ p: 2, width: 250 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">활동 필터</FormLabel>
                  <RadioGroup
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                  >
                    <FormControlLabel
                      value="모든 내 활동"
                      control={<Radio />}
                      label="모든 내 활동"
                    />
                    <FormControlLabel
                      value="읽지 않은 활동만"
                      control={<Radio />}
                      label="읽지 않은 활동만"
                    />
                    <FormControlLabel
                      value="멘션만"
                      control={<Radio />}
                      label="멘션만"
                    />
                    <FormControlLabel
                      value="섹션별 사용자 지정"
                      control={<Radio />}
                      label="섹션별 사용자 지정"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">사용자 필터</FormLabel>
                  <RadioGroup
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                  >
                    <FormControlLabel
                      value="모든 사용자"
                      control={<Radio />}
                      label="모든 사용자"
                    />
                    <FormControlLabel
                      value="외부 사람들 포함 안 함"
                      control={<Radio />}
                      label="외부 사람들 포함 안 함"
                    />
                    <FormControlLabel
                      value="외부 사람들 포함"
                      control={<Radio />}
                      label="외부 사람들 포함"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Popover>

            <Box sx={{ flexDirection: "row", display: "flex", width: "100%" }}>
              {/* 폴더 */}
              <Box
                pt={2}
                sx={{
                  width: "100%",
                  // backgroundColor: theme.palette.primary.lightBlueBackground,
                }}
              >
                <FlexRowAlign
                  gap={1}
                  px={2}
                  py={1}
                  sx={{
                    cursor: "pointer",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <Folder size={24} color={theme.palette.primary.grey300} />
                  <H6 sx={{ color: theme.palette.primary.grey300 }}>폴더</H6>
                </FlexRowAlign>

                <Box
                  px={1}
                  mt={1}
                  mb={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    startIcon={<SquarePen size={20} />}
                    variant="contained"
                    sx={{
                      width: "100%",
                      background: theme.palette.gradient.purpletoblue,
                      borderRadius: "100px",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        background: theme.palette.gradient.purpletoblue,
                      },
                    }}
                  >
                    폴더 추가
                  </Button>
                </Box>

                {historyData.map((folder) => (
                  <Accordion
                    key={folder.id}
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      "&:before": {
                        display: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ChevronDown
                          size={20}
                          color={theme.palette.primary.grey300}
                        />
                      }
                      sx={{
                        cursor: "pointer",
                        padding: "1rem",
                        borderBottom: `1px solid #e1e1e1`,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.grey700,
                        },
                      }}
                    >
                      <FlexRowAlign gap={1} justifyContent={"flex-start"}>
                        {/* <Box
                          sx={{
                            width: "6px",
                            height: "24px",
                            background: theme.palette.gradient.purpletobluetobottom,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            position: "absolute",
                            left: 0,
                          }}
                        /> */}
                        <H7>{folder.name}</H7>
                      </FlexRowAlign>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      {folder.subfolder.map((subfolder) => (
                        <FlexBox
                          key={subfolder.id}
                          sx={{
                            cursor: "pointer",
                            padding: "0.5rem 1rem 0.5rem 2rem",
                            "&:hover": {
                              backgroundColor: theme.palette.primary.grey700,
                            },
                          }}
                        >
                          <Tiny>{subfolder.name}</Tiny>
                        </FlexBox>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>

              {/* 페이지 */}
              <Box
                pt={2}
                sx={{
                  width: "100%",
                  // backgroundColor: theme.palette.primary.lightBlue3,
                  borderLeft: `1px solid #e1e1e1`,
                }}
              >
                <FlexRowAlign
                  gap={1}
                  px={2}
                  py={1}
                  sx={{
                    cursor: "pointer",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <File size={24} color={theme.palette.primary.grey300} />
                  <H6 sx={{ color: theme.palette.primary.grey300 }}>페이지</H6>
                </FlexRowAlign>

                <Box
                  px={1}
                  mt={1}
                  mb={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    startIcon={<SquarePen size={20} />}
                    variant="contained"
                    sx={{
                      width: "100%",
                      background: theme.palette.gradient.purpletoblue,
                      borderRadius: "100px",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        background: theme.palette.gradient.purpletoblue,
                      },
                    }}
                  >
                    페이지 추가
                  </Button>
                </Box>

                {pageData.map((page) => (
                  <FlexRowAlign
                    key={page.id}
                    gap={1}
                    justifyContent={"flex-start"}
                    sx={{
                      cursor: "pointer",
                      padding: "1rem 1rem",
                      borderBottom: `1px solid #e1e1e1`,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.grey800,
                      },
                    }}
                  >
                    <H7>{page.name}</H7>
                  </FlexRowAlign>
                ))}
              </Box>
            </Box>
          </>
        )}
      </ContentWrapper>
    </StyledCard>
  );
}
