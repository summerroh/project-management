// 3섹션

import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { H5, H6 } from "components/Typography";
import { Plus } from "lucide-react";
import CommentsPanel from "page-sections/insurance-chat/CommentsPanel";
import HistoryPanel from "page-sections/insurance-chat/HistoryPannel";
import InsuranceQnaContent from "page-sections/insurance-chat/InsuranceQnaContent";
import MenuPanel from "page-sections/insurance-chat/MenuPanel";
import { useCallback, useEffect, useState } from "react";
import { primary } from "theme/colors";

export default function InsuranceQna() {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const [rightPanel, setRightPanel] = useState("comment");
  const [rightPanelWidth, setRightPanelWidth] = useState(2.5);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(1.5);

  useEffect(() => {
    setLeftPanelWidth(isLeftPanelCollapsed ? 0.4 : 1.5);
  }, [isLeftPanelCollapsed]);

  const handleResize = useCallback((newWidth) => {
    setRightPanelWidth(newWidth);
  }, []);

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
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.white,
                    padding: "0 1rem",
                    height: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid #E1E1E1`,
                  }}
                >
                  <FlexBox gap={0.6} style={{ cursor: "pointer" }}>
                    <FlexRowAlign
                      gap={1}
                      sx={{
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <H5>Projects</H5>
                    </FlexRowAlign>
                  </FlexBox>

                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Plus size={16} />}
                    sx={{
                      backgroundColor: primary.darkBlue,
                      "&:hover": { backgroundColor: primary.darkBlueHover },
                    }}
                  >
                    Create Project
                  </Button>
                </Box>
              </Grid>

              {/* 중간 내용 */}
              <Grid item lg={12 - rightPanelWidth} xs={12}>
                <Box
                  sx={{
                    borderBottom: `1px solid #E1E1E1`,
                    height: `calc(100vh - ${navbarHeight}px)`,
                    overflow: "auto",
                  }}
                >
                  <InsuranceQnaContent />
                </Box>
              </Grid>

              {/* 오른쪽 패널 */}
              <Grid item lg={rightPanelWidth} xs={12}>
                {rightPanel === "comment" ? (
                  <CommentsPanel
                    setRightPanel={setRightPanel}
                    onResize={handleResize}
                  />
                ) : rightPanel === "history" ? (
                  <HistoryPanel
                    setRightPanel={setRightPanel}
                    onResize={handleResize}
                  />
                ) : (
                  <CommentsPanel
                    setRightPanel={setRightPanel}
                    onResize={handleResize}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
