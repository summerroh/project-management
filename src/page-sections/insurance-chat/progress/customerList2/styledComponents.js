import { alpha, InputBase, Pagination, styled, TableRow } from "@mui/material";
import SearchIcon from "icons/SearchIcon";
export const StyledTableBodyRow = styled(TableRow)(({ theme, selected_row }) =>
  selected_row === "select"
    ? {
        backgroundColor: alpha(theme.palette.primary.light, 0.5),
        position: "relative",
        "&::after": {
          top: 0,
          left: 0,
          width: "3px",
          content: '""',
          height: "100%",
          position: "absolute",
          backgroundColor: theme.palette.primary.main,
        },
      }
    : {}
);
export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontSize: 13.5,
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  "& .MuiPaginationItem-page:hover": {
    borderRadius: 20,
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    borderRadius: 20,
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiPaginationItem-previousNext": {
    margin: 10,
    borderRadius: 20,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));
export const StyledSearchInput = styled(InputBase)(({ theme }) => ({
  height: 40,
  fontSize: 13.5,
  maxWidth: 450,
  width: "100%",
  fontWeight: 500,
  padding: "0.5rem",
  borderRadius: "4px",
  backgroundColor: "white",
  color: theme.palette.text.primary,
}));
export const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  fontSize: 17,
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  color: theme.palette.primary.main,
}));
