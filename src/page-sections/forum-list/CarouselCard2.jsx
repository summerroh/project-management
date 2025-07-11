import {
  Box,
  Grid,
  useMediaQuery,
  Chip,
  alpha,
  Stack,
  Divider,
} from "@mui/material";
import { H6, Small } from "components/Typography";
import React, { useState } from "react";
import { Star } from "@mui/icons-material";
import Banner from "assets/banner.png";
import Banner2 from "assets/banner2.png";
import { useTheme } from "@emotion/react";
import AppPagination from "components/AppPagination";
import img3 from "assets/img3.png";
import SwipeableCarousel from "components/SwipeableCarousel";
import calendar from "assets/emoji/calendar-emoji.png";
import eyes from "assets/emoji/eyes-emoji.png";
import heart from "assets/emoji/heart-emoji.png";
import chat from "assets/emoji/chat-emoji.png";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { useNavigate } from "react-router-dom";

var carouselItems = [
  {
    name: "Random Name #1",
    description: "2024 너나위의 내집마련 기초반",
    indicatorTitle: "내집마련 기초반",
    img: Banner,
  },
  {
    name: "Random Name #2",
    description: "친구와 함께 듣는 클래스",
    indicatorTitle: "함께 클래스",
    img: Banner2,
  },
];

const cardData = [
  {
    title: "[건강보장] 질병장해 1억 플랜",
    tag: "TODAY",
  },
  {
    title: "[건강보장] 질병장해 1억 플랜",
    tag: "HOT",
  },
  {
    title: "[건강보장] 질병장해 1억 플랜",
    tag: "NEW",
  },
  {
    title: "[건강보장] 질병장해 1억 플랜",
    tag: "BEST",
  },
];

export default function CarouselCard2({}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePagination = (event, page) => {
    setActiveIndex(page - 1);
  };

  const onForumClick = () => {
    navigate("/forum/detail");
  };

  // Carouse
  return (
    <>
      <Box
        sx={{
          width: "93%",
          textAlign: "center",
          position: "relative",
        }}
      >
        <SwipeableCarousel
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          carouselItems={carouselItems}
        >
          <Grid container style={{ marginRight: "20px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {cardData.map((item, index) => {
                return (
                  <MyCard
                    onForumClick={onForumClick}
                    key={index}
                    tag={item.tag}
                    title={item.title}
                    isMobile={isMobile}
                  />
                );
              })}
            </Box>
          </Grid>

          <Grid container style={{ marginRight: "20px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {cardData.map((item, index) => {
                return (
                  <MyCard
                    onForumClick={onForumClick}
                    key={index}
                    tag={item.tag}
                    title={item.title}
                    isMobile={isMobile}
                  />
                );
              })}
            </Box>
          </Grid>
        </SwipeableCarousel>
      </Box>

      <Stack alignItems="center" marginY="1rem">
        <AppPagination
          shape="rounded"
          onChange={handlePagination}
          count={carouselItems.length}
          page={activeIndex + 1}
        />
      </Stack>
    </>
  );
}

const MyCard = ({ isMobile, tag, title, onForumClick }) => {
  const theme = useTheme();

  return (
    <Grid
      onClick={() => onForumClick()}
      item
      sx={{ marginBottom: 4, cursor: "pointer" }}
    >
      {/* <Grid item sm={3} xs={12}> */}
      <Grid
        container
        sx={{
          width: "100%",
          backgroundColor: "#ffffff",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          justifyContent: "space-between",
          border: "1px solid #e1e1e1",
          borderRadius: 3,
          maxWidth: "9.5rem", // Adjust this value as needed
        }}
      >
        <Grid
          container
          item
          mb={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "100px",
          }}
        >
          <Grid
            item
            sx={{
              borderTopLeftRadius: 3,
              // transition: "transform 0.3s ease-in-out", // Added transition
              // "&:hover": {
              //   transform: "scale(1.1)", // Added hover effect
              // },
            }}
          >
            <img
              width="100%"
              height="100px"
              src={img3}
              alt={"Banner"}
              style={{
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                objectFit: "cover",
                // transition: "transform 0.3s ease-in-out", // Added transition
                // "&:hover": {
                //   transform: "scale(1.1)", // Added hover effect
                // },
              }}
            />
          </Grid>

          <Chip
            label={
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginRight: "5px",
                    height: "6px",
                    width: "6px",
                    borderRadius: 10,
                    display: "inline-block",
                    backgroundColor:
                      tag === "HOT" || tag === "NEW"
                        ? theme.palette.primary.violet
                        : tag === "BEST" || tag === "AD"
                        ? theme.palette.primary.green
                        : theme.palette.primary.red,
                  }}
                ></div>
                <strong
                  style={{
                    marginRight: "3px",
                    color:
                      tag === "HOT" || tag === "NEW"
                        ? theme.palette.primary.violet
                        : tag === "BEST" || tag === "AD"
                        ? theme.palette.primary.green
                        : theme.palette.primary.red,
                  }}
                >
                  {tag}
                </strong>
              </span>
            }
            sx={{
              height: 22,
              fontSize: 12.5,
              backgroundColor:
                tag === "HOT" || tag === "NEW"
                  ? theme.palette.primary.lightViolet
                  : tag === "BEST" || tag === "AD"
                  ? theme.palette.primary.lightGreen
                  : theme.palette.primary.lightRed,
              position: "absolute",
              top: 10,
              left: 10,
            }}
          />
        </Grid>

        <Grid container item spacing={1} mt={0} mb={0} ml={0.5} mr={0.5}>
          <Grid
            item
            sx={{
              // display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlexRowAlign gap={0.5}>
              <img src={heart} width={"16px"} />
              <span
                style={{
                  fontSize: 12.5,
                  color: "#024EA2",
                  fontWeight: 500,
                }}
              >
                좋아요{" "}
                <strong
                  style={{
                    fontWeight: 800,
                  }}
                >
                  78개
                </strong>
              </span>
            </FlexRowAlign>
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlexRowAlign gap={0.5}>
              <img src={chat} width={"16px"} />
              <span
                style={{
                  fontSize: 12.5,
                  color: "#024EA2",
                  fontWeight: 500,
                }}
              >
                댓글{" "}
                <strong
                  style={{
                    fontWeight: 800,
                  }}
                >
                  24개
                </strong>
              </span>
            </FlexRowAlign>
          </Grid>
        </Grid>

        <Grid
          container
          item
          sx={{
            paddingY: 0.8,
            paddingX: 1.5,
            height: "56px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              paddingRight: "2px",
            }}
          >
            <H6
              sx={{
                fontWeight: 700,
                width: "100%",
                textAlign: "left",
                fontSize: isMobile ? "15px" : "inherit",
              }}
            >
              {title}
            </H6>
          </Box>
        </Grid>

        <Grid container item gap={1} mt={0} mb={1} mx={1.5}>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlexRowAlign gap={0.5}>
              <span
                style={{
                  fontSize: 12.5,
                  color: "#024EA2",
                  fontWeight: 500,
                }}
              >
                작성자
              </span>
            </FlexRowAlign>
          </Grid>

          <Grid
            mx={0.2}
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Divider
              orientation="vertical"
              style={{
                width: "2px",
                height: "11px",
                color: "#024EA2",
                backgroundColor: "#024EA2",
              }}
            />
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlexRowAlign gap={0.5}>
              <span
                style={{
                  fontSize: 12.5,
                  color: "#024EA2",
                  fontWeight: 500,
                }}
              >
                정닥터
              </span>
            </FlexRowAlign>
          </Grid>
        </Grid>

        <Grid container item mx={1.5} mb={1}>
          <H6 sx={{ color: "#151515", fontWeight: 800 }} mb={0}>
            월 28,250원
          </H6>
        </Grid>

        <Grid
          container
          spacing={0.5}
          mb={0.5}
          sx={{ paddingLeft: 1, paddingRight: 1, paddingBottom: 1 }}
        >
          <Grid item>
            <Chip
              label={"신한"}
              sx={{
                height: 22,
                fontSize: 12.5,
                fontWeight: 600,
                color: "#024EA2",
                backgroundColor: alpha("#024EA2", 0.1),
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={"한화"}
              sx={{
                height: 22,
                fontSize: 12.5,
                fontWeight: 600,
                color: "#024EA2",
                backgroundColor: alpha("#024EA2", 0.1),
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={"DB"}
              sx={{
                height: 22,
                fontSize: 12.5,
                fontWeight: 600,
                color: "#024EA2",
                backgroundColor: alpha("#024EA2", 0.1),
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={"ORIGINAL"}
              sx={{
                height: 22,
                fontSize: 12.5,
                color: "#ffffff",
                backgroundColor: "#000000",
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={"BEST"}
              sx={{
                height: 22,
                fontSize: 12.5,
                color: "#024EA2",
                backgroundColor: alpha("#024EA2", 0.1),
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={"NEW"}
              sx={{
                height: 22,
                fontSize: 12.5,
                color: "#E95050",
                backgroundColor: alpha("#E95050", 0.1),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
