import { AppBar, Toolbar, Typography, Box, IconButton, useTheme, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FlightIcon from '@mui/icons-material/Flight';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppStore } from '@/hooks/useAppStore';
import { navbarStyles } from '@/styles/components/UI/Navbar.style';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { toggleMode, isFullScreen, toggleFullScreen } = useAppStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!document.fullscreenElement;
            if (isCurrentlyFullscreen !== isFullScreen) {
                toggleFullScreen();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, [isFullScreen, toggleFullScreen]);

    const handleFullscreenToggle = async () => {
        try {
            const elem = document.documentElement as any;

            if (!document.fullscreenElement &&
                !(document as any).webkitFullscreenElement &&
                !(document as any).mozFullScreenElement &&
                !(document as any).msFullscreenElement) {

                if (elem.requestFullscreen) {
                    await elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    await elem.webkitRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    await elem.mozRequestFullScreen();
                } else if (elem.msRequestFullscreen) {
                    await elem.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    await (document as any).webkitExitFullscreen();
                } else if ((document as any).mozCancelFullScreen) {
                    await (document as any).mozCancelFullScreen();
                } else if ((document as any).msExitFullscreen) {
                    await (document as any).msExitFullscreen();
                }
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
            alert('Fullscreen mode is not supported or was blocked by your browser.');
        }
    };

    const navItems = [
        { label: 'Flights', path: '/flights' },
        { label: 'Hotels', path: '/hotels' },
        { label: 'Cars', path: '/cars' },
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <FlightIcon sx={{ color: 'secondary.main' }} />
                <Typography variant="h6" sx={navbarStyles.logoText}>
                    SPOOTER
                </Typography>
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: location.pathname === item.path ? 700 : 400,
                                    color: location.pathname === item.path ? 'primary.main' : 'inherit'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar sx={navbarStyles.appBar(theme)}>
                <Toolbar sx={navbarStyles.toolbar}>
                    {/* Mobile Menu Button */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo */}
                    <Box component={Link} to="/" sx={navbarStyles.logoBox}>
                        <FlightIcon sx={{ color: 'secondary.main', fontSize: '2rem' }} />
                        <Typography sx={navbarStyles.logoText}>
                            SPOOTER
                        </Typography>
                    </Box>

                    {/* Navigation Links */}
                    <Box sx={navbarStyles.navLinks}>
                        {navItems.map((item) => (
                            <Typography
                                key={item.path}
                                component={Link}
                                to={item.path}
                                sx={navbarStyles.navLink(location.pathname === item.path)}
                            >
                                {item.label}
                            </Typography>
                        ))}
                    </Box>

                    {/* Actions */}
                    <Box sx={navbarStyles.actionsBox}>
                        <IconButton onClick={toggleMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <IconButton
                            onClick={handleFullscreenToggle}
                            color="inherit"
                            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                        >
                            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default Navbar;
