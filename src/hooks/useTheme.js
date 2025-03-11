import { useState, useMemo, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// Updated colors with better contrast ratios
const themeColors = {
  primary: {
    main: '#1B4B91', // Darker blue for better contrast
    light: '#3C70BA',
    dark: '#0F2E5A', // Even darker for better contrast
  },
  secondary: {
    main: '#5A7A57', // Darker green for better contrast
    light: '#8BA888',
    dark: '#3E5A3C', // Even darker for better contrast
  },
  accent: {
    main: '#D9B44A', // Darker gold for better contrast
    light: '#F2D594',
    dark: '#B08E2F', // Even darker for better contrast
  },
};

export const useTheme = () => {
  // Initialize theme from localStorage or system preference
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) {
      return savedMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply data-theme attribute to body and save to localStorage
  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
    localStorage.setItem('theme-mode', mode);
    
    // Apply class to body for additional CSS targeting
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [mode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme-mode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener with newer API if supported
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

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
        primary: mode === 'light' ? '#0F2E5A' : '#FFFFFF', // Darker text for better contrast
        secondary: mode === 'light' ? '#444444' : '#CCCCCC', // Darker secondary text for better contrast
      },
      error: {
        main: '#D32F2F', // Accessible red
      },
      warning: {
        main: '#ED6C02', // Accessible orange
      },
      info: {
        main: '#0288D1', // Accessible blue
      },
      success: {
        main: '#2E7D32', // Accessible green
      },
    },
    typography: {
      fontFamily: '"Arial", "Helvetica", sans-serif',
      fontSize: 16, // Base font size for better readability
      htmlFontSize: 16,
      h1: {
        fontWeight: 900,
        fontFamily: '"Arial Black", "Arial", sans-serif',
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 900,
        fontFamily: '"Arial Black", "Arial", sans-serif',
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 900,
        fontFamily: '"Arial Black", "Arial", sans-serif',
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 700,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 700,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 700,
        fontSize: '1rem',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5, // Improved line height for readability
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600,
            padding: '8px 16px', // Larger touch target
            minHeight: '44px', // Minimum height for touch targets
            '&:focus-visible': {
              outline: `3px solid ${themeColors.primary.dark}`,
              outlineOffset: '2px',
            },
          },
          contained: {
            background: `linear-gradient(45deg, ${themeColors.primary.main} 30%, ${themeColors.secondary.main} 90%)`,
            color: 'white',
            '&:hover': {
              background: `linear-gradient(45deg, ${themeColors.primary.dark} 30%, ${themeColors.secondary.dark} 90%)`,
            },
          },
          outlined: {
            borderColor: themeColors.primary.main,
            color: themeColors.primary.main,
            '&:hover': {
              borderColor: themeColors.primary.light,
              background: `rgba(27, 75, 145, 0.1)`,
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
            color: mode === 'light' ? '#0F2E5A' : '#FFFFFF',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-root': {
              color: mode === 'light' ? '#444444' : '#CCCCCC',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: themeColors.primary.main,
                borderWidth: 2,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: themeColors.primary.light,
              },
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: themeColors.primary.main,
            textDecoration: 'underline',
            '&:hover': {
              color: themeColors.primary.dark,
            },
            '&:focus-visible': {
              outline: `3px solid ${themeColors.primary.dark}`,
              outlineOffset: '2px',
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === 'light' ? '#0F2E5A' : '#FFFFFF',
            color: mode === 'light' ? '#FFFFFF' : '#0F2E5A',
            fontSize: '0.875rem',
            padding: '8px 12px',
            borderRadius: 4,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
            ...(mode === 'dark' && {
              scrollbarColor: '#6b6b6b #2b2b2b',
              '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                backgroundColor: '#2b2b2b',
              },
              '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                borderRadius: 8,
                backgroundColor: '#6b6b6b',
                minHeight: 24,
                border: '3px solid #2b2b2b',
              },
              '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                backgroundColor: '#959595',
              },
              '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                backgroundColor: '#959595',
              },
              '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#959595',
              },
            }),
          },
        },
      },
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      return newMode;
    });
  };

  return { theme, mode, toggleTheme };
}; 