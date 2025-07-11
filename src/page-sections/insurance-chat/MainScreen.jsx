import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { H6, H7 } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import ChatIcon from "assets/chat-processing.svg";
import CodeIcon from "assets/code.svg";
import { Grid } from "@mui/material";
import BannerCard from "./BannerCard";
import AIDropdown from "./AIDropdown";

export default function MainScreen() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      pt={2}
      container
      sx={{
        // maxHeight: isTablet
        //   ? `calc(100vh - ${navbarHeight}px - ${150}px)`
        //   : `calc(100vh - ${navbarHeight}px - ${otherElementHeight}px)`,

        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none" /* IE and Edge */,
        "scrollbar-width": "none" /* Firefox */,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AIDropdown />
      <Grid
        container
        direction={"row"}
        mt={1}
        mb={1.5}
        px={isMobile ? 0 : 0}
        py={isMobile ? 0 : 0}
        sx={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <Grid
          mt={isTablet ? 2 : 2}
          mb={2}
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <H6
            mr={1.5}
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.grey300,
              textAlign: "center",
            }}
          >
            GPT-4 Turbo
            <span
              style={{ fontWeight: 500, color: theme.palette.primary.dark }}
            >
              는
            </span>
          </H6>
          <H6 mr={1.5} sx={{ textAlign: "center" }}>
            더 빠르고 이미지도 이해해요.
          </H6>
        </Grid>
      </Grid>

      <FlexBox
        px={isTablet ? 2 : 0}
        mb={isTablet ? 14 : 0}
        gap={1.5}
        sx={{
          width: "90%",
          flexDirection: isTablet ? "column" : "row",
          overflow: "hidden",
        }}
      >
        <FlexBox
          gap={1.5}
          sx={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <FlexBox
            gap={1}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: 70,
              flexDirection: "column",
            }}
          >
            <img src={ChatIcon} alt="img1" />
            <H6>이런 질문을 할 수 있어요</H6>
          </FlexBox>
          <FlexBox
            sx={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.lightBlue3,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              height: 94,
              "&:hover": {
                backgroundColor: theme.palette.primary.lightBlue4,
              },
            }}
          >
            <H6 sx={{ color: theme.palette.primary.grey300 }}>
              가장 많이 나온 로또번호?
            </H6>
          </FlexBox>
          <FlexBox
            sx={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.lightBlue3,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              height: 94,
              "&:hover": {
                backgroundColor: theme.palette.primary.lightBlue4,
              },
            }}
          >
            <H6 sx={{ color: theme.palette.primary.grey300 }}>
              2024년도 공휴일
            </H6>
          </FlexBox>
          <FlexBox
            sx={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.lightBlue3,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              height: 94,
              "&:hover": {
                backgroundColor: theme.palette.primary.lightBlue4,
              },
            }}
          >
            <H6 sx={{ color: theme.palette.primary.grey300 }}>
              SNS 사용이 정신 건강에 미치는 영향
            </H6>
          </FlexBox>
        </FlexBox>
        <FlexBox
          gap={1.5}
          sx={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <FlexBox
            gap={1}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: 70,
              flexDirection: "column",
            }}
          >
            <img src={CodeIcon} alt="img1" />
            <H6>여러 프롬프트를 쓸 수 있어요</H6>
          </FlexBox>
          <FlexBox
            sx={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.violet200,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              flexDirection: "column",
              height: 94,
              "&:hover": {
                backgroundColor: theme.palette.primary.violet300,
              },
            }}
          >
            <H7 sx={{ fontWeight: 600, color: theme.palette.primary.violet }}>
              교육
            </H7>
            <H6 sx={{ color: theme.palette.primary.grey300 }}>
              파워포인트 작성을 한 방에!
            </H6>
          </FlexBox>
          <FlexBox
            sx={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.violet200,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              flexDirection: "column",
              height: 94,
              "&:hover": {
                backgroundColor: theme.palette.primary.violet300,
              },
            }}
          >
            <H7 sx={{ fontWeight: 600, color: theme.palette.primary.violet }}>
              재미
            </H7>
            <H6 sx={{ color: theme.palette.primary.grey300 }}>대통령과 대화</H6>
          </FlexBox>
          <FlexBox
            sx={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.violet200,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              flexDirection: "column",
              height: 94,
              "&:hover": {
                backgroundColor: theme.palette.primary.violet300,
              },
            }}
          >
            <H7 sx={{ fontWeight: 600, color: theme.palette.primary.violet }}>
              교육
            </H7>
            <H6 sx={{ color: theme.palette.primary.grey300 }}>
              AI 친구와 고민상담 (대화 봇)
            </H6>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Grid>
  );
}
