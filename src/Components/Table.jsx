import * as React from "react";
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

export default function StickyHeadTable({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mode = useSelector((state) => state.theme.mode);
  const item = useSelector((state) => state.products.products);
  const custom = useSelector((state) => state.customProducts.customProducts);

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10; // 👈 fixed value
  const [detail, setDetail] = React.useState([]);

  React.useEffect(() => {
    if (!data || data.length === 0) return;

    const all = [...item, ...custom];
    const newDetails = data.map((entry) => {
      const product = all.find((p) => p.id === entry.productId);
      return {
        matchedData: product,
        data: entry,
      };
    });

    setDetail(newDetails);
  }, [data, item, custom]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  return (
    <Box
      sx={{
        width: "100%",
        // minHeight: "100vh",
        bgcolor: mode === "dark" ? "#0f172a" : "#f9fafb",
        p: isMobile ? 1 : 3,
      }}
    >
      {detail.length > 0 ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["Product", "Amount", "Date", "Status"].map((title) => (
                    <TableCell
                      key={title}
                      sx={{
                        backgroundColor:
                          mode === "dark" ? "#1f2937" : "#6200EE",
                        color: "#ffffff",
                        fontWeight: 600,
                      }}
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {detail
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          bgcolor: mode === "dark" ? "#111827" : "#ffffff",
                          color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                        }}
                      >
                        <Avatar
                          alt={row?.matchedData?.title || "Product"}
                          src={
                            row?.matchedData?.images?.[0] ||
                            "/static/images/avatar/1.jpg"
                          }
                        />
                        {row?.matchedData?.title || "N/A"}
                      </TableCell>

                      <TableCell
                        sx={{
                          bgcolor: mode === "dark" ? "#111827" : "#ffffff",
                          color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                        }}
                      >
                        ${row?.matchedData?.price || "0"}
                      </TableCell>

                      <TableCell
                        sx={{
                          bgcolor: mode === "dark" ? "#111827" : "#ffffff",
                          color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                        }}
                      >
                        {row?.data?.time}
                      </TableCell>

                      <TableCell
                        sx={{
                          bgcolor: mode === "dark" ? "#111827" : "#ffffff",
                          color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                        }}
                      >
                        {row?.data?.Status}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            rowsPerPageOptions={[]} // 👈 hides the dropdown
            count={detail.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      ) : (
        <Box
          sx={{
            mt: 5,
            textAlign: "center",
            color: mode === "dark" ? "#e5e7eb" : "#1f2937",
          }}
        >
          <Typography variant="h6">No Product Ordered Yet</Typography>
        </Box>
      )}
    </Box>
  );
}
