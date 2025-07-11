import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import SignUpSection from "page-sections/SignUpSection";

export default function Login() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        my={isTablet ? 0 : 6}
        sx={{
          width: isTablet ? "100%" : "680px",
        }}
      >
        <Grid width={"100%"} alignItems={"center"} justifyContent={"center"}>
          <SignUpSection />
        </Grid>
      </Box>
    </>
  );
}
