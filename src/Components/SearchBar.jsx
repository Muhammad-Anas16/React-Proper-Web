import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Box,
  TextField,
  InputAdornment,
  Popper,
  Paper,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
  ClickAwayListener,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const SearchBar = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchRef = useRef(null);

  // Get products from Redux store
  const customProducts = useSelector(
    (state) => state.customProducts.customProducts
  );
  const apiProducts = useSelector((state) => state.products.products);
  const allProducts = [...customProducts, ...apiProducts];

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 300); // Debounce search

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const performSearch = () => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = allProducts.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const category =
        typeof product.category === "string"
          ? product.category.toLowerCase()
          : "";

      const description = product.description?.toLowerCase() || "";

      return (
        title.includes(query) ||
        category.includes(query) ||
        description.includes(query)
      );
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowResults(true);
    setIsSearching(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (product) => {
    setSearchQuery("");
    setShowResults(false);
    navigate(`/${product.id}`);
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{ position: "relative", width: { xs: "100%", sm: 300, md: 400 } }}
      >
        <TextField
          ref={searchRef}
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.9)",
              color: mode === "dark" ? "#e5e7eb" : "#1f2937",
              borderRadius: 2,
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
            },
            "& .MuiInputBase-input": {
              color: mode === "dark" ? "#e5e7eb" : "#1f2937",
              "&::placeholder": {
                color:
                  mode === "dark"
                    ? "rgba(229, 231, 235, 0.7)"
                    : "rgba(31, 41, 55, 0.7)",
                opacity: 1,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ color: mode === "dark" ? "#e5e7eb" : "#1f2937" }}
                />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                {isSearching ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    sx={{ color: mode === "dark" ? "#e5e7eb" : "#1f2937" }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />

        {/* Search Results Dropdown */}
        <Popper
          open={showResults && searchResults.length > 0}
          anchorEl={searchRef.current}
          placement="bottom-start"
          style={{ zIndex: 1300, width: searchRef.current?.offsetWidth }}
        >
          <Paper
            elevation={8}
            sx={{
              maxHeight: 400,
              overflow: "auto",
              backgroundColor: mode === "dark" ? "#1f2937" : "#ffffff",
              border: `1px solid ${mode === "dark" ? "#374151" : "#e5e7eb"}`,
            }}
          >
            <List>
              {searchResults.map((product) => (
                <ListItemButton
                  key={product.id}
                  onClick={() => handleResultClick(product)}
                  sx={{
                    "&:hover": {
                      backgroundColor: mode === "dark" ? "#374151" : "#f3f4f6",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={product.images?.[0] || product.image}
                      alt={product.title}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === "dark" ? "#e5e7eb" : "#1f2937",
                          fontWeight: 500,
                        }}
                      >
                        {product.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        sx={{
                          color: mode === "dark" ? "#9ca3af" : "#6b7280",
                        }}
                      >
                        ${product.price} • {product.category}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
