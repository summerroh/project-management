import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import Slider from "react-slick";

export default function PreviewSlider({ images }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const sliderRef = useRef(null);

  const [mainImage, setMainImage] = useState(0);

  const settings = {
    dots: false,
    infinite: images.length > 1, // Only enable infinite scroll if more than 1 image
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setMainImage(index),
    initialSlide: mainImage,
    arrows: images.length > 1, // Only show arrows if more than 1 image
    nextArrow: images.length > 1 ? <NextArrow /> : null,
    prevArrow: images.length > 1 ? <PrevArrow /> : null,
  };

  const arrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          ...arrowStyles,
          right: "10px",
        }}
      >
        <ChevronRight size={20} />
      </Box>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          ...arrowStyles,
          left: "10px",
        }}
      >
        <ChevronLeft size={20} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", marginTop: 2, marginBottom: 2 }}>
      <Box sx={{ position: "relative" }}>
        {images.length === 1 ? (
          // Render single image without slider
          <div>
            <img
              src={images[0].path}
              alt="Single image"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: isMobile ? "0" : "10px",
                outline: "none",
              }}
            />
          </div>
        ) : (
          // Render slider for multiple images
          <Slider ref={sliderRef} {...settings}>
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img.path}
                  alt={`Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "500px",
                    objectFit: "contain",
                    borderRadius: isMobile ? "0" : "10px",
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </Slider>
        )}

        {/* Only show counter if there are multiple images */}
        {images.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 14,
              right: 10,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "15px",
              fontSize: "14px",
            }}
          >
            {mainImage + 1}/{images.length}
          </Box>
        )}
      </Box>

      {/* Only show thumbnails if there are multiple images and not on mobile */}
      {!isMobile && images.length > 1 && (
        <Box mt={2} gap={1} display="flex" justifyContent="flex-start">
          {images.map((img, index) => (
            <Box
              key={index}
              onClick={() => {
                sliderRef.current.slickGoTo(index);
                setMainImage(index);
              }}
              sx={{
                width: "100px",
                height: "100px",
                cursor: "pointer",
                border:
                  mainImage === index
                    ? `2px solid ${theme.palette.primary.main}`
                    : "none",
                borderRadius: "5px",
                overflow: "hidden",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100px",
                  height: "100%",
                  backgroundColor:
                    mainImage === index ? "rgba(0, 0, 0, 0.5)" : "transparent",
                  transition: "background-color 0.3s",
                },
              }}
            >
              <img
                src={img.path}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
