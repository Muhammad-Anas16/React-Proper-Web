import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addToCart, deleteCart } from "../Firebase/firebaseFunctions";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Cart = () => {
  const mode = useSelector((state) => state.theme.mode);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from Firebase
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) {
        setCartItems([]);
        setLoading(false);
        return;
      }
      const cartRef = doc(db, "carts", user.uid);
      const docSnap = await getDoc(cartRef);
      const data = docSnap.data();
      setCartItems(data?.cartProduct || []);
    } catch (err) {
      setError("Failed to fetch cart");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add a demo product to cart (for demonstration)
  const handleAddToCart = async () => {
    const demoProduct = {
      id: "demo1",
      title: "Demo Product",
      price: 10,
      image: "https://via.placeholder.com/50",
      quantity: 1,
    };
    await addToCart(demoProduct);
    fetchCart();
  };

  // Delete a product from cart
  const handleDeleteFromCart = async (productId) => {
    await deleteCart(productId);
    fetchCart();
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="40vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box color="error.main" textAlign="center" mt={4}>
        {error}
      </Box>
    );

  return (
    <Box
      maxWidth={500}
      mx="auto"
      my={4}
      p={3}
      borderRadius={2}
      boxShadow={3}
      bgcolor={mode === "dark" ? "#23272f" : "#fff"}
      color={mode === "dark" ? "#fff" : "#23272f"}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Shopping Cart
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Add Demo Product
        </Button>
      </Stack>
      {cartItems.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {cartItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: mode === "dark" ? "#1a1d23" : "#f9f9f9",
                color: mode === "dark" ? "#fff" : "#23272f",
              }}
              elevation={1}
            >
              <CardMedia>
                <Avatar
                  src={item.image}
                  alt={item.title}
                  sx={{ width: 56, height: 56, m: 1 }}
                  variant="rounded"
                />
              </CardMedia>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {item.title}
                </Typography>
                <Typography variant="body2">Price: ${item.price}</Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity || 1}
                </Typography>
              </CardContent>
              <IconButton
                color="error"
                onClick={() => handleDeleteFromCart(item.id)}
                sx={{ mr: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Cart;
