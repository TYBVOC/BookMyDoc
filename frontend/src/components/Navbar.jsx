import React from 'react'
import { 
    AppBar, 
    Toolbar, 
    Box, 
    Button, 
    Typography, 
    Menu, 
    MenuItem, 
    IconButton, 
    Drawer,
    List,
    ListItem,
    Divider,
    useTheme
  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {assets} from "../assets/assets.js"


const Navbar = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const drawerContent = (
        <Box sx={{ width: 250 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Box 
              component="img" 
              src={assets.logo} 
              alt="Logo" 
              sx={{ width: 140, cursor: 'pointer' }} 
              onClick={() => navigate('/')}
            />
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
              <ListItem key={"/"} disablePadding>
                <Button
                  component={NavLink}
                  to={"/"}
                  onClick={handleDrawerToggle}
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    px: 3,
                    py: 1.5,
                    color: 'text.primary',
                    '&.active': {
                      backgroundColor: 'primary.light',
                      color: 'primary.main',
                    }
                  }}
                >
                  {"Home"}
                </Button>
              </ListItem>
          </List>
        </Box>
    );

    const NavLinkList = [
        {path: "/", name: "Home"},
        {path: "/doctors", name: "Doctors"},
        {path: "/about", name: "About"},
        {path: "/contact", name: "Contact"},
    ]



  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'common.white', 
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: { xs: 3, md: 5, lg: 10 },
        py: { xs: 3, md: 4, lg: 2 },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box 
          component="img" 
          src={assets.bookMyDoc} 
          alt="Logo" 
          sx={{ 
            width: 306, 
            cursor: 'pointer',
            [theme.breakpoints.down('sm')]: { width: 140 }
          }} 
          onClick={() => navigate('/')}
        />
        {/* <Typography color='black' sx={{fontSize: "2rem", fontWeight: "bold"}}>
            BookMyDoc
        </Typography> */}

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
            
            {NavLinkList.map((navlink)=>(
                <Button
                component={NavLink}
                to={navlink.path}
                sx={{
                    color: 'text.primary',
                    fontWeight: 700,
                    position: 'relative',
                    '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: 'primary.main',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease'
                    },
                    '&.active:after': {
                    transform: 'scaleX(0.6)'
                    }
                }}
                >
                {navlink.name}
                </Button>

            ))}
        </Box>

        {/* User Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Box
                  component="img"
                //   src={userData.image}
                  alt="Profile"
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%',
                    border: `2px solid ${theme.palette.primary.main}`
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    minWidth: 200,
                    boxShadow: theme.shadows[3],
                    mt: 1.5
                  }
                }}
              >
                  <MenuItem 
                    key={"item.label"} 
                    onClick={() => {
                      handleMenuClose();
                      item.action();
                    }}
                    sx={{
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'primary.light'
                      }
                    }}
                  >
                    {"Settings"}
                  </MenuItem>
              </Menu>
            </>

            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                borderRadius: 28,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                boxShadow: 'none'
              }} 
            >
              Login
            </Button>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
          }}
        >
          {drawerContent}
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar