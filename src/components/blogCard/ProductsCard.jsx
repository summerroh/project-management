import {
  Box,
  Card,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ReversePagination from "components/ReversePagination";
import StarRating from "components/StarRating";
import { H4, H5, H6, H7, Small, TableContent } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import Filter2 from "page-sections/shopping/filter2";
import { useState } from "react";
import { Heart, MessageCircle, Share2, Star } from "react-feather";
import { useNavigate } from "react-router-dom";

const TruncatedH5 = styled(H5)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3em;
  max-height: 2.6em; /* line-height times the number of lines you want to show */
  font-weight: 700;
`;

export default function ProductsCard({ showSideBar, productData }) {
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

  const productContainerStyle = {
    width: isMobile ? "100%" : "100%",
    borderWidth: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <StyledCard showSideBar={showSideBar}>
        <Box pb={2}>
          <Grid container>
            <Grid item xs={12}>
              {/* Products List */}
              <Box
                pt={6}
                pb={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid container sx={productContainerStyle}>
                  <Grid
                    container
                    item
                    xs={12}
                    pt={2}
                    // columnGap={2}
                    rowGap={2}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Grid mb={2.5} item xs={12} sx={{ textAlign: "left" }}>
                      <H4>전체 상품</H4>

                      <Filter2 />
                    </Grid>

                    {productData.map((item, index) => (
                      <Grid
                        key={index}
                        item
                        xs={6}
                        md={3}
                        lg={3}
                        xl={2}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          mr={1}
                          ml={1}
                          item
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "row",
                          }}
                        >
                          <Product item={item} index={index} />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ReversePagination totalItems={3} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledCard>
    </>
  );
}

const Product = ({ item, index }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    title,
    author,
    img,
    price,
    percentage,
    review,
    star,
    tag,
    heart,
    originalPrice,
  } = item;
  const isLarge = useMediaQuery(theme.breakpoints.down("xl"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isLiked, setIsLiked] = useState(false);

  return (
    <Grid
      item
      mb={2}
      sx={{ cursor: "pointer" }}
      onClick={() => navigate("/naver/shoppingdetail")}
    >
      <FlexBox
        sx={{
          width: "100%",
          backgroundColor: "#ffffff",
          height: "100%",
          display: "flex",
          borderRadius: 3,
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <FlexBox item mb={0} flexGrow={1} position="relative">
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 10,
              width: isLarge ? 40 : 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {tag && (
              <Grid item>
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
            )}
          </Box>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 10,
              background: "#ffffff",
              borderRadius: 100,
              width: isLarge ? 34 : 44,
              height: isLarge ? 34 : 44,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {isLiked ? (
              <Heart
                size={19}
                color={theme.palette.primary.red}
                fill={theme.palette.primary.red}
              />
            ) : (
              <Heart size={19} color={theme.palette.primary.red} />
            )}
          </Box>
          <img
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
              borderRadius: 12,
              objectFit: "cover",
            }}
            src={img}
            alt={"Banner"}
          />
        </FlexBox>

        <FlexBox
          sx={{
            paddingLeft: isMobile ? 0 : 1.5,
            paddingRight: isMobile ? 0 : 1.5,
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
              <TruncatedH5>{title}</TruncatedH5>
            </Box>
            <Small>{author}</Small>

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
                  size={14}
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
                  찜 {heart}
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
                  질문 {review}
                </H6>
              </Box>
            </Box>
          </Box>
        </FlexBox>

        <Grid
          container
          item
          gap={1}
          sx={{
            paddingLeft: isMobile ? 0 : 1.5,
            paddingRight: isMobile ? 0 : 1.5,
            paddingBottom: 0.5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <H5 sx={{ color: theme.palette.primary.red }}>{percentage}</H5>

          <H6
            sx={{
              color: theme.palette.primary.grey400,
              textDecoration: "line-through",
            }}
          >
            {originalPrice}
          </H6>
        </Grid>

        <Grid
          container
          item
          gap={1}
          sx={{
            paddingLeft: isMobile ? 0 : 1.5,
            paddingRight: isMobile ? 0 : 1.5,
            paddingBottom: 0.5,
            display: "flex",
          }}
        >
          <H5>
            <strong>{price}</strong>
          </H5>
        </Grid>

        <Grid
          container
          item
          gap={1}
          sx={{
            paddingLeft: isMobile ? 0 : 1.5,
            paddingRight: isMobile ? 0 : 1.5,
            paddingBottom: 1.5,
            display: "flex",
          }}
        >
          <StarRating rating={2.5} />
          <Small>({review})</Small>
        </Grid>
      </FlexBox>
    </Grid>
  );
};
