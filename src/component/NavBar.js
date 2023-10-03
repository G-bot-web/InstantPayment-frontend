import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router';
import { clearAuth } from '../redux/actions/InstantPaymentActions';
import './NavBar.css'
import { toast } from 'react-toastify';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const userstatus = localStorage.getItem('userstatus');
  const value = JSON.parse(userstatus) == null ? false : JSON.parse(userstatus).login;
  const mystate = useSelector((state) => state.InstantPaymentReducer);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const history = useHistory()
  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    if (event == "Logout") {
      localStorage.clear();
      toast.dark('Logout Success!');
      dispatch(clearAuth());
      history.push('/');
    }
  };

  return (
    <AppBar id="backgroundOfNav" position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#make-payment-page"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#FF6600',
              textDecoration: 'none',
            }}
          >
            Solicr<p style={{ height: '1px', marginTop: '4px' }}>▪</p>
          </Typography>


          {value ? (<>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={JSON.parse(localStorage.getItem('userstatus')).logo} />
                </IconButton>
              </Tooltip>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box></>) : (<></>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
