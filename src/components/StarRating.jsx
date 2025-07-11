import React from "react";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import PropTypes from "prop-types";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(fullStars)].map((_, index) => (
        <Star
          key={`full-${index}`}
          style={{ color: "#FADA42", fontSize: "19px" }}
        />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <StarHalf
          key={`half-${index}`}
          style={{ color: "#FADA42", fontSize: "19px" }}
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorder
          key={`empty-${index}`}
          style={{ color: "#FADA42", fontSize: "19px" }}
        />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
