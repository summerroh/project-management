import {
  Box,
  Button,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import IOSSwitch from "components/IOSSwitch";
import MultipleFileUpload from "components/MultipleFileUpload";
import { H5, H6, Small } from "components/Typography";
import { ChevronRight, Plus } from "lucide-react";
import React, { useState, useCallback, useRef, useEffect } from "react";

export default function SelfIntroductionContent({ onResize }) {
  const theme = useTheme();
  const resizeRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //   input 값들
  const [name2, setName2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email2, setEmail2] = useState("");

  const [exportPerformanceFiles, setExportPerformanceFiles] = useState([]);

  const [historyRows, setHistoryRows] = useState([{ year: "", content: "" }]);

  const [searchEnabled, setSearchEnabled] = useState(true);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [panelWidth, setPanelWidth] = useState(6);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const addHistoryRow = () => {
    setHistoryRows([...historyRows, { year: "", content: "" }]);
  };

  const removeHistoryRow = (index) => {
    const newRows = historyRows.filter((_, i) => i !== index);
    setHistoryRows(newRows);
  };

  const updateHistoryRow = (index, field, value) => {
    const newRows = [...historyRows];
    newRows[index][field] = value;
    setHistoryRows(newRows);
  };

  const handleFileUpload = (key) => (files) => {
    console.log(`Updating files for ${key}:`, files); // Debugging log
    switch (key) {
      case "exportPerformance":
        setExportPerformanceFiles(files);
        break;
      default:
        console.error("Unknown key:", key);
    }
  };

  // Resize
  const handleMouseMove = useCallback(
    (e) => {
      if (resizeRef.current && !isPanelCollapsed) {
        const newWidth = e.clientX;
        const newWidthInXl = (newWidth / window.innerWidth) * 12;
        if (newWidthInXl >= 2 && newWidthInXl <= 6) {
          setPanelWidth(newWidthInXl);
          onResize(newWidthInXl);
        }
      }
    },
    [onResize, isPanelCollapsed]
  );

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const togglePanel = useCallback(() => {
    if (isPanelCollapsed) {
      setIsPanelCollapsed(false);
      setTimeout(() => setIsContentVisible(true), 150);
      onResize(panelWidth);
    } else {
      setIsContentVisible(false);
      setTimeout(() => setIsPanelCollapsed(true), 300);
      onResize(0.4);
    }
  }, [isPanelCollapsed, onResize, panelWidth]);

  useEffect(() => {
    if (isPanelCollapsed) {
      setIsContentVisible(false);
    } else {
      setIsContentVisible(true);
    }
  }, [isPanelCollapsed]);
  // Resize End

  return (
    <Grid>
      {/* Resize handle */}
      <Box
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          cursor: "col-resize",
          zIndex: 1000,
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          padding: isMobile ? "0 16px" : "0 32px",
        }}
      >
        {/* Form */}
        <Grid item container spacing={4} py={8} sx={{ maxWidth: "820px" }}>
          <Grid item sm={6} xs={12}>
            <H6 mb={1}>
              회사명 / 학교명
              <span style={{ color: theme.palette.primary.red }}> *</span>
            </H6>
            <AppTextField
              name="phone2"
              placeholder="회사명 / 학교명"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <H6 mb={1}>
              지원 직무 / 지원 학과
              <span style={{ color: theme.palette.primary.red }}> *</span>
            </H6>
            <AppTextField
              name="email2"
              placeholder="직무명 / 학과명"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <H6 mb={1}>
              강조할 경혐과 핵심 이력
              <span style={{ color: theme.palette.primary.red }}> *</span>
            </H6>
            <AppTextField
              multiline
              rows={4}
              name="name2"
              value={name2}
              placeholder="자기소개서에 반영되어야 할 핵심 내용을 입력해 주세요"
              onChange={(e) => setName2(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} my={3}>
            <Divider
              sx={{ width: "100%", height: 1, backgroundColor: "#E1E1E1" }}
            />
          </Grid>

          <Grid item xs={12}>
            <FlexBox
              gap={1}
              alignItems="center"
              justifyContent="space-between"
              sx={{ cursor: "pointer" }}
            >
              <H5>
                자기소개서 문항
                <span style={{ color: theme.palette.primary.red }}> *</span>
              </H5>
              <FlexBox gap={0.5} alignItems="center">
                <Plus color={theme.palette.primary.darkBlue} />
                <H6
                  onClick={addHistoryRow}
                  sx={{ color: theme.palette.primary.darkBlue }}
                >
                  문항 추가
                </H6>
              </FlexBox>
            </FlexBox>
          </Grid>

          {historyRows.map((row, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <H6 mb={1}>
                  문항 {index + 1}
                  <span style={{ color: theme.palette.primary.red }}> *</span>
                </H6>

                <FlexBox gap={1} alignItems="center">
                  <AppTextField
                    name={`content-${index}`}
                    placeholder="자기소개서 문항을 입력해 주세요"
                    value={row.content}
                    onChange={(e) =>
                      updateHistoryRow(index, "content", e.target.value)
                    }
                  />
                  <Button
                    variant="contained"
                    onClick={() => removeHistoryRow(index)}
                    sx={{
                      background: theme.palette.primary.red,
                      height: "40px",
                      "&:hover": {
                        background: theme.palette.primary.red,
                      },
                    }}
                  >
                    삭제
                  </Button>
                </FlexBox>
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12} my={3}>
            <Divider
              sx={{ width: "100%", height: 1, backgroundColor: "#E1E1E1" }}
            />
          </Grid>

          {/* 파일 업로드 부분 */}
          <Grid item xs={12}>
            <Box mb={2}>
              <H6 mb={1}>
                이력서 / 생활기록부 첨부{" "}
                <span style={{ color: theme.palette.primary.grey2 }}>
                  (선택)
                </span>
              </H6>
              <Small>.pdf, docx 파일 1개(10mb) 업로드 가능</Small>
            </Box>

            <Grid item>
              <MultipleFileUpload
                title="exportPerformance"
                height={40}
                files={exportPerformanceFiles}
                onFileUpload={handleFileUpload("exportPerformance")}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} my={3}>
            <Divider
              sx={{ width: "100%", height: 1, backgroundColor: "#E1E1E1" }}
            />
          </Grid>

          <Grid item xs={12}>
            <FlexRowAlign
              mb={1}
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <Box mb={2}>
                <H6 mb={1}>인터넷 검색 결과 활용하기</H6>
                <Small>
                  지원 회사/학교와 관련된 정보를 자동으로 검색하여 반영해요
                </Small>
              </Box>

              <FlexBox alignItems="center" gap={1}>
                <H6
                  sx={{
                    color: theme.palette.primary.darkBlue,
                    whiteSpace: "nowrap",
                  }}
                >
                  {searchEnabled ? "켜짐" : "꺼짐"}
                </H6>
                <IOSSwitch
                  checked={searchEnabled}
                  onChange={(e) => setSearchEnabled(e.target.checked)}
                />
              </FlexBox>
            </FlexRowAlign>

            <FlexBox
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background: theme.palette.primary.lightBlueBackground,
                padding: "64px 0",
                borderRadius: "16px",
                border: `1px solid ${theme.palette.primary.borderColor}`,
              }}
            >
              <Box mb={2}>
                <H6 mb={1} sx={{ textAlign: "center" }}>
                  <span style={{ color: theme.palette.primary.darkBlue }}>
                    클릭 한 번
                  </span>
                  으로 자기소개서를
                  <br /> 무제한 · 무료로 완성해 보세요!
                </H6>
                <Small sx={{ textAlign: "center" }}>
                  입력한 이력이 다른 사람과 동일해도
                  <br /> 생성할 때마다{" "}
                  <span style={{ color: theme.palette.primary.darkBlue }}>
                    결과물{" "}
                  </span>
                  이 달라져요
                </Small>
              </Box>

              <Box>
                <Button
                  endIcon={<ChevronRight />}
                  variant="contained"
                  sx={{
                    background: theme.palette.primary.darkBlue,
                    "&:hover": {
                      background: theme.palette.primary.darkBlueHover,
                    },
                  }}
                >
                  자기소개서 생성하기
                </Button>
              </Box>
            </FlexBox>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
