import {
    Alert,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    useMediaQuery,
    useTheme
} from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import MySelect from "components/MySelect";
import { H6, Tiny } from "components/Typography";
import GreySearchBar from "layouts/layout-parts/GreySearchBar";
import { Check, Download, Upload, XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, memo, useTransition } from "react";
import * as XLSX from 'xlsx';

export default function EditableInsuranceTableContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          padding: isMobile ? "0px" : "0 32px",
        }}
      >
        <Grid item container spacing={4} pt={2} pb={4}>
          <Section1 theme={theme} />

          <Grid item xs={12}>
            <Box sx={{ width: "100%", px: 2 }}>
              <Divider sx={{ width: "100%", mt: 2 }} />
            </Box>
          </Grid>

          <Section3 theme={theme} />
        </Grid>
      </Grid>
    </Grid>
  );
}

const Section1 = ({ theme }) => {
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedUnit, setSelectedUnit] = useState("월");
  const [selectedType, setSelectedType] = useState("전체");
  const [selectedEvidence, setSelectedEvidence] = useState("전체");
  const [selectedTaxType, setSelectedTaxType] = useState("전체");

  const getButtonStyle = (index, arrayLength, item, selectedValue) => ({
    height: "40px",
    borderRadius: 0,
    borderColor: theme.palette.primary.borderColor,
    ...(index === 0 && {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    }),
    ...(index === arrayLength - 1 && {
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
    }),
    "&:hover": {
      backgroundColor: theme.palette.primary.lightBlue3,
    },
    ...(selectedValue === item && {
      backgroundColor: theme.palette.primary.darkBlue,
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.darkBlue,
      },
    }),
  });

  return (
    <>
      <Grid item container xs={12} height="100%" flexDirection={"row"}>
        <FlexBox
          gap={2}
          sx={{
            width: "100%",
            height: "100%",
            p: isTablet ? 1 : 2,
            flexWrap: "wrap",
          }}
        >
          <FlexBox sx={{ flexDirection: "column", minWidth: "200px" }}>
            <H6 mb={1}>기준일</H6>
            <MySelect
              items={["저번 주", "이번 주", "오늘"]}
              width={"200px"}
              placeholder={"기준일"}
            />
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "300px" }}>
            <H6 mb={1}>기준 단위</H6>
            <FlexBox>
              {["월", "분기", "반기", "연", "기타"].map(
                (item, index, array) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => setSelectedUnit(item)}
                    sx={getButtonStyle(index, array.length, item, selectedUnit)}
                  >
                    {item}
                  </Button>
                )
              )}
            </FlexBox>
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "200px" }}>
            <H6 mb={1}>상세 기간</H6>
            <MySelect
              items={["2024년", "2023년", "2022년"]}
              width={"200px"}
              defaultValue={"2024년"}
            />
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "300px" }}>
            <H6 mb={1}>종류</H6>
            <FlexBox>
              {["전체", "매출", "매입"].map((item, index, array) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => setSelectedType(item)}
                  sx={getButtonStyle(index, array.length, item, selectedType)}
                >
                  {item}
                </Button>
              ))}
            </FlexBox>
          </FlexBox>

          <FlexBox
            sx={{
              flexDirection: "column",
              minWidth: isTablet ? "100%" : "300px",
            }}
          >
            <H6 mb={1}>증명</H6>
            <FlexBox
              sx={{
                flexWrap: isTablet ? "wrap" : "nowrap",
                gap: isTablet ? 0 : 0,
              }}
            >
              {["전체", "세금계산서", "계산서", "카드", "현금", "기타"].map(
                (item, index, array) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => setSelectedEvidence(item)}
                    sx={{
                      ...getButtonStyle(
                        index,
                        array.length,
                        item,
                        selectedEvidence
                      ),
                      ...(isTablet && {
                        flex: "1 1 calc(33.33% - 8px)",
                        minWidth: "auto",
                        marginBottom: "8px",
                      }),
                    }}
                  >
                    {item}
                  </Button>
                )
              )}
            </FlexBox>
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "300px" }}>
            <H6 mb={1}>과세 유형</H6>
            <FlexBox>
              {["전체", "과세", "면세"].map((item, index, array) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => setSelectedTaxType(item)}
                  sx={getButtonStyle(
                    index,
                    array.length,
                    item,
                    selectedTaxType
                  )}
                >
                  {item}
                </Button>
              ))}
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Grid>
    </>
  );
};

const Section3 = ({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const fileInputRef = useRef(null);

  // Initial table data structure
  const initialTableData = {
    headers: [
      "입력일시",
      "거래일자",
      "종류",
      "증빙",
      "과세유형",
      "거래처명",
      "사업자/주민번호",
      "품명",
      "합계금액",
      "공급가액",
      "부가세액"
    ],
    rows: [
      {
        id: "row_1",
        cells: [
          { id: "cell_1_1", value: "2024-01-04 12:45", header: "입력일시" },
          { id: "cell_1_2", value: "2021-01-04", header: "거래일자" },
          { id: "cell_1_3", value: "매출", header: "종류" },
          { id: "cell_1_4", value: "세금계산서", header: "증빙" },
          { id: "cell_1_5", value: "과세", header: "과세유형" },
          { id: "cell_1_6", value: "현대빌딩", header: "거래처명" },
          { id: "cell_1_7", value: "000-00-00000", header: "사업자/주민번호" },
          { id: "cell_1_8", value: "사무실 임대", header: "품명" },
          { id: "cell_1_9", value: "5,500,000원", header: "합계금액" },
          { id: "cell_1_10", value: "5,500,000원", header: "공급가액" },
          { id: "cell_1_11", value: "500,000원", header: "부가세액" },
        ]
      },
      {
        id: "row_2",
        cells: [
          { id: "cell_2_1", value: "2024-01-05 09:30", header: "입력일시" },
          { id: "cell_2_2", value: "2021-01-05", header: "거래일자" },
          { id: "cell_2_3", value: "매입", header: "종류" },
          { id: "cell_2_4", value: "세금계산서", header: "증빙" },
          { id: "cell_2_5", value: "과세", header: "과세유형" },
          { id: "cell_2_6", value: "삼성전자", header: "거래처명" },
          { id: "cell_2_7", value: "111-11-11111", header: "사업자/주민번호" },
          { id: "cell_2_8", value: "전자제품", header: "품명" },
          { id: "cell_2_9", value: "3,300,000원", header: "합계금액" },
          { id: "cell_2_10", value: "3,000,000원", header: "공급가액" },
          { id: "cell_2_11", value: "300,000원", header: "부가세액" },
        ]
      },
      {
        id: "row_3",
        cells: [
          { id: "cell_3_1", value: "2024-01-06 14:20", header: "입력일시" },
          { id: "cell_3_2", value: "2021-01-06", header: "거래일자" },
          { id: "cell_3_3", value: "매출", header: "종류" },
          { id: "cell_3_4", value: "현금영수증", header: "증빙" },
          { id: "cell_3_5", value: "면세", header: "과세유형" },
          { id: "cell_3_6", value: "대한물산", header: "거래처명" },
          { id: "cell_3_7", value: "222-22-22222", header: "사업자/주민번호" },
          { id: "cell_3_8", value: "컨설팅 서비스", header: "품명" },
          { id: "cell_3_9", value: "2,200,000원", header: "합계금액" },
          { id: "cell_3_10", value: "2,200,000원", header: "공급가액" },
          { id: "cell_3_11", value: "0원", header: "부가세액" },
        ]
      }
    ]
  };

  const [tableData, setTableData] = useState(initialTableData);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [isImporting, setIsImporting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const editTimeoutRef = useRef(null);
  const [visibleRows, setVisibleRows] = useState(50); // Show only 50 rows initially
  const [searchTerm, setSearchTerm] = useState("");
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [editingColumnValue, setEditingColumnValue] = useState("");

  // Helper function to convert Excel date to readable format
  const convertExcelDate = (value) => {
    if (typeof value === 'number' && value > 1000) {
      const excelEpoch = new Date(1900, 0, 1);
      const date = new Date(excelEpoch.getTime() + (value - 2) * 24 * 60 * 60 * 1000);
      
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}. ${month}. ${day}`;
      }
    }
    return String(value || "");
  };

  // Import function
  const handleFileImport = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length < 2) {
          showSnackbar("파일에 데이터가 충분하지 않습니다.", "error");
          setIsImporting(false);
          return;
        }

        // Process data in chunks to prevent UI blocking
        const headers = jsonData[0].map(header => String(header || ""));
        const processRows = () => {
          const rows = jsonData.slice(1).map((row, rowIndex) => ({
            id: `row_${Date.now()}_${rowIndex}`,
            cells: headers.map((header, cellIndex) => ({
              id: `cell_${Date.now()}_${rowIndex}_${cellIndex}`,
              value: convertExcelDate(row[cellIndex]),
              header: header
            }))
          }));

          const newTableData = { headers, rows };
          setTableData(newTableData);
          showSnackbar("파일을 성공적으로 불러왔습니다!", "success");
          setIsImporting(false);
        };

        // Use setTimeout to prevent UI blocking for large files
        setTimeout(processRows, 0);
      } catch (error) {
        console.error('Import error:', error);
        showSnackbar("파일을 불러오는 중 오류가 발생했습니다.", "error");
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      showSnackbar("파일을 읽는 중 오류가 발생했습니다.", "error");
      setIsImporting(false);
    };

    reader.readAsArrayBuffer(file);
    event.target.value = "";
  }, []);

  // Export function
  const handleExport = useCallback(() => {
    try {
      const exportData = [
        tableData.headers,
        ...tableData.rows.map(row => 
          row.cells.map(cell => cell.value)
        )
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "InsuranceData");
      
      const fileName = `insurance-data-${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      showSnackbar("파일을 성공적으로 내보냈습니다!", "success");
    } catch (error) {
      console.error('Export error:', error);
      showSnackbar("파일 내보내기 중 오류가 발생했습니다.", "error");
    }
  }, [tableData]);

  // Optimized editing functions
  const startEditing = useCallback((rowId, cellId, currentValue) => {
    setEditingCell({ rowId, cellId });
    setEditValue(String(currentValue || ""));
  }, []);

  const saveEdit = useCallback((newValue) => {
    if (!editingCell) return;

    const finalValue = newValue !== undefined ? newValue : editValue;
    setEditingCell(null);
    setEditValue("");

    // Use startTransition to prevent UI blocking
    startTransition(() => {
      setTableData(prevData => ({
        ...prevData,
        rows: prevData.rows.map(row =>
          row.id === editingCell.rowId
            ? {
                ...row,
                cells: row.cells.map(cell =>
                  cell.id === editingCell.cellId
                    ? { ...cell, value: finalValue }
                    : cell
                )
              }
            : row
        )
      }));
    });
    
    console.log('Saving value:', finalValue, 'for cell:', editingCell.cellId);
    showSnackbar(`"${finalValue}" 값이 저장되었습니다.`, "success");
  }, [editingCell, editValue, startTransition]);

  const cancelEdit = useCallback(() => {
    setEditingCell(null);
    setEditValue("");
  }, []);

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Add new empty row
  const addNewRow = useCallback(() => {
    setTableData(prevData => {
      const newRowId = `row_${Date.now()}`;
      const newRow = {
        id: newRowId,
        cells: prevData.headers.map((header, index) => ({
          id: `cell_${newRowId}_${index + 1}`,
          value: "",
          header: header
        }))
      };

      return {
        ...prevData,
        rows: [...prevData.rows, newRow]
      };
    });
    
    showSnackbar("새 행이 추가되었습니다.", "success");
  }, []);

  // Delete row
  const deleteRow = useCallback((rowId) => {
    setTableData(prevData => ({
      ...prevData,
      rows: prevData.rows.filter(row => row.id !== rowId)
    }));
    
    showSnackbar("행이 삭제되었습니다.", "success");
  }, []);

  // Add new column
  const addColumn = useCallback((columnName) => {
    if (!columnName || columnName.trim() === "") {
      showSnackbar("열 이름을 입력해주세요.", "error");
      return;
    }

    setTableData(prevData => {
      const newColumnId = `col_${Date.now()}`;
      const newHeader = columnName.trim();
      
      return {
        headers: [...prevData.headers, newHeader],
        rows: prevData.rows.map(row => ({
          ...row,
          cells: [
            ...row.cells,
            {
              id: `cell_${row.id}_${newColumnId}`,
              value: "",
              header: newHeader
            }
          ]
        }))
      };
    });
    
    showSnackbar(`"${columnName}" 열이 추가되었습니다.`, "success");
  }, []);

  // Delete column
  const deleteColumn = useCallback((columnIndex) => {
    setTableData(prevData => {
      const newHeaders = prevData.headers.filter((_, index) => index !== columnIndex);
      
      return {
        headers: newHeaders,
        rows: prevData.rows.map(row => ({
          ...row,
          cells: row.cells.filter((_, index) => index !== columnIndex)
        }))
      };
    });
    
    showSnackbar("열이 삭제되었습니다.", "success");
  }, []);

  // Edit column name
  const editColumnName = useCallback((columnIndex, newName) => {
    if (!newName || newName.trim() === "") {
      showSnackbar("열 이름을 입력해주세요.", "error");
      return;
    }

    setTableData(prevData => {
      const newHeaders = [...prevData.headers];
      newHeaders[columnIndex] = newName.trim();
      
      return {
        headers: newHeaders,
        rows: prevData.rows.map(row => ({
          ...row,
          cells: row.cells.map((cell, cellIndex) => 
            cellIndex === columnIndex 
              ? { ...cell, header: newName.trim() }
              : cell
          )
        }))
      };
    });
    
    showSnackbar(`열 이름이 "${newName}"로 변경되었습니다.`, "success");
  }, []);

  // Memoized filtered rows - show limited rows for performance
  const filteredRows = useMemo(() => {
    let filtered = tableData.rows;
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(row =>
        row.cells.some(cell =>
          String(cell.value || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered.slice(0, visibleRows);
  }, [tableData.rows, visibleRows, searchTerm]);

  // Memoize the table data to prevent unnecessary re-renders
  const memoizedTableData = useMemo(() => ({
    headers: tableData.headers,
    rows: tableData.rows
  }), [tableData.headers, tableData.rows]);

  // Optimized Editable cell component with local state
  const EditableCell = memo(({ cell, rowId, isEditing, onStartEdit, onSave, onCancel, editValue }) => {
    const isEmpty = !cell.value || cell.value.trim() === "";
    const [localValue, setLocalValue] = useState(editValue);
    const [isModified, setIsModified] = useState(false);
    
    // Update local value when editValue changes (when starting edit)
    useEffect(() => {
      if (isEditing) {
        setLocalValue(editValue);
        setIsModified(false);
      }
    }, [isEditing, editValue]);
    
    if (isEditing) {
      return (
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 0, width: "100%" }}>
          <TextField
            value={localValue}
            onChange={(e) => {
              setLocalValue(e.target.value);
              setIsModified(e.target.value !== editValue);
            }}
            size="small"
            autoFocus
            sx={{ 
              minWidth: isMobile ? 80 : 120,
              maxWidth: isMobile ? "100%" : 200,
              "& .MuiInputBase-input": {
                fontSize: isMobile ? 12 : 14,
                padding: "4px 8px",
              },
              "& .MuiOutlinedInput-root": {
                borderColor: isModified ? "#ff9800" : undefined,
                "&:hover": {
                  borderColor: isModified ? "#ff9800" : undefined,
                }
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSave(localValue);
                setIsModified(false);
              } else if (e.key === 'Escape') {
                e.preventDefault();
                onCancel();
                setIsModified(false);
              }
            }}
          />
          <IconButton 
            size="small" 
            onClick={() => {
              onSave(localValue);
              setIsModified(false);
            }} 
            color="primary"
          >
            <Check size={isMobile ? 14 : 16} />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => {
              onCancel();
              setIsModified(false);
            }} 
            color="error"
          >
            <XIcon size={isMobile ? 14 : 16} />
          </IconButton>
        </Stack>
      );
    }

    return (
      <span 
        style={{
          maxWidth: "100%",
          display: "block",
          cursor: "pointer",
          whiteSpace: "normal",
          wordWrap: "break-word",
          lineHeight: "1.2",
          minHeight: "20px",
          minWidth: isEmpty ? "60px" : "auto",
          padding: "4px",
          borderRadius: "4px",
          backgroundColor: isEmpty ? "rgba(0, 0, 0, 0.04)" : "transparent",
          border: isEmpty ? "1px dashed rgba(0, 0, 0, 0.2)" : "none",
          color: isEmpty ? "rgba(0, 0, 0, 0.5)" : "inherit"
        }}
        onClick={() => onStartEdit(rowId, cell.id, cell.value)}
        title="클릭하여 편집"
      >
        {cell.value || ""}
      </span>
    );
  });

  // Memoized Table Row component for better performance
  const MemoizedTableRow = memo(({ row, editingCell, startEditing, saveEdit, cancelEdit, editValue, deleteRow, theme }) => {
    return (
      <TableRow
        sx={{
          paddingLeft: "10px",
          "&:hover": {
            backgroundColor: theme.palette.primary.grey800,
            cursor: "pointer",
          },
        }}
      >
        {row.cells.map((cell, cellIdx) => (
          <TableCell
            key={cell.id}
            sx={{
              paddingLeft: cellIdx === 0 ? "8px !important" : "6px",
              paddingRight: "8px",
              paddingTop: "8px",
              paddingBottom: "8px",
              fontWeight: 400,
              minHeight: 48,
              height: "auto",
              verticalAlign: "middle",
            }}
          >
            <Box
              sx={{
                width: "100%",
                minHeight: 48,
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingY: "8px",
                boxSizing: "border-box",
              }}
            >
              <EditableCell
                cell={cell}
                rowId={row.id}
                isEditing={editingCell?.rowId === row.id && editingCell?.cellId === cell.id}
                onStartEdit={startEditing}
                onSave={saveEdit}
                onCancel={cancelEdit}
                editValue={editValue}
              />
            </Box>
          </TableCell>
        ))}
        <TableCell
          sx={{
            paddingLeft: "8px",
            fontWeight: 400,
            minHeight: 48,
            height: "auto",
            padding: "8px",
            verticalAlign: "middle",
            width: "60px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              minHeight: 48,
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingY: "8px",
              paddingX: "8px",
              boxSizing: "border-box",
            }}
          >
            <Tooltip title="행 삭제">
              <IconButton
                size="small"
                onClick={() => deleteRow(row.id)}
                sx={{
                  color: theme.palette.error.main,
                  "&:hover": {
                    backgroundColor: theme.palette.error.light,
                  },
                }}
              >
                <XIcon size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    if (!editingCell) {
      setEditValue("");
    }
  }, [editingCell]);

  return (
    <>
      <Grid item container xs={12} height="100%">
        <Box sx={{ width: "100%", height: "100%", p: 2 }}>
          <FlexRowAlign
            mb={2}
            sx={{
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <H6>조회 결과</H6>
            <Tiny>조회기준일자: 2024.01.01 ~ 2024.12.31</Tiny>
          </FlexRowAlign>

          <FlexRowAlign
            mb={2}
            sx={{
              gap: isTablet ? 2 : 0,
              justifyContent: isTablet ? "flex-start" : "space-between",
              width: "100%",
              alignItems: isTablet ? "flex-start" : "center",
              flexDirection: isTablet ? "column" : "row",
            }}
          >
            <Box sx={{ width: isTablet ? "100%" : "350px" }}>
              <TextField
                placeholder="검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ width: "100%" }}
              />
            </Box>
            <FlexBox gap={1} sx={{ flexWrap: "wrap" }}>
              <Tooltip title="열 관리">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowColumnManager(true)}
                  sx={{
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.secondary.borderColor || theme.palette.primary.borderColor}`,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.light || theme.palette.primary.lightBlue3,
                    },
                    minWidth: "fit-content",
                  }}
                >
                  열 관리
                </Button>
              </Tooltip>
              
              <Tooltip title="새 행 추가">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={addNewRow}
                  sx={{
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.borderColor}`,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.lightBlue3,
                    },
                    minWidth: "fit-content",
                  }}
                >
                  + 새 행
                </Button>
              </Tooltip>
              
              <Tooltip title="Excel/CSV 파일 불러오기">
                <Button
                  variant="outlined"
                  startIcon={<Download size={16} />}
                  onClick={triggerFileInput}
                  size="small"
                  disabled={isImporting}
                  sx={{
                    color: "#169154",
                    border: `1px solid ${theme.palette.primary.borderColor}`,
                    backgroundColor: theme.palette.primary.lightGreen,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.lightGreen,
                    },
                    minWidth: "fit-content",
                  }}
                >
                  {isImporting ? "불러오는 중..." : "불러오기"}
                </Button>
              </Tooltip>
              
              <Tooltip title="Excel 파일로 내보내기">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Upload size={16} />}
                  onClick={handleExport}
                  sx={{
                    color: "#169154",
                    border: `1px solid ${theme.palette.primary.borderColor}`,
                    backgroundColor: theme.palette.primary.lightGreen,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.lightGreen,
                    },
                    minWidth: "fit-content",
                  }}
                >
                  엑셀 다운로드
                </Button>
              </Tooltip>
            </FlexBox>
          </FlexRowAlign>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls,.csv"
            onChange={handleFileImport}
            style={{ display: 'none' }}
          />

                      <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Tiny>전체 {tableData.rows.length}건 (표시: {filteredRows.length}건)</Tiny>
              <FlexBox gap={1} sx={{ flexWrap: "wrap" }}>
                {(searchTerm || visibleRows < tableData.rows.length) && (
                  <Button
                    size="small"
                    onClick={() => {
                      setSearchTerm("");
                      setVisibleRows(50);
                    }}
                    sx={{ 
                      ml: 2,
                      minWidth: "fit-content",
                    }}
                  >
                    초기화
                  </Button>
                )}
                {tableData.rows.length > visibleRows && (
                  <Button
                    size="small"
                    onClick={() => setVisibleRows(prev => Math.min(prev + 50, tableData.rows.length))}
                    sx={{ 
                      ml: 2,
                      minWidth: "fit-content",
                    }}
                  >
                    더 보기 (+50)
                  </Button>
                )}
              </FlexBox>
            </Box>

          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              {/* Table */}
              <Box sx={{ textAlign: "left", mb: 2, overflow: "auto", position: "relative" }}>
                {isPending && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <Tiny>업데이트 중...</Tiny>
                  </Box>
                )}
                <Table
                  sx={{
                    "& .MuiTableCell-root": {
                      borderBottom: `1px solid ${theme.palette.primary.borderColor}`,
                      whiteSpace: "nowrap",
                    },
                    minWidth: "1200px",
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: theme.palette.primary.grey800 }}
                    >
                      {memoizedTableData.headers.map((header, idx) => (
                        <TableCell
                          key={header}
                          sx={{
                            paddingLeft: idx === 0 ? "14px !important" : "8px",
                            fontWeight: 600,
                          }}
                        >
                          {header}
                        </TableCell>
                      ))}
                      <TableCell
                        sx={{
                          paddingLeft: "8px",
                          fontWeight: 600,
                          width: "60px",
                        }}
                      >
                        삭제
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.map((row, rowIdx) => (
                      <MemoizedTableRow
                        key={row.id}
                        row={row}
                        editingCell={editingCell}
                        startEditing={startEditing}
                        saveEdit={saveEdit}
                        cancelEdit={cancelEdit}
                        editValue={editValue}
                        deleteRow={deleteRow}
                        theme={theme}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>

              {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ReversePagination totalItems={filteredRows.length} />
              </Box> */}
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Column Manager Modal */}
      {showColumnManager && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowColumnManager(false)}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              minWidth: "400px",
              maxWidth: "600px",
              maxHeight: "80vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <H6 mb={2}>열 관리</H6>
            
            {/* Add new column */}
            <Box mb={3}>
              <H6 mb={1} fontSize="14px">새 열 추가</H6>
              <FlexBox gap={1} sx={{ flexWrap: "wrap" }}>
                <TextField
                  placeholder="열 이름 입력"
                  size="small"
                  sx={{ flex: 1 }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addColumn(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    const input = e.target.parentElement.querySelector('input');
                    addColumn(input.value);
                    input.value = "";
                  }}
                  sx={{
                    minWidth: "fit-content",
                  }}
                >
                  추가
                </Button>
              </FlexBox>
            </Box>

            {/* Existing columns */}
            <Box>
              <H6 mb={1} fontSize="14px">기존 열</H6>
              <Box sx={{ maxHeight: "300px", overflow: "auto" }}>
                {memoizedTableData.headers.map((header, index) => (
                  <FlexBox
                    key={index}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px",
                      border: `1px solid ${theme.palette.primary.borderColor}`,
                      borderRadius: "4px",
                      marginBottom: "4px",
                    }}
                  >
                    {editingColumn === index ? (
                      <FlexBox gap={1} sx={{ flex: 1 }}>
                        <TextField
                          value={editingColumnValue}
                          onChange={(e) => setEditingColumnValue(e.target.value)}
                          size="small"
                          autoFocus
                          sx={{ flex: 1 }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              editColumnName(index, editingColumnValue);
                              setEditingColumn(null);
                              setEditingColumnValue("");
                            } else if (e.key === 'Escape') {
                              setEditingColumn(null);
                              setEditingColumnValue("");
                            }
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => {
                            editColumnName(index, editingColumnValue);
                            setEditingColumn(null);
                            setEditingColumnValue("");
                          }}
                          color="primary"
                        >
                          <Check size={14} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditingColumn(null);
                            setEditingColumnValue("");
                          }}
                          color="error"
                        >
                          <XIcon size={14} />
                        </IconButton>
                      </FlexBox>
                    ) : (
                      <>
                        <Tiny sx={{ flex: 1, cursor: "pointer" }} onClick={() => {
                          setEditingColumn(index);
                          setEditingColumnValue(header);
                        }}>
                          {header}
                        </Tiny>
                        <FlexBox gap={0.5}>
                          <Tooltip title="열 이름 편집">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setEditingColumn(index);
                                setEditingColumnValue(header);
                              }}
                              sx={{
                                color: theme.palette.primary.main,
                                "&:hover": {
                                  backgroundColor: theme.palette.primary.light,
                                },
                              }}
                            >
                              <Check size={14} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="열 삭제">
                            <IconButton
                              size="small"
                              onClick={() => deleteColumn(index)}
                              sx={{
                                color: theme.palette.error.main,
                                "&:hover": {
                                  backgroundColor: theme.palette.error.light,
                                },
                              }}
                            >
                              <XIcon size={14} />
                            </IconButton>
                          </Tooltip>
                        </FlexBox>
                      </>
                    )}
                  </FlexBox>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setShowColumnManager(false)}
                sx={{
                  minWidth: "fit-content",
                }}
              >
                닫기
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}; 