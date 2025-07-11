import { KeyboardArrowDown } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  InputBase,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import { Small, Tiny } from "components/Typography";
import { useMemo, useState } from "react"; // common cell component

const CommonCell = ({ title, body }) => (
  <FlexBox flexDirection="column">
    <Small mb={0.5}>{title}</Small>
    <Tiny color="text.secondary">{body}</Tiny>
  </FlexBox>
);

const columnShape = [
  {
    minWidth: 80,
    Header: "상담 목적",
    accessor: "purpose",
  },
  {
    minWidth: 80,
    Header: "고객 이름",
    accessor: "name",
  },
  {
    minWidth: 80,
    Header: "고객 번호",
    accessor: "phone",
  },
  {
    minWidth: 150,
    Header: "고객 메모",
    accessor: "team",
  },
  {
    minWidth: 120,
    Header: "날짜 검색",
    accessor: "dateOfBirth",
    Filter: DateColumnFilter,
  },
  {
    minWidth: 120,
    Header: "설계사 검색",
    accessor: "email",
    Cell: ({ row }) => {
      const { email, phone } = row.original;
      return <CommonCell title={email} body={phone} />;
    },
  },
  {
    minWidth: 120,
    Header: "담당자 검색",
    accessor: "administrator",
    Cell: ({ row }) => {
      const { administrator, phone } = row.original;
      return <CommonCell title={administrator} body={phone} />;
    },
  },
];
export function SelectColumnFilter({ column }) {
  const { filterValue, setFilter, preFilteredRows, id } = column;
  const theme = useTheme();
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => options.add(row.values[id]));
    return [...options.values()];
  }, [id, preFilteredRows]); // Render a multi-select box

  return (
    <Select
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      IconComponent={() => <KeyboardArrowDown sx={{ color: "#B5B7C0" }} />}
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
            height: 40,
            width: 110,
            fontSize: 14,
            paddingLeft: "10px !important",
            borderRadius: "8px",
            color: "text.primary",
            backgroundColor: "#ffffff",
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
      <MenuItem
        value="All"
        sx={{
          height: 40,
          width: 110,
          fontSize: 14,
          fontWeight: 300,
          border: "1px solid #E1E1E1",
        }}
      >
        All
      </MenuItem>
      {options.map((option, i) => (
        <MenuItem
          key={i}
          value={option}
          sx={{
            height: 40,
            width: 110,
            fontSize: 14,
            fontWeight: 300,
            border: "1px solid #E1E1E1",
            // padding: "0 8px",
          }}
        >
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
export function DateColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  const [disabled, setDisabled] = useState(true);
  const theme = useTheme();

  const handleChange = (newValue) => {
    // const date = format(new Date(newValue), "MMM dd, yyyy") || undefined;
    setDisabled(false);
    setFilter(newValue);
  };

  return (
    <DatePicker
      value={filterValue || ""}
      onChange={handleChange}
      slots={{
        textField: TextField,
      }}
      slotProps={{
        textField: {
          disabled: disabled,
          placeholder: "MM / DD / YYYY",
          sx: {
            "& .MuiOutlinedInput-root": {
              height: 40,
              minWidth: 100,
              fontSize: 13.5,
              fontWeight: 200,
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #E1E1E1",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-input": {
              padding: 0,
              paddingLeft: 1,
              color: "#151515",
              fontWeight: 400,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 19,
              color: "#B5B7C0",
            },
            calendar: {
              "& .react-datepicker": {
                backgroundColor: "#ffffff",
              },
              "& .react-datepicker__day--selected": {
                color: "#ffffff", // Set text color to white
                backgroundColor: "#024EA2", // Set background color to #024EA2
              },
              "&.MuiPickersDay-root.Mui-selected:hover": {
                backgroundColor: "#024EA2", // Replace with your desired color
              },
            },
            "&.MuiPickersDay-root.Mui-selected:hover": {
              backgroundColor: "#024EA2", // Replace with your desired color
            },
          },
        },
      }}
    />
  );
}

export default columnShape;
