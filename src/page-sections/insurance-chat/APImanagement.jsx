import { Add } from "@mui/icons-material";
import { Box, Button, Card, styled, useTheme } from "@mui/material";
import FlexBetween from "components/flexbox/FlexBetween";
import FlexBox from "components/flexbox/FlexBox";
import SearchInput from "components/input-fields/SearchInput";
import { ButtonText, H5, H6 } from "components/Typography";
import { apiData } from "__fakeData__/dataTable";
import AddAPIModal from "components/modal/api-management/AddApiModal";
import DataTable from "page-sections/dashboards/api-management/DataTable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "utils/axios";
import { searchByName } from "utils/utils";
import GreySearchBar from "layouts/layout-parts/GreySearchBar";

const ButtonWrapper = styled(FlexBox)(({ theme }) => ({
  [theme.breakpoints.down(500)]: {
    marginTop: 10,
    width: "100%",
    flexDirection: "column-reverse",
    "& > .MuiBox-root": {
      width: "100%",
      margin: "10px 0",
      alignItems: "center",
      flexDirection: "column",
    },
    "& .MuiButton-root": {
      minWidth: "100%",
    },
  },
}));

export default function APImanagement() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState(apiData);
  const [hasFilter, setHasFilter] = useState("");
  const [clearFilter, setClearFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();

  const handleRowSelect = (rowArr) => setSelectedRows(rowArr);

  const handleClearFilter = () => {
    setClearFilter("...");
    setTimeout(() => {
      setClearFilter("");
    }, 50);
  };

  const ids = selectedRows.map((item) => item.original.id);

  const handleDelete = async () => {
    const { data } = await axios.post("/api/tableData2/delete", {
      ids,
    });
    setTableData(data);
  }; // search input

  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState(tableData);
  useEffect(() => {
    const result = searchByName(tableData, searchValue);
    setFilteredItem(result); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  return (
    <Box pt={6} pb={4}>
      <FlexBetween flexWrap="wrap">
        <SearchInput
          bordered={true}
          placeholder=""
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <ButtonWrapper alignItems="center">
          {selectedRows.length > 0 && (
            <FlexBox alignItems="center" mr={2}>
              <H6 mr={1}>{selectedRows.length} Selected</H6>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={handleDelete}
                sx={{
                  color: "common.white",
                  borderRadius: 2,
                }}
              >
                Delete Selected
              </Button>
            </FlexBox>
          )}

          {!!hasFilter && (
            <FlexBox alignItems="center" mr={2}>
              <Button
                size="small"
                color="error"
                variant="contained"
                sx={{
                  color: "common.white",
                }}
                onClick={handleClearFilter}
              >
                Clear filter
              </Button>
            </FlexBox>
          )}
        </ButtonWrapper>
      </FlexBetween>

      <Box sx={{ marginTop: 2 }}>
        <H5 mb={2}>API 리스트</H5>

        <DataTable
          data={filteredItem}
          clearFilter={clearFilter}
          handleRowSelect={handleRowSelect}
          onFilterChange={(filters) => setHasFilter(filters.length)}
        />
      </Box>
    </Box>
  );
}
