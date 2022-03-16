import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Content from './components/content/Content';
import Header from './components/header/Header';
import LinkBehavior from './components/LinkBehavior';
import { selectTheme } from './redux/interfaceSlice';
import './api/firebase';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiLink: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiLink: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});

const App = () => {
  const [muiTheme, setTheme] = useState(darkTheme);
  const theme = useSelector(state => state.interface.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      dispatch(selectTheme(storedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    setTheme(theme === 'dark-theme' ? darkTheme : lightTheme);
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Content />
      </Box>
    </ThemeProvider>
  );
};

export default App;
