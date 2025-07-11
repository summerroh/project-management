import {
  Box,
  Card,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { H4, H5, H6, Small } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import Filter1 from "page-sections/shopping/filter1";
import { Heart, MessageCircle, Star } from "react-feather";
import BestProductsMobile from "./BestProductsMobile";
import { useNavigate } from "react-router-dom";
import StarRating from "components/StarRating";
import { useState } from "react";

const TruncatedH5 = styled(H5)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3em;
  max-height: 2.6em; /* line-height times the number of lines you want to show */
  font-weight: 700;
`;

const bestProductData = [
  {
    title: "나트랑 자유여행 5일 (멜리아 빈펄 깜란 리조트/가성비 좋은 풀빌라)",
    author: "나트랑 여행",
    img: "/static/shopping/product1.png",
    price: "480,000원",
    originalPrice: "600,000원",
    percentage: "20%",
    review: 15,
    star: 4.8,
    heart: 120,
  },
  {
    title: "[한정특가] 오사카 자유여행 4일 (#난바지역 : 가성비 호텔)",
    author: "롯데칠성",
    img: "/static/shopping/product2.png",
    price: "280,000원",
    originalPrice: "311,111원",
    percentage: "10%",
    review: 25,
    star: 4.5,
    heart: 85,
  },
  {
    title:
      "피렌체 근교 시에나 & 피엔자 & 토스카나 사이프러스 길 소수 정예 전용 차량 투어",
    author: "피렌체",
    img: "/static/shopping/product3.png",
    price: "120,000원",
    originalPrice: "126,316원",
    percentage: "5%",
    review: 10,
    star: 4.2,
    heart: 50,
  },
  {
    title:
      "[자유롭게][대만족 에어텔] 대만 5성급 에어텔 #조식포함 #여행자보험 3일/4일",
    author: "대만여행",
    img: "/static/shopping/product4.png",
    price: "280,000원",
    originalPrice: "311,111원",
    percentage: "10%",
    review: 25,
    star: 4.5,
    heart: 95,
  },
];

export default function BestProductsCard({
  showSideBar,
  title,
  filter,
  bestIcon,
  mobilePadding,
  breakfast,
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
              <Box
                mb={2}
                px={0}
                sx={{
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  justifyContent: "space-between",
                  // background: "blue",
                }}
              >
                <H4 mb={isMobile ? 2 : 0} sx={{ whiteSpace: "nowrap" }}>
                  {title}
                </H4>
                {filter && <Filter1 />}
              </Box>

              {/* Best Products */}
              {isTablet ? (
                <>
                  <BestProductsMobile
                    data={bestProductData}
                    ProductCard={ProductCard}
                    mobilePadding={mobilePadding}
                  />
                </>
              ) : (
                <>
                  <Grid container>
                    {bestProductData.map((item, index) => (
                      <Grid key={index} item xs={6} sm={4} md={3}>
                        <Box m={1}>
                          <ProductCard
                            item={item}
                            index={index}
                            bestIcon={bestIcon}
                          />
                        </Box>
                      </Grid>
                    ))}
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

const ProductCard = ({ item, index, bestIcon, mobilePadding }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const [isLiked, setIsLiked] = useState(false);

  return (
    <Grid
      item
      mb={2}
      sx={{ cursor: "pointer", textAlign: "left" }}
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
          {bestIcon && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 10,
                width: isLarge ? 40 : 50,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={`/static/shopping/best${index + 1}.png`}
                alt="Banner"
                style={{ width: isMobile ? "30px" : "100%", height: "auto" }}
              />
            </Box>
          )}
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

        <Grid
          container
          sx={{
            paddingLeft: mobilePadding ? 1.5 : isMobile ? 0 : 1.5,
            paddingRight: mobilePadding ? 1.5 : isMobile ? 0 : 1.5,
          }}
        >
          <FlexBox
            sx={{
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
              paddingBottom: 1.5,
              display: "flex",
            }}
          >
            <StarRating rating={2.5} />
            <Small>({review})</Small>
          </Grid>
        </Grid>
      </FlexBox>
    </Grid>
  );
};
