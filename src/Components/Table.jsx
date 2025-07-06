// StickyHeadTable.jsx
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
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function StickyHeadTable({ data }) {
  const [detail, setDetail] = React.useState([]);

  const mode = useSelector((state) => state.theme.mode);
  const item = useSelector((state) => state.products.products);
  const custom = useSelector((state) => state.customProducts.customProducts);

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

    setDetail(newDetails); // ✅ Don't accumulate, just set new
  }, [data, item, custom]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: mode === "dark" ? "#0f172a" : "#f9fafb",
      }}
    >
      <Paper sx={{ width: "100%", flexShrink: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              {["Product", "Amount", "Date", "Status"].map((title) => (
                <TableCell
                  key={title}
                  sx={{
                    backgroundColor: mode === "dark" ? "#1f2937" : "#6200EE",
                    color: "#ffffff",
                  }}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </Paper>

      <Box sx={{ flex: 1, overflow: "auto" }}>
        {detail.length > 0 ? (
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table>
              <TableBody>
                {detail.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                        backgroundColor:
                          mode === "dark" ? "#111827" : "#ffffff",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          row?.matchedData?.images ||
                          row?.matchedData?.images[0] ||
                          "/static/images/avatar/1.jpg"
                        }
                      />
                      {row?.matchedData?.title || "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                        backgroundColor:
                          mode === "dark" ? "#111827" : "#ffffff",
                      }}
                    >
                      ${row?.matchedData?.price || "0"}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                        backgroundColor:
                          mode === "dark" ? "#111827" : "#ffffff",
                      }}
                    >
                      {row?.data?.time}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                        backgroundColor:
                          mode === "dark" ? "#111827" : "#ffffff",
                      }}
                    >
                      {row?.data?.Status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              padding: 4,
              color: mode === "dark" ? "#e5e7eb" : "#1f2937",
            }}
          >
            <h1>No Product Ordered Yet</h1>
          </Box>
        )}
      </Box>
    </Box>
  );
}
