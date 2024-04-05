import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import {Container} from '@mui/material';
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#E52F5B'
    },
    secondary: {
      main: '#FFD5DE'
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Container maxWidth="xl">
      <App />
    </Container>
  </ThemeProvider>
);
