import { Card, Grid, styled, useMediaQuery, useTheme } from "@mui/material";
import { Tiny } from "components/Typography";

const Footer = ({ showSideBar, darkMode }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const StyledCard = styled(Card)(({ theme, showSideBar, darkMode }) => ({
    width: `calc(100%)`,
    backgroundColor: darkMode ? theme.palette.primary.dark : "#EAEAEA",
    color: darkMode ? "#FFFFFF" : "#151515",
    borderRadius: 0,
    border: "none",
  }));

  return (
    <StyledCard showSideBar={showSideBar} darkMode={darkMode}>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "flex-start",
          padding: { xs: "2rem 2rem", lg: "2rem 4rem" },
          justifyContent: "flex-start",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Grid
          container
          item
          xs={12}
          sm={6}
          px={2}
          py={2}
          sx={{
            borderRight: isTablet ? "none" : "2px solid #e1e1e1",
            borderBottom: isTablet ? "2px solid #e1e1e1" : "none",
          }}
        >
          <img
            src={"/static/logos/forsea-small.png"}
            width={120}
            alt="logo"
            style={{ marginBottom: "10px" }}
          />
          <Tiny>
            유니언포씨(주) 대표 <br />
            사무실 서울시 서초구 사임당로 143, 크로스 143타워 2층 | 교육장
            서울시 강남구 역삼로 134, MS빌딩 2층 | 사업자등록번호 321-86-00842
            사업자정보확인 통신판매업신고번호 제2018-서울강남-03590호
            개인정보관리책임자 성주엽
          </Tiny>
        </Grid>

        {/* <Divider orientation="vertical" flexItem /> */}

        <Grid container item xs={12} sm={6} px={2} py={2}>
          <img
            src={"/static/logos/fukunari-small.png"}
            width={120}
            alt="logo"
            style={{ marginBottom: "10px" }}
          />
          <Tiny>
            FUKUNARI(주) 대표 <br />
            사무실 서울시 서초구 사임당로 143, 크로스 143타워 2층 | 교육장
            서울시 강남구 역삼로 134, MS빌딩 2층 | 사업자등록번호 321-86-00842
            사업자정보확인 통신판매업신고번호 제2018-서울강남-03590호
            개인정보관리책임자 성주엽
          </Tiny>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default Footer;
