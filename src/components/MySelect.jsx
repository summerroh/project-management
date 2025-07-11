import { InputBase, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { Small } from "./Typography";

export default function MySelect({
  items,
  width,
  height,
  backgroundColor,
  placeholder,
  defaultValue,
}) {
  const [selectValue, setSelectValue] = useState(
    defaultValue ? defaultValue : ""
  );

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Small sx={{ fontWeight: 300, fontSize: 15.5, color: "#B5B7C0" }}>
                {placeholder}
              </Small>
            );
          }
          return selected;
        }}
        MenuProps={{
          MenuListProps: {
            style: {
              padding: "0",
              margin: "0",
            },
          },
        }}
        input={
          <InputBase
            sx={{
              height: height ? height : 40,
              width: width ? width : 110,
              fontSize: 14,
              textAlign: "left",
              paddingLeft: "10px !important",
              display: "flex",
              justifyContent: "flex-start",
              borderRadius: "8px",
              color: "text.primary",
              backgroundColor: backgroundColor ? backgroundColor : "#ffffff",
              marginBottom: 0,
              border: "1px solid #E1E1E1",
              "& .MuiPopover-paper": {
                boxShadow: "none",
              },
              "& > .MuiSelect-select": {
                paddingRight: "0 !important",
              },
            }}
          />
        }
      >
        {items.map((item) => {
          return (
            <MenuItem
              sx={{
                height: height ? height : 40,
                width: width ? width : 110,
                fontSize: 14,
                fontWeight: 300,
                border: "1px solid #E1E1E1",
              }}
              value={item}
            >
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
