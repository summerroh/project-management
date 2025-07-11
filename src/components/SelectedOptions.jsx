import React from "react";
import { Typography } from "@mui/material";
import FlexRowAlign from "./flexbox/FlexRowAlign";
import FlexBox from "./flexbox/FlexBox";
import { H6, H7 } from "./Typography";
import { RotateCw } from "react-feather";

const SelectedOptions = ({ selectedValues, setSelectedValues }) => {
  return (
    <FlexBox>
      <FlexBox
        // gap={2.5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <FlexRowAlign
          mb={1}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <H6 mr={1}>선택된 보험사</H6>
          <RotateCw
            onClick={() => setSelectedValues([])}
            size={"14px"}
            style={{ cursor: "pointer" }}
          />
        </FlexRowAlign>
        <FlexRowAlign style={{ height: 34 }}>
          {selectedValues.map((value, index) => (
            <H7
              key={index}
              variant="body1"
              style={{ marginRight: 6, whiteSpace: "nowrap" }}
            >
              {value}
            </H7>
          ))}
        </FlexRowAlign>
      </FlexBox>
    </FlexBox>
  );
};

export default SelectedOptions;
