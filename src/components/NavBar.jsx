import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { color: "red" };
  }
  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                style={{textDecoration: 'none'}}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                Home
               </Button>
              </NavLink>
              <NavLink  to="/addUser"    style={{textDecoration: 'none'}}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Add User
              </Button>
              </NavLink>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                About
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Y" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                // anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                // open={Boolean(anchorElUser)}
                // onClose={handleCloseUserMenu}
              ></Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
export default NavBar;
