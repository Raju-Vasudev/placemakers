import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Headers from './components/Headers';
import { About, Services, Gallery, Clients, Contact, FAQ, Hero } from './components/sections';
import ContactFormContainer from './components/ContactFormContainer';

function App() {
  return (
    <ThemeProvider>
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