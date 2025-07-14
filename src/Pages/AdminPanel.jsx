import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Grid,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUserProfile,
  getAllOrders,
  updateAnyUserOrder,
  deleteAnyUserOrder,
  getCarouselImages,
  setCarouselImages,
  deleteAllOrdersForUser,
  addProductToFirestore,
} from "../Firebase/firebaseFunctions";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { deleteAllUserData } from "../Firebase/firebaseFunctions";

const LOCAL_KEY = "admin_carousel_images";
const ORDER_STATUSES = ["pending", "cancelled", "out of stock", "shipped", "delivered"];

const AdminPanel = () => {
  // Carousel logic (as before)
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [carouselLoading, setCarouselLoading] = useState(true);
  const customProducts = useSelector((state) => state.customProducts.customProducts);
  const apiProducts = useSelector((state) => state.products.products);
  const allProducts = [...customProducts, ...apiProducts];
  const productImages = Array.from(
    new Set(
      allProducts
        .flatMap((p) => Array.isArray(p.images) ? p.images : p.image ? [p.image] : [])
        .filter(Boolean)
    )
  );

  // User & order management
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [orderDialog, setOrderDialog] = useState({ open: false, userId: null });
  const navigate = useNavigate();
  const [deletingUserId, setDeletingUserId] = useState(null);

  // Add Product state
  const [productForm, setProductForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [addingProduct, setAddingProduct] = useState(false);

  // Load carousel images from Firestore
  useEffect(() => {
    getCarouselImages().then((imgs) => {
      setImages(imgs);
      setCarouselLoading(false);
    });
  }, []);
  // Save images to Firestore whenever they change
  useEffect(() => {
    if (!carouselLoading) setCarouselImages(images);
  }, [images, carouselLoading]);

  // Load users and orders
  useEffect(() => {
    getAllUsers().then(setUsers);
    getAllOrders().then(setOrders);
  }, []);

  // Carousel handlers
  const handleAddImage = () => {
    if (newImage.trim() && !images.includes(newImage.trim())) {
      setImages([...images, newImage.trim()]);
      setNewImage("");
    }
  };
  const handleAddProductImage = (url) => {
    if (url && !images.includes(url)) setImages([...images, url]);
  };
  const handleRemoveImage = (url) => {
    setImages(images.filter((img) => img !== url));
  };

  // User management
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user and all their data?")) return;
    setDeletingUserId(userId);
    await deleteAllUserData(userId);
    setUsers(users.filter((u) => u.id !== userId));
    setOrders(orders.filter((o) => o.id !== userId));
    setDeletingUserId(null);
    // If the deleted user is the current user, log out and redirect
    if (auth.currentUser && auth.currentUser.uid === userId) {
      await signOut(auth);
      navigate("/");
    }
  };

  // Order management
  const handleOpenOrderDialog = (userId) => setOrderDialog({ open: true, userId });
  const handleCloseOrderDialog = () => setOrderDialog({ open: false, userId: null });

  const handleStatusChange = async (userId, idx, newStatus) => {
    const userOrder = orders.find((o) => o.id === userId);
    if (!userOrder) return;
    const updatedOrders = userOrder.orderedProduct.map((order, i) =>
      i === idx ? { ...order, Status: newStatus } : order
    );
    await updateAnyUserOrder(userId, updatedOrders);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === userId ? { ...o, orderedProduct: updatedOrders } : o
      )
    );
  };

  const handleDeleteOrder = async (userId, idx) => {
    if (!window.confirm("Delete this order?")) return;
    await deleteAnyUserOrder(userId, idx);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === userId
          ? { ...o, orderedProduct: o.orderedProduct.filter((_, i) => i !== idx) }
          : o
      )
    );
  };

  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddingProduct(true);
    try {
      const product = {
        ...productForm,
        price: parseFloat(productForm.price),
        images: [productForm.image],
        createdAt: new Date().toISOString(),
      };
      await addProductToFirestore(product);
      setProductForm({ title: "", price: "", category: "", description: "", image: "" });
      alert("Product added!");
    } catch (err) {
      alert("Error adding product");
    }
    setAddingProduct(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, p: 2 }}>
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Admin Panel - Carousel Images
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={handleAddImage}
            disabled={!newImage.trim()}
          >
            Add
          </Button>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Add from Product Images
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {productImages.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: "center", width: "100%" }}>
              No product images found.
            </Typography>
          )}
          {productImages.map((url) => (
            <Grid item xs={4} sm={3} md={2} key={url}>
              <Box sx={{ textAlign: "center" }}>
                <Avatar src={url} variant="rounded" sx={{ width: 56, height: 40, mx: "auto", mb: 0.5 }} />
                <Button size="small" variant="outlined" onClick={() => handleAddProductImage(url)} disabled={images.includes(url)}>
                  Add
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Current Carousel Images
        </Typography>
        <List>
          {images.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
              No images in carousel. Add some!
            </Typography>
          )}
          {images.map((url, idx) => (
            <ListItem key={url} secondaryAction={
              <IconButton edge="end" color="error" onClick={() => handleRemoveImage(url)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemAvatar>
                <Avatar src={url} variant="rounded" sx={{ width: 56, height: 40 }} />
              </ListItemAvatar>
              <ListItemText
                primary={`Image ${idx + 1}`}
                secondary={url}
                sx={{ wordBreak: "break-all" }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Add Product Section */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Add Product
        </Typography>
        <form onSubmit={handleAddProduct}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={productForm.title}
              onChange={handleProductInput}
              required
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={productForm.price}
              onChange={handleProductInput}
              required
            />
            <TextField
              label="Category"
              name="category"
              value={productForm.category}
              onChange={handleProductInput}
              required
            />
            <TextField
              label="Description"
              name="description"
              value={productForm.description}
              onChange={handleProductInput}
              multiline
              rows={2}
            />
            <TextField
              label="Image Link"
              name="image"
              value={productForm.image}
              onChange={handleProductInput}
              required
            />
            <Button type="submit" variant="contained" disabled={addingProduct}>
              {addingProduct ? "Adding..." : "Add Product"}
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* User Management */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          User Management
        </Typography>
        <List>
          {users.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
              No users found.
            </Typography>
          )}
          {users.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" color="error" onClick={() => handleDeleteUser(user.id)} disabled={deletingUserId === user.id}>
                  {deletingUserId === user.id ? (
                    <span className="loader" style={{ width: 20, height: 20, display: "inline-block" }} />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
              }
              button
              onClick={() => handleOpenOrderDialog(user.id)}
              disabled={deletingUserId === user.id}
            >
              <ListItemAvatar>
                <Avatar src={user.data?.photoURL} />
              </ListItemAvatar>
              <ListItemText
                primary={user.data?.displayName || user.data?.email || user.id}
                secondary={user.data?.email}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Add a Users Orders section (below User Management) */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Users Orders
        </Typography>
        <List>
          {orders.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
              No orders found.
            </Typography>
          )}
          {orders.map((orderDoc) => (
            <ListItem
              key={orderDoc.id}
              button
              onClick={() => handleOpenOrderDialog(orderDoc.id)}
            >
              <ListItemAvatar>
                <Avatar src={users.find((u) => u.id === orderDoc.id)?.data?.photoURL} />
              </ListItemAvatar>
              <ListItemText
                primary={users.find((u) => u.id === orderDoc.id)?.data?.displayName || orderDoc.id}
                secondary={`Orders: ${orderDoc.orderedProduct?.length || 0}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Order Management Dialog */}
      <Dialog open={orderDialog.open} onClose={handleCloseOrderDialog} maxWidth="md" fullWidth>
        <DialogTitle>User Orders</DialogTitle>
        <DialogContent>
          {(() => {
            const userOrder = orders.find((o) => o.id === orderDialog.userId);
            if (!userOrder || !userOrder.orderedProduct || userOrder.orderedProduct.length === 0) {
              return <Typography>No orders for this user.</Typography>;
            }
            return (
              <List>
                {userOrder.orderedProduct.map((order, idx) => (
                  <ListItem key={idx} alignItems="flex-start" sx={{ mb: 2, borderBottom: "1px solid #eee" }}>
                    <ListItemAvatar>
                      <Avatar src={order.image || order.images?.[0]} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={order.title || order.productTitle || `Order ${idx + 1}`}
                      secondary={
                        <>
                          <Typography variant="body2">Amount: ${order.price}</Typography>
                          <Typography variant="body2">Date: {order.time}</Typography>
                          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                            <Typography variant="body2">Status:</Typography>
                            <Select
                              size="small"
                              value={order.Status || "pending"}
                              onChange={e => handleStatusChange(userOrder.id, idx, e.target.value)}
                              sx={{ minWidth: 120 }}
                            >
                              {ORDER_STATUSES.map(status => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
                              ))}
                            </Select>
                          </Stack>
                        </>
                      }
                    />
                    <IconButton color="error" onClick={() => handleDeleteOrder(userOrder.id, idx)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            );
          })()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOrderDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;

<style>{`.loader { border: 2px solid #f3f3f3; border-top: 2px solid #DB4444; border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style> 