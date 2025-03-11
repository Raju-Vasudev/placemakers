import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from './hooks/useTheme';
import Headers from './components/Headers';
import { About, Services, Gallery, Clients, Contact, FAQ, Hero } from './components/sections';
import ContactFormContainer from './components/ContactFormContainer';

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Headers />
      <main id="main-content" tabIndex="-1">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Clients />
        <Contact />
        <FAQ />
      </main>
      <ContactFormContainer />
    </ThemeProvider>
  );
}

export default App; 