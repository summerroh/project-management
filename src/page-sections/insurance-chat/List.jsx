import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  Grid,
  InputAdornment,
  TextField,
  styled,
  useMediaQuery,
} from "@mui/material";
import { Tiny } from "components/Typography";
import { useState } from "react";
import { RotateCw, Send, Share2, Paperclip, Image, Menu } from "react-feather";
import FlexBox from "components/flexbox/FlexBox";
import MainScreen from "./MainScreen";
import ChatScreen from "./ChatScreen";
import ShareModal from "pages/shareModal";
import ChatList from "./ChatList";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    borderColor: theme.palette.action.disabled,
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

const navbarHeight = 67;
// ----------------------------------
// styled components
const StyledCard = styled(Card)(({ theme }) => ({
  overflowX: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: "2rem 2rem 1rem 2rem",
  minHeight: `calc(100vh - ${navbarHeight}px)`,
  borderRadius: 0,
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    // padding: "2rem",
    padding: "0rem 0rem 0rem 0rem",
    textAlign: "center",
    borderRadius: 0,
    "& > .MuiBox-root": {
      paddingBottom: 0,
    },
  },
}));

export default function List({ showChatScreen, setShowChatScreen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [showChatList, setShowChatList] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <>
      <ShareModal open={showShareModal} setShowModal={setShowShareModal} />
      {showChatList && isTablet ? (
        <>
          <ChatList
            setShowChatScreen={setShowChatScreen}
            setShowChatList={setShowChatList}
          />
        </>
      ) : (
        <>
          {/* {isTablet && (
            <FlexBox px={1.5} py={1.5} sx={{ backgroundColor: "#f2f2f2" }}>
              <BannerCard />
            </FlexBox>
          )} */}

          <StyledCard>
            {/* {isTablet && (
              <FlexBox
                py={2}
                px={2}
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  paddingBottom: "14px !important",
                  marginBottom: "0px !important",
                  borderBottom: "1px solid #E1E1E1",
                  // position: "absolute",
                }}
              >
                <H7
                  onClick={() => setShowChatList(true)}
                  sx={{
                    color: theme.palette.primary.darkBlue,
                    cursor: "pointer",
                  }}
                >
                  채팅방 목록
                </H7>
                <img
                  onClick={() => setShowChatScreen(false)}
                  src={AddChat}
                  alt="chat"
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                />
              </FlexBox>
            )} */}
            <Box
              sx={{
                overflow: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              {showChatScreen ? <ChatScreen /> : <MainScreen />}
            </Box>

            <FlexBox
              sx={{
                position: isTablet ? "fixed" : "absolute",
                bottom: isTablet ? 0 : 26,
                width: isTablet ? "100vw" : "90%",
                flexDirection: "column",
              }}
            >
              {showChatScreen && (
                <FlexBox
                  gap={1}
                  mb={1}
                  pr={isTablet ? 1 : 0}
                  sx={{ width: "100%", justifyContent: "flex-end" }}
                >
                  <Box
                    sx={{
                      width: "fit-content",
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
                    <RotateCw size={14} color={theme.palette.primary.grey400} />
                    <Tiny sx={{ fontSize: 13.5, marginLeft: 0.5 }}>
                      Regenerate
                    </Tiny>
                  </Box>
                  <Box
                    onClick={() => setShowShareModal(true)}
                    sx={{
                      width: "fit-content",
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
                    <Share2 size={14} color={theme.palette.primary.grey400} />
                    <Tiny sx={{ fontSize: 13.5, marginLeft: 0.5 }}>Share</Tiny>
                  </Box>
                </FlexBox>
              )}

              <StyledTextField
                type="text"
                name="prompt"
                placeholder="Ask AI anything."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{
                  height: "50px",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-input::placeholder": {
                    fontWeight: 300,
                    fontSize: 15.5,
                    color: "#B5B7C0",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: isTablet ? "0px" : "8px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Menu
                        onClick={() => setShowChatList(true)}
                        size={20}
                        color={theme.palette.primary.grey400}
                        style={{ cursor: "pointer", marginRight: 0 }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Paperclip
                        size={20}
                        color={theme.palette.primary.grey400}
                        style={{ cursor: "pointer", marginLeft: 8 }}
                      />
                      <Image
                        size={20}
                        color={theme.palette.primary.grey400}
                        style={{ cursor: "pointer", marginLeft: 8 }}
                      />
                      <Send
                        size={20}
                        color={theme.palette.primary.darkBlue}
                        style={{ cursor: "pointer", marginLeft: 8 }}
                      />
                    </InputAdornment>
                  ),
                  style: { height: 50 },
                }}
              />
            </FlexBox>
          </StyledCard>
        </>
      )}
    </>
  );
}
