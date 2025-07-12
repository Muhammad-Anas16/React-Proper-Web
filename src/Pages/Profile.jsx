import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { updateProfile, deleteUser, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Stack,
  Divider,
  IconButton,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import UserDetail from "../Components/UserDetail";
import ProfileSettings from "../Components/ProfileSettings";

const Profile = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    address: "",
  });
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
        // Check localStorage for admin
        const localAdmin = localStorage.getItem("isAdmin");
        setIsAdmin(localAdmin === "true");
      } else {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, "User", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData(data);
        setFormData({
          displayName: data.data?.displayName || user?.displayName || "",
          email: data.data?.email || user?.email || "",
          phoneNumber: data.data?.phoneNumber || "",
          bio: data.data?.bio || "",
          address: data.data?.address || "",
        });
        setIsAdmin(!!data.isAdmin);
        localStorage.setItem("isAdmin", data.isAdmin ? "true" : "false");
      } else {
        // Create default user data if not exists
        setUserData({
          data: {
            displayName: user?.displayName || "",
            email: user?.email || "",
            phoneNumber: "",
            bio: "",
            address: "",
            photoURL: user?.photoURL || "",
          },
        });
        setFormData({
          displayName: user?.displayName || "",
          email: user?.email || "",
          phoneNumber: "",
          bio: "",
          address: "",
        });
        setIsAdmin(false);
        localStorage.setItem("isAdmin", "false");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, "User", user.uid);
      let adminFlag = isAdmin;
      if (adminPassword === "112233") {
        adminFlag = true;
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
      }
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL:
          user?.photoURL ||
          "https://static.vecteezy.com/system/resources/previews/009/418/828/non_2x/shop-marketing-3d-icon-illustration-for-your-website-user-interface-and-presentation-3d-render-illustration-free-png.png",
      });

      // Update Firestore user data
      await updateDoc(userRef, {
        data: {
          displayName: formData.displayName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          bio: formData.bio,
          address: formData.address,
          photoURL:
            user?.photoURL ||
            "https://static.vecteezy.com/system/resources/previews/009/418/828/non_2x/shop-marketing-3d-icon-illustration-for-your-website-user-interface-and-presentation-3d-render-illustration-free-png.png",
          updatedAt: new Date().toISOString(),
        },
        isAdmin: adminFlag,
      });

      // Refresh user data
      await fetchUserData(user.uid);
      setEditMode(false);
      setAdminPassword("");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      // Delete user data from Firestore
      const userRef = doc(db, "User", user.uid);
      await deleteDoc(userRef);

      // Delete user from Firebase Auth
      await deleteUser(user);
      await signOut(auth);

      toast.success("Account deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
      setDeleteDialog(false);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: mode === "light" ? "#FEFEFE" : "#121212",
        minHeight: "100vh",
      }}
    >
      <ToastContainer />

      {/* Profile Header */}
      <UserDetail user={user} />

      {/* Profile Content */}
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Paper
          elevation={2}
          sx={{
            backgroundColor: mode === "dark" ? "#1f2937" : "#ffffff",
            color: mode === "dark" ? "#e5e7eb" : "#1f2937",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                color: mode === "dark" ? "#e5e7eb" : "#1f2937",
              },
            }}
          >
            <Tab label="Profile Information" />
            <Tab label="Account Settings" />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {activeTab === 0 && (
              <>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h5" fontWeight={600}>
                    Profile Information
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {!editMode ? (
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => setEditMode(true)}
                        sx={{ color: mode === "dark" ? "#e5e7eb" : "#1f2937" }}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleUpdateProfile}
                          disabled={loading}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => {
                            setEditMode(false);
                            setFormData({
                              displayName: userData?.data?.displayName || "",
                              email: userData?.data?.email || "",
                              phoneNumber: userData?.data?.phoneNumber || "",
                              bio: userData?.data?.bio || "",
                              address: userData?.data?.address || "",
                            });
                            setAdminPassword("");
                          }}
                          sx={{
                            color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Stack>
                </Stack>

                <Stack spacing={3}>
                  {/* Display Name */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      mb={1}
                    >
                      Display Name
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      <Typography variant="body1">
                        {userData?.data?.displayName || "Not set"}
                      </Typography>
                    )}
                  </Box>

                  {/* Email */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      mb={1}
                    >
                      Email
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        type="email"
                      />
                    ) : (
                      <Typography variant="body1">
                        {userData?.data?.email || "Not set"}
                      </Typography>
                    )}
                  </Box>

                  {/* Phone Number */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      mb={1}
                    >
                      Phone Number
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <Typography variant="body1">
                        {userData?.data?.phoneNumber || "Not set"}
                      </Typography>
                    )}
                  </Box>

                  {/* Address */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      mb={1}
                    >
                      Address
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                        placeholder="Enter your address"
                      />
                    ) : (
                      <Typography variant="body1">
                        {userData?.data?.address || "Not set"}
                      </Typography>
                    )}
                  </Box>

                  {/* Bio */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      mb={1}
                    >
                      Bio
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={3}
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <Typography variant="body1">
                        {userData?.data?.bio || "No bio added"}
                      </Typography>
                    )}
                  </Box>

                  {/* Admin Password */}
                  {editMode && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" mb={1}>
                        Admin Password
                      </Typography>
                      <TextField
                        fullWidth
                        name="adminPassword"
                        value={adminPassword}
                        onChange={e => setAdminPassword(e.target.value)}
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder="Enter admin password to become admin"
                      />
                      {isAdmin && (
                        <Typography color="success.main" fontSize={13} mt={1}>
                          You are an admin.
                        </Typography>
                      )}
                    </Box>
                  )}
                </Stack>

                <Divider sx={{ my: 3 }} />
              </>
            )}
          </Box>{" "}
          {/* <-- This was missing */}
          {/* Danger Zone */}
          <Box>
            <Typography variant="h6" color="error" mb={2}>
              Danger Zone
            </Typography>
            <Alert severity="warning" sx={{ mb: 2 }}>
              Deleting your account will permanently remove all your data,
              orders, and cart items. This action cannot be undone.
            </Alert>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialog(true)}
            >
              Delete Account
            </Button>
            ){activeTab === 1 && <ProfileSettings />}
          </Box>
        </Paper>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be
            undone and will permanently remove all your data.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
