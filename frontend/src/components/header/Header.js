import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '../../redux/interfaceSlice';
import Navigator from './Navigator';
import Profile from './Profile';

const Header = () => {
  const drawerOpen = useSelector(state => state.interface.drawerOpen);
  const drawerWidth = useSelector(state => state.interface.drawerWidth);
  const dispatch = useDispatch();

  return (
    <>
      <AppBar
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        position="fixed">
        <Toolbar>
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            onClick={() => dispatch(toggleDrawer())}
            size="large"
            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            Brotisch
          </Typography>
          <Profile />
        </Toolbar>
      </AppBar>
      <Navigator />
    </>
  );
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => (prop !== 'drawerOpen' && prop !== 'drawerWidth'),
})(({ theme, drawerOpen, drawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default Header;
