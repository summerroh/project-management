import React, { useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";

var flag = true;

const SwipeableCarousel = ({
  children,
  activeIndex,
  setActiveIndex,
  carouselItems,
  customStyle,
}) => {
  const bind = useDrag(({ direction, distance }) => {
    if (!flag) return;

    if (
      (direction.join() === [-1, 0].join() && distance[0] > 12) ||
      (direction.join() === [-1, 1].join() && distance[0] > 12)
    ) {
      // Swipe left
      setActiveIndex((prevIndex) =>
        prevIndex < carouselItems.length - 1 ? prevIndex + 1 : prevIndex
      );
      // console.log("left");
      // console.log(activeIndex > 0 ? activeIndex - 1 : 0);
      flag = false;
    } else if (
      (direction.join() === [1, 0].join() && distance[0] > 12) ||
      (direction.join() === [1, 1].join() && distance[0] > 12)
    ) {
      // Swipe right
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      // console.log("right");
      // console.log(
      //   activeIndex < carouselItems.length - 1 ? activeIndex + 1 : activeIndex
      // );
      flag = false;
    }
  });

  const handlePointerUp = () => {
    // console.log("pointer up");
    // console.log("flag", flag);
    flag = true; // Set flag to true when mouse button is released
  };
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        position: "relative",
        ...customStyle,
      }}
    >
      <div
        {...bind()}
        style={{ touchAction: "pan-y", ...customStyle }}
        onPointerUp={handlePointerUp}
      >
        {/* Your Carousel component goes here */}
        {/* Make sure to pass activeIndex, setActiveIndex, carouselItems, and other props to your Carousel component */}
        {/* Example: <Carousel index={activeIndex} onChange={(index) => setActiveIndex(index)} ... /> */}
        <Carousel
          swipe={false}
          stopAutoPlayOnHover
          autoPlay={false}
          animation="slide"
          index={activeIndex}
          onChange={(index) => setActiveIndex(index)}
          indicators={false}
          NavButton={({ onClick, className, style, next, prev }) => {
            return (
              <Button
                onClick={onClick}
                className={className}
                style={{
                  position: "absolute",
                  top: "-10%",
                  left: "0",
                  transform: "translateY(-50%)",
                }}
              >
                {next && "Next"}
                {prev && "Previous"}
              </Button>
            );
          }}
        >
          {children}
        </Carousel>
      </div>
    </div>
  );
};

export default SwipeableCarousel;
