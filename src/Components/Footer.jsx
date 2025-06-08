import React from "react";
import { Box, Typography, Grid, TextField, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000",
        color: "white",
        px: { xs: 2, md: 10 },
        py: { xs: 5, md: 10 },
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Exclusive
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Subscribe
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Get 10% off your first order
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Enter your email"
              sx={{ bgcolor: "white", borderRadius: 1, flex: 1 }}
            />
            <IconButton sx={{ bgcolor: "gray", color: "white" }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Support
          </Typography>
          <Typography variant="body2">
            123 ABCD XYZ, City, ABC 1234, Counntry.
          </Typography>
          <Typography variant="body2">emaxple@gmail.com</Typography>
          <Typography variant="body2">+92 888 8888888</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Account
          </Typography>
          <Typography variant="body2">My Account</Typography>
          <Typography variant="body2">Login / Register</Typography>
          <Typography variant="body2">Cart</Typography>
          <Typography variant="body2">Wishlist</Typography>
          <Typography variant="body2">Shop</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Quick Link
          </Typography>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Terms Of Use</Typography>
          <Typography variant="body2">FAQ</Typography>
          <Typography variant="body2">Contact</Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Download App
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Save $3 with App New User Only
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png"
              alt="QR Code"
              sx={{ width: 80, border: "2px white solid" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png"
                alt=""
                sx={{
                  width: 100,
                  border: "2px white solid",
                  borderRadius: "10px",
                }}
              />
              <Box
                component="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17Dlfop0XoXj0yd3Q_B_io3z4W6koxAOpYg&s"
                alt=""
                sx={{
                  width: 100,
                  border: "2px white solid",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Facebook fontSize="small" />
            <Twitter fontSize="small" />
            <Instagram fontSize="small" />
            <LinkedIn fontSize="small" />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{ borderTop: "1px solid #333", mt: 5, pt: 3, textAlign: "center" }}
      >
        <Typography variant="body2" sx={{ color: "gray" }}>
          © Copyright Rimel 2022. All right reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
