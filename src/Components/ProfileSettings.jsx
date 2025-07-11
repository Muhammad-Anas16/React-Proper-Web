import React, { useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../Firebase/Firebase";
import { 
  updatePassword, 
  sendEmailVerification, 
  reauthenticateWithCredential,
  EmailAuthProvider 
} from "firebase/auth";
import { toast } from "react-toastify";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Stack,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";

const ProfileSettings = () => {
  const mode = useSelector((state) => state.theme.mode);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    darkMode: mode === "dark",
  });

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      
      // Re-authenticate user before password change
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      toast.success("Password updated successfully!");
      setPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.code === "auth/wrong-password") {
        toast.error("Current password is incorrect!");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      await sendEmailVerification(user);
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.checked
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          backgroundColor: mode === "dark" ? "#1f2937" : "#ffffff",
          color: mode === "dark" ? "#e5e7eb" : "#1f2937",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Account Settings
        </Typography>

        <Stack spacing={3}>
          {/* Security Section */}
          <Box>
            <Typography variant="h6" mb={2} display="flex" alignItems="center" gap={1}>
              <SecurityIcon />
              Security
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                onClick={() => setPasswordDialog(true)}
                sx={{ alignSelf: "flex-start" }}
              >
                Change Password
              </Button>
              
              {!auth.currentUser?.emailVerified && (
                <Alert severity="warning">
                  Your email is not verified. 
                  <Button
                    size="small"
                    onClick={handleEmailVerification}
                    disabled={loading}
                    sx={{ ml: 1 }}
                  >
                    Send verification email
                  </Button>
                </Alert>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Email Section */}
          <Box>
            <Typography variant="h6" mb={2} display="flex" alignItems="center" gap={1}>
              <EmailIcon />
              Email Preferences
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleSettingChange("emailNotifications")}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.orderUpdates}
                    onChange={handleSettingChange("orderUpdates")}
                  />
                }
                label="Order Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.promotionalEmails}
                    onChange={handleSettingChange("promotionalEmails")}
                  />
                }
                label="Promotional Emails"
              />
            </Stack>
          </Box>

          <Divider />

          {/* App Settings */}
          <Box>
            <Typography variant="h6" mb={2} display="flex" alignItems="center" gap={1}>
              <NotificationsIcon />
              App Settings
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.darkMode}
                    onChange={handleSettingChange("darkMode")}
                  />
                }
                label="Dark Mode"
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePasswordChange} 
            variant="contained"
            disabled={loading || !currentPassword || !newPassword || !confirmPassword}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileSettings; 