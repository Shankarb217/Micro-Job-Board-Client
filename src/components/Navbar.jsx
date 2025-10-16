import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from '@mui/icons-material/Work';
import { logout } from '../features/auth/authSlice';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path matches the nav item
  const isActive = (path) => {
    // Handle paths with query parameters
    if (path.includes('?')) {
      const [pathname, query] = path.split('?');
      return location.pathname === pathname && location.search.includes(query);
    }
    
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate('/');
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    if (!user) {
      return [
        { label: 'Home', path: '/' },
        { label: 'Jobs', path: '/' },
      ];
    }

    const commonItems = [{ label: 'Home', path: '/' }];

    if (user.role === 'Admin') {
      return [
        ...commonItems,
        { label: 'Dashboard', path: '/admin' },
        { label: 'Manage Users', path: '/admin?tab=users' },
        { label: 'Manage Jobs', path: '/admin?tab=jobs' },
      ];
    }

    if (user.role === 'Employer') {
      return [
        ...commonItems,
        { label: 'Post Job', path: '/post-job' },
        { label: 'My Jobs', path: '/my-jobs' },
        { label: 'Applications', path: '/applications' },
      ];
    }

    if (user.role === 'Seeker') {
      return [
        ...commonItems,
        { label: 'Jobs', path: '/' },
        { label: 'My Applications', path: '/my-applications' },
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Micro Job Board
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={item.path}
                  selected={isActive(item.path)}
                  sx={{
                    backgroundColor: isActive(item.path) ? 'action.selected' : 'transparent',
                  }}
                >
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MJB
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  borderBottom: isActive(item.path) ? '3px solid white' : '3px solid transparent',
                  borderRadius: 0,
                  fontWeight: isActive(item.path) ? 700 : 400,
                  backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      display: { xs: 'none', sm: 'block' },
                      color: 'white',
                      fontWeight: 500
                    }}
                  >
                    {user.name || user.fullName || user.email}
                  </Typography>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user.name || user.fullName} src="/static/images/avatar/2.jpg">
                        {(user.name || user.fullName || user.email)?.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
