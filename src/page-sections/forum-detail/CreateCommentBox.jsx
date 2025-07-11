import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
// import ArrowForwardIosSharp from "@mui/icons-material/ArrowForwardIosSharp";
import axios from "axios";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import PlaceholderAvatar from "components/PlaceholderAvatar";
import { useAuth } from "contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function CreateCommentBox({
  smallBox = false,
  setShowCommentBox,
  articleId,
  parentCommentId,
  onCommentAdded,
}) {
  const [commentValue, setCommentValue] = React.useState("");
  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, isLoggedIn } = useAuth();

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:4000/comments",
        {
          articleId,
          content: commentValue,
          parentCommentId,
        },
        { withCredentials: true }
      );

      setCommentValue("");
      if (setShowCommentBox) {
        setShowCommentBox(false);
      }
      if (onCommentAdded) {
        onCommentAdded();
      }
      toast.success(t("comment.success"));
    } catch (err) {
      if (err.response.status === 403) {
        toast.error(t("toast.login_required"));
      } else {
        console.error("Error creating comment:", err);
        toast.error(t("comment.error"));
      }
    }
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: "#F9FAFD",
        borderRadius: 3,
        border: "1px solid #E1E1E1",
        width: "100%",
        padding: isMobile ? 0 : 2,
      }}
    >
      <Grid
        container
        direction={"row"}
        mt={0.5}
        mb={0.5}
        px={isMobile ? 2 : 0}
        py={isMobile ? 1 : 0}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid mb={isMobile ? 2 : 0} item sx={{ width: "100%" }}>
          <FlexBox alignItems="flex-start">
            <FlexBox style={{ width: "34px", height: "34px" }}>
              {isLoggedIn && user?.profileImage ? (
                <PlaceholderAvatar source={user.profileImage} />
              ) : (
                <PlaceholderAvatar />
              )}
            </FlexBox>
            <FlexBox
              flexDirection="column"
              // ml={1.2}
              sx={{ width: "100%", marginTop: "-4px" }}
            >
              <AppTextField
                multiline
                fullWidth
                rows={8}
                name="commentW"
                placeholder="댓글을 입력하세요"
                value={commentValue}
                onChange={handleCommentChange}
                inputProps={{ style: { height: 70, width: "100%" } }}
                sx={{
                  width: "100%",
                  backgroundColor: "#F9FAFD",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the border
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the hover effect
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    fontWeight: 300,
                    fontSize: 15.5,
                    color: "#B5B7C0",
                  },
                }}
              />
            </FlexBox>
          </FlexBox>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* <Grid
            item
            ml={1.5}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <H7 style={{ alignSelf: "center" }}>0/5000</H7>
          </Grid> */}
          {/* <Grid
            item
            ml={1.5}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image
              color="#636469"
              size={20}
              style={{ marginRight: "4px", marginBottom: "2px" }}
            />
          </Grid>
          <Grid
            item
            ml={1.5}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Lock
              color="#636469"
              size={20}
              style={{ marginRight: "4px", marginBottom: "2px" }}
            />
          </Grid> */}
          <Grid item ml={1.5}>
            <Button
              onClick={handleSubmit}
              variant="outlined"
              size="small"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "38px",
                fontSize: 15,
                color: "primary.grey2",
                borderRadius: 2,
                maxWidth: 95,
                fontWeight: 500,
                minWidth: "fit-content",
                backgroundColor: "#ffffff",
                whiteSpace: "nowrap",
                padding: "0.6rem 1rem",
              }}
            >
              등록
            </Button>
          </Grid>
          {smallBox && (
            <Grid item ml={1.5}>
              <Button
                onClick={() => setShowCommentBox(false)}
                variant="outlined"
                size="small"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "38px",
                  fontSize: 15,
                  color: "primary.grey2",
                  borderRadius: 2,
                  maxWidth: 95,
                  fontWeight: 500,
                  minWidth: "fit-content",
                  backgroundColor: "#ffffff",
                  whiteSpace: "nowrap",
                  padding: "0.6rem 1rem",
                }}
              >
                취소
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
