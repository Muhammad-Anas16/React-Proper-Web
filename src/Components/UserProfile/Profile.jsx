import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router";

const user = {
  firstName: "Md",
  lastName: "Rimel",
  email: "rimel1111@gmail.com",
  address: "Kingston, 5236, United State",
  orders: [
    { id: 1, name: "Product A", date: "2025-06-20" },
    { id: 2, name: "Product B", date: "2025-06-18" },
  ],
};

const Profile = ({ detail }) => {
  const userName = detail?.displayName;
  const userEmail = detail?.email;
  const userImage = detail?.photoURL;
  return (
    <Box p={4}>
      <Typography variant="h6" color="error" fontWeight={"bold"} gutterBottom>
        Your Profile :
      </Typography>
      <Card sx={{ mb: 3 }}>
        <Grid
          container
          spacing={4}
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          px={7}
        >
          <Grid item sm={12} md={6}>
            <CardContent>
              <Typography variant="h2" textTransform="capitalize" fontWeight="bolder">
                {userName}
              </Typography>
              <Typography>{userEmail}</Typography>
            </CardContent>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 2,
            }}
          >
            <Avatar src={ userImage || "/broken-image.jpg"} sx={{ width: 120, height: 120 }} />
          </Grid>
        </Grid>
      </Card>

      <Typography variant="h6" gutterBottom>
        Your Orders
      </Typography>
      {user.orders.map((order) => (
        <Card key={order.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>{order.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Ordered on: {order.date}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Button
        component={Link}
        to="/edit-profile"
        variant="contained"
        sx={{ mt: 3, backgroundColor: "red", width: "fit-content" }}
      >
        Edit Profile
      </Button>
    </Box>
  );
};

export default Profile;
