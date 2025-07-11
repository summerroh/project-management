import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import { H6 } from "components/Typography";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TabSlide({ TabList }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  // select tab to change url logic
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(1);

  const sliderRef = useRef(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      const tab = TabList.find((item) => item.id.toString() === tabParam);
      if (tab) {
        setSelectedTab(tab.id);
        // Scroll to the selected tab
        // const tabIndex = TabList.findIndex((item) => item.id === tab.id);
        // if (sliderRef.current) {
        //   sliderRef.current.slickGoTo(tabIndex);
        // }
      }
    }
  }, [searchParams, TabList]);

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
    setSearchParams({ tab: tabId.toString() });
    // Scroll to the clicked tab
    // const tabIndex = TabList.findIndex((item) => item.id === tabId);
    // if (sliderRef.current) {
    //   sliderRef.current.slickGoTo(tabIndex);
    // }
  };
  // end of select tab to change url logic

  const CustomArrow = ({ direction, onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        [direction === "left" ? "left" : "right"]: -30,
        color: theme.palette.primary.grey400,
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "30px",
      }}
    >
      {direction === "left" ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
    </Box>
  );

  const settings = {
    infinite: false,
    arrows: true,
    swipeToSlide: true,
    variableWidth: true,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    // slidesToShow: isMobile ? 2 : isTablet ? 3 : isDesktop ? 6 : 4,
  };

  let padding;
  if (window.innerWidth > 1720 && !isTablet) {
    padding = "8px 10px 8px 168px";
  } else {
    padding = isTablet ? "8px 10px 8px 10px" : "8px 10px 8px 80px";
  }

  return (
    <>
      <Box gap={1} paddingX={4}>
        <Slider ref={sliderRef} {...settings}>
          {TabList.map((item) => {
            return (
              <Box
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                sx={{
                  paddingX: "20px",
                  height: "44px",
                  border: `1px solid ${
                    item.id === selectedTab ? "#71ADD7" : "#e1e1e1"
                  }`,
                  borderBottom: `1px solid ${
                    item.id === selectedTab ? "#f9fafd" : "#e1e1e1"
                  }`,
                  backgroundColor: `${
                    item.id === selectedTab
                      ? "#ffffff"
                      : theme.palette.primary.grey700
                  }`,
                  borderRadius: "20px 20px 0px 0px",
                  display: "flex !important",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {/* 아이콘 */}
                {/* <img
                    src={
                      item.id === selectedTab ? item.selectedIcon : item.icon
                    }
                    style={{
                      width: "20px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  /> */}
                <H6
                  ml={0.5}
                  sx={{
                    color:
                      item.id === selectedTab
                        ? theme.palette.primary.darkBlue
                        : theme.palette.primary.grey,
                  }}
                >
                  {item.title}
                </H6>
              </Box>
            );
          })}
        </Slider>
      </Box>
    </>
  );
}
