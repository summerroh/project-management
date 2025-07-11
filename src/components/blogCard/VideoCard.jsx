import React from "react";
import { Grid, Box, useTheme } from "@mui/material";
import { H3, H5, H6, Small } from "components/Typography";
import img3 from "assets/img3.png";
import { Star } from "@mui/icons-material";
import ReactPlayer from "react-player";
import { Calendar, Eye, Heart, MessageCircle } from "react-feather";

// import heart from "assets/empty-heart.svg";
// import view from "assets/view.svg";

export default function VideoCard({}) {
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
    <Grid
      mb={2}
      container
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        height: "100%",
        display: "flex",
        borderRadius: 6,
        justifyContent: "space-between",
        // maxWidth: "310px",
      }}
    >
      <Grid
        container
        item
        mb={0}
        sx={{ width: "100%", borderRadius: 6, overflow: "hidden" }}
      >
        <ReactPlayer
          width={"100%"}
          height={"auto"}
          controls={true}
          url="https://youtu.be/akN_DO1Gsf8?si=M1enQke_CwmCxJ78"
        />
      </Grid>

      <Grid
        container
        item
        sx={{
          paddingLeft: 1.5,
          paddingRight: 1.5,
          paddingTop: 2,
          paddingBottom: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <H5 lineHeight={1.3} fontWeight={700}>
            종잣돈 없어도 가능! <br /> 평생 월 300만원 받는 투자
          </H5>
          <Small>광화문금융러</Small>

          <Grid my={1} container item alignItems={"center"}>
            <Star
              sx={{
                color: "#FADA42",
                fontSize: "19px",
              }}
            />
            <Star
              sx={{
                color: "#FADA42",
                fontSize: "19px",
              }}
            />
            <Star
              sx={{
                color: "#FADA42",
                fontSize: "19px",
              }}
            />
            <Star
              sx={{
                color: "#FADA42",
                fontSize: "19px",
              }}
            />
            <Star
              sx={{
                color: "#FADA42",
                fontSize: "19px",
              }}
            />

            <Small ml={1}>5.0</Small>
          </Grid>
          <H3 sx={{ color: theme.palette.primary.darkBlue }}>₩143,000</H3>
        </Box>
      </Grid>

      {/* 아이콘들 */}
      <Box
        pt={1}
        pl={1.5}
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

      <Grid
        mt={0.5}
        container
        item
        spacing={1}
        sx={{ paddingLeft: 1.5, paddingRight: 1.5 }}
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
    </Grid>
  );
}
