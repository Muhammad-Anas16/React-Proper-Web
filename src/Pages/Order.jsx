// Order.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserOrder } from "../Firebase/firebaseFunctions";
import { auth } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import StickyHeadTable from "../Components/Table";
import { Box, Paper, Stack } from "@mui/material";

const Order = () => {
  const mode = useSelector((state) => state.theme.mode); // for Theme
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const product = await getUserOrder();
        if (Array.isArray(product)) {
          setOrdered(product);
        } else if (product) {
          setOrdered([product]);
        } else {
          setOrdered([]);
        }
      } else {
        console.log("No user logged in.");
        setOrdered([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
        color: mode === "dark" ? "#f3f4f6" : "#4b5563",
        borderTop: "1px solid",
        borderColor: mode === "dark" ? "#374151" : "#d1d5db",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mb: 3, mt: 2 }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}>
            <Box>
              <Box component="h2" sx={{ fontWeight: 700, fontSize: 28, mb: 0.5, color: mode === "dark" ? "#fff" : "#222" }}>
                My Orders
              </Box>
              <Box sx={{ fontSize: 16, color: mode === "dark" ? "#9ca3af" : "#6b7280" }}>
                {ordered.length} {ordered.length === 1 ? "order" : "orders"}
              </Box>
            </Box>
          </Stack>
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            backgroundColor: mode === "dark" ? "#1f2937" : "#fafafa",
          }}
        >
          {ordered.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8, color: mode === "dark" ? "#9ca3af" : "#6b7280" }}>
              <Box sx={{ fontSize: 22, fontWeight: 600, mb: 1 }}>No orders yet</Box>
              <Box sx={{ fontSize: 16 }}>You haven’t placed any orders. Start shopping to see your orders here!</Box>
            </Box>
          ) : (
            <StickyHeadTable data={ordered} enablePagination />
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Order;
