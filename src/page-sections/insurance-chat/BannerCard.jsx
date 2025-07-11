import { Box, ButtonBase, Card, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import img1 from "assets/img1.png";

export default function BannerCard() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        padding: 0,
        height: "110px",
      }}
    >
      <Box width="100%" alignItems="center" justifyContent="space-between">
        <img src={img1} alt="img1" style={{ width: "100%", height: "100%" }} />
      </Box>
    </Card>
  );
}
