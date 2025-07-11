import { useTheme } from "@emotion/react";
import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import AppPagination from "components/AppPagination";
import ReversePagination from "components/ReversePagination";
import { useRef, useState } from "react";
import Slider from "react-slick";

const pageNumber = [2, 1, 0]; // Reversed order

export default function BestProductsMobile({
  data,
  ProductCard,
  mobilePadding,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  let sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const customStyle = {
    width: `calc(100% - ${isTablet ? "0px" : "260px"})`,
    marginLeft: isTablet ? "0px" : "260px",
  };

  const handlePagination = (page) => {
    const newIndex = pageNumber.length - page;
    sliderRef.slickGoTo(newIndex);
    setActiveIndex(newIndex);
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500, // Increased speed to make transitions less sensitive
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setActiveIndex(current),
    swipeToSlide: true,
    swipe: true,
    touchThreshold: 150, // Increased threshold to make swipes less sensitive
    rtl: true, // Right to left sliding
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

      <Stack alignItems="center" marginY="1rem">
        <AppPagination
          shape="rounded"
          onChange={handlePagination}
          count={pageNumber.length}
          page={pageNumber.length - activeIndex}
          setCurrentPage={(page) => setActiveIndex(pageNumber.length - page)}
        />
      </Stack>
    </>
  );
}
