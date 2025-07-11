// 프로필 사진 세개 붙어있는 컴포넌트

import React from "react";

export default function ThreeAvatar() {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.grey2,
          padding: "0 1rem",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            <Hash size={22} color={theme.palette.primary.white} />
            <H6 sx={{ color: theme.palette.primary.white }}>업무</H6>
          </FlexRowAlign>
        </FlexBox>

        <FlexBox gap={1} alignItems={"center"} sx={{ cursor: "pointer" }}>
          <FlexBox
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            {/* Avatar images */}
            {[1, 2, 3].map((index) => (
              <Box
                key={index}
                component="img"
                src={avatar5}
                alt={`Avatar ${index}`}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: `2px solid ${theme.palette.primary.grey2}`,
                  marginLeft: index === 1 ? 0 : "-10px",
                  zIndex: 3 - index,
                }}
              />
            ))}
            {/* "+3" box */}
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                backgroundColor: theme.palette.primary.grey,
                color: theme.palette.primary.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "-10px",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              3+
            </Box>
          </FlexBox>
          <FlexBox
            sx={{
              backgroundColor: theme.palette.primary.grey,
              width: "36px",
              height: "36px",
              borderRadius: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Phone
              //   onClick={() => setRightPanel("history")}
              size={22}
              color={theme.palette.primary.white}
            />
          </FlexBox>
          <EllipsisVertical
            size={20}
            color={theme.palette.primary.grey400}
            style={{ cursor: "pointer" }}
          />
        </FlexBox>
      </Box>
    </Grid>
  );
}
