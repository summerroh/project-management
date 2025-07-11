import { InputBase, styled } from "@mui/material";
import SearchIcon from "icons/SearchIcon";
// styled component
const StyledInputBase = styled(InputBase)(({ theme, bordered }) => ({
  width: "100%",
  maxWidth: 350,
  height: "40px",
  fontSize: 13,
  fontWeight: 500,
  flexGrow: 1,
  borderRadius: 100,
  paddingLeft: 20,
  paddingRight: 10,
  paddingY: 0,

  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  border: bordered ? `1px solid ${"#E1E1E1"}` : "none",
  [theme.breakpoints.down(500)]: {
    maxWidth: "100%",
  },
  "::placeholder": {
    fontWeight: 400,
    fontSize: 14,
    color: "text.secondary",
  },
  "& input::placeholder": {
    fontWeight: 400,
    fontSize: 14,
    color: "text.secondary",
  },
})); // ------------------------------------------------------------

// ------------------------------------------------------------
const SearchInput = (props) => {
  const { icon_style = {}, bordered = true } = props;
  return (
    <StyledInputBase
      bordered={bordered ? 1 : 0}
      endAdornment={
        <SearchIcon
          sx={{
            fontSize: 18,
            marginRight: 1,
            color: "#B5B7C0",
            ...icon_style,
          }}
        />
      }
      {...props}
    />
  );
};

export default SearchInput;
