import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Profile from './Profile';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="menu"
          color="inherit"
          edge="start"
          size="large"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          Brotisch
        </Typography>
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
