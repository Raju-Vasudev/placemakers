import './App.css';
import { useState } from 'react';
import Headers from './components/Headers';
import Button from '@mui/material/Button';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    // const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.documentElement.setAttribute('data-theme', theme);
    // console.log(`theme`, theme)
  };
  return (
    <div className="App">
      <Headers toggleTheme={toggleTheme} theme={theme} />
      <Button variant="contained" onClick={toggleTheme}>
        Contained
      </Button>
    </div>
  );
}

export default App;
