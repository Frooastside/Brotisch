import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon, LibraryBooks as LibraryBooksIcon
} from '@mui/icons-material';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '../../redux/interfaceSlice';
import LinkBehavior from '../LinkBehavior';

const Navigator = () => {
  const drawerOpen = useSelector(state => state.interface.drawerOpen);
  const drawerWidth = useSelector(state => state.interface.drawerWidth);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        }
      }}
      variant="persistent">
      <DrawerHeader>
        <IconButton onClick={() => dispatch(toggleDrawer())}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button component={LinkBehavior} href="/grammar">
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Grammar" />
        </ListItem>
      </List>
    </Drawer>
  );
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export default Navigator;