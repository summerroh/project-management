import { Box, useMediaQuery } from "@mui/material";
import React, { useState, useRef } from "react";
import { ButtonText, Tiny } from "./Typography";
import FlexRowAlign from "./flexbox/FlexRowAlign";
import { styled, useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export default function FileUpload({
  title,
  showThumbnail = false,
  height = "50",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [iconFile, setIconFile] = useState(null);
  const iconFileRef = useRef(null);

  const UploadButton = styled(Box)(({ theme }) => ({
    width: "fit-content",
    height: `${height - 10}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "6px",
    paddingRight: "6px",
    borderRadius: 4,
    border: "1px solid",
    borderColor: theme.palette.borderColor,
    backgroundColor: theme.palette.primary.grey700,
  }));

  const handleIconFileInputChange = (e) => {
    const file = e.target.files[0];
    setIconFile(file);
  };

  return (
    <Box>
      <ButtonText mb={1}>{title}</ButtonText>
      <FlexRowAlign sx={{ justifyContent: "flex-start", alignItems: "center" }}>
        {showThumbnail && (
          <Box
            mr={2}
            sx={{
              width: "50px",
              height: "50px",
              background: iconFile
                ? `url(${URL.createObjectURL(iconFile)}) no-repeat center/cover`
                : theme.palette.borderColor,

              borderRadius: 3,
            }}
          />
        )}

        <Box
          px={1}
          gap={0}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid",
            borderColor: theme.palette.borderColor,
            width: isMobile ? "100%" : "fit-content",
            backgroundColor: "#ffffff",
            minWidth: isMobile ? 0 : 382,
            height: `${height}px`,
            borderRadius: 2,
          }}
        >
          <Tiny
            sx={{
              fontWeight: 300,
              color: theme.palette.primary.grey400,
            }}
          >
            {iconFile ? iconFile.name : "선택된 파일 없음"}
          </Tiny>
          <UploadButton>
            <label htmlFor="icon-file">
              <input
                ref={iconFileRef}
                onChange={handleIconFileInputChange}
                accept="image/*"
                id="icon-file"
                type="file"
                style={{
                  display: "none",
                  width: "100%",
                }}
              />
              <IconButton component="span" disableRipple>
                <Tiny
                  sx={{
                    fontWeight: 300,
                    color: theme.palette.primary.grey400,
                  }}
                >
                  파일 선택
                </Tiny>
              </IconButton>
            </label>
          </UploadButton>
        </Box>
      </FlexRowAlign>
    </Box>
  );
}
