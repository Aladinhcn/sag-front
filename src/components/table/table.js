import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { getFirstSentence, getAuthors } from "../../utils/utils";

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "author", label: "Author", minWidth: 100 },
  {
    id: "publish_year",
    label: "Publish year",
    minWidth: 70,
  },
  {
    id: "rating",
    label: "Rating",
    minWidth: 40,
  },
  {
    id: "first_sentence",
    label: "First sentence",
    minWidth: 170,
  },
];

export default function MuiTable() {
  const { data, displayTable } = useAppContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sort, setSort] = React.useState("default");
  const [sortedData, setSortedData] = React.useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (data.books) {
      setSortedData(data.books);
    }
  }, [data.books]);

  const rows = React.useMemo(() => {
    return sortedData.map((book) => ({
      ...book,
      first_sentence: book.first_sentence
        ? getFirstSentence(book.first_sentence)
        : "",
      author: book.author ? getAuthors(book.author) : "",
    }));
  }, [sortedData]);

  if (!displayTable || !data.books) {
    return null;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (event) => {
    const sortValue = event.target.value;
    setSort(sortValue);

    let sortedBooks = [...data.books];

    if (sortValue === "newest") {
      sortedBooks.sort((a, b) => b.publish_year - a.publish_year);
    } else if (sortValue === "oldest") {
      sortedBooks.sort((a, b) => a.publish_year - b.publish_year);
    } else {
      sortedBooks = [...data.books];
    }
    setSortedData(sortedBooks);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        padding: isSmallScreen ? "8px" : "16px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <FormControl sx={{
          width: isSmallScreen ? '150px' : '330px'
        }}>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort "
            onChange={handleSort}
          >
            <MenuItem value={"default"}>Default</MenuItem>
            <MenuItem value={"newest"}>Newest</MenuItem>
            <MenuItem value={"oldest"}>Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        sx={{
          height: isSmallScreen ? 540 : 600,
          boxShadow: "none",
          overflowX: "auto",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    wordWrap: "break-word",
                    fontSize: isSmallScreen ? "0.8rem" : "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            maxWidth: isSmallScreen ? "100px" : "200px",
                            fontSize: isSmallScreen ? "0.75rem" : "1rem",
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, { value: -1, label: "All" }]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          ".MuiTablePagination-toolbar": {
            flexDirection: "row",
          },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-input, .MuiTablePagination-displayedRows":
            {
              fontSize: isSmallScreen ? "0.75rem" : "1rem",
            },
        }}
      />
    </Paper>
  );
}
