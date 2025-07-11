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
import { ButtonText, H5, H6, H8, Small } from "components/Typography";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

const events = [
  { title: "Sprint Planning Meeting", start: new Date() },
  { title: "Code Review", start: new Date(Date.now() + 86400000) },
  { title: "Deployment", start: new Date(Date.now() + 172800000) }
];
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
                  "Project Dashboard",
                ]}
                width={"100%"}
                height={"50px"}
                placeholder={
                  "Project Dashboard"
                }
              />
            </Grid>

            <Grid item container xs={12} spacing={2}>
              {/* First Row - Project Status */}
              <Grid item container xs={12} spacing={2}>
                {[
                  { label: "Total Issues", value: "7,500", percent: null },
                  { label: "To Do", value: "7,500", percent: "20%" },
                  { label: "In Progress", value: "3,350", percent: "12%" },
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
                  { label: "Code Review", value: "24,350", percent: "59%" },
                  { label: "Done", value: "54,050", percent: "5%" },
                  { label: "Blocked", value: "50", percent: "4%" },
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

              {/* Third Row - Sprint Metrics */}
              <Grid item container xs={12} spacing={2}>
                {[
                  { label: "Sprint Completion", value: "85%" },
                  { label: "Bug Resolution", value: "92%" },
                  { label: "Team Velocity", value: "45 SP" },
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
                items={["Project Announcements"]}
                width={"100%"}
                height={"50px"}
                placeholder={"Project Announcements"}
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
                    <ButtonText mb={1}>My Work Notes</ButtonText>
                    <Box sx={{ cursor: "pointer" }}>
                      <EllipsisVertical
                        size={20}
                        color={theme.palette.primary.grey400}
                      />
                    </Box>
                  </FlexRowAlign>

                  <Small>Backend API Development</Small><br/>
                  <Small>Frontend UI Enhancement</Small><br/>
                  <Small>Database Schema Design</Small>
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
      status: "In Progress",
      company: "User Authentication System",
      amount: "High Priority",
      lastCall: "Last updated Oct 23, 4:30 PM",
      consultation: "(Development Progress: 75%)",
    },
    {
      status: "In Progress",
      company: "Payment Module Integration",
      amount: "Medium Priority",
      lastCall: "Last updated Oct 22, 2:15 PM",
      consultation: "(Development Progress: 60%)",
    },
    {
      status: "In Progress",
      company: "Database Optimization",
      amount: "Low Priority",
      lastCall: "Last updated Oct 21, 1:45 PM",
      consultation: "(Development Progress: 40%)",
    },
    {
      status: "To Do",
      company: "Mobile App Development",
      amount: "High Priority",
      lastCall: "Last updated Oct 20, 3:20 PM",
      consultation: "(Development Progress: 0%)",
    },
    {
      status: "To Do",
      company: "API Documentation",
      amount: "Medium Priority",
      lastCall: "Last updated Oct 19, 5:10 PM",
      consultation: "(Development Progress: 0%)",
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
              gap={2}
              mb={2}
              sx={{
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <H6>Assigned Projects</H6>
              <MySelect
                items={["This Week", "This Month", "Today"]}
                height={"40px"}
                width={"120px"}
                placeholder={"This Week"}
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
                    label="Issues"
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
                    label="Overdue Issues 2"
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
                                    row.status === "In Progress"
                                      ? theme.palette.primary.green
                                      : row.status === "To Do"
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
      label: "Code Review Pending",
      value: "8 items",
      type: "review",
    },
    {
      label: "Sprint Meeting",
      value: "3 items",
      type: "meeting",
    },
    {
      label: "Deployment Scheduled",
      value: "5 items",
      type: "deployment",
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
              <H6>Schedule</H6>
              <MySelect
                items={["This Week", "This Month", "Today"]}
                height={"40px"}
                width={"120px"}
                placeholder={"Today"}
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
            {/* Calendar Box */}
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

            {/* Schedule Box */}
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
                    label="Issues"
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
                    label="Meetings"
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
    <ButtonText
      pt={1}
      pb={1}
      style={{ fontWeight: 400, color: isSunday ? "#EB5757" : "#151515" }}
    >
      {dayInfo.text}
    </ButtonText>
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
