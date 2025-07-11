import { useTheme } from "@emotion/react";
import { ArrowBackIosNewSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  styled,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import PlaceholderAvatar from "components/PlaceholderAvatar";
import PreviewSlider from "components/PreviewSlider";
import ReversePagination from "components/ReversePagination";
import { H5, H6, Small } from "components/Typography";
import { useAuth } from "contexts/AuthContext";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "./Comment";
import CreateCommentBox from "./CreateCommentBox";
import { useState } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "1rem 2rem 1rem 2rem",
  justifyContent: "space-between",
  flexDirection: "column",
  border: "1px solid #E1E1E1",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem 0rem 0rem 0rem",
    textAlign: "center",
    marginLeft: "-1rem",
    marginRight: "-1rem",
    borderRadius: 0,
  },
}));

const organizeComments = (comments) => {
  const commentMap = new Map();
  const topLevelComments = [];

  // First pass: Create a map of all comments
  comments.forEach((comment) => {
    commentMap.set(comment._id, { ...comment, childComments: [] });
  });

  // Second pass: Organize into parent-child relationships
  comments.forEach((comment) => {
    if (comment.parentCommentId) {
      const parentComment = commentMap.get(comment.parentCommentId);
      if (parentComment) {
        // Find the top-level parent
        let topParent = parentComment;
        while (
          topParent.parentCommentId &&
          commentMap.get(topParent.parentCommentId)
        ) {
          topParent = commentMap.get(topParent.parentCommentId);
        }

        // If we're already at level 1, add to that level's children
        if (topParent.parentCommentId) {
          commentMap
            .get(topParent.parentCommentId)
            .childComments.push(commentMap.get(comment._id));
        } else {
          // Otherwise, add to first level
          topParent.childComments.push(commentMap.get(comment._id));
        }
      }
    } else {
      topLevelComments.push(commentMap.get(comment._id));
    }
  });

  return topLevelComments;
};

export default function Post({
  article,
  comments,
  commentCount,
  fetchComments,
  onRefresh,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  console.log("Post: article: ", article);

  // 게시글 삭제
  const handleDeleteArticle = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/article/${article._id}`, {
        withCredentials: true,
      });
      toast.success("게시글이 삭제되었습니다.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/forum");
    } catch (err) {
      console.error("Error deleting article:", err);
      toast.error(
        err.response?.data?.message || "게시글 삭제 중 오류가 발생했습니다.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  const organizedComments = organizeComments(comments);

  return (
    <>
      <StyledCard>
        <Box
          pt={isMobile ? 0 : 2}
          pb={3}
          px={isMobile ? 2 : 0}
          sx={{ width: "100%" }}
        >
          <Box
            px={isMobile ? 2 : 0}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              onClick={() => navigate("/forum")}
              mb={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <ArrowBackIosNewSharp
                sx={{
                  fontSize: 14,
                  color: "primary.darkBlue",
                  marginRight: 1,
                }}
              />
              <H6 sx={{ color: "primary.darkBlue", fontWeight: 600 }}>
                게시판 돌아가기
              </H6>
            </Box>

            {/* <Grid
              container
              direction={"row"}
              mb={1.5}
              py={isMobile ? 1 : 0}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Grid item>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: "32px",
                        fontSize: 14,
                        color: "primary.grey2",
                        borderRadius: 2,
                        fontWeight: 500,
                        width: "60px",
                        minWidth: "60px",
                      }}
                    >
                      이전글
                    </Button>
                  </Grid>
                  <Grid item ml={1.5}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: "32px",
                        fontSize: 14,
                        color: "primary.grey2",
                        borderRadius: 2,
                        fontWeight: 500,
                        width: "60px",
                        minWidth: "60px",
                      }}
                    >
                      다음글
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Grid> */}
          </Box>
          <H5
            px={isMobile ? 2 : 0}
            sx={{ fontSize: "19px", fontWeight: 700, textAlign: "left" }}
          >
            {article.title}
          </H5>
        </Box>

        <Box
          mt={isMobile ? 2 : 0}
          mb={2}
          sx={{
            backgroundColor: "#E1E1E1",
            width: "100%",
            height: "1px",
          }}
        />

        <Grid
          container
          direction={"row"}
          px={isMobile ? 4 : 0}
          mb={2}
          pt={isMobile ? 1 : 0}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid
            mb={isMobile ? 2 : 0}
            item
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FlexBox alignItems="center">
              <FlexBox style={{ width: "34px", height: "34px" }}>
                {isLoggedIn && article.userId.profileImage ? (
                  <PlaceholderAvatar source={article.profileImage} />
                ) : (
                  <PlaceholderAvatar />
                )}
              </FlexBox>
              <FlexBox flexDirection="column" textAlign="left" ml={1.2}>
                <H6 sx={{ fontWeight: 600 }}>{article.userName}</H6>
                <Small mb={0.5}>
                  {new Date(article.createdAt).toLocaleDateString()}
                </Small>
              </FlexBox>
            </FlexBox>
          </Grid>

          <Grid item sx={{ display: "flex", flexDirection: "row" }}>
            {article.isAuthor && (
              <>
                <Grid item ml={1.5}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      navigate("/forum/write", {
                        state: { articleId: article._id },
                      })
                    }
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: "38px",
                      fontSize: 15,
                      color: "primary.grey2",
                      maxWidth: 110,
                      borderRadius: 2,
                      fontWeight: 500,
                      minWidth: "fit-content",
                    }}
                  >
                    수정
                  </Button>
                </Grid>

                <Grid item ml={1.5}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleDeleteArticle}
                    sx={{
                      height: "38px",
                      fontSize: 14.5,
                      maxWidth: 110,
                      borderRadius: 2,
                      minWidth: "fit-content",
                    }}
                  >
                    <Trash2 color="#E95050" size={20} />
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        <PreviewSlider images={article.images} />

        <H6
          py={2}
          px={isMobile ? 4 : 0}
          sx={{
            textAlign: "left",
            width: "100%",
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Divider
          variant="middle"
          style={{ margin: "20px 0", backgroundColor: "black", width: "100%" }}
        />

        {/* 댓글 작성 칸 */}
        <Grid
          container
          direction="row"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            padding: isMobile ? "1rem 2rem" : "1rem 1rem",
            backgroundColor: "#ffffff",
            marginTop: "-1px",
          }}
        >
          <FlexBox
            mb={2}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <H5>댓글 {commentCount}</H5>
          </FlexBox>
          <CreateCommentBox
            articleId={article._id}
            onCommentAdded={fetchComments}
          />

          {organizedComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              childComments={comment.childComments}
              onCommentDeleted={fetchComments}
            />
          ))}
        </Grid>

        <Stack alignItems="center" marginY="1rem">
          <ReversePagination totalItems={10} />
        </Stack>
      </StyledCard>
    </>
  );
}
