import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, Event, PersonAdd, People, Logout } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "250px",
  height: "100vh",
  position: "fixed",
  top: 10,
  left: 0,
  // zIndex:1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  paddingTop: theme.spacing(10), // Matches Navbar height
}));

const Sidebar = () => {
  return (
    <SidebarContainer>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin-dashboard">
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/all-appointments">
            <ListItemIcon><Event /></ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/add-doctor">
            <ListItemIcon><PersonAdd /></ListItemIcon>
            <ListItemText primary="Add Doctor" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/doctors-list">
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary="Doctors List" />
          </ListItemButton>
        </ListItem>

      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
