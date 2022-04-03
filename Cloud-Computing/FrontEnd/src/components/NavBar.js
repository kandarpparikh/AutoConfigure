import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pages = ['Dashboard', 'Browse Courses', 'Course Reviews' ];
const settings = ['Logout'];

const NavBar = ({BannerId}) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = (page) => {
        if(page === "Dashboard"){
            navigate("/dashboard", {state: {BannerId: BannerId}});
        }
        if(page === "Browse Courses"){
            navigate("/courses", {state: {BannerId: BannerId}});
        }
        if(page === "Course Reviews"){
            navigate("/course-reviews", {state: {BannerId: BannerId}});
        }
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);
        if(e.target.id){
            navigate("/");
        }
    };
    
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant="h6" noWrap component="div" to="/dashboard" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
                            CloudMonk
                        </Typography>
                        
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" 
                                        aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
                                <MenuIcon />
                            </IconButton>
                            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }} 
                                                open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} 
                                                sx={{ display: { xs: 'block', md: 'none' }, }} >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                            CloudMonk
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button key={page} onClick={() => handleCloseNavMenu(page)} sx={{ my: 2, color: 'white', display: 'block' }} >
                                {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open menu">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <AccountCircleOutlinedIcon colorPrimary fontSize='large' />
                                </IconButton>
                            </Tooltip>
                            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} 
                                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorElUser)} 
                                onClose={handleCloseUserMenu} >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} id={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" id={setting}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>         
        </>
    );
};

export default NavBar;