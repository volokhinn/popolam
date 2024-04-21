import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import { Container } from '@mui/material';
import './index.css'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { AppProvider } from './AppContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E52F5B'
    },
    secondary: {
      main: '#FFD5DE'
    }
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#fff",
          backgroundColor: "#E52F5B"
        }
      }
    }
  }
})

const {REACT_APP_CLERK_PUBLISHABLE_KEY} = process.env
 
if (!REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <SignedIn>
            <Container maxWidth="xl">
              <App />
            </Container>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </ThemeProvider>
      </AppProvider>
    </ClerkProvider>
);
