import axios from "axios";
import { useEffect, useState } from "react";

import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import List from "page-sections/forum-list/List";

export default function ForumList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/articles?page=${page}&limit=10`
        );
        setArticles(response.data.articles);
        setPagination(response.data.pagination);
        setLoading(false);
      } catch (err) {
        setError("Error fetching articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box
        my={isTablet ? 0 : 6}
        sx={{
          width: isLaptop ? "100%" : "1100px",
        }}
      >
        <Grid width={"100%"} alignItems={"center"} justifyContent={"center"}>
          <List
            articles={articles}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Box>
    </>
  );
}
