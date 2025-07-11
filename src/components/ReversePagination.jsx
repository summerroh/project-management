import React, { useState } from "react";
import { Button, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "react-feather";
import globalcss from "styles/global.css";
import { H7 } from "./Typography";

const ReversePagination = ({ totalItems }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(totalItems);

  const totalPages = totalItems;
  const pageRange = 10; // Number of page numbers to display in the middle

  const onChange = (page) => {
    // console.log(page);
    setCurrentPage(page);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    let endPage = Math.min(startPage + pageRange - 1, totalPages);

    if (endPage - startPage < pageRange - 1) {
      startPage = Math.max(endPage - pageRange + 1, 1);
    }

    // Add last page number
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        // Add ellipsis if there are more pages after the last displayed page
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }
      pageNumbers.push(renderPageButton(totalPages));
    }

    // Add middle page numbers in reverse order
    for (let i = endPage; i >= startPage; i--) {
      pageNumbers.push(renderPageButton(i));
    }

    // Add first page number in reverse order
    if (startPage > 1) {
      if (startPage > 2) {
        // Add ellipsis if there are more pages before the first displayed page
        pageNumbers.push(<span key="ellipsis1">...</span>);
      }
      pageNumbers.push(renderPageButton(1));
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber) => (
    <button
      className={
        currentPage === pageNumber ? "selected-button" : "pagination-button"
      }
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const handlePreviousClick = () => {
    // setCurrentPage(Math.max(currentPage - pageRange, 1));
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
    // setCurrentPage(Math.min(currentPage + pageRange, totalPages));
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  return (
    <div>
      <Button
        onClick={handleNextClick}
        disabled={currentPage >= totalPages}
        style={{
          borderWidth: 0,
          backgroundColor: "transparent",
          height: "33px",
          minWidth: "33px",
          maxWidth: "33px",
        }}
      >
        <ChevronLeft size={"19px"} />
      </Button>
      <H7>{renderPageNumbers()}</H7>
      <Button
        onClick={handlePreviousClick}
        disabled={currentPage <= 1}
        style={{
          borderWidth: 0,
          backgroundColor: "transparent",
          height: "33px",
          minWidth: "33px",
          maxWidth: "33px",
        }}
      >
        <ChevronRight size={"19px"} />
      </Button>
    </div>
  );
};

export default ReversePagination;
