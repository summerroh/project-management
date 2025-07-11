import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  styled,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import avatar5 from "assets/avatar-5.png";
import FlexBox from "components/flexbox/FlexBox";
import { H6, H7 } from "components/Typography";
import { Send, X } from "lucide-react";
import { useState } from "react";

const tabItems = ["Team Chat", "Phone", "Text"];

const sampleChatData = [
  {
    id: 1,
    sender: "user",
    message: "Hey team, do we have an update on the new dashboard feature?",
    timestamp: "2024-03-15T09:30:00Z",
  },
  {
    id: 2,
    sender: "agent",
    message: "Hi! The frontend is almost done. We're integrating the API now.",
    timestamp: "2024-03-15T09:31:00Z",
  },
  {
    id: 3,
    sender: "user",
    message: "Great! Backend, is the endpoint ready for testing?",
    timestamp: "2024-03-15T09:32:00Z",
  },
  {
    id: 4,
    sender: "agent",
    message:
      "Yes, the /dashboard/summary endpoint is live. Let me know if you hit any issues.",
    timestamp: "2024-03-15T09:33:00Z",
  },
  {
    id: 5,
    sender: "user",
    message: "Thanks! QA, can you start testing the integration this afternoon?",
    timestamp: "2024-03-15T09:34:00Z",
  },
  {
    id: 6,
    sender: "agent",
    message:
      "Sure, I'll add it to our queue. Any specific scenarios to focus on?",
    timestamp: "2024-03-15T09:35:00Z",
  },
  {
    id: 7,
    sender: "user",
    message:
      "Please check for edge cases with empty data and large datasets. Also, verify the loading states.",
    timestamp: "2024-03-15T09:36:00Z",
  },
  {
    id: 8,
    sender: "agent",
    message:
      "Got it. I'll report any bugs in Jira and update here once testing starts.",
    timestamp: "2024-03-15T09:37:00Z",
  },
  {
    id: 9,
    sender: "user",
    message: "Awesome, thanks everyone! Let's aim to deploy by Friday.",
    timestamp: "2024-03-15T09:38:00Z",
  },
  {
    id: 10,
    sender: "agent",
    message:
      "Sounds good! I'll keep you posted on progress and blockers.",
    timestamp: "2024-03-15T09:39:00Z",
  },
];

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    borderColor: "#E1E1E1",
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontWeight: 600,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.disabled,
  },
  "& .MuiOutlinedInput-input::placeholder": {
    fontWeight: 300,
    fontSize: 15.5,
    color: "#B5B7C0",
  },
  backgroundColor: theme.palette.primary.lightBlueBackground,
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.disabled,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.disabled,
    borderWidth: 1,
  },
}));

export default function ChatRoom({ setChatWindowOpen, isMobileMenu }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab] = useState(0);
  const [newComment, setNewComment] = useState("");

  const [phone, setPhone] = useState("");

  return (
    <Grid sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid #E1E1E1`,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{
            flexGrow: 1,
            minHeight: 40,
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
        {isMobileMenu && (
          <IconButton
            onClick={() => setChatWindowOpen(false)}
            sx={{
              // padding: "10px",
              marginRight: "1rem",
            }}
          >
            <X size={20} color={theme.palette.primary.grey} />
          </IconButton>
        )}
      </Box>

      <Grid
        container
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: isMobile ? "10px 16px" : "10px 32px",
        }}
      >
        {sampleChatData.map((chatItem) => (
          <FlexBox
            key={chatItem.id}
            sx={{
              width: "100%",
              justifyContent:
                chatItem.sender === "user" ? "flex-start" : "flex-end",
              flexDirection: "column",
              marginBottom: 2,
            }}
          >
            {chatItem.sender === "user" ? (
              <Box
                sx={{
                  padding: "0.5rem 0rem",
                  borderRadius: "50px",
                  flexDirection: "row",
                  display: "flex",
                  width: "fit-content",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar src={avatar5} alt="avatar" style={{ marginRight: 7 }} />
                <H7
                  sx={{ fontWeight: 500, color: theme.palette.primary.grey300 }}
                >
                  고객
                </H7>
              </Box>
            ) : (
              <H7
                sx={{
                  fontWeight: 500,
                  color: theme.palette.primary.grey300,
                  alignSelf: "flex-end",
                  marginBottom: 0.5,
                }}
              >
                상담원
              </H7>
            )}
            <FlexBox
              px={3}
              py={2.5}
              sx={{
                backgroundColor:
                  chatItem.sender === "user"
                    ? theme.palette.primary.lightBlue3
                    : theme.palette.primary.violet300,
                width: "fit-content",
                maxWidth: "70%",
                height: "fit-content",
                justifyContent: "center",
                alignItems: "center",
                borderRadius:
                  chatItem.sender === "user"
                    ? "0 20px 20px 20px"
                    : "20px 0 20px 20px",
                alignSelf:
                  chatItem.sender === "user" ? "flex-start" : "flex-end",
              }}
            >
              <H6>{chatItem.message}</H6>
            </FlexBox>
          </FlexBox>
        ))}
      </Grid>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <StyledTextField
          type="text"
          name="newComment"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{
            backgroundColor: theme.palette.primary.grey800,
            width: "100%",
            "& .MuiOutlinedInput-input::placeholder": {
              fontWeight: 300,
              fontSize: 15.5,
              color: "#B5B7C0",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Send
                  size={20}
                  color={theme.palette.primary.grey400}
                  style={{ cursor: "pointer", marginLeft: 8 }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Grid>
  );
}
