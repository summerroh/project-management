import React from "react";
import { useTheme, useMediaQuery, Box } from "@mui/material";
import { H6, H7 } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import GPTIcon from "assets/icon-gpt.png";
import { Clipboard, ThumbsDown, ThumbsUp } from "react-feather";
import AIDropdown from "./AIDropdown";
import CodeViewer from "components/CodeViewer";
import MyTable from "page-sections/wrtn/MyTable";

const navbarHeight = 67;
const otherElementHeight = 140;

export default function ChatScreen() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const code = `import React, { useState } from "react";
  import { CopyToClipboard } from "react-copy-to-clipboard";
  import { Prism as SyntaxHighlighter } from "react-syntax-highlighter/highlighter";
  import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
  import Button from "@mui/material/Button";
  import FlexRowAlign from "./flexbox/FlexRowAlign";
  import { useTheme } from "@emotion/react";
  
  export default function CodeViewer({ code }) {
    const theme = useTheme();
    const [copied, setCopied] = useState(false);
  
    const handleCopy = () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    };
  
    return (
      <div>
        <FlexRowAlign
          sx={{
            backgroundColor: theme.palette.primary.grey400,
            width: "100%",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            justifyContent: "flex-end",
          }}
        >
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "8px",
                backgroundColor: theme.palette.primary.grey400,
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </CopyToClipboard>
        </FlexRowAlign>
        <SyntaxHighlighter
          language="javascript"
          style={dark}
          customStyle={{
            backgroundColor: "pink", // 핑크색으로 변경
            borderWidth: 0,
            marginTop: 0,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }
  `;

  return (
    <>
      <FlexBox
        mt={0}
        pt={2}
        // px={isMobile ? 14 : 0}
        mb={isTablet ? 14 : 0}
        gap={1.5}
        sx={{
          width: isMobile ? "85%" : "90%",
          maxWidth: isMobile ? "85%" : "90%",
          flexDirection: "column",
          maxHeight: isTablet
            ? `calc(100vh - ${navbarHeight}px - 180px)`
            : `calc(100vh - ${navbarHeight}px - ${otherElementHeight}px)`,
          "&::-webkit-scrollbar": {
            width: "8px", // Width of the scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Color of the scrollbar thumb
            borderRadius: "4px", // Rounded corners
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Color of the scrollbar track
          },
          // overflow: "auto",
          // "&::-webkit-scrollbar": {
          //   display: "none",
          // },
          // "-ms-overflow-style": "none" /* IE and Edge */,
          // "scrollbar-width": "none" /* Firefox */,
        }}
      >
        <AIDropdown />

        <FlexBox
          sx={{
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <FlexBox
            px={3}
            py={2.5}
            sx={{
              backgroundColor: theme.palette.primary.violet300,
              width: "fit-content",
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderBottomRightRadius: 0,
            }}
          >
            <H6>안녕</H6>
          </FlexBox>
        </FlexBox>

        <FlexBox
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: "0.5rem 0rem",
              borderRadius: "50px",
              flexDirection: "row",
              display: "flex",
              width: "fit-content",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={GPTIcon}
              alt="Google AI"
              style={{ marginRight: 7, width: 24 }}
            />
            <H7 sx={{ fontWeight: 500, color: theme.palette.primary.grey300 }}>
              GPT-4 Turbo
            </H7>
          </Box>
          <FlexBox
            px={3}
            py={2.5}
            mb={2}
            sx={{
              backgroundColor: theme.palette.primary.lightBlue3,
              width: "fit-content",
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderTopLeftRadius: 0,
              flexDirection: "column",
            }}
          >
            <H6>안녕하세요! 뤼튼입니다. 무엇을 도와드릴까요?</H6>
            <FlexBox
              mt={1}
              gap={1}
              sx={{
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <ThumbsUp size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <ThumbsDown size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <Clipboard size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox
          sx={{
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <FlexBox
            px={3}
            py={2.5}
            sx={{
              backgroundColor: theme.palette.primary.violet300,
              width: "fit-content",
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderBottomRightRadius: 0,
            }}
          >
            <H6>픽셀 아트가 뭐야?</H6>
          </FlexBox>
        </FlexBox>

        <FlexBox
          mb={2}
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: "0.5rem 0rem",
              borderRadius: "50px",
              flexDirection: "row",
              display: "flex",
              width: "fit-content",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={GPTIcon}
              alt="Google AI"
              style={{ marginRight: 7, width: 24 }}
            />
            <H7 sx={{ fontWeight: 500, color: theme.palette.primary.grey300 }}>
              GPT-4 Turbo
            </H7>
          </Box>
          <FlexBox
            px={3}
            py={2.5}
            sx={{
              backgroundColor: theme.palette.primary.lightBlue3,
              width: "fit-content",
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderTopLeftRadius: 0,
              flexDirection: "column",
            }}
          >
            <H6>
              또한, 그래픽 디자인 프로그램을 사용하여 스스로 픽셀 아트를
              시도해볼 수도 있습니다. 픽셀 아트는 작은 크기의 픽셀로 구성되는
              것이 특징이므로, 간단한 그래픽 편집 도구를 사용하여 픽셀 단위로
              디자인을 할 수 있습니다. 이를 위해 픽셀 아트 편집기를
              찾아보시거나, 일반적인 그래픽 디자인 프로그램에서 픽셀 그리드를
              사용하여 작업할 수도 있습니다.
            </H6>
            <FlexBox
              mt={1}
              gap={1}
              sx={{
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <ThumbsUp size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <ThumbsDown size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <Clipboard size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox
          sx={{
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <FlexBox
            px={3}
            py={2.5}
            sx={{
              backgroundColor: theme.palette.primary.violet300,
              width: "fit-content",
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderBottomRightRadius: 0,
            }}
          >
            <H6>코드 작성해줘</H6>
          </FlexBox>
        </FlexBox>

        <FlexBox
          mb={2}
          sx={{
            // width: "100%",
            justifyContent: "flex-start",
            flexDirection: "column",
            // maxWidth: "90% !important",
          }}
        >
          <Box
            sx={{
              padding: "0.5rem 0rem",
              borderRadius: "50px",
              flexDirection: "row",
              display: "flex",
              width: "fit-content",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={GPTIcon}
              alt="Google AI"
              style={{ marginRight: 7, width: 24 }}
            />
            <H7 sx={{ fontWeight: 500, color: theme.palette.primary.grey300 }}>
              GPT-4 Turbo
            </H7>
          </Box>
          <FlexBox
            px={3}
            py={2.5}
            sx={{
              backgroundColor: theme.palette.primary.lightBlue3,
              // width: "fit-content",
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderTopLeftRadius: 0,
              flexDirection: "column",
            }}
          >
            <CodeViewer code={code} language="JSX" />
            <FlexBox
              mt={1}
              gap={1}
              sx={{
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <ThumbsUp size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <ThumbsDown size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <Clipboard size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox
          sx={{
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <FlexBox
            px={3}
            py={2.5}
            sx={{
              backgroundColor: theme.palette.primary.violet300,
              width: "fit-content",
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderBottomRightRadius: 0,
            }}
          >
            <H6>표 작성해줘</H6>
          </FlexBox>
        </FlexBox>

        <FlexBox
          mb={2}
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: "0.5rem 0rem",
              borderRadius: "50px",
              flexDirection: "row",
              display: "flex",
              width: "fit-content",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={GPTIcon}
              alt="Google AI"
              style={{ marginRight: 7, width: 24 }}
            />
            <H7 sx={{ fontWeight: 500, color: theme.palette.primary.grey300 }}>
              GPT-4 Turbo
            </H7>
          </Box>
          <FlexBox
            px={3}
            py={2.5}
            sx={{
              backgroundColor: theme.palette.primary.lightBlue3,
              // width: "fit-content",
              // width: '100%',
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderTopLeftRadius: 0,
              flexDirection: "column",
            }}
          >
            <MyTable />
            <FlexBox
              mt={1}
              gap={1}
              sx={{
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <ThumbsUp size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <ThumbsDown size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
              <FlexBox
                p={0.8}
                sx={{
                  backgroundColor: "#DDE8F3",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <Clipboard size={12} color={theme.palette.primary.grey300} />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
}
