import {
  Box,
  Card,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import img3 from "assets/img3.png";
import { H5, H6, H7, Small, TableContent } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import { Calendar, Eye, Heart, MessageCircle, Share2 } from "react-feather";
import RoundedPhotoBlogCardMobile from "./RoundedPhotoBlogCardMobile";

const TruncatedH5 = styled(H5)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3em;
  max-height: 2.6em; /* line-height times the number of lines you want to show */
  font-weight: 700;
`;

export default function RoundedPhotoBlogCard({
  showSideBar,
  title,
  setShowShareModal,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const StyledCard = styled(Card)(({ theme, showSideBar }) => ({
    // width: `calc(100% - ${isTablet ? "0px" : showSideBar ? "260px" : "0px"})`,
    width: `100%`,
    marginLeft: isTablet ? "0px" : showSideBar ? "260px" : "0px",
    padding: isMobile ? "20px 0px" : "40px 0px",
    backgroundColor: "transparent",
    borderRadius: 0,
    border: `none`,
    [theme.breakpoints.down("sm")]: {
      "& > .MuiBox-root": {
        paddingBottom: 0,
      },
    },
  }));

  return (
    <>
      <StyledCard showSideBar={showSideBar}>
        <Box pb={2}>
          <Grid container>
            <Grid item xs={12}>
              {title && (
                <Box
                  mb={2}
                  px={0}
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <H5>{title}</H5>
                  {setShowShareModal ? (
                    <Box
                      onClick={() => setShowShareModal(true)}
                      gap={0.6}
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
                      <Share2 size={"14px"} color={"#808187"} />
                      <TableContent>공유</TableContent>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        border: "1px solid #151515",
                        borderRadius: 100,
                        padding: "2px 14px",
                        cursor: "pointer",
                      }}
                    >
                      <H7>전체보기</H7>
                    </Box>
                  )}
                </Box>
              )}

              {isTablet ? (
                <>
                  <RoundedPhotoBlogCardMobile />
                </>
              ) : (
                <>
                  <Grid container>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box m={1}>
                        <BlogCard index={1} />
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box m={1}>
                        <BlogCard index={2} />
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box m={1}>
                        <BlogCard index={3} />
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box m={1}>
                        <BlogCard index={4} />
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </StyledCard>
    </>
  );
}

const BlogCard = () => {
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
    <Grid item mb={2}>
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

        <FlexBox
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
            <Box sx={{ minHeight: "48px" }}>
              <TruncatedH5>
                종잣돈 없어도 가능! <br /> 평생 월 300만원 받는 투자방법
                배워보고 적용하기
              </TruncatedH5>
            </Box>
            <Small>광화문금융러</Small>

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
          </Box>
        </FlexBox>

        <Grid
          container
          item
          spacing={1}
          mt={0}
          sx={{ paddingLeft: 1.5, paddingRight: 1.5, paddingBottom: 1.5 }}
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
