import React from "react";
import { Grid, MenuItem, useMediaQuery } from "@mui/material";
import { H6, H7 } from "components/Typography";
import { ChevronDown } from "react-feather";
import GPTIcon from "assets/icon-gpt.png";
import GoogleAiIcon from "assets/icon-googleai.png";
import theme from "theme";
import FlexBox from "components/flexbox/FlexBox";
import { useState } from "react";
import { useTheme } from "@emotion/react";

export default function AIDropdown() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        item
        mt={0}
        gap={1}
        sx={{
          backgroundColor: theme.palette.primary.lightBlue3,
          padding: "0.7rem 1rem",
          borderRadius: "50px",
          width: "fit-content",
          overflow: "hidden",
          // position: isTablet ? "absolute" : "inherit",
          // top: isTablet ? 70 : 0,
          // zIndex: 10,
        }}
      >
        <Grid
          item
          sx={{
            cursor: "pointer",
            backgroundColor: theme.palette.primary.darkBlue,
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={GPTIcon}
            alt="Google AI"
            style={{ marginRight: 7, width: 24 }}
          />
          <H7 sx={{ fontWeight: 500, color: "white" }}>GPT-4 Turbo</H7>
        </Grid>
        {!isTablet && (
          <>
            <Grid
              item
              sx={{
                cursor: "pointer",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={GoogleAiIcon}
                alt="Google AI"
                style={{ marginRight: 7, width: 24 }}
              />
              <H7
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                }}
              >
                구글 AI
              </H7>
            </Grid>
            <Grid
              item
              sx={{
                cursor: "pointer",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
              }}
            >
              <H7
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                }}
              >
                실사
              </H7>
            </Grid>{" "}
            <Grid
              item
              sx={{
                cursor: "pointer",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
              }}
            >
              <H7
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                }}
              >
                일러스트
              </H7>
            </Grid>
            <Grid
              item
              sx={{
                cursor: "pointer",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
              }}
            >
              <H7
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                }}
              >
                AI 보이스
              </H7>
            </Grid>
          </>
        )}

        <Grid
          onClick={() => setShowDropDown(!showDropDown)}
          item
          sx={{
            cursor: "pointer",
            backgroundColor: "white",
            // padding: "0.5rem 0.5rem",
            width: "40px",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <ChevronDown size={20} />
          {showDropDown && (
            <FlexBox
              sx={{
                position: "fixed",
                flexDirection: "column",
                top: 150,
              }}
            >
              <MenuItem
                sx={{
                  height: 40,
                  width: 180,
                  fontSize: 14,
                  fontWeight: 300,
                  paddingY: 3,
                  border: "1px solid #E1E1E1",
                  backgroundColor: "white",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.lightBlue3,
                  },
                }}
                value={"제목 + 내용"}
              >
                <img
                  src={GPTIcon}
                  alt="Google AI"
                  style={{ marginRight: 7, width: 24 }}
                />
                <H6 sx={{ fontWeight: 600 }}>GPT-3.5</H6>
              </MenuItem>

              <MenuItem
                sx={{
                  height: 40,
                  width: 180,
                  fontSize: 14,
                  fontWeight: 300,
                  paddingY: 3,
                  border: "1px solid #E1E1E1",
                  backgroundColor: "white",
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.lightBlue3,
                  },
                }}
                value={"제목 + 내용"}
              >
                <img
                  src={GPTIcon}
                  alt="Google AI"
                  style={{ marginRight: 7, width: 24 }}
                />
                <H6 sx={{ fontWeight: 600 }}>애니메이션</H6>
              </MenuItem>
            </FlexBox>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
