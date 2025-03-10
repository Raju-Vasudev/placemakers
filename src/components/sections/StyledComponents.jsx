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
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: '1.5rem !important', // Force the font size
  fontWeight: 550,
  lineHeight: 1.2,
  marginBottom: '1rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.75rem !important',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem !important',
  },
}));

export const SectionSubheading = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: '1rem !important', // Force the font size
  fontWeight: 300,
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
  marginBottom: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.1rem !important',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem !important',
  },
}));

export const SectionHeadingWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
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