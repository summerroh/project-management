// 보험 - 수기 거래 관리

import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import DashboardContent from "page-sections/insurance-chat/DashboardContent";
import InsuranceTableContent from "page-sections/insurance-chat/InsuranceTableContent";
import MenuPanel from "page-sections/insurance-chat/MenuPanel";
import MiddleMenu from "page-sections/insurance-chat/MiddleMenu";
import { useEffect, useState } from "react";

export default function InsuranceTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(1.5);

  useEffect(() => {
    setLeftPanelWidth(isLeftPanelCollapsed ? 0.4 : 1.5);
  }, [isLeftPanelCollapsed]);

  const customStyle = {
    width: "100%",
    overflow: "hidden",
  };

  const navbarHeight = 116;

  return (
    <>
      <Box sx={customStyle}>
        <Grid container alignItems={"flex-start"}>
          <Grid item xs={12} container direction="row" alignItems="flex-start">
            {/* 왼쪽 패널 */}
            <Grid
              item
              lg={leftPanelWidth}
              xs={12}
              order={isLaptop ? 2 : 0}
              display={"flex"}
              flexDirection={"row"}
              sx={{ overflow: "hidden" }}
            >
              {/* 왼쪽 메뉴 */}
              <MenuPanel setIsLeftPanelCollapsed={setIsLeftPanelCollapsed} />
            </Grid>

            {/* 중간부분 */}
            <Grid
              container
              item
              lg={12 - leftPanelWidth}
              xs={12}
              bgcolor={"white"}
            >
              {/* 중간 메뉴 */}
              <MiddleMenu title={"수기 거래 관리"} />

              {/* 중간 내용 */}
              <Grid item lg={12} xs={12}>
                <Box
                  sx={{
                    borderBottom: `1px solid #E1E1E1`,
                    height: `calc(100vh - ${navbarHeight}px)`,
                    overflow: "auto",
                  }}
                >
                  <InsuranceTableContent />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
