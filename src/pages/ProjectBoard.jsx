import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { H5 } from "components/Typography";
import { Plus } from "lucide-react";
import MenuPanel from "page-sections/insurance-chat/MenuPanel";
import { useCallback, useEffect, useState } from "react";
import { primary } from "theme/colors";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Chip, Paper, Stack } from "@mui/material";
import CommentsPanel from "page-sections/insurance-chat/CommentsPanel";
import { alpha } from "@mui/material/styles";

const initialData = {
  columns: {
    new: {
      name: "New",
      items: [
        {
          id: "DS-23",
          title: "Create a backend to edit JSON from database for edit page contents...",
          label: "SKIN HEALTH CHECK",
        },
        {
          id: "DS-39",
          title: "Mobile version our-story",
          label: "SKIN HEALTH CHECK",
        },
      ],
    },
    ready: {
      name: "Ready to Dev",
      items: [
        {
          id: "DS-49",
          title: "*DERMSCREEN* education page - linking.",
          label: "SKIN HEALTH CHECK",
        },
        {
          id: "DS-22",
          title: "New skinhealthsite test ci/cd vercel including change domain after testing",
          label: "SKIN HEALTH CHECK",
        },
      ],
    },
    progress: {
      name: "In Progress",
      items: [
        {
          id: "DS-14",
          title: "Skin Health Check Website - Add our partners to the bottom of the home page",
          label: "SKIN HEALTH CHECK",
        },
        {
          id: "DS-38",
          title: "Tablet version error",
          label: "SKIN HEALTH CHECK",
        },
      ],
    },
    qa: {
      name: "Sent Back from QA",
      items: [
        {
          id: "DS-21",
          title: "Test email(create a test account for email) - contact us and review page -sh site",
          label: "SKIN HEALTH CHECK",
        },
      ],
    },
    blocked: {
      name: "Blocked",
      items: [],
    },
  },
  columnOrder: ["new", "ready", "progress", "qa", "blocked"],
};

const getColumnColor = (col) => {
  switch (col) {
    case "new":
      return "#f4f5f7";
    case "ready":
      return "#e3f2fd";
    case "progress":
      return "#fff3e0";
    case "qa":
      return "#fce4ec";
    case "blocked":
      return "#ffebee";
    default:
      return "#f4f5f7";
  }
};

export default function ProjectBoard() {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const [rightPanel, setRightPanel] = useState("comment");
  const [rightPanelWidth, setRightPanelWidth] = useState(2.5);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(1.5);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setLeftPanelWidth(isLeftPanelCollapsed ? 0.4 : 1.5);
  }, [isLeftPanelCollapsed]);

  const handleResize = useCallback((newWidth) => {
    setRightPanelWidth(newWidth);
  }, []);

  const customStyle = {
    width: "100%",
    overflow: "hidden",
  };

  const navbarHeight = 116;

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourceCol = data.columns[source.droppableId];
    const destCol = data.columns[destination.droppableId];
    const sourceItems = Array.from(sourceCol.items);
    const [removed] = sourceItems.splice(source.index, 1);
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [source.droppableId]: {
            ...sourceCol,
            items: sourceItems,
          },
        },
      }));
    } else {
      const destItems = Array.from(destCol.items);
      destItems.splice(destination.index, 0, removed);
      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [source.droppableId]: {
            ...sourceCol,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destCol,
            items: destItems,
          },
        },
      }));
    }
  };

  return (
    <>
      <Box sx={customStyle}>
        <Grid container alignItems={"flex-start"}>
          <Grid item xs={12} container direction="row" alignItems="flex-start">
            {/* 왼쪽 패널 */}
            <Grid
              item
              lg={leftPanelWidth}
              xs={12}
              order={isLaptop ? 2 : 0}
              display={"flex"}
              flexDirection={"row"}
              sx={{ overflow: "hidden" }}
            >
              {/* 왼쪽 메뉴 */}
              <MenuPanel setIsLeftPanelCollapsed={setIsLeftPanelCollapsed} />
            </Grid>

            {/* 중간부분 */}
            <Grid
              container
              item
              lg={12 - leftPanelWidth}
              xs={12}
              bgcolor={"white"}
              sx={{ borderRadius: 3, boxShadow: 1, minHeight: `calc(100vh - ${navbarHeight}px)` }}
            >
              {/* 중간 메뉴 */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.white,
                    padding: "0 1rem",
                    height: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid #E1E1E1`,
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
                      <H5>Board</H5>
                    </FlexRowAlign>
                  </FlexBox>

                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Plus size={16} />}
                    sx={{
                      backgroundColor: primary.darkBlue,
                      "&:hover": { backgroundColor: primary.darkBlueHover },
                      fontSize: 14,
                      fontWeight: 700,
                      color: theme.palette.primary.white,
                    }}
                  >
                    Create
                  </Button>
                </Box>
              </Grid>

              {/* 중간 내용 (Kanban Board) */}
              <Grid item lg={12 - rightPanelWidth} xs={12}>
                <Box
                  sx={{
                    borderBottom: `1px solid #E1E1E1`,
                    height: `calc(100vh - ${navbarHeight}px)`,
                    overflow: "auto",
                    padding: "0 1rem",
                  }}
                >
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Stack direction="row" spacing={3} alignItems="flex-start" sx={{ mt: 2 }}>
                      {data.columnOrder.map((colId, idx) => {
                        const col = data.columns[colId];
                        // Alternate background: even = grey, odd = blue
                        const colBg = idx % 2 === 0 ? '#f4f5f7' : '#e3f2fd';
                        return (
                          <Paper
                            key={colId}
                            sx={{
                              minWidth: 300,
                              background: colBg,
                              p: 2,
                              borderRadius: 3,
                              boxShadow: 2,
                              flex: 1,
                              maxWidth: 340,
                            }}
                            elevation={0}
                          >
                            {/* Column header with name and count */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                              <Typography
                                variant="overline"
                                sx={{
                                  fontSize: 13,
                                  fontWeight: 500,
                                  color: theme.palette.grey[400],
                                  letterSpacing: 1,
                                  textTransform: "uppercase",
                                }}
                              >
                                {col.name}
                              </Typography>
                              <Box
                                sx={{
                                  ml: 1,
                                  px: 1,
                                  py: 0.4,
                                  borderRadius: 1.5,
                                  background: alpha(theme.palette.grey[400], 0.25),
                                  minWidth: 10,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: 600,
                                    color: theme.palette.grey[500],
                                    fontSize: 13,
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {col.items.length}
                                </Typography>
                              </Box>
                            </Box>
                            <Droppable droppableId={colId}>
                              {(provided, snapshot) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  sx={{ minHeight: 80 }}
                                >
                                  {col.items.map((item, idx) => (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={idx}
                                    >
                                      {(provided, snapshot) => (
                                        <Card
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          sx={{
                                            mb: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            boxShadow: snapshot.isDragging ? 6 : 1,
                                            background: "#fff",
                                            cursor: "grab",
                                            transition: "box-shadow 0.2s",
                                          }}
                                        >
                                          <Typography
                                            variant="subtitle2"
                                            fontWeight={600}
                                            gutterBottom
                                          >
                                            {item.title}
                                          </Typography>
                                          <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip
                                              label={item.label}
                                              size="small"
                                              sx={{
                                                bgcolor: "#e1bee7",
                                                color: "#6a1b9a",
                                                fontWeight: 600,
                                                fontSize: 12,
                                              }}
                                            />
                                            <Typography
                                              variant="caption"
                                              color="text.secondary"
                                              sx={{ ml: 1 }}
                                            >
                                              {item.id}
                                            </Typography>
                                          </Stack>
                                        </Card>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </Box>
                              )}
                            </Droppable>
                          </Paper>
                        );
                      })}
                    </Stack>
                  </DragDropContext>
                </Box>
              </Grid>

              {/* 오른쪽 패널 (CommentsPanel) */}
              <Grid item lg={rightPanelWidth} xs={12}>
                <CommentsPanel setRightPanel={setRightPanel} onResize={handleResize} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
} 