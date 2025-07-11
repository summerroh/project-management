import { useTheme } from "@emotion/react";
import {
  Box,
  useMediaQuery,
  Typography,
  Popover,
  Divider,
} from "@mui/material";
import avatar5 from "assets/avatar-5.png";
import FlexBox from "components/flexbox/FlexBox";
import { Tiny } from "components/Typography";
import { Plus } from "lucide-react";
import { useState } from "react";

const navbarHeight = 117;

export default function SideMenu({}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

  const handleLogoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const avatarOpen = Boolean(avatarAnchorEl);

  return (
    <Box
      sx={{
        height: `calc(100vh - ${navbarHeight}px)`,
        width: "70px",
        backgroundColor: theme.palette.primary.grey2,
        padding: "0.8rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: `1px solid #E1E1E1`,
      }}
    >
      <FlexBox
        gap={2.5}
        style={{ alignItems: "center", flexDirection: "column" }}
      >
        <FlexBox
          onClick={handleLogoClick}
          sx={{
            backgroundColor: theme.palette.primary.white,
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img src={"/static/logo/logo-sugar-company.svg"} width={"34px"} />
        </FlexBox>

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
                sx={{ color: theme.palette.primary.dark, cursor: "pointer" }}
              >
                Add Workspace
              </Tiny>
            </FlexBox>
          </Box>
        </Popover>

        <FlexBox
          gap={0.6}
          style={{
            cursor: "pointer",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={"/static/sidemenu/home-selected.png"} width={"28px"} />
          <Tiny
            sx={{
              color: theme.palette.primary.white,
              whiteSpace: "nowrap",
            }}
          >
            홈
          </Tiny>
        </FlexBox>

        <FlexBox
          gap={0.6}
          style={{
            cursor: "pointer",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={"/static/sidemenu/chat.png"} width={"28px"} />
          <Tiny
            sx={{ color: theme.palette.primary.white, whiteSpace: "nowrap" }}
          >
            채팅
          </Tiny>
        </FlexBox>

        <FlexBox
          gap={0.6}
          style={{
            cursor: "pointer",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={"/static/sidemenu/bell.png"} width={"28px"} />
          <Tiny
            sx={{
              color: theme.palette.primary.white,
              whiteSpace: "nowrap",
            }}
          >
            내 활동
          </Tiny>
        </FlexBox>

        <FlexBox
          gap={0.6}
          style={{
            cursor: "pointer",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={"/static/sidemenu/three-dots.png"} width={"28px"} />
          <Tiny
            sx={{
              color: theme.palette.primary.white,
              whiteSpace: "nowrap",
            }}
          >
            더보기
          </Tiny>
        </FlexBox>
      </FlexBox>

      <FlexBox
        gap={2}
        style={{ alignItems: "center", flexDirection: "column" }}
      >
        <FlexBox
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

        <FlexBox
          onClick={handleAvatarClick}
          sx={{
            backgroundColor: theme.palette.primary.grey,
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            backgroundImage: `url(${avatar5})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></FlexBox>

        <Popover
          open={avatarOpen}
          anchorEl={avatarAnchorEl}
          onClose={handleAvatarClose}
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
                onClick={handleAvatarClick}
                sx={{
                  backgroundColor: theme.palette.primary.grey,
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundImage: `url(${avatar5})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></FlexBox>
              <FlexBox flexDirection={"column"}>
                <Tiny sx={{ color: theme.palette.primary.dark }}>
                  Swift
                </Tiny>
                <FlexBox alignItems="center">
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "green",
                      marginRight: 0.5,
                    }}
                  />
                  <Tiny sx={{ fontWeight: 400 }}>대화 가능</Tiny>
                </FlexBox>
              </FlexBox>
            </FlexBox>
            <FlexBox
              sx={{
                alignItems: "center",
                mt: 1,
                flexDirection: "column",
                gap: 0.5,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Tiny
                sx={{ color: theme.palette.primary.dark, cursor: "pointer" }}
              >
                자신을 자리 비움으로 설정
              </Tiny>
              <Tiny
                sx={{ color: theme.palette.primary.dark, cursor: "pointer" }}
              >
                알림 일시 중지
              </Tiny>

              <Divider sx={{ width: "100%", my: 1 }} />

              <Tiny
                sx={{ color: theme.palette.primary.dark, cursor: "pointer" }}
              >
                프로필
              </Tiny>
              <Tiny
                sx={{ color: theme.palette.primary.dark, cursor: "pointer" }}
              >
                환경설정
              </Tiny>

              <Divider sx={{ width: "100%", my: 1 }} />

              <Tiny
                sx={{ color: theme.palette.primary.dark, cursor: "pointer" }}
              >
                다운로드
              </Tiny>

              <Divider sx={{ width: "100%", my: 1 }} />

              <Tiny
                sx={{ color: theme.palette.primary.dark, cursor: "pointer" }}
              >
                로그아웃
              </Tiny>
            </FlexBox>
          </Box>
        </Popover>
      </FlexBox>
    </Box>
  );
}
