import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SunnyIcon from "@mui/icons-material/Sunny";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/Theme/ThemeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { Avatar } from "@mui/material";


const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Header() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.IsLogin.IsLogin);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const mode = useSelector((state) => state.theme.mode);
  const userRole = useSelector((state) => state.User?.role || "user"); // Optional role

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);


  const handleLogout = () => {
    handleCloseUserMenu();
    signOut(auth)
      .then(() => {
        toast.success("✅ Sign-out successful", {
          position: "top-center",
          autoClose: 2500,
          theme: "colored",
          onClose: () => navigate("/"),
        });
      })
      .catch((error) => {
        toast.error(error.message || "An error happened!", {
          position: "top-center",
          autoClose: 2500,
          theme: "colored",
        });
      });
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: mode === "light" ? "white" : "black",
        boxShadow: 1,
      }}
    >
      <ToastContainer />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: mode === "dark" ? "white" : "black",
              textDecoration: "none",
            }}
          >
            Exclusive
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu}>
              <MenuIcon sx={{ color: mode === "dark" ? "white" : "black" }} />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    "&:hover": {
                      color: "#DB4444",
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: mode === "dark" ? "white" : "black",
              textDecoration: "none",
            }}
          >
            Exclusive
          </Typography>

          {/* Desktop Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: mode === "dark" ? "white" : "black",
                  display: "block",
                  fontWeight: 500,
                  borderBottom: "2px solid transparent",
                  transition: "color 0.3s, border-bottom 0.3s",
                  "&:hover": {
                    color: "#DB4444",
                    borderBottom: "2px solid #DB4444",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {mode === "light" ? (
                <SunnyIcon
                  sx={{
                    color: "black",
                    filter: "drop-shadow(1px 1px 2px black)",
                    fontSize: "1em",
                  }}
                />
              ) : (
                <Brightness4Icon
                  sx={{
                    color: "white",
                    filter: "drop-shadow(1px 1px 2px white)",
                    fontSize: "1em",
                  }}
                />
              )}
            </IconButton>

            {/* User Section */}
            {userLogin ? (
              <>
                <IconButton onClick={handleOpenUserMenu}>
                  {/* <AccountCircleOutlinedIcon
                    sx={{
                      color: "red",
                      filter: "drop-shadow(1px 1px 2px red)",
                      fontSize: "1em",
                    }}
                  /> */}
                  <Avatar
                    alt="Remy Sharp"
                    src="https://www.clipartmax.com/png/middle/91-915439_to-the-functionality-and-user-experience-of-our-site-red-person-icon.png"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {/* <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/profile");
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem> */}

                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center" >Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to={"/auth"}
                sx={{
                  color: mode === "dark" ? "white" : "black",
                }}
              >
                Login
              </Button>
            )}
            {/*  */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
