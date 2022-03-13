import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Content from './components/content/Content';
import Header from './components/header/Header';
import { selectTheme } from './redux/interfaceSlice';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
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
      <CssBaseline />
      <Header />
      <Content />
    </ThemeProvider>
  );
};

export default App;
