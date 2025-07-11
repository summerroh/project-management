import {
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";

// ----------------------------------------------------------------------
// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: `1rem !important`,
  paddingRight: `1rem !important`,
  backgroundColor: theme.palette.primary.grey800,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TableHeader = (props) => {
  const theme = useTheme();
  const { heading, orderBy, order, onRequestSort } = props;
  return (
    <TableHead>
      <TableRow>
        {heading.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              disabled={headCell.id === "edit"}
              onClick={() => onRequestSort(headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              sx={{
                whiteSpace: "nowrap",
                color: theme.palette.primary.dark,
                fontWeight: 500,
                "& .MuiTableSortLabel-icon": {
                  display: "none",
                },
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
