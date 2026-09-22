import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function ReusableTable({
  columns,
  rows,
  renderRow,
  emptyMessage = "No data found",
  emptyDescription = "",
  hasActiveFilters = false,
  onClearFilters,
  minWidth = 800,
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2.5,
        overflowX: "auto",
        backgroundColor: "background.paper",
      }}
    >
      <Table
        sx={{
          minWidth,
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F8FAFC",
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  fontSize: 13,
                  py: 1.8,
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => renderRow(row))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                align="center"
                sx={{
                  py: 7,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    mb: 0.5,
                  }}
                >
                  {emptyMessage}
                </Typography>

                {emptyDescription && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {emptyDescription}
                  </Typography>
                )}

                {hasActiveFilters && onClearFilters && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onClearFilters}
                    sx={{
                      mt: 2,
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReusableTable;