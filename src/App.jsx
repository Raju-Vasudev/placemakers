import './App.css';
import { useState } from 'react';
import Headers from './components/Headers';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.documentElement.setAttribute('data-theme', theme);
  };
  return (
    <div className="App">
      <Headers toggleTheme={toggleTheme} theme={theme} />
    </div>
  );
}

export default App;
