import krLocale from "@fullcalendar/core/locales/ko";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {
  Box,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import MySelect from "components/MySelect";
import ReversePagination from "components/ReversePagination";
import { ButtonText, H5, H6, Small } from "components/Typography";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

const events = [{ title: "예시 텍스트", start: new Date() }];
export default function DashboardContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          padding: isMobile ? "0px" : "0 32px",
        }}
      >
        <Grid item container spacing={4} pt={2} pb={4}>
          <Grid item container>
            <Section1
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              theme={theme}
            />

            <Section2
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              theme={theme}
            />
          </Grid>

          <Section3 theme={theme} />

          <Section4 theme={theme} />
        </Grid>
      </Grid>
    </Grid>
  );
}

const Section1 = ({ selectedOption, setSelectedOption, theme }) => {
  return (
    <>
      <Grid item container xs={12} sm={8}>
        <Box sx={{ width: "100%", p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MySelect
                items={[
                  "업무지시 (모든 업무 요청이나 피드백 등 업무 관련된 사항은 플로우로 공유합니다.)",
                ]}
                width={"100%"}
                height={"50px"}
                placeholder={
                  "업무지시 (모든 업무 요청이나 피드백 등 업무 관련된 사항은 플로우로 공유합니다.)"
                }
              />
            </Grid>

            <Grid item container xs={12} spacing={2}>
              {/* First Row - Work Status */}
              <Grid item container xs={12} spacing={2}>
                {[
                  { label: "전체 업무", value: "7,500", percent: null },
                  { label: "요청", value: "7,500", percent: "20%" },
                  { label: "진행", value: "3,350", percent: "12%" },
                ].map((box, index) => (
                  <Grid item xs={12} sm={4} key={`violet-${index}`}>
                    <Box
                      sx={{
                        backgroundColor: theme.palette.primary.lightViolet,
                        py: 2,
                        px: 3,
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <H6 mb={0.5}>{box.label}</H6>
                        <H5 sx={{ color: theme.palette.primary.darkBlue }}>
                          {box.value}
                        </H5>
                      </Box>
                      {box.percent && (
                        <FlexBox
                          sx={{
                            backgroundColor: theme.palette.primary.darkBlue,
                            borderRadius: "16px",
                            px: 1,
                            width: "50px",
                            height: "50px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Small sx={{ color: "white" }}>{box.percent}</Small>
                        </FlexBox>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Second Row - Additional Status */}
              <Grid item container xs={12} spacing={2}>
                {[
                  { label: "피드백", value: "24,350", percent: "59%" },
                  { label: "완료", value: "54,050", percent: "5%" },
                  { label: "보류", value: "50", percent: "4%" },
                ].map((box, index) => (
                  <Grid item xs={12} sm={4} key={`blue-${index}`}>
                    <Box
                      sx={{
                        backgroundColor: theme.palette.primary.lightBlue3,
                        py: 2,
                        px: 3,
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <H6 mb={0.5}>{box.label}</H6>
                        <H5 sx={{ color: theme.palette.primary.main }}>
                          {box.value}
                        </H5>
                      </Box>
                      <FlexBox
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: "16px",
                          px: 1,
                          width: "50px",
                          height: "50px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Small sx={{ color: "white" }}>{box.percent}</Small>
                      </FlexBox>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Third Row - Performance */}
              <Grid item container xs={12} spacing={2}>
                {[
                  { label: "전체 실적", value: "980,000,000원" },
                  { label: "이번달 실적", value: "78,000,000원" },
                  { label: "오늘 실적", value: "4,500,000원" },
                ].map((box, index) => (
                  <Grid item xs={12} sm={4} key={`green-${index}`}>
                    <Box
                      sx={{
                        backgroundColor: theme.palette.primary.lightGreen2,
                        py: 2,
                        px: 3,
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <H6 mb={0.5}>{box.label}</H6>
                        <H5 sx={{ color: theme.palette.primary.green }}>
                          {box.value}
                        </H5>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

const Section2 = ({ selectedOption, setSelectedOption, theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid item container xs={12} sm={4} height={isMobile ? "auto" : "100%"}>
        <Box
          sx={{
            width: "100%",
            p: 2,
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
            >
              <MySelect
                items={["공지사항 (모든 업 무요청이나 피드백)"]}
                width={"100%"}
                height={"50px"}
                placeholder={"공지사항 (모든 업 무요청이나 피드백)"}
              />
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.grey800,
                  border: `1px solid #e1e1e1`,
                  p: isMobile ? 2 : 3,
                  borderRadius: "16px",
                  width: "100%",
                  minHeight: isMobile ? "200px" : "auto",
                  flexGrow: 1,
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <FlexRowAlign gap={1} justifyContent={"space-between"}>
                    <H5 mb={1}>(개인) 나만의 메모</H5>
                    <Box sx={{ cursor: "pointer" }}>
                      <EllipsisVertical
                        size={20}
                        color={theme.palette.primary.grey400}
                      />
                    </Box>
                  </FlexRowAlign>

                  <ButtonText>테스트</ButtonText>
                  <ButtonText>테스트</ButtonText>
                  <ButtonText>테스트</ButtonText>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

const Section3 = ({ selectedOption, setSelectedOption, theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab] = useState(0);

  const tableData = [
    {
      status: "진행",
      company: "(주) 런드리고",
      amount: "99,999,999원",
      lastCall: "마지막 통화 10월 23일 오후 4시 30분",
      consultation: "(상담 내역)",
    },
    {
      status: "진행",
      company: "(주) 런드리고",
      amount: "99,999,999원",
      lastCall: "마지막 통화 10월 23일 오후 4시 30분",
      consultation: "(상담 내역)",
    },
    {
      status: "진행",
      company: "(주) 런드리고",
      amount: "99,999,999원",
      lastCall: "마지막 통화 10월 23일 오후 4시 30분",
      consultation: "(상담 내역)",
    },
    {
      status: "요청",
      company: "(주) 런드리고",
      amount: "99,999,999원",
      lastCall: "마지막 통화 10월 23일 오후 4시 30분",
      consultation: "(상담 내역)",
    },
    {
      status: "요청",
      company: "(주) 런드리고",
      amount: "99,999,999원",
      lastCall: "마지막 통화 10월 23일 오후 4시 30분",
      consultation: "(상담 내역)",
    },
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Grid item container xs={12} height={isMobile ? "auto" : "100%"}>
        <Box
          sx={{
            width: "100%",
            p: 2,
          }}
        >
          <FlexRowAlign
            gap={1}
            sx={{
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FlexRowAlign
              gap={1}
              mb={2}
              sx={{
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <H6>내가 담당중인 경정청구</H6>
              <MySelect
                items={["이번 주", "이번 달", "오늘"]}
                height={"50px"}
                placeholder={"이번 주"}
              />
            </FlexRowAlign>

            <Box sx={{ cursor: "pointer" }}>
              <EllipsisVertical
                size={20}
                color={theme.palette.primary.grey400}
              />
            </Box>
          </FlexRowAlign>

          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
            >
              <Box
                sx={{
                  border: `1px solid #e1e1e1`,
                  p: isMobile ? 2 : 3,
                  borderRadius: "16px",
                  width: "100%",
                  flexGrow: 1,
                  overflowX: isMobile ? "auto" : "hidden",
                }}
              >
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  sx={{
                    mb: 2,
                    "& .MuiTabs-indicator": {
                      backgroundColor: theme.palette.primary.violet,
                    },
                  }}
                >
                  <Tab
                    label="업무"
                    sx={{
                      fontSize: 14.5,
                      color:
                        selectedTab === 0
                          ? theme.palette.primary.violet
                          : theme.palette.primary.grey,
                      "&.Mui-selected": {
                        color: theme.palette.primary.violet,
                      },
                    }}
                  />
                  <Tab
                    label="지연된 업무 0"
                    sx={{
                      fontSize: 14.5,
                      color:
                        selectedTab === 1
                          ? theme.palette.primary.violet
                          : theme.palette.primary.grey,
                      "&.Mui-selected": {
                        color: theme.palette.primary.violet,
                      },
                    }}
                  />
                </Tabs>

                {/* Responsive Table */}
                <Box
                  sx={{
                    textAlign: "left",
                    pl: isMobile ? 1 : 2,
                    mb: 2,
                    overflowX: "auto",
                  }}
                >
                  <Table
                    sx={{
                      minWidth: isMobile ? 800 : "auto", // Ensures table is scrollable on mobile
                    }}
                  >
                    <TableBody>
                      {tableData.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            paddingLeft: "10px",
                            "&:hover": {
                              backgroundColor: theme.palette.primary.grey800,
                              cursor: "pointer",
                            },
                          }}
                        >
                          <TableCell sx={{ fontWeight: 400 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  backgroundColor:
                                    row.status === "진행"
                                      ? theme.palette.primary.green
                                      : row.status === "요청"
                                      ? theme.palette.primary.main
                                      : "transparent",
                                }}
                              />
                              {row.status}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 400 }}>
                            {row.company}
                          </TableCell>

                          <TableCell sx={{ fontWeight: 400 }}>
                            {row.amount}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 400 }}>
                            {row.lastCall}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 400 }}>
                            {row.consultation}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ReversePagination totalItems={3} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

const Section4 = ({ theme }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const scheduleData = [
    {
      label: "연락 할 업체",
      value: "80개",
      type: "contact",
    },
    {
      label: "방문 할 업체",
      value: "12개",
      type: "visit",
    },
    {
      label: "상담 할 업체",
      value: "45개",
      type: "consultation",
    },
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Grid item container xs={12} height="100%" mt={10}>
        <Box sx={{ width: "100%", height: "100%", p: 2 }}>
          <FlexRowAlign
            gap={1}
            sx={{
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FlexRowAlign
              gap={1}
              mb={2}
              sx={{
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <H6>일정</H6>
              <MySelect
                items={["이번 주", "이번 달", "오늘"]}
                height={"50px"}
                placeholder={"오늘"}
              />
            </FlexRowAlign>

            <Box sx={{ cursor: "pointer" }}>
              <EllipsisVertical
                size={20}
                color={theme.palette.primary.grey400}
              />
            </Box>
          </FlexRowAlign>

          <Grid item container xs={12} height="100%" spacing={2}>
            {/* 달력 박스 */}
            <Grid container item sm={6} xs={12} sx={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                display={"flex"}
                flexDirection={"column"}
                gap={2}
              >
                <Box
                  sx={{
                    border: `1px solid #e1e1e1`,
                    p: 3,
                    borderRadius: "16px",
                    width: "100%",
                    flexGrow: 1,
                  }}
                >
                  <MyCalendar />
                </Box>
              </Grid>
            </Grid>

            {/* 일정 박스 */}
            <Grid container item sm={6} xs={12} sx={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                display={"flex"}
                flexDirection={"column"}
                gap={2}
              >
                <Box
                  sx={{
                    border: `1px solid #e1e1e1`,
                    p: 3,
                    borderRadius: "16px",
                    width: "100%",
                    flexGrow: 1,
                  }}
                >
                  <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{
                      mb: 2,
                      "& .MuiTabs-indicator": {
                        backgroundColor: theme.palette.primary.violet,
                      },
                    }}
                  >
                    <Tab
                      label="업무"
                      sx={{
                        fontSize: 14.5,
                        color:
                          selectedTab === 0
                            ? theme.palette.primary.violet
                            : theme.palette.primary.grey,
                        "&.Mui-selected": {
                          color: theme.palette.primary.violet,
                        },
                      }}
                    />
                    <Tab
                      label="예약"
                      sx={{
                        fontSize: 14.5,
                        color:
                          selectedTab === 1
                            ? theme.palette.primary.violet
                            : theme.palette.primary.grey,
                        "&.Mui-selected": {
                          color: theme.palette.primary.violet,
                        },
                      }}
                    />
                  </Tabs>

                  {/* Table */}
                  <Box sx={{ textAlign: "left", pl: 2, mb: 2 }}>
                    {scheduleData.map((item, index) => (
                      <FlexBox gap={1} key={index} mb={2}>
                        <Box
                          sx={{
                            marginTop: 1,
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.primary.darkBlue,
                          }}
                        />

                        <FlexBox sx={{ flexDirection: "column" }}>
                          <Small>{item.label}</Small>
                          <ButtonText>{item.value}</ButtonText>
                        </FlexBox>
                      </FlexBox>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

function MyCalendar() {
  return (
    <div
      style={{
        paddingTop: "12px",
        marginRight: "-1px",
        marginLeft: "-1px",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        // initialView="dayGridWeek"r
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        locale={krLocale}
        dayCellContent={renderDayCellContent}
        dayHeaderContent={renderDayHeaderContent}
        dayCellClassNames={handleDayCellClassNames}
        height={400}
        headerToolbar={{
          // start: "dayGridMonth,dayGridWeek",
          start: "prev",
          center: "title",
          end: "next",
        }}
        dayHeaderClassNames={() => "no-border"}
      />
    </div>
  );
}

function renderDayHeaderContent(dayInfo) {
  const isSunday = dayInfo.date.getDay() === 0; // Check if it's Sunday

  return (
    <H5
      pt={1}
      pb={1}
      style={{ fontWeight: 500, color: isSunday ? "#EB5757" : "#151515" }}
    >
      {dayInfo.text} {/* Render the day name */}
    </H5>
  );
}

function renderDayCellContent(dayInfo) {
  const formattedDate = dayInfo.date.getDate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "2px 5px",
        width: "100%",
        height: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <H6
        style={{
          color: "#151515",
          margin: "0",
          textAlign: "left",
          flexShrink: 0,
          fontSize: "0.9rem",
        }}
      >
        {formattedDate}
      </H6>
    </div>
  );
}
// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#E1E1E1",
          overflow: "hidden",
          padding: "3px 8px",
          marginLeft: { xs: "0px", sm: "4px" },
          borderRadius: "4px",
        }}
      >
        <Small
          style={{
            color: "#151515",
          }}
        >
          {eventInfo.event.title}
        </Small>
      </Box>
    </>
  );
}

// 일요일 cell 색상 변경
function handleDayCellClassNames(dayInfo) {
  const classNames = [];

  if (dayInfo.date.getDay() === 0 /* Sunday */) {
    classNames.push("sunday-cell");
  }

  return classNames.join(" ");
}
