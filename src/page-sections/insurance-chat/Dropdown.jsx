import { InputBase, MenuItem, Select, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Small } from "../../components/Typography";

export default function Dropdown({
  items,
  width,
  height,
  backgroundColor,
  placeholder,
  onSelect,
  defaultValue = "",
}) {
  const [selectValue, setSelectValue] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
    onSelect(event.target.value);
  };

  const theme = useTheme();

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
              <Small
                sx={{
                  fontSize: 14,
                  color: theme.palette.primary.dark,
                  paddingRight: 0, // Remove right padding
                }}
              >
                {placeholder}
              </Small>
            );
          }
          return <span style={{ paddingRight: 0 }}>{selected}</span>;
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
              fontSize: 14,
              textAlign: "left",
              paddingLeft: "10px !important",
              display: "flex",
              justifyContent: "flex-start",
              borderRadius: "8px",
              color: theme.palette.primary.dark,
              backgroundColor: backgroundColor ? backgroundColor : "#ffffff",
              marginBottom: 0,
              border: "none",

              "& .MuiPopover-paper": {
                boxShadow: "none",
              },
              "& .MuiInputBase-input": {
                paddingRight: "0 !important",
              },
            }}
          />
        }
        IconComponent={() => null}
      >
        {items.map((item) => {
          return (
            <MenuItem
              sx={{
                height: height ? height : 40,
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
