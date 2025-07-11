import { useTheme } from "@emotion/react";
import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import PlaceholderAvatar from "components/PlaceholderAvatar";
import { H6, H7, Small } from "components/Typography";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateCommentBox from "./CreateCommentBox";

export default function Comment({
  comment,
  onCommentDeleted,
  childComments = [],
  backgroundColor,
}) {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/comments/${comment._id}`, {
        withCredentials: true,
      });
      toast.success("댓글이 삭제되었습니다.");
      if (onCommentDeleted) {
        onCommentDeleted();
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  console.log("Comment: comment: ", comment);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          borderBottom: "1px solid #E1E1E1",
          padding: isMobile ? "0.5rem 0rem 0.5rem 0.5rem" : "1rem 1rem",
          backgroundColor: backgroundColor ? { backgroundColor } : "#ffffff",
        }}
      >
        <Grid
          container
          direction={"row"}
          mt={0.5}
          mb={0.5}
          py={isMobile ? 1 : 0}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexWrap: isMobile ? "inherit" : "nowrap",
          }}
        >
          <Grid
            mb={isMobile ? 2 : 0}
            item
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <FlexBox
              gap={1.2}
              alignItems="flex-start"
              sx={{ justifyContent: "flex-start" }}
            >
              <FlexBox style={{ width: "34px", height: "34px" }}>
                <PlaceholderAvatar source={comment.userId.profileImage} />
              </FlexBox>

              <FlexBox flexDirection="column">
                <FlexBox flexDirection="row">
                  <H6 sx={{ fontWeight: 600 }}>{comment.userId.userName}</H6>
                  <Small mb={0.5} ml={1}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Small>
                </FlexBox>
                <H6
                  style={{
                    marginLeft: 0,
                    paddingLeft: 0,
                    textAlign: "left",
                  }}
                >
                  {comment.content}
                </H6>
              </FlexBox>
            </FlexBox>
          </Grid>

          <Grid
            ml={isMobile ? 5 : 0}
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <Grid item ml={1}>
              <ThumbsUpButton />
            </Grid> */}

            <Grid item ml={1.5}>
              <Button
                onClick={() => setShowCommentBox(!showCommentBox)}
                variant="outlined"
                size="small"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "34px",
                  fontSize: 15,
                  color: "primary.grey2",
                  borderRadius: 2,
                  maxWidth: 110,
                  borderRadius: 2,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  minWidth: "fit-content",
                  padding: "0.6rem 0.8rem",
                }}
              >
                답글 쓰기
              </Button>
            </Grid>

            <Grid
              item
              ml={1.5}
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {comment.isAuthor ? (
                <H7
                  onClick={handleDelete}
                  style={{
                    alignSelf: "center",
                    color: theme.palette.primary.red,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  삭제
                </H7>
              ) : (
                <H7
                  style={{
                    alignSelf: "center",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* 신고 */}
                </H7>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Render child comments */}
        <Box
          sx={{
            width: "100%",
            borderLeft: "2px solid #E1E1E1",
            mt: 1,
          }}
        >
          {childComments.map((childComment) => (
            <Comment
              key={childComment._id}
              comment={childComment}
              onCommentDeleted={onCommentDeleted}
            />
          ))}
        </Box>
      </Grid>

      {showCommentBox && (
        <Box mb={1} mt={2} sx={{ width: "100%" }}>
          <CreateCommentBox
            smallBox={true}
            setShowCommentBox={setShowCommentBox}
            articleId={comment.articleId}
            parentCommentId={comment._id}
            onCommentAdded={onCommentDeleted}
          />
        </Box>
      )}
    </>
  );
}
