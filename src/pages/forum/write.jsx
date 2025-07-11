import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "contexts/AuthContext";
import TipTapEditor from "page-sections/write/TipTapEditor";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingScreen from "components/LoadingScreen";

export default function Write() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const articleId = location.state?.articleId;
  const isEditing = Boolean(articleId);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const toastShownRef = useRef(false);

  const fetchArticle = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/article/${articleId}`,
        {
          withCredentials: true,
        }
      );
      setArticle(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
      console.error("Error fetching article:", err);
      toast.error("게시글을 불러오는데 실패했습니다.");
      navigate("/forum");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId, navigate]);

  // 로그인 확인
  useEffect(() => {
    if (!isLoggedIn && !toastShownRef.current) {
      toast.error("로그인 후 이용해주세요.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      toastShownRef.current = true;
      navigate("/login");
      return;
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Box
        my={isTablet ? 0 : 6}
        sx={{
          width: isLaptop ? "100%" : "1100px",
        }}
      >
        <Grid
          container
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={12} bgcolor={"white"} borderRadius={"10px"}>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <TipTapEditor isEditing={isEditing} articleData={article} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
