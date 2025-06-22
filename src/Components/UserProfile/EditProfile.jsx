import React from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";

const EditProfile = () => {
  return (
    <Box p={4}>
      <Typography variant="h6" color="error" gutterBottom>
        Edit Your Profile
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField label="First Name" fullWidth defaultValue="Md" />
        <TextField label="Last Name" fullWidth defaultValue="Rimel" />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField label="Email" fullWidth defaultValue="rimel1111@gmail.com" />
        <TextField
          label="Address"
          fullWidth
          defaultValue="Kingston, 5236, United State"
        />
      </Stack>

      <Typography mb={1}>Password Changes</Typography>
      <Stack spacing={2} mb={3}>
        <TextField label="Current Password" fullWidth type="password" />
        <TextField label="New Password" fullWidth type="password" />
        <TextField label="Confirm New Password" fullWidth type="password" />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button variant="text">Cancel</Button>
        <Button variant="contained" color="error">
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

export default EditProfile;
