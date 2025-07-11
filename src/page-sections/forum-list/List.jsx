import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  Chip,
  Grid,
  Stack,
  styled,
  useMediaQuery,
} from "@mui/material";
import calendar from "assets/calendar.svg";
import check from "assets/check.svg";
import checkIcon from "assets/icon-check-admin.svg";
import pin from "assets/icon-pin.svg";
import img1 from "assets/img1.png";
import view from "assets/view.svg";
import ReversePagination from "components/ReversePagination";
import { H5, H6 } from "components/Typography";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Image } from "lucide-react";
import Card2 from "page-sections/forum-list/Card2";
import CarouselCard2 from "page-sections/forum-list/CarouselCard2";
import AppPagination from "components/AppPagination";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "2rem 2rem 1rem 2rem",
  justifyContent: "space-between",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    // padding: "2rem",
    padding: "0rem 0rem 0rem 0rem",
    textAlign: "center",
    borderRadius: 0,
    "& > .MuiBox-root": {
      paddingBottom: 0,
    },
  },
}));

export default function List({
  articles,
  loading,
  error,
  pagination,
  onPageChange,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const pageOptions = [1, 2, 3];

  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [format, setFormat] = useState("list");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  const onForumClick = (articleId) => {
    navigate(`/forum/detail?id=${articleId}`);
  };
  return (
    <StyledCard>
      <img
        src={img1}
        alt="check"
        style={{
          height: isMobile ? "160px" : "240px",
          width: "100%",
          objectFit: "cover",
          borderRadius: isMobile ? 0 : 10,
        }}
      />
      <Box
        mt={4}
        mb={2}
        px={isMobile ? 2 : 0}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <H5>
          <span style={{ color: theme.palette.primary.darkBlue }}>
            {articles.length}
          </span>
          {t("forum.post_count")}
        </H5>

        <FlexRowAlign
          gap={1.5}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <H6
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.grey,
              cursor: "pointer",
            }}
          >
            {t("forum.sort.popular")}
          </H6>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img src={check} alt="check" width="11px" />
            <H6
              ml={0.5}
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.darkBlue,
              }}
            >
              {t("forum.sort.latest")}
            </H6>
          </Box>

          <H6
            mr={1.5}
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.grey,
              cursor: "pointer",
            }}
          >
            {t("forum.sort.views")}
          </H6>
        </FlexRowAlign>
      </Box>

      {/* <Grid
        container
        direction="row"
        mb={1.5}
        px={isMobile ? 2 : 0}
        py={isMobile ? 1 : 0}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid
          item
          mb={isMobile ? 2 : 0}
          sx={{
            display: "flex",
            justifyContent: isMobile ? "space-between" : "flex-start",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <FlexRowAlign gap={1.5}>
            <ListIcon
              onClick={() => setFormat("list")}
              size={22}
              color={theme.palette.primary.grey}
              style={{ cursor: "pointer" }}
            />

            <GridIcon
              onClick={() => setFormat("grid")}
              size={22}
              color={theme.palette.primary.grey}
              style={{ cursor: "pointer" }}
            />
          </FlexRowAlign>
        </Grid>

        <Grid item sx={{ display: "flex", flexDirection: "row" }}>
          <Grid item>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue}
              placeholder="제목 + 내용"
              onChange={handleChange}
              MenuProps={{
                MenuListProps: {
                  style: {
                    padding: "0",
                    margin: "0",
                  },
                },
              }}
              input={
                <InputBase
                  sx={{
                    height: 40,
                    width: 110,
                    fontSize: 14,
                    textAlign: "left",
                    paddingLeft: "10px !important",
                    display: "flex",
                    justifyContent: "flex-start",
                    borderRadius: "8px",
                    color: "text.primary",
                    backgroundColor: "#ffffff",
                    marginBottom: 0,
                    border: "1px solid #E1E1E1",
                    "& .MuiPopover-paper": {
                      boxShadow: "none",
                    },
                    "& > .MuiSelect-select": {
                      paddingRight: "0 !important",
                    },
                  }}
                />
              }
            >
              <MenuItem
                sx={{
                  height: 40,
                  width: 110,
                  fontSize: 14,
                  fontWeight: 300,
                  border: "1px solid #E1E1E1",
                }}
                value={"제목 + 내용"}
              >
                제목 + 내용
              </MenuItem>
              <MenuItem
                sx={{
                  height: 40,
                  width: 110,
                  fontSize: 14,
                  fontWeight: 300,
                  border: "1px solid #E1E1E1",
                }}
                value={"제목"}
              >
                제목
              </MenuItem>
              <MenuItem
                sx={{
                  height: 40,
                  width: 110,
                  fontSize: 14,
                  fontWeight: 300,
                  border: "1px solid #E1E1E1",
                }}
                value={"내용"}
              >
                내용
              </MenuItem>
            </Select>
          </Grid>

          <Grid item ml={2} sx={{ width: isMobile ? "100%" : "160px" }}>
            <SearchInput
              bordered={true}
              placeholder="게시글 검색"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid> */}

      {loading ? (
        <Box sx={{ textAlign: "center", py: 3 }}>Loading...</Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", py: 3, color: "error.main" }}>
          {error}
        </Box>
      ) : (
        <>
          {format === "list" ? (
            // 리스트 뷰
            <>
              {!isTablet && (
                <Grid
                  container
                  direction="row"
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ padding: "1rem 0px" }}
                >
                  <Grid container item sm={8}>
                    <Grid item sm={12}>
                      <H6 sx={{ fontWeight: 600 }}>{t("forum.table.title")}</H6>
                    </Grid>
                  </Grid>
                  <Grid container item sm={4}>
                    <Grid item sm={4}>
                      <H6 sx={{ fontWeight: 600 }}>
                        {t("forum.table.author")}
                      </H6>
                    </Grid>
                    <Grid item sm={3}>
                      <H6 sx={{ fontWeight: 600 }}>{t("forum.table.views")}</H6>
                    </Grid>
                    <Grid item sm={5}>
                      <H6 sx={{ fontWeight: 600 }}>{t("forum.table.date")}</H6>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {articles.map((item, index) => (
                <ListFormat
                  key={item._id}
                  item={{
                    ...item,
                    isAdmin: false,
                    title: item.title,
                    // numOfComment: item.comments ? item.comments.length : 0,
                    writer: item.userName,
                    likes: item.likes ? item.likes.length : 0,
                    views: item.views || 0,
                    date: new Date(item.createdAt).toLocaleDateString(),
                    index: index + 1,
                    type: item.type || "sell",
                  }}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  theme={theme}
                  onForumClick={onForumClick}
                />
              ))}
            </>
          ) : (
            // 포토 뷰
            <Grid container spacing={0} px={0} justifyContent="flex-end">
              <Grid
                container
                item
                sx={{
                  display: "flex",
                  justifyContent: isTablet ? "center" : "space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {isTablet
                  ? GridFormat(isTablet, theme, onForumClick)
                  : articles.map((item, index) => {
                      return GridFormat(
                        item,
                        index,
                        isTablet,
                        theme,
                        onForumClick
                      );
                    })}
              </Grid>
            </Grid>
          )}
        </>
      )}
      <Stack alignItems="center" marginY="1rem">
        <AppPagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={(value) => onPageChange(value)}
        />
      </Stack>
    </StyledCard>
  );
}

const ListFormat = ({
  item,
  index,
  isMobile,
  isTablet,
  theme,
  onForumClick,
}) => {
  const { t } = useTranslation(); // Add translation hook

  return (
    <Grid
      container
      direction="row"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        borderTop: "1px solid #E1E1E1",
        padding: "1rem 1rem",
        backgroundColor: item.isAdmin ? "#F9FAFD" : "#ffffff",
        cursor: "pointer",
      }}
      onClick={() => onForumClick(item._id)} // Pass the article ID
    >
      <Grid
        item
        xs={12}
        md={isTablet ? 8 : 8}
        direction={"row"}
        sx={{ textAlign: "left" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {item.isAdmin && (
            <Grid
              item
              justifyContent={"center"}
              alignItems={"center"}
              mr={1}
              sx={{ marginTop: "3px" }}
            >
              <img src={pin} alt="pin" width="11px" />
            </Grid>
          )}
          <Box
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              width: "54px",
              height: "54px",
              flexShrink: 0,
              backgroundColor: theme.palette.primary.grey800,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.images?.[0]?.path ? (
              <img
                src={item.images?.[0]?.path}
                alt="thumbnail"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: `1px solid ${theme.palette.primary.border}`,
                }}
              />
            ) : (
              <Image
                width={30}
                height={30}
                color={theme.palette.primary.border}
                strokeWidth={1.5}
              />
            )}
          </Box>
          <H6
            sx={{
              fontWeight: item.isAdmin ? 600 : 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
              paddingRight: isTablet ? "1rem" : 0,
              marginLeft: "8px",
            }}
          >
            {item.type === "buy" && (
              <Chip
                label={t("forum.type.buy")}
                sx={{
                  backgroundColor: theme.palette.primary.lightRed,
                  marginRight: "8px",
                  fontSize: "14px",
                  color: theme.palette.primary.red,
                  height: "28px",
                }}
              />
            )}
            {item.type === "sell" && (
              <Chip
                label={t("forum.type.sell")}
                sx={{
                  marginRight: "8px",
                  fontSize: "14px",
                  color: theme.palette.primary.darkBlue,
                  height: "28px",
                }}
              />
            )}
            {item.title}
            {/* {item.numOfComment > 0 && (
              <span
                style={{
                  marginLeft: "4px",
                  color: theme.palette.darkBlue,
                }}
              >
                ({item.numOfComment})
              </span>
            )} */}
          </H6>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={isTablet ? 4 : 4}
        direction={"row"}
        sx={{
          textAlign: "left",
          marginTop: isMobile ? 1 : 0,
          justifyContent: "flex-start",
        }}
        alignItems={"center"}
        spacing={1}
      >
        <Grid
          item
          xs={4}
          md={isTablet ? 5 : 4}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <H6 style={{ fontWeight: 500 }}>
            {`${item.writer}`.length > 5
              ? `${item.writer}`.substring(0, 5) + "..."
              : `${item.writer}`}
          </H6>
          {item.isAdmin && (
            <img
              src={checkIcon}
              alt="check"
              width="16px"
              style={{ marginLeft: "4px" }}
            />
          )}
        </Grid>
        <Grid item xs={4} md={isTablet ? 3 : 3} sx={{ textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={view}
              alt="check"
              width="13px"
              style={{ marginRight: "4px", marginBottom: "1px" }}
            />
            <H6 style={{ fontWeight: 500 }}>{item.views}</H6>
          </Box>
        </Grid>
        <Grid item xs={4} md={isTablet ? 4 : 5} sx={{ textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={calendar}
              alt="check"
              width="13px"
              style={{ marginRight: "4px", marginBottom: "1px" }}
            />
            <H6 style={{ fontWeight: 500 }}>{item.date}</H6>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

const GridFormat = (item, index, isMobile, isTablet, theme, onForumClick) => {
  return (
    <>
      {isTablet ? (
        <>
          <CarouselCard2 onForumClick={onForumClick} />
        </>
      ) : (
        <>
          <Card2 onForumClick={onForumClick} />
        </>
      )}
    </>
  );
};
