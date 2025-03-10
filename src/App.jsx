import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from './hooks/useTheme';
import Headers from './components/Headers';
import { About, Services, Gallery, Clients, Contact, FAQ, Hero } from './components/sections';

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Headers />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Clients />
        <Contact />
        <FAQ />
      </main>
    </ThemeProvider>
  );
}

export default App;
