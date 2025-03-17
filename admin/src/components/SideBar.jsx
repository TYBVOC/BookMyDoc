import React, { useContext } from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, Event, PersonAdd, People, Logout } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";

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

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <SidebarContainer>
      {aToken && (
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
      )}

      {dToken && (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/doctor-dashboard">
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/doctor-appointments">
              <ListItemIcon><Event /></ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/doctor-profile">
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      
    </SidebarContainer>
  );
};

export default Sidebar;
