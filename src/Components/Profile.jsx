import {
  Avatar,
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../Firebase/Firebase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const mode = useSelector((state) => state.theme.mode);

  onAuthStateChanged(auth, (currentUser) =>
    currentUser ? setUser(currentUser) : setUser(null)
  );

  console.log(user);

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 7, lg: 10 },
        py: { xs: 6, md: 10 },
        backgroundColor: mode === "light" ? "#f9f9f9" : "#2c2c2c",
        mx: "auto",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        height: "100vh",
        overflow: "hidden",
        overflowY: "scroll",
        scrollbarWidth: "none" /* Firefox */,
        "&::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari */,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems={"center"}
          justifyContent={"space-around"}
          direction={{ xs: "column-reverse", md: "row" }}
        >
          <Grid item xs={12} md={6}>
            <Box>
              <TextField
                // label="Username"
                variant="filled"
                fullWidth
                margin="normal"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: mode === "light" ? "black" : "white",
                  },
                }}
                value={`Username : ${user?.displayName}`}
                sx={{
                  backgroundColor: mode === "light" ? "#e0e0e0" : "#424242",
                  borderRadius: 1,
                }}
                disabled
              />
              <TextField
                // label="Email"
                type="email"
                variant="filled"
                fullWidth
                margin="normal"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: mode === "light" ? "black" : "white",
                  },
                }}
                value={`Email : ${user?.email}`}
                sx={{
                  backgroundColor: mode === "light" ? "#e0e0e0" : "#424242",
                  borderRadius: 1,
                }}
                disabled
              />
              {/* <Button variant="contained" fullWidth sx={{ mt: 2, py: 1 }}>
                Save Changes
              </Button> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Avatar
              src={user?.photoURL}
              alt="Profile Picture"
              sx={{
                width: { xs: 140, sm: 180, md: 220, lg: 260 },
                height: { xs: 140, sm: 180, md: 220, lg: 260 },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
