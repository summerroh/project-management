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
import InfoModal from "components/modal/InfoModal";
import TaxCalculatorModal from "components/modal/TaxCalculatorModal";
import { H5, H6, H8, Small } from "components/Typography";
import { CircleHelp, Plus } from "lucide-react";
import CommentsPanel from "page-sections/insurance-chat/CommentsPanel";
import HistoryPanel from "page-sections/insurance-chat/HistoryPannel";
import MenuPanel from "page-sections/insurance-chat/MenuPanel";
import TaxInfoContent from "page-sections/insurance-chat/TaxInfoContent";
import { useCallback, useEffect, useState } from "react";
import { primary } from "theme/colors";

export default function InsuranceTaxInfo() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const [rightPanel, setRightPanel] = useState("comment");
  const [rightPanelWidth, setRightPanelWidth] = useState(2.5);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(1.5);
  const [showTaxCalculatorModal, setShowTaxCalculatorModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalContent, setInfoModalContent] =
    useState("예상세금 서비스 설명입니다.");

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
      <TaxCalculatorModal
        showModal={showTaxCalculatorModal}
        setShowModal={setShowTaxCalculatorModal}
      />

      <InfoModal
        showModal={showInfoModal}
        setShowModal={setShowInfoModal}
        content={infoModalContent}
      />

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
                    height: isTablet ? "auto" : "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid #E1E1E1`,
                    flexDirection: isTablet ? "column" : "row",
                    gap: isTablet ? 2 : 0,
                    width: isTablet ? "100%" : "auto",
                    padding: isTablet ? "16px 0" : "0px 1rem",
                  }}
                >
                  <FlexBox gap={0.6} style={{ cursor: "pointer" }}>
                    <FlexBox
                      gap={2}
                      sx={{
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <H5>예상세금 서비스</H5>

                      <FlexRowAlign gap={0.5}>
                        <CircleHelp
                          size={16}
                          color={theme.palette.primary.darkBlue}
                        />
                        <Small
                          sx={{ color: theme.palette.primary.darkBlue }}
                          onClick={() => setShowInfoModal(true)}
                        >
                          예상세금 서비스란?
                        </Small>
                      </FlexRowAlign>
                    </FlexBox>
                  </FlexBox>

                  <FlexBox gap={1}>
                    <Button
                      onClick={() => setShowTaxCalculatorModal(true)}
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: primary.darkBlue,
                        "&:hover": { backgroundColor: primary.darkBlueHover },
                      }}
                    >
                      예상세금계산서
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Plus size={16} />}
                      sx={{
                        backgroundColor: primary.darkBlue,
                        "&:hover": { backgroundColor: primary.darkBlueHover },
                      }}
                    >
                      추가 입력
                    </Button>
                  </FlexBox>
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
                  <TaxInfoContent />
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
