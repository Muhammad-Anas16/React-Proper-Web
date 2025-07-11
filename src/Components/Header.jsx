import { useEffect, useState } from "react";
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
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/Theme/ThemeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../Firebase/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Avatar } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchBar from "./SearchBar";
import MobileSearch from "./MobileSearch";

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
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const mode = useSelector((state) => state.theme.mode);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUser(currentUser) : setUser(null);
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    });
  }, [user]);

  const handleLogout = () => {
    handleCloseUserMenu();
    signOut(auth)
      .then(() => {
        toast.success("✅ Sign-out successful", {
          position: "top-center",
          autoClose: 2500,
          // theme: "colored",
          onClose: () => navigate("/"),
          style: {
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "white",
            padding: "14px 22px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "500",
            textAlign: "center",
          },
        });
      })
      .catch((error) => {
        toast.error(error.message || "An error happened!", {
          position: "top-center",
          autoClose: 4500,
          theme: "colored",
        });
      });
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: mode == "light" ? "#E7000B" : "#202020",
        boxShadow: 1,
      }}
    >
      <ToastContainer />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 900,
              // fontSize: "1.5em",
              color: "white",
              textDecoration: "none",
            }}
          >
            E - SHOP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu}>
              <MenuIcon
                sx={{ color: "white", fontWeight: 900, fontSize: "1em" }}
              />
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
              color: "white",
              textDecoration: "none",
            }}
          >
            E - SHOP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: 900,
                  borderBottom: "2px solid transparent",
                  transition: "color 0.3s, border-bottom 0.3s",
                  // transition: "font-size 0.3s ease",
                  "&:hover": {
                    fontStyle: "italic",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Search Bar - Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mx: 2 }}>
            <SearchBar />
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {mode == "light" ? (
                <DarkModeOutlinedIcon
                  sx={{
                    color: "white",
                    fontSize: "1.1em",
                  }}
                />
              ) : (
                <LightModeOutlinedIcon
                  sx={{
                    color: "white",
                    fontSize: "1.1em",
                  }}
                />
              )}
            </IconButton>

            {/* Mobile Search */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <MobileSearch />
            </Box>

            <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
              <ShoppingCartOutlinedIcon fontSize="medium" />
            </IconButton>

            {/* User Section */}
            {userLogin ? (
              <>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    src={user?.photoURL || "/broken-image.jpg"}
                    alt="User Avatar"
                    sx={{
                      width: 25,
                      height: 25,
                      border: "2px solid white",
                      backgroundColor: "white",
                    }}
                  />
                </IconButton>

                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      background: "rgba(255, 255, 255, 0.05)", // Light transparent overlay
                      backdropFilter: "blur(15px)", // Strong blur for frosted glass effect
                      WebkitBackdropFilter: "blur(15px)", // For Safari support
                      borderRadius: 2,
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                      color: "white",
                      minWidth: 220,
                    },
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>

                  <MenuItem
                    component={Link}
                    to="/order"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">My Order</Typography>
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem
                      component={Link}
                      to="/admin"
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">Admin</Typography>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to={"/auth"}
                sx={{
                  color: "white",
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
