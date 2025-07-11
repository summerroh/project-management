import { useTheme } from "@emotion/react";
import { Box, Button, Card, Grid, styled, useMediaQuery } from "@mui/material";
import { H5, TableContent } from "components/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import FlexBox from "components/flexbox/FlexBox";
import LoadingScreen from "components/LoadingScreen";

const StyledCard = styled(Card)(({}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
}));

export default function SignUpSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  const [selectedCountry, setSelectedCountry] = useState("korea");
  const [loading, setLoading] = useState(false);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleKakaoLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:4000/auth/kakao";
  };

  const handleNaverLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:4000/auth/naver";
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:4000/auth/google";
  };

  const handleLineLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:4000/auth/line";
  };

  const handleFacebookLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:4000/auth/facebook";
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <StyledCard
        sx={{
          padding: isMobile ? "2rem 1rem 2rem 1rem" : "3rem 2rem 3rem 2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid
            mb={4}
            p={1}
            container
            sx={{ backgroundColor: "#F0F0F0", borderRadius: 3 }}
          >
            <Grid
              item
              xs={6}
              py={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  selectedCountry === "korea" ? "#ffffff" : "none",
                borderRadius: 3,
                cursor: "pointer",
              }}
              onClick={() => handleCountryChange("korea")}
            >
              <H5
                sx={{
                  color:
                    selectedCountry === "korea"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.grey400,
                }}
              >
                {t("auth.korea")}
              </H5>
            </Grid>

            <Grid
              item
              xs={6}
              py={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  selectedCountry === "japan" ? "#ffffff" : "none",
                borderRadius: 3,
                cursor: "pointer",
              }}
              onClick={() => handleCountryChange("japan")}
            >
              <H5
                sx={{
                  color:
                    selectedCountry === "japan"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.grey400,
                }}
              >
                {t("auth.japan")}
              </H5>
            </Grid>
          </Grid>

          <Grid container spacing={2} gap={4} sx={{ width: "100%" }}>
            <Grid item xs={12}>
              <FlexBox gap={3} flexDirection={"column"}>
                {selectedCountry === "korea" ? (
                  <>
                    <Button
                      startIcon={
                        <img src={"/static/logos/kakao.svg"} alt="kakao" />
                      }
                      variant="contained"
                      onClick={handleKakaoLogin}
                      sx={{
                        width: "100%",
                        height: "60px",
                        backgroundColor: "#FFEB00",
                        borderRadius: 3,
                        "&:hover": {
                          backgroundColor: "#FFD600",
                        },
                      }}
                    >
                      <H5 sx={{ color: "#3C1E1E" }}>{t("auth.kakao_login")}</H5>
                    </Button>

                    <Button
                      startIcon={
                        <img src={"/static/logos/naver.svg"} alt="naver" />
                      }
                      variant="contained"
                      onClick={handleNaverLogin}
                      sx={{
                        width: "100%",
                        height: "60px",
                        backgroundColor: "#21CB01",
                        borderRadius: 3,
                        "&:hover": {
                          backgroundColor: "#1DB600",
                        },
                      }}
                    >
                      <H5 sx={{ color: "#ffffff" }}>{t("auth.naver_login")}</H5>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      startIcon={
                        <img src={"/static/logos/line.svg"} alt="line" />
                      }
                      variant="contained"
                      onClick={handleLineLogin}
                      sx={{
                        width: "100%",
                        height: "60px",
                        backgroundColor: "#06C755",
                        borderRadius: 3,
                        "&:hover": {
                          backgroundColor: "#05B34A",
                        },
                      }}
                    >
                      <H5 sx={{ color: "#ffffff" }}>{t("auth.line_login")}</H5>
                    </Button>

                    <Button
                      startIcon={
                        <img
                          src={"/static/logos/facebook.svg"}
                          alt="facebook"
                        />
                      }
                      variant="contained"
                      onClick={handleFacebookLogin}
                      sx={{
                        width: "100%",
                        height: "60px",
                        backgroundColor: "#1877F2",
                        borderRadius: 3,
                        "&:hover": {
                          backgroundColor: "#166FE5",
                        },
                      }}
                    >
                      <H5 sx={{ color: "#ffffff" }}>
                        {t("auth.facebook_login")}
                      </H5>
                    </Button>
                  </>
                )}

                <Button
                  startIcon={
                    <img src={"/static/logos/google.svg"} alt="google" />
                  }
                  variant="contained"
                  onClick={handleGoogleLogin}
                  sx={{
                    width: "100%",
                    height: "60px",
                    backgroundColor: theme.palette.primary.white,
                    borderRadius: 3,
                    border: `1px solid #E1E1E1`,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.grey800,
                    },
                  }}
                >
                  <H5 sx={{ color: theme.palette.primary.dark }}>
                    {t("auth.google_login")}
                  </H5>
                </Button>
              </FlexBox>

              <TableContent mt={3} textAlign={"center"}>
                {t("auth.auto_signup_notice")}
              </TableContent>
            </Grid>
          </Grid>
        </Box>
      </StyledCard>
    </>
  );
}
