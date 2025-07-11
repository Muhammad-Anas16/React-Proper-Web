// Order.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserOrder } from "../Firebase/firebaseFunctions";
import { auth } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import StickyHeadTable from "../Components/Table";
import SpanningTable from "../Components/AdminTable";
import { Box, Paper, Stack } from "@mui/material";
import UserDetail from "../Components/UserDetail";

const Order = () => {
  const mode = useSelector((state) => state.theme.mode); // for Theme
  const [ordered, setOrdered] = useState([]);
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUser(user);
        const product = await getUserOrder();
        if (Array.isArray(product)) {
          setOrdered(product); // ✅ Set directly
        } else if (product) {
          setOrdered([product]); // ✅ Wrap single object in array
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
  // console.log(ordered);
  // console.log(isUser);

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 }, // ✅ Reduced top spacing
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
          // gap: 2,
        }}
      >
        <UserDetail user={isUser} />
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            backgroundColor: mode === "dark" ? "#1f2937" : "#fafafa",
          }}
        >
          <StickyHeadTable data={ordered} />
        </Paper>
      </Box>
    </Box>
  );
};

export default Order;
