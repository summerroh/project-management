import { Box, Card, useTheme } from "@mui/material";
import heart from "assets/empty-heart.svg";
import { H5, H6 } from "components/Typography";

const forumData = [
  {
    isAdmin: false,
    title: "게임의 기본적인 설계와 운영방침에 대해서",
    numOfComment: 2,
    writer: "라운지 초심자",
    views: 238,
    likes: 10,
    date: "2023.12.28",
  },
  {
    isAdmin: false,
    title: "운영자님 유탄 있잖아요..",
    numOfComment: 6,
    writer: "전국제패 평지",
    views: 238,
    likes: 10,
    date: "2023.12.28",
  },
  {
    isAdmin: false,
    title: "특권캐쉬 2배속 적용 건의",
    numOfComment: 0,
    writer: "	라리롬",
    views: 238,
    likes: 10,
    date: "2023.12.28",
  },
  {
    isAdmin: false,
    title:
      "게임의 기본적인 설계와 운영방침에 대해서게임의 기본적인 설계와 운영방침에 대해서게임의 기본적인 설계와 운영방침에 대해서게임의 기본적인 설계와 운영방침에 대해서게임의 기본적인 설계와 운영방침에 대해서게임의 기본적인 설계와 운영방침에 대해서",
    numOfComment: 2,
    writer: "라운지 초심자",
    views: 238,
    likes: 10,
    date: "2023.12.28",
  },
  {
    isAdmin: false,
    title: "운영자님 유탄 있잖아요..",
    numOfComment: 6,
    writer: "전국제패 평지",
    views: 238,
    likes: 10,
    date: "2023.12.28",
  },
];

export default function PopularCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        padding: 3,
        height: "100%",
      }}
    >
      <Box
        width="100%"
        alignItems="center"
        justifyContent="space-between"

        // sx={{
        //   [theme.breakpoints.down(630)]: {
        //     justifyContent: "flex-start",
        //     textAlign: "left",
        //   },
        // }}
      >
        <Box>
          <H5 mb={2}>이 라운지 인기글</H5>

          <Box sx={{ width: "100%" }}>
            {forumData.map((item, index) => (
              <Box
                mt={1.5}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "6px",
                    height: "6px",
                    marginRight: "7px",
                    backgroundColor: theme.palette.divider,
                    borderRadius: 100,
                  }}
                ></Box>

                <H6
                  sx={{
                    fontWeight: item.isAdmin ? 600 : "inherit",
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

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={heart}
                    alt="check"
                    width="13px"
                    style={{ marginRight: "4px", marginBottom: "1px" }}
                  />

                  <H6>{item.likes}</H6>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
