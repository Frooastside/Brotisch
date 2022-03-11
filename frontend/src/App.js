import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
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

function App() {
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
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <Container>
        <Button>Test</Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
