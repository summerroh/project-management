import { useTheme } from "@emotion/react";
import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import AppPagination from "components/AppPagination";
import ReversePagination from "components/ReversePagination";
import { H5, H7 } from "components/Typography";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import Slider from "react-slick";

const pageNumber = [2, 1, 0]; // Reversed order

export default function VideoCardSlide({
  data,
  ProductCard,
  mobilePadding,
  title,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  let sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePagination = (page) => {
    const newIndex = pageNumber.length - page;
    sliderRef.slickGoTo(newIndex);
    setActiveIndex(newIndex);
  };

  const goToPrev = () => {
    sliderRef.slickPrev();
  };

  const goToNext = () => {
    sliderRef.slickNext();
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500, // Increased speed to make transitions less sensitive
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setActiveIndex(current),
    swipeToSlide: false,
    swipe: false,
    rtl: true, // Right to left sliding
    arrows: false, // Hide default arrows
  };

  // Carousel
  return (
    <>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          position: "relative",
        }}
      >
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
          }}
        >
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
            <Box
              sx={{
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                onClick={goToPrev}
                sx={{
                  cursor: "pointer",
                  marginRight: "10px",
                  width: "34px",
                  height: "34px",
                  border: "1px solid #e1e1e1",
                  borderRadius: "50%",
                  background: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ChevronLeft size={20} />
              </Box>
              <Box
                onClick={goToNext}
                sx={{
                  cursor: "pointer",
                  width: "34px",
                  height: "34px",
                  border: "1px solid #e1e1e1",
                  borderRadius: "50%",
                  background: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ChevronRight size={20} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Slider
          {...settings}
          ref={(slider) => {
            sliderRef = slider;
          }}
        >
          {pageNumber.map((index) => {
            return (
              <div key={index}>
                <Grid container>
                  {data.map((item, index) => (
                    <Grid key={index} item xs={6} sm={6} md={3}>
                      <Box m={mobilePadding ? 0.5 : 1}>
                        <Box
                          item
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "row",
                          }}
                        >
                          <ProductCard
                            item={item}
                            index={index}
                            mobilePadding={mobilePadding}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </div>
            );
          })}
        </Slider>
      </Box>

      {/* <Stack alignItems="center" marginY="1rem">
        <AppPagination
          shape="rounded"
          onChange={handlePagination}
          count={pageNumber.length}
          page={pageNumber.length - activeIndex}
          setCurrentPage={(page) => setActiveIndex(pageNumber.length - page)}
        />
      </Stack> */}
    </>
  );
}
