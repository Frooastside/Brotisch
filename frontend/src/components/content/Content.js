import { styled } from '@mui/material';
import { useSelector } from 'react-redux';

const Content = () => {
  const drawerOpen = useSelector(state => state.interface.drawerOpen);
  const drawerWidth = useSelector(state => state.interface.drawerWidth);

  return (
    <Main drawerOpen={drawerOpen} drawerWidth={drawerWidth}>

    </Main>
  );
};

const Main = styled('main', { shouldForwardProp: (prop) => (prop !== 'drawerOpen' && prop !== 'drawerWidth') })(
  ({ theme, drawerOpen, drawerWidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(drawerOpen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default Content;