import { useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const themeColors = {
  primary: {
    main: '#2B5BA1',
    light: '#3C70BA',
    dark: '#1B1464',
  },
  secondary: {
    main: '#8BA888',
    light: '#A1BF9E',
    dark: '#6B8368',
  },
  accent: {
    main: '#F2D594',
    light: '#F7E5B7',
    dark: '#C2A874',
  },
};

export const useTheme = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: themeColors.primary,
      secondary: themeColors.secondary,
      background: {
        default: mode === 'light' ? '#FFFFFF' : '#121212',
        paper: mode === 'light' ? '#F5F5F5' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#1B1464' : '#FFFFFF',
        secondary: mode === 'light' ? '#666666' : '#A0A0A0',
      },
    },
    typography: {
      fontFamily: '"Arial", "Helvetica", sans-serif',
      h1: {
        fontWeight: 900,
        fontFamily: '"Arial Black", "Arial", sans-serif',
      },
      h2: {
        fontWeight: 900,
        fontFamily: '"Arial Black", "Arial", sans-serif',
      },
      h3: {
        fontWeight: 900,
        fontFamily: '"Arial Black", "Arial", sans-serif',
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600,
          },
          contained: {
            background: `linear-gradient(45deg, ${themeColors.primary.main} 30%, ${themeColors.secondary.main} 90%)`,
            color: 'white',
            '&:hover': {
              background: `linear-gradient(45deg, ${themeColors.primary.light} 30%, ${themeColors.secondary.light} 90%)`,
            },
          },
          outlined: {
            borderColor: themeColors.primary.main,
            color: themeColors.primary.main,
            '&:hover': {
              borderColor: themeColors.primary.light,
              background: `rgba(43, 91, 161, 0.1)`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light' 
              ? '0 4px 6px rgba(0, 0, 0, 0.1)'
              : '0 4px 6px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#121212',
            color: mode === 'light' ? '#1B1464' : '#FFFFFF',
          },
        },
      },
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return { theme, mode, toggleTheme };
}; 