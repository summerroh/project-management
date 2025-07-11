import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Card, Typography, Chip, Avatar, Paper, Stack } from "@mui/material";

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
  const [data, setData] = useState(initialData);

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
    <Box sx={{ p: 3, background: "#f7f8fa", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Projects
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Stack direction="row" spacing={3} alignItems="flex-start">
          {data.columnOrder.map((colId) => {
            const col = data.columns[colId];
            return (
              <Paper
                key={colId}
                sx={{
                  minWidth: 300,
                  background: getColumnColor(colId),
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  flex: 1,
                  maxWidth: 340,
                }}
                elevation={0}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  {col.name}
                </Typography>
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
  );
} 