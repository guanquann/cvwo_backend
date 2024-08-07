import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Toolbar, IconButton, Link, Typography, Menu, MenuItem } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { useDispatch } from "react-redux";
import { removeAuth } from "../../redux/authSlice";

import AuthInterface from "../../interfaces/AuthInterface";

// Adapted from https://github.com/mui/material-ui/blob/v5.11.0/docs/data/material/components/app-bar/PrimarySearchAppBar.tsx
const Navbar: React.FC<AuthInterface> = ({ auth }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    dispatch(removeAuth());
    toast.success("Logout Successful!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ display: "block" }}>
            <Link component={RouterLink} to="/" sx={{ color: "white", textDecoration: "none" }}>
              MyForum
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {auth ? (
            <Box sx={{ display: "flex" }}>
              <IconButton size="large" aria-label="new post" color="inherit">
                <Link component={RouterLink} to="/new" sx={{ color: "white" }} aria-label="create new post link">
                  <AddIcon aria-label="create new post" />
                </Link>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          ) : (
            <Link component={RouterLink} to="/login" sx={{ color: "white" }} aria-label="login link">
              <IconButton size="large" edge="end" color="inherit">
                <LoginIcon aria-label="login" />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/settings" onClick={handleMenuClose}>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleSubmit();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
