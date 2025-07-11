import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import Post from "page-sections/forum-detail/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";
import { toast } from "react-toastify";

export default function ForumDetail() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/article/${articleId}`,
        {
          withCredentials: true,
        }
      );
      console.log("ForumDetail: article-----------------------------: ", data);
      setArticle(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
      console.error("Error fetching article:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/comments/article/${articleId}`,
        { withCredentials: true }
      );
      setComments(response.data);
      setCommentCount(response.data.length);
    } catch (err) {
      console.error("Error fetching comments:", err);
      toast.error("댓글을 불러오는 중 오류가 발생했습니다.", err);
    }
  };

  // Fetch article and comments
  useEffect(() => {
    if (articleId) {
      fetchComments();
      fetchArticle();
    }
  }, [articleId]);

  const onRefresh = () => {
    fetchComments();
    fetchArticle();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center", color: "error.main" }}>{error}</Box>
    );
  }

  return (
    <Box
      my={isTablet ? 0 : 6}
      sx={{
        width: isLaptop ? "100%" : "1100px",
      }}
    >
      <Grid width={"100%"} alignItems={"center"} justifyContent={"center"}>
        <Box pb={4}>
          <Post
            article={article}
            comments={comments}
            commentCount={commentCount}
            fetchComments={fetchComments}
            onRefresh={onRefresh}
          />
        </Box>
      </Grid>
    </Box>
  );
}
