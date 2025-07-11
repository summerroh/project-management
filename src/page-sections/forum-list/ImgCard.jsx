import { Box, Card, useTheme } from "@mui/material";
import img1 from "assets/img1.png";

export default function ImgCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        padding: 0,
        height: "190px",
      }}
    >
      <Box width="100%" alignItems="center" justifyContent="space-between">
        <img src={img1} alt="img1" style={{ width: "100%", height: "100%" }} />
      </Box>
    </Card>
  );
}
