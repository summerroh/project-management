import { Box, Chip, Divider, Grid, alpha, useMediaQuery } from "@mui/material";
import { H5, H6, Small } from "components/Typography";
import React from "react";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import heart from "assets/emoji/heart-emoji.png";
import chat from "assets/emoji/chat-emoji.png";
import img1 from "assets/img1.png";
import { useTheme } from "@emotion/react";

export default function Card2({ onForumClick }) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Grid item onClick={() => onForumClick()} sx={{ cursor: "pointer" }}>
        <Grid
          mb={2}
          container
          sx={{
            width: "100%",
            backgroundColor: "#ffffff",
            height: "100%",
            display: "flex",
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid #E1E1E1",
            justifyContent: "space-between",
            maxWidth: "225px",
          }}
        >
          <Grid container item mb={1}>
            <img
              width="225px"
              src={img1}
              alt={"Banner"}
              style={{ objectFit: "cover" }}
            />
          </Grid>

          <Grid container item px={1.5}>
            <Grid container item spacing={1} mt={0} mb={1}>
              <Grid
                item
                sx={{
                  display: "flex",
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
                mx={1}
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
                    width: "1.5px",
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <H6 lineHeight={1.3} fontWeight={700}>
                [건강보장] 질병장해 1억 플랜
              </H6>
            </Box>

            <Grid container item spacing={1} mt={0} mb={1}>
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

            <Grid container item>
              <H6 sx={{ color: "#151515", fontWeight: 800 }} mb={0}>
                월 28,250원
              </H6>
            </Grid>
          </Grid>

          <Grid container item spacing={1} mt={0.1} px={1.5}>
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
          </Grid>

          <Grid container item spacing={1} mt={0.1} px={1.5} mb={2}>
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
    </>
    // )}
    // </>
  );
}
