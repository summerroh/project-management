import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  styled,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppCheckBox from "components/AppCheckBox";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import MySelect from "components/MySelect";
import ReversePagination from "components/ReversePagination";
import { H3, H6, H7, Small, Span, Tiny } from "components/Typography";
import { useCallback, useEffect, useRef, useState } from "react";

const navbarHeight = 116;

const chatRoomData = [
  {
    id: 1,
    image: "/static/logo/kakao.svg",
    chatId: "80000000323_dMnWBldvlDob",
    type: "상담",
    title: "333...무료보험(@뱅크샐러드맞춤형보험플래너)",
    content:
      "- 영업일: 평일 월~금 - 운영시간: 10:00~18:00 - 점심시간 12:00~13:00 운영시간 이후 신청하셨을 경우, 다음 영업일에 순차적으로...",
    time: "AM 11:21",
  },
  {
    id: 2,
    image: "/static/logo/kakao.svg",
    chatId: "80000000323_dMnWBldvlDob",
    type: "상담",
    title: "333...무료보험(@뱅크샐러드맞춤형보험플래너)",
    content:
      "- 영업일: 평일 월~금 - 운영시간: 10:00~18:00 - 점심시간 12:00~13:00 운영시간 이후 신청하셨을 경우, 다음 영업일에 순차적으로...",
    time: "AM 11:21",
  },
  {
    id: 3,
    image: "/static/logo/kakao.svg",
    chatId: "80000000323_dMnWBldvlDob",
    type: "상담",
    title: "333...무료보험(@뱅크샐러드맞춤형보험플래너)",
    content:
      "- 영업일: 평일 월~금 - 운영시간: 10:00~18:00 - 점심시간 12:00~13:00 운영시간 이후 신청하셨을 경우, 다음 영업일에 순차적으로...",
    time: "AM 11:21",
  },
  {
    id: 4,
    image: "/static/logo/kakao.svg",
    chatId: "80000000323_dMnWBldvlDob",
    type: "상담",
    title: "333...무료보험(@뱅크샐러드맞춤형보험플래너)",
    content:
      "- 영업일: 평일 월~금 - 운영시간: 10:00~18:00 - 점심시간 12:00~13:00 운영시간 이후 신청하셨을 경우, 다음 영업일에 순차적으로...",
    time: "AM 11:21",
  },
];

// styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: `calc(100vh - ${navbarHeight}px)`,
  flexDirection: "column",
  borderRadius: 0,
  position: "relative",
  overflow: "hidden",
  border: "none",
  borderLeft: `1px solid #E1E1E1`,
  borderRight: `1px solid #E1E1E1`,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
  maxWidth: "100%",
}));

const tabItems = ["전체 상담", "팀 상담", "내 상담"];

export default function ChatRoomList({ onResize }) {
  const theme = useTheme();
  const resizeRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const [selectedTab, setSelectedTab] = useState(0);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [panelWidth, setPanelWidth] = useState(6);
  const [phone, setPhone] = useState("");

  // New state variables
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("고객이름");

  // Resize
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (resizeRef.current && !isPanelCollapsed) {
        const newWidth = e.clientX;
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
  // Resize End

  return (
    <StyledCard
      sx={{
        backgroundColor: isPanelCollapsed
          ? theme.palette.primary.grey2
          : theme.palette.primary.white,
      }}
    >
      {/* Resize handle */}
      <Box
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        sx={{
          position: "absolute",
          right: 0,
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
          sx={{
            width: "100%",
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <IconButton
              onClick={togglePanel}
              sx={{
                color: theme.palette.primary.main,
                padding: "8px",
              }}
            >
              {isPanelCollapsed ? (
                <ChevronRight size={22} />
              ) : (
                <ChevronLeft size={22} />
              )}
            </IconButton> */}

            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              sx={{
                flexGrow: 1,
                minHeight: 40,
                borderBottom: `1px solid #E1E1E1`,
                padding: "0px 0px 0px 14px",
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.primary.violet,
                },
              }}
            >
              {tabItems.map((label, index) => (
                <Tab
                  key={index}
                  label={label}
                  sx={{
                    fontSize: 14,
                    minHeight: 40,
                    padding: "6px 0px 6px 0px",
                    color:
                      selectedTab === index
                        ? theme.palette.primary.violet
                        : theme.palette.primary.grey,
                    "&.Mui-selected": {
                      color: theme.palette.primary.violet,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Grid item container spacing={4} py={4} px={2}>
            <Grid item xs={12} textAlign="center">
              <H3>상담방 조회</H3>

              <Small>현재 대화방의 상황을 보여드립니다.</Small>
            </Grid>

            <Grid item xs={12}>
              <Divider
                sx={{ width: "100%", height: 1, backgroundColor: "#E1E1E1" }}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 sx={{ fontWeight: 600 }}>접수(안읽은 대화방) (총 1921건)</H6>
            </Grid>

            <Grid item xs={12}>
              <FlexBox width="100%" justifyContent="space-between">
                <Span sx={{ marginBottom: "10px" }}>조회기간</Span>
                <Small>* 최대 31일간 조회</Small>
              </FlexBox>

              <FlexBox gap={1} alignItems="center">
                <AppTextField
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  sx={{
                    backgroundColor: theme.palette.primary.white,
                    "& .MuiOutlinedInput-input": {
                      height: "9px",
                    },
                  }}
                />
                <H6>~</H6>
                <AppTextField
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  sx={{
                    backgroundColor: theme.palette.primary.white,
                    "& .MuiOutlinedInput-input": {
                      height: "9px",
                    },
                  }}
                />
              </FlexBox>

              <FlexBox mt={1} gap={0.5}>
                <Button
                  variant="outlined"
                  sx={{ height: "30px", whiteSpace: "nowrap" }}
                >
                  <Span>오늘</Span>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ height: "30px", whiteSpace: "nowrap" }}
                >
                  <Span>어제</Span>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ height: "30px", whiteSpace: "nowrap" }}
                >
                  <Span>1주일</Span>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ height: "30px", whiteSpace: "nowrap" }}
                >
                  <Span>2024-01</Span>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ height: "30px", whiteSpace: "nowrap" }}
                >
                  <Span>2023-12</Span>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ height: "30px", whiteSpace: "nowrap" }}
                >
                  <Span>2023-11</Span>
                </Button>
              </FlexBox>
            </Grid>

            <Grid item xs={12}>
              <FlexBox gap={1} alignItems="center">
                <MySelect
                  items={[
                    "고객이름",
                    "전체",
                    "상담전",
                    "상담중",
                    "다시연락",
                    "보류",
                    "진행",
                  ]}
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                />
                <AppTextField
                  name="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    backgroundColor: theme.palette.primary.white,
                    "& .MuiOutlinedInput-input": {
                      height: "9px",
                    },
                  }}
                />
              </FlexBox>
            </Grid>

            <Grid
              container
              item
              xs={12}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="contained"
                sx={{
                  background: theme.palette.primary.darkBlue,
                  height: "40px",
                  width: "300px",
                  "&:hover": {
                    background: theme.palette.primary.darkBlue,
                  },
                }}
              >
                추가
              </Button>
            </Grid>

            <Grid item xs={12}>
              <FlexBox gap={1} mb={1} alignItems="center">
                <MySelect
                  width={"100%"}
                  items={[
                    "전체 상담원",
                    "전체 채널",
                    "전체 대분류",
                    "전체 중분류",
                    "최근 대화순",
                  ]}
                />
                <MySelect
                  width={"100%"}
                  items={[
                    "전체 상담원",
                    "전체 채널",
                    "전체 대분류",
                    "전체 중분류",
                    "최근 대화순",
                  ]}
                />
              </FlexBox>

              <FlexBox gap={1} mb={1} alignItems="center">
                <MySelect
                  width={"100%"}
                  items={[
                    "전체 상담원",
                    "전체 채널",
                    "전체 대분류",
                    "전체 중분류",
                    "최근 대화순",
                  ]}
                />
                <MySelect
                  width={"100%"}
                  items={[
                    "전체 상담원",
                    "전체 채널",
                    "전체 대분류",
                    "전체 중분류",
                    "최근 대화순",
                  ]}
                />
              </FlexBox>

              <FlexBox gap={1} alignItems="center">
                <MySelect
                  width={"100%"}
                  items={[
                    "최근 대화순",
                    "고객이름순",
                    "상담제목순",
                    "상담시간순",
                    "상담원순",
                    "채널순",
                  ]}
                />
              </FlexBox>
            </Grid>
          </Grid>

          <Grid item xs={12} my={3}>
            <Divider
              sx={{ width: "100%", height: 1, backgroundColor: "#E1E1E1" }}
            />
          </Grid>

          <FlexBox
            px={2}
            pb={2}
            width="100%"
            justifyContent="space-between"
            borderBottom={`1px solid #E1E1E1`}
          >
            <AppCheckBox label="전체 선택" />

            <FlexBox gap={1}>
              <Button
                variant="contained"
                sx={{
                  height: "30px",
                  backgroundColor: theme.palette.primary.red,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.red,
                  },
                }}
              >
                상담종료
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: "30px",
                  "&:hover": { backgroundColor: theme.palette.primary.main },
                }}
              >
                상담원 변경
              </Button>
            </FlexBox>
          </FlexBox>

          {chatRoomData.map((item) => (
            <FlexBox
              key={item.id}
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
              <Box mb={1} sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ marginRight: "8px" }}
                  width={40}
                  height={40}
                />
                <Box>
                  <H6>{item.chatId}</H6>
                  <Tiny color={theme.palette.primary.grey}>{item.type}</Tiny>
                </Box>
              </Box>

              <H7 mb={1} sx={{ textAlign: "left" }}>
                {item.title}
              </H7>
              <H7
                sx={{
                  color: theme.palette.primary.darkBlue,
                  textAlign: "left",
                }}
              >
                {item.content}
              </H7>

              <FlexBox
                mt={1}
                gap={0.5}
                flexWrap="wrap"
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <FlexBox gap={0.5} flexWrap="wrap">
                  {["상담전", "상담중", "다시연락", "보류", "진행"].map(
                    (status) => (
                      <Chip
                        key={status}
                        label={status}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.primary.grey700,
                          color: theme.palette.primary.grey2,
                          fontSize: "0.75rem",
                          height: "20px",
                        }}
                      />
                    )
                  )}
                </FlexBox>

                <Chip
                  label={item.time}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.primary.grey400,
                    color: theme.palette.primary.white,
                    fontSize: "0.75rem",
                    height: "20px",
                  }}
                />
              </FlexBox>
            </FlexBox>
          ))}

          <Box mt={1} mb={1} sx={{ display: "flex", justifyContent: "center" }}>
            <ReversePagination totalItems={3} />
          </Box>
        </Box>
      </ContentWrapper>
    </StyledCard>
  );
}
