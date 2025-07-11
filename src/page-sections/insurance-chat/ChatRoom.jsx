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

const tabItems = ["카카오 채널", "팀 채팅", "전화", "문자"];

const sampleChatData = [
  {
    id: 1,
    sender: "user",
    message: "안녕하세요, 보험 상담을 받고 싶습니다.",
    timestamp: "2024-03-15T09:30:00Z",
  },
  {
    id: 2,
    sender: "agent",
    message: "안녕하세요! 어떤 종류의 보험에 관심이 있으신가요?",
    timestamp: "2024-03-15T09:31:00Z",
  },
  {
    id: 3,
    sender: "user",
    message: "자동차 보험을 알아보고 있어요.",
    timestamp: "2024-03-15T09:32:00Z",
  },
  {
    id: 4,
    sender: "agent",
    message:
      "네, 자동차 보험에 대해 안내해 드리겠습니다. 현재 운전하시는 차량의 종류와 연식을 알려주시겠어요?",
    timestamp: "2024-03-15T09:33:00Z",
  },
  {
    id: 5,
    sender: "user",
    message: "2020년식 현대 소나타입니다.",
    timestamp: "2024-03-15T09:34:00Z",
  },
  {
    id: 6,
    sender: "agent",
    message:
      "네, 알겠습니다. 2020년식 현대 소나타에 대한 보험 상품을 안내해 드리겠습니다. 주로 어떤 용도로 차량을 사용하시나요? 출퇴근용인지, 업무용인지 알려주시면 더 자세한 안내가 가능합니다.",
    timestamp: "2024-03-15T09:35:00Z",
  },
  {
    id: 7,
    sender: "user",
    message:
      "주로 출퇴근용으로 사용하고 있습니다. 가끔 주말에 가족 여행도 갑니다.",
    timestamp: "2024-03-15T09:36:00Z",
  },
  {
    id: 8,
    sender: "agent",
    message:
      "네, 이해했습니다. 출퇴근용과 가족 여행에 적합한 보험 상품을 추천해 드리겠습니다. 혹시 특별히 원하시는 보장 내용이 있으신가요? 예를 들어, 자기차량 손해, 무보험차 상해, 또는 긴급출동 서비스 등이 있습니다.",
    timestamp: "2024-03-15T09:37:00Z",
  },
  {
    id: 9,
    sender: "user",
    message: "자기차량 손해와 긴급출동 서비스가 포함된 상품이 좋을 것 같아요.",
    timestamp: "2024-03-15T09:38:00Z",
  },
  {
    id: 10,
    sender: "agent",
    message:
      "네, 고객님의 요구사항을 반영한 맞춤형 상품을 안내해 드리겠습니다. 자기차량 손해와 긴급출동 서비스가 포함된 '프리미엄 세이프 드라이브' 상품을 추천드립니다. 이 상품은 출퇴근 및 가족 여행에 적합하며, 다양한 특약을 통해 보장 범위를 조절할 수 있습니다. 자세한 내용을 이메일로 보내드릴까요?",
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
