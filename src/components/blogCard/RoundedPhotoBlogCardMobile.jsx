import {
  Box,
  Grid,
  useMediaQuery,
  Chip,
  alpha,
  Stack,
  styled,
} from "@mui/material";
import { H6, Small } from "components/Typography";
import React, { useRef, useState } from "react";
import { Star } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import AppPagination from "components/AppPagination";
import img3 from "assets/img3.png";
import Slider from "react-slick";
import { Calendar, Eye, Heart, MessageCircle } from "react-feather";
import FlexBox from "components/flexbox/FlexBox";

const pageNumber = [0, 1, 2];

const TruncatedH6 = styled(H6)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3em;
  max-height: 2.6em; /* line-height times the number of lines you want to show */
  font-weight: 700;
  width: "100%";
  textAlign: "left";
  fontSize: isMobile ? "15px" : "inherit";
`;

export default function RoundedPhotoBlogCardMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  let sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const customStyle = {
    width: `calc(100% - ${isTablet ? "0px" : "260px"})`,
    marginLeft: isTablet ? "0px" : "260px",
  };

  const handlePagination = (event, page) => {
    sliderRef.slickGoTo(page - 1);
    setActiveIndex(page - 1);
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setActiveIndex(next),
  };

  // Carousel
  return (
    <>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          position: "relative",
          ...customStyle,
        }}
      >
        <Slider
          {...settings}
          ref={(slider) => {
            sliderRef = slider;
          }}
        >
          {pageNumber.map((index) => {
            return (
              <div key={index}>
                {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <YoutubeCard isMobile={isMobile} />
                  <YoutubeCard isMobile={isMobile} />
                  <YoutubeCard isMobile={isMobile} />
                  <YoutubeCard isMobile={isMobile} />
                </Box> */}

                <Grid container>
                  <Grid item xs={6} sm={4} md={3}>
                    <Box m={1}>
                      <YoutubeCard isMobile={isMobile} />
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Box m={1}>
                      <YoutubeCard isMobile={isMobile} />
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Box m={1}>
                      <YoutubeCard isMobile={isMobile} />
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Box m={1}>
                      <YoutubeCard isMobile={isMobile} />
                    </Box>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Slider>
      </Box>

      <Stack alignItems="center" marginY="1rem">
        <AppPagination
          shape="rounded"
          onChange={handlePagination}
          count={pageNumber.length}
          page={activeIndex + 1}
        />
      </Stack>
    </>
  );
}

const YoutubeCard = ({ isMobile }) => {
  const theme = useTheme();

  const tagData = [
    {
      tag: "TODAY",
    },
    {
      tag: "HOT",
    },
    {
      tag: "NEW",
    },
    {
      tag: "BEST",
    },
    {
      tag: "AD",
    },
  ];

  return (
    <Grid item sx={{ marginBottom: 4 }}>
      <FlexBox
        sx={{
          width: "100%",
          backgroundColor: "#ffffff",
          height: "100%",
          display: "flex",
          borderRadius: 3,
          flexDirection: "column",
          // border: "1px solid #E1E1E1",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <FlexBox item mb={0} flexGrow={1}>
          <img
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 12,
              objectFit: "cover",
            }}
            src={img3}
            alt={"Banner"}
          />
        </FlexBox>

        <Grid container item sx={{ padding: 1.4 }}>
          <Box
            sx={{
              paddingRight: "2px",
              minHeight: "48px",
              textAlign: "left",
            }}
          >
            <TruncatedH6>
              종잣돈 없어도 가능! <br /> 평생 월 300만원 받는 투자방법 배워보고
              적용하기
            </TruncatedH6>
          </Box>

          <Grid container item alignItems={"center"}>
            <Small>광화문금융러</Small>
          </Grid>
          <Grid container item alignItems={"center"}>
            {/* 아이콘들 */}
            <Box
              pt={1}
              columnGap={1.5}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Heart
                  size={13}
                  color={theme.palette.primary.red}
                  style={{ marginRight: "4px", marginBottom: "1px" }}
                />
                <H6
                  style={{
                    fontSize: 14,
                    color: theme.palette.primary.red,
                    fontWeight: 500,
                  }}
                >
                  28
                </H6>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Eye
                  size={14}
                  color={theme.palette.primary.yellow300}
                  style={{ marginRight: "4px", marginBottom: "1px" }}
                />
                <H6
                  style={{
                    fontSize: 14,
                    color: theme.palette.primary.yellow300,
                    fontWeight: 500,
                  }}
                >
                  360
                </H6>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MessageCircle
                  size={14}
                  color={theme.palette.primary.green}
                  style={{ marginRight: "4px", marginBottom: "1px" }}
                />
                <H6
                  style={{
                    fontSize: 14,
                    color: theme.palette.primary.green,
                    fontWeight: 500,
                  }}
                >
                  9
                </H6>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Calendar
                  size={13}
                  color={theme.palette.primary.violet}
                  style={{ marginRight: "4px", marginBottom: "1px" }}
                />
                <H6
                  style={{
                    fontSize: 14,
                    color: theme.palette.primary.violet,
                    fontWeight: 500,
                  }}
                >
                  23.12.28
                </H6>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          item
          spacing={1}
          px={1.4}
          mt={0}
          sx={{ paddingBottom: 1.5 }}
        >
          {tagData.map((item, index) => {
            let tag = item.tag;
            return (
              <Grid item key={index}>
                <Box
                  px={1.1}
                  py={1.5}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 22,
                    fontSize: 12.5,
                    borderRadius: 1,
                    backgroundColor:
                      tag === "HOT"
                        ? theme.palette.primary.lightViolet
                        : tag === "BEST"
                        ? theme.palette.primary.lightGreen
                        : tag === "AD"
                        ? theme.palette.primary.lightYellow
                        : tag === "NEW"
                        ? theme.palette.primary.lightBlue3
                        : theme.palette.primary.lightRed,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <strong
                      style={{
                        color:
                          tag === "HOT"
                            ? theme.palette.primary.violet
                            : tag === "BEST"
                            ? theme.palette.primary.green
                            : tag === "AD"
                            ? theme.palette.primary.yellow300
                            : tag === "NEW"
                            ? theme.palette.primary.darkBlue
                            : theme.palette.primary.red,
                      }}
                    >
                      {tag}
                    </strong>
                  </span>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </FlexBox>
    </Grid>
  );
};
