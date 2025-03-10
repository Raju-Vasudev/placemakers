import { styled } from '@mui/material/styles';
import { Box, Typography, Card } from '@mui/material';

export const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(10, 0),  // Adds vertical padding of 10 units on large screens
  background: theme.palette.mode === 'light'  // Sets background color based on theme mode
    ? '#FFFFFF'  // White background in light mode
    : theme.palette.background.default,  // Default background in dark mode
  [theme.breakpoints.down('sm')]: {  // Responsive styling for small screens
    padding: theme.spacing(6, 0),  // Reduces vertical padding to 6 units on small screens
  },
}));

export const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  background: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
}));

export const CoreValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
}));

export const GradientTypography = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: 'white',
})); 