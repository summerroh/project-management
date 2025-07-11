import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  Divider,
  styled,
  useMediaQuery,
} from "@mui/material";
import { ButtonText, H6, Tiny } from "components/Typography";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  HelpCircle,
  Plus,
  Settings,
} from "react-feather";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import FlexBox from "components/flexbox/FlexBox";
import IconX from "assets/icon-close-modal.svg";

const navbarHeight = 67;
// ----------------------------------
// styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "1rem 0rem 1rem 0rem",
  height: `calc(100vh - ${navbarHeight}px)`,
  justifyContent: "space-between",
  flexDirection: "column",
  borderRadius: 0,
  position: "relative",
  overflow: "auto",
  backgroundColor: theme.palette.primary.lightBlueBackground,
  [theme.breakpoints.down("sm")]: {
    padding: "1rem 1rem 1rem 1rem",
    textAlign: "center",
    borderRadius: 0,
    "& > .MuiBox-root": {
      paddingBottom: 0,
    },
  },
}));

export default function ChatList({
  setShowChatScreen,
  showChatScreen,
  setShowChatList,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledCard>
      <Box sx={{ width: "100%" }}>
        {isTablet && (
          <FlexBox
            sx={{ width: "100%", justifyContent: "flex-end", paddingX: "1rem" }}
          >
            <img
              onClick={() => setShowChatList(false)}
              src={IconX}
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                // position: "absolute",
                top: "22px",
                right: "22px",
              }}
            />
          </FlexBox>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: "1rem",
          }}
        >
          <Button
            variant="contained"
            size="small"
            // onClick={() => navigate("/dashboard/texteditor")}
            sx={{
              height: "38px",
              fontSize: 14.5,
              borderRadius: 2,
              width: "100%",
              borderRadius: 2,
              background: theme.palette.gradient.purpletoblue,
            }}
          >
            <ButtonText
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Plus size={20} color="white" style={{ marginRight: 4 }} />새 채팅
              시작
            </ButtonText>
          </Button>
        </Box>

        <FlexRowAlign
          mb={2}
          sx={{
            justifyContent: "space-between",
            width: "100%",
            padding: "0rem 1rem",
          }}
        >
          <Tiny>목록</Tiny>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              border: "1px solid #DBDBDB",
              borderRadius: 100,
              padding: "2px 14px",
              cursor: "pointer",
            }}
          >
            <Tiny sx={{ fontSize: 13.5 }}>채팅방 편집</Tiny>
          </Box>
        </FlexRowAlign>

        <FlexBox
          onClick={() => setShowChatScreen(false)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            backgroundColor: theme.palette.primary.lightBlue2,
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>
            대화를 시작해보세요
          </Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>새 채팅</H6>
        </FlexBox>
        <FlexBox
          onClick={() => setShowChatScreen(true)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>GPT-3.5</Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>비로그인 채팅기록</H6>
        </FlexBox>
        <FlexBox
          onClick={() => setShowChatScreen(true)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>GPT-3.5</Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>비로그인 채팅기록</H6>
        </FlexBox>
        <FlexBox
          onClick={() => setShowChatScreen(true)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>GPT-3.5</Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>비로그인 채팅기록</H6>
        </FlexBox>
        <FlexBox
          onClick={() => setShowChatScreen(true)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>GPT-3.5</Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>비로그인 채팅기록</H6>
        </FlexBox>
        <FlexBox
          onClick={() => setShowChatScreen(true)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>GPT-3.5</Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>비로그인 채팅기록</H6>
        </FlexBox>
        <FlexBox
          onClick={() => setShowChatScreen(true)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>GPT-3.5</Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>비로그인 채팅기록</H6>
        </FlexBox>
        <FlexBox
          onClick={() => setShowChatScreen(true)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>GPT-3.5</Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>비로그인 채팅기록</H6>
        </FlexBox>
        <FlexBox
          onClick={() => setShowChatScreen(true)}
          sx={{
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            padding: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.lightBlue2,
            },
          }}
        >
          <Tiny sx={{ fontSize: 13.5, textAlign: "left" }}>GPT-3.5</Tiny>
          <H6 sx={{ fontWeight: 600, textAlign: "left" }}>비로그인 채팅기록</H6>
        </FlexBox>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Divider
          sx={{
            width: "90%",
            borderTop: "1px solid #E1E1E1",
            margin: "0 auto",
            marginBottom: "0.8rem",
          }}
        />
        <FlexRowAlign
          gap={1}
          sx={{
            cursor: "pointer",
            justifyContent: "flex-start",
            width: "100%",
            padding: "0.6rem 1rem",
          }}
        >
          <Settings size={20} color={theme.palette.primary.grey300} />
          <H6 sx={{ color: theme.palette.primary.grey300 }}>AI 설정</H6>
        </FlexRowAlign>

        <FlexRowAlign
          gap={1}
          sx={{
            cursor: "pointer",
            justifyContent: "flex-start",
            width: "100%",
            padding: "0.6rem 1rem",
          }}
        >
          <HelpCircle size={20} color={theme.palette.primary.grey300} />
          <H6 sx={{ color: theme.palette.primary.grey300 }}>채팅 도움말</H6>
        </FlexRowAlign>

        <FlexRowAlign
          gap={1}
          sx={{
            cursor: "pointer",
            justifyContent: "flex-start",
            width: "100%",
            padding: "0.6rem 1rem",
          }}
        >
          <FlexRowAlign
            gap={1}
            sx={{
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <BookOpen size={20} color={theme.palette.primary.grey300} />
            <H6 sx={{ color: theme.palette.primary.grey300 }}>뤼튼 가이드</H6>
          </FlexRowAlign>
          <ChevronRight size={20} color={theme.palette.primary.grey300} />
        </FlexRowAlign>
      </Box>
    </StyledCard>
  );
}
