import React from "react";
import { Box, Avatar, Typography, Stack, Divider } from "@mui/material";
import { useSelector } from "react-redux";

export default function ProfileHeader({ user }) {
  const mode = useSelector((state) => state.theme.mode);

  // console.log(user);

  return (
    <Box sx={{ width: "100%", pb: { xs: 5, sm: 5 } }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: "22vh", sm: "26vh", md: "30vh", lg: "32vh" },
          backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
          borderBottom: "2px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            // backgroundColor: "black",
            backgroundColor: "#8f8f8f",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Avatar Overlay */}
        <Avatar
          alt={"Profile"}
          src={
            user?.photoURL ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          sx={{
            position: "absolute",
            bottom: { xs: "-45px", sm: "-55px" },
            left: { xs: "50%", sm: 40 },
            transform: { xs: "translateX(-50%)", sm: "none" },
            width: { xs: 90, sm: 110, md: 130 },
            height: { xs: 90, sm: 110, md: 130 },
            border: "4px solid #fff",
            bgcolor: "#fff",
            p: 0,
          }}
        />
      </Box>

      {/* User Details */}
      <Box
        sx={{
          mt: { xs: 6, sm: 8 },
          px: { xs: 2, sm: 4 },
          maxWidth: 800,
          mx: "auto",
          color: mode === "dark" ? "#e5e7eb" : "#1f2937",
        }}
      >
        <Stack spacing={1} alignItems={{ xs: "center", sm: "flex-start" }}>
          <Typography variant="h6" fontWeight={600}>
            {user?.displayName || "UserName"}
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {user?.email || "UserName@UserName.com"}
          </Typography>

          {/* {user?.bio && (
            <Typography
              variant="body2"
              sx={{ mt: 1, textAlign: { xs: "center", sm: "left" } }}
            >
              {user.bio}
            </Typography>
          )} */}

          {/* <Divider sx={{ my: 1, width: "100%" }} /> */}

          {/* <Typography variant="body2">
            <strong>Date of Birth:</strong> {user?.dob || "January 1, 2000"}
          </Typography> */}

          {/* <Typography variant="body2">
            <strong>Phone:</strong> {user?.phone || "+92 300 0000000"}
          </Typography> */}
        </Stack>
      </Box>
    </Box>
  );
}
