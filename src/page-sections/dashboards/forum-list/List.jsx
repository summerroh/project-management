import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Stack,
  styled,
  useMediaQuery,
} from "@mui/material";
import calendar from "assets/calendar.svg";
import check from "assets/check.svg";
import heart from "assets/empty-heart.svg";
import checkIcon from "assets/icon-check-admin.svg";
import pin from "assets/icon-pin.svg";
import img1 from "assets/img1.png";
import view from "assets/view.svg";
import ReversePagination from "components/ReversePagination";
import { ButtonText, H5, H6 } from "components/Typography";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import SearchInput from "components/input-fields/SearchInput";
import { useState, useRef } from "react";
import { Grid as GridIcon, List as ListIcon } from "react-feather";
import { useNavigate } from "react-router-dom";

import Card2 from "page-sections/dashboards/forum-list/Card2";
import CarouselCard2 from "page-sections/dashboards/forum-list/CarouselCard2";
import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";

// tab logos
import CommunityTabSlide from "./CommunityTabslide";

// ----------------------------------
// styled components
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

const forumData = [
  {
    isAdmin: true,
    header: "공지",
    insurance: "한화",
    title: "차이점 찾기 이벤트",
    numOfComment: 13,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 1,
  },
  {
    isAdmin: true,
    header: "공지",
    insurance: "한화",
    title: "차이점 찾기 이벤트",
    numOfComment: 13,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 2,
  },
  {
    isAdmin: true,
    header: "공지",
    insurance: "한화",
    title: "차이점 찾기 이벤트",
    numOfComment: 13,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 3,
  },
  {
    isAdmin: false,
    header: "친목",
    insurance: "한화",
    title: "게임의 기본적인 설계와 운영방침에 대해서",
    numOfComment: 2,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 4,
  },
  {
    isAdmin: false,
    header: "자유",
    insurance: "한화",
    title: "운영���님 유탄 있잖아요..",
    numOfComment: 6,
    writer: "전국제패 평지",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 5,
  },
  {
    isAdmin: false,
    header: "건의",
    insurance: "한화",
    title: "특권캐쉬 2배속 적용 건의",
    numOfComment: 0,
    writer: "	라리롬",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 6,
  },
  {
    isAdmin: false,
    header: "친목",
    insurance: "한화",
    title: "게임의 기본적인 설계와 운영방침에 대해서",
    numOfComment: 2,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 7,
  },
  {
    isAdmin: false,
    header: "자유",
    insurance: "한화",
    title: "운영자님 유탄 있잖아요..",
    numOfComment: 6,
    writer: "전국제패 평지",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 8,
  },
  {
    isAdmin: false,
    header: "건의",
    insurance: "한화",
    title: "특권캐쉬 2배속 적용 건의",
    numOfComment: 0,
    writer: "	라리롬",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 9,
  },
  {
    isAdmin: false,
    header: "친목",
    insurance: "한화",
    title: "게임의 기본적인 설계와 운영방침에 대해서",
    numOfComment: 2,
    writer: "라운지 초심자",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 10,
  },
  {
    isAdmin: false,
    header: "자유",
    insurance: "한화",
    title: "운영자님 유탄 있잖아요..",
    numOfComment: 6,
    writer: "전국제패 평지",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 11,
  },
  {
    isAdmin: false,
    header: "건의",
    insurance: "한화",
    title: "특권캐쉬 2배속 적용 건의",
    numOfComment: 0,
    writer: "	라리롬",
    likes: 3,
    views: 238,
    date: "2023.12.28",
    index: 12,
  },
];

const TabList = [
  {
    id: 1,
    title: "암",
    icon: "/static/sidemenu/calculator.png",
    selectedIcon: "/static/sidemenu/calculator-selected.png",
  },
  {
    id: 2,
    title: "뇌/심장",
    icon: "/static/sidemenu/calculator.png",
    selectedIcon: "/static/sidemenu/calculator-selected.png",
  },
  {
    id: 3,
    title: "입원/수술비",
    icon: "/static/sidemenu/calculator.png",
    selectedIcon: "/static/sidemenu/calculator-selected.png",
  },
  {
    id: 4,
    title: "후유장해",
    icon: "/static/sidemenu/calculator.png",
    selectedIcon: "/static/sidemenu/calculator-selected.png",
  },
  {
    id: 5,
    title: "치매/간병/재가",
    icon: "/static/sidemenu/calculator.png",
    selectedIcon: "/static/sidemenu/calculator-selected.png",
  },
  {
    id: 6,
    title: "운전자/상해",
    icon: "/static/sidemenu/calculator.png",
    selectedIcon: "/static/sidemenu/calculator-selected.png",
  },
];

export default function List({ imageLink }) {
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
    navigate("/board");
  };

  // select tab to change url logic
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(1);

  const tabsContainerRef = useRef(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      const tab = TabList.find((item) => item.id.toString() === tabParam);
      if (tab) {
        setSelectedTab(tab.id);
      }
    }
  }, [searchParams]);

  // end of select tab to change url logic

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
      {/* </Grid> */}
      <Box
        py={2}
        px={isMobile ? 2 : 0}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <H5>게시판 제목</H5>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/dashboard/texteditor")}
          sx={{
            height: "38px",
            fontSize: 14.5,
            borderRadius: 2,
            maxWidth: 110,
            borderRadius: 2,
            background: theme.palette.gradient.purpletoblue,
          }}
        >
          <ButtonText>글쓰기</ButtonText>
        </Button>
      </Box>

      {/* 탭 */}
      <Box my={2} sx={{ border: "none", paddingBottom: 0, width: "100%" }}>
        <CommunityTabSlide TabList={TabList} />
      </Box>

      <Grid
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
                <Grid item sm={1}>
                  <H6 sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>번호</H6>
                </Grid>
                <Grid item sm={5}>
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
      onClick={() => onForumClick()}
    >
      <Grid
        item
        xs={12}
        sm={isTablet ? 6 : 7}
        xl={isTablet ? 6 : 7}
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
          {item.isAdmin && (
            <Grid
              item
              justifyContent={"center"}
              alignItems={"center"}
              mr={1}
              sx={{ marginTop: "3px" }}
            >
              <img src={pin} alt="check" width="11px" />
            </Grid>
          )}
          <H6
            sx={{
              fontWeight: item.isAdmin ? 600 : 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            <span
              style={{
                marginRight: "4px",
              }}
            >
              {item.index}.
            </span>
            {item.header && (
              <span
                style={{
                  marginLeft: "4px",
                  color: theme.palette.primary.grey,
                }}
              >
                [{item.header}]
              </span>
            )}
            {item.insurance && (
              <span
                style={{
                  marginLeft: "4px",
                  color: theme.palette.primary.orange,
                }}
              >
                [{item.insurance}]{" "}
              </span>
            )}

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
