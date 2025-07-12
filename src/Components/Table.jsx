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

export default function StickyHeadTable({ data, enablePagination }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mode = useSelector((state) => state.theme.mode);
  const item = useSelector((state) => state.products.products);
  const custom = useSelector((state) => state.customProducts.customProducts);

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
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

  const statusColor = (status) => {
    if (!status) return mode === "dark" ? "#374151" : "#e5e7eb";
    if (status.toLowerCase().includes("delivered")) return "success.main";
    if (status.toLowerCase().includes("cancel")) return "error.main";
    if (status.toLowerCase().includes("pending")) return "warning.main";
    return mode === "dark" ? "#9ca3af" : "#6b7280";
  };

  return (
    <>
      <TableContainer
        sx={{
          maxHeight: 500,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Product", "Amount", "Date", "Status"].map((title) => (
                <TableCell
                  key={title}
                  sx={{
                    backgroundColor: mode === "dark" ? "#1f2937" : "#6200EE",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: 0.5,
                  }}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {detail
              .slice(enablePagination ? page * rowsPerPage : 0, enablePagination ? page * rowsPerPage + rowsPerPage : detail.length)
              .map((row, index) => (
                <TableRow key={index} hover sx={{ transition: "background 0.2s" }}>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
                      color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                      fontWeight: 500,
                      fontSize: 15,
                      py: 2,
                    }}
                  >
                    <Avatar
                      alt={row?.matchedData?.title || "Product"}
                      src={row?.matchedData?.images?.[0] || "/static/images/avatar/1.jpg"}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box>
                      <Box sx={{ fontWeight: 600, fontSize: 15 }}>
                        {row?.matchedData?.title || "N/A"}
                      </Box>
                      <Box sx={{ fontSize: 13, color: mode === "dark" ? "#9ca3af" : "#6b7280" }}>
                        {row?.matchedData?.category || ""}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
                      color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                      fontWeight: 500,
                      fontSize: 15,
                    }}
                  >
                    ${row?.matchedData?.price || "0"}
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
                      color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                      fontWeight: 500,
                      fontSize: 15,
                    }}
                  >
                    {row?.data?.time}
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
                      color: statusColor(row?.data?.Status),
                      fontWeight: 700,
                      fontSize: 15,
                      textTransform: "capitalize",
                    }}
                  >
                    {row?.data?.Status}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {enablePagination && detail.length > 10 && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={detail.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            mt: 0,
          }}
        />
      )}
    </>
  );
}
