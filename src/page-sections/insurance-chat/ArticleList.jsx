import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  styled,
  useMediaQuery,
} from "@mui/material";
import calendar from "assets/calendar.svg";
import check from "assets/check.svg";
import heart from "assets/empty-heart.svg";
import checkIcon from "assets/icon-check-admin.svg";
import pin from "assets/icon-pin.svg";
import view from "assets/view.svg";
import MySelect from "components/MySelect";
import ReversePagination from "components/ReversePagination";
import { H6, Tiny } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import GreySearchBar from "layouts/layout-parts/GreySearchBar";
import Card2 from "page-sections/dashboards/forum-list/Card2";
import CarouselCard2 from "page-sections/dashboards/forum-list/CarouselCard2";
import { useState } from "react";
import { Grid as GridIcon, List as ListIcon } from "react-feather";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  width: "100%",
  border: "none",
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

const forumData = [
  {
    category: "종합소득세",
    title: "차이점 찾기 이벤트",
    numOfComment: 13,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 1,
  },
  {
    category: "양도소득세",
    title: "차이점 찾기 이벤트",
    numOfComment: 13,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 2,
  },
  {
    category: "부가가치세",
    title: "차이점 찾기 이벤트",
    numOfComment: 13,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 3,
  },
  {
    category: "사업자 등록",
    title: "게임의 기본적인 설계와 운영방침에 대해서",
    numOfComment: 2,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 4,
  },
  {
    category: "상속세",
    title: "운영자님 유탄 있잖아요..",
    numOfComment: 6,
    writer: "전국제패 평지",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 5,
  },
  {
    category: "종합소득세",
    title: "차이점 찾기 이벤트",
    numOfComment: 13,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 6,
  },
  {
    category: "양도소득세",
    title: "게임의 기본적인 설계와 운영방침에 대해서",
    numOfComment: 2,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 7,
  },
  {
    category: "상속세",
    title: "운영자님 유탄 있잖아요..",
    numOfComment: 6,
    writer: "전국제패 평지",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 8,
  },
  {
    category: "종합소득세",
    title: "특권캐쉬 2배속 적용 건의",
    numOfComment: 0,
    writer: "	라리롬",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 9,
  },
  {
    category: "양도소득세",
    title: "게임의 기본적인 설계와 운영방침에 대해서",
    numOfComment: 2,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 10,
  },
  {
    category: "상속세",
    title: "운영자님 유탄 있잖아요..",
    numOfComment: 6,
    writer: "전국제패 평지",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 11,
  },
  {
    category: "종합소득세",
    title: "특권캐쉬 2배속 적용 건의",
    numOfComment: 0,
    writer: "	라리롬",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 12,
  },
];

export default function ArticleList({ imageLink }) {
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

  const onForumClick = () => {
    navigate("/dashboard/forumdetail");
  };

  // end of select tab to change url logic

  return (
    <StyledCard>
      <FlexBox
        mb={4}
        sx={{
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          flexDirection: isTablet ? "column" : "row",
          gap: isTablet ? 2 : 0,
        }}
      >
        <FlexBox
          sx={{
            flexDirection: isTablet ? "column" : "row",
            gap: 1.5,
            width: isTablet ? "100%" : "auto",
          }}
        >
          <FlexBox sx={{ flexDirection: "column", minWidth: "150px" }}>
            <MySelect
              items={["인기순", "최근순"]}
              width={"100%"}
              placeholder={"인기순"}
            />
          </FlexBox>

          <Box sx={{ width: isTablet ? "100%" : "350px" }}>
            <GreySearchBar />
          </Box>
        </FlexBox>

        <FlexBox>
          <Button variant="outlined" sx={{ mr: 1.5, height: "40px" }}>
            초기화
          </Button>
          <Button
            variant="contained"
            sx={{
              height: "40px",
              backgroundColor: theme.palette.primary.darkBlue,
              "&:hover": {
                backgroundColor: theme.palette.primary.darkBlueHover,
              },
            }}
          >
            검색
          </Button>
        </FlexBox>
      </FlexBox>

      <Grid
        container
        direction="row"
        mb={1.5}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid item sx={{ display: "flex", flexDirection: "row" }}>
          <Tiny>전체 110건</Tiny>
        </Grid>

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
              인기순
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
                최신순
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
              조회수순
            </H6>
          </FlexRowAlign>

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
      </Grid>

      {format === "list" ? (
        // 리스트 뷰
        <>
          {!isMobile && (
            <Grid
              container
              direction="row"
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ padding: "1rem 0px" }}
            >
              <Grid container item sm={7}>
                <Grid item sm={1.9}>
                  <H6 sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                    카테고리
                  </H6>
                </Grid>
                <Grid item sm={4.1}>
                  <H6 sx={{ fontWeight: 600 }}>제목</H6>
                </Grid>
              </Grid>
              <Grid container item sm={5}>
                <Grid item sm={4.2}>
                  <H6 sx={{ fontWeight: 600 }}>작성자</H6>
                </Grid>
                <Grid item sm={2.2}>
                  <H6 sx={{ fontWeight: 600, textAlign: "left" }}>좋아요</H6>
                </Grid>
                <Grid item sm={2.3}>
                  <H6 sx={{ fontWeight: 600 }}>조회수</H6>
                </Grid>
                <Grid item sm={3}>
                  <H6 sx={{ fontWeight: 600 }}>작성일</H6>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* {forumData.map((item, index) => { return ListFormat(item, index, isMobile, theme, onForumClick); })} */}

          {forumData.map((item, index) => {
            return (
              <ListFormat
                key={index}
                item={item}
                isMobile={isMobile}
                isTablet={isTablet}
                theme={theme}
                onForumClick={onForumClick}
              />
            );
          })}
        </>
      ) : (
        // 포토 뷰
        <Grid container spacing={0} px={0} justifyContent="flex-end">
          <Grid
            container
            item
            sx={{
              display: "flex",
              justifyContent: isMobile ? "center" : "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {isMobile
              ? GridFormat(isMobile, theme, onForumClick)
              : forumData.map((item, index) => {
                  return GridFormat(item, index, isMobile, theme, onForumClick);
                })}
          </Grid>
        </Grid>
      )}
      <Stack alignItems="center" marginY="1rem">
        {/* <ReversePagination totalItems={pageOptions.length} /> */}
        <ReversePagination totalItems={100} />
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
  const categoryColors = {
    종합소득세: "#E3F2FD",
    양도소득세: theme.palette.primary.lightPurple,
    부가가치세: theme.palette.primary.lightGreen,
    "사업자 등록": theme.palette.primary.lightOrange,
    상속세: theme.palette.primary.lightRed,
  };

  const categoryTextColors = {
    종합소득세: "#1565C0",
    양도소득세: theme.palette.primary.purple200,
    부가가치세: theme.palette.primary.green,
    "사업자 등록": theme.palette.primary.orange,
    상속세: theme.palette.primary.red,
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        borderTop: "1px solid #E1E1E1",
        padding: "1rem 0rem",
        backgroundColor: item.isAdmin ? "#F9FAFD" : "#ffffff",
        cursor: "pointer",
      }}
      onClick={() => onForumClick()}
    >
      <Grid
        item
        xs={12}
        sm={1.1}
        xl={1.1}
        direction={"row"}
        sx={{ textAlign: "left" }}
      >
        <Box
          component="span"
          sx={{
            backgroundColor: categoryColors[item.category] || "#F5F5F5",
            color: categoryTextColors[item.category] || "#616161",
            padding: "4px 12px",
            borderRadius: "16px",
            fontSize: "13px",
            fontWeight: 500,
            display: "inline-block",
          }}
        >
          {item.category}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={5.9}
        xl={5.9}
        direction={"row"}
        sx={{ textAlign: "left" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <H6
            sx={{
              fontWeight: item.isAdmin ? 600 : 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {item.title}
            {item.numOfComment > 0 && (
              <span
                style={{
                  marginLeft: "4px",
                  color: theme.palette.darkBlue,
                }}
              >
                ({item.numOfComment})
              </span>
            )}
          </H6>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={isTablet ? 6 : 5}
        xl={isTablet ? 6 : 5}
        direction={"row"}
        sx={{ textAlign: "left" }}
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={0.5}
      >
        <Grid
          item
          container
          xs={12}
          sm={4.5}
          direction={"row"}
          sx={{ textAlign: "left" }}
          spacing={0.5}
          alignItems={"center"}
        >
          <Grid item>
            <H6 style={{ fontWeight: 500 }}>
              {`${item.writer}`.length > 5
                ? `${item.writer}`.substring(0, 5) + "..."
                : `${item.writer}`}
            </H6>
          </Grid>
          <Grid
            item
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ marginTop: "3px" }}
          >
            <img src={checkIcon} alt="check" width="16px" />
          </Grid>
        </Grid>
        <Grid item xs={1.5} sm={2.3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {isMobile && (
              <img
                src={heart}
                alt="check"
                width="13px"
                style={{ marginRight: "4px", marginBottom: "1px" }}
              />
            )}
            <H6 style={{ fontWeight: 500 }}>{item.likes}</H6>
          </Box>
        </Grid>
        <Grid item xs={2} sm={2.2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // maxWidth: "40px",
            }}
          >
            {isMobile && (
              <img
                src={view}
                alt="check"
                width="13px"
                style={{ marginRight: "4px", marginBottom: "1px" }}
              />
            )}
            <H6 style={{ fontWeight: 500 }}>{item.views}</H6>
          </Box>
        </Grid>
        <Grid item xs={3.5} sm={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {isMobile && (
              <img
                src={calendar}
                alt="check"
                width="13px"
                style={{ marginRight: "4px", marginBottom: "1px" }}
              />
            )}
            <H6 style={{ fontWeight: 500 }}>{item.date}</H6>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

const GridFormat = (item, index, isMobile, theme, onForumClick) => {
  return (
    <>
      {isMobile ? (
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
