import React, { useState, useEffect } from "react";
import { Pagination, styled } from "@mui/material";

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-page.Mui-selected": {
    fontWeight: 600,
  },
}));

const AppPagination = ({ count, page, onChange, ...props }) => {
  const handleChange = (event, value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <StyledPagination
      count={count}
      page={page}
      onChange={handleChange}
      {...props}
    />
  );
};

export default AppPagination;
