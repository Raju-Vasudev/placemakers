import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { GradientTypography } from './StyledComponents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = styled('section')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  paddingTop: theme.spacing(8),
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`
    : `linear-gradient(135deg, ${theme.palette.primary.dark}30 0%, ${theme.palette.secondary.dark}30 100%)`,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 50%, ${theme.palette.primary.main}15, transparent 25%)`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main}15, transparent 25%)`,
  },
}));

const AnimatedBox = styled(Box)(({ theme }) => ({
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
}));

const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <HeroSection id="home">
      <Container maxWidth="xl">
        <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Grid2 container spacing={4} alignItems="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box>
                <GradientTypography 
                  variant="h1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 900,
                  }}
                >
                  Professional Facility Management Solutions
                </GradientTypography>
                <Typography 
                  variant="h5" 
                  color="textSecondary" 
                  paragraph
                  sx={{ mb: 4 }}
                >
                  Creating efficient, sustainable, and comfortable environments for your business to thrive
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <AnimatedBox
                sx={{
                  position: 'relative',
                  '& img': {
                    width: '100%',
                    height: 'auto',
                    maxWidth: '600px',
                    display: 'block',
                    margin: '0 auto',
                  },
                }}
              >
                <img
                  src="hero-illustration.svg"
                  alt="Facility Management Illustration"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                  }}
                />
              </AnimatedBox>
            </Grid2>
          </Grid2>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={scrollToServices}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                cursor: 'pointer !important',
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                color: 'white',
                transition: 'all 0.3s ease',
                zIndex: 1,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  cursor: 'pointer !important',
                  background: (theme) =>
                    `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                },
              }}
            >
              Explore Our Services
            </Button>
          </Box>
        </Box>
      </Container>
    </HeroSection>
  );
};

export default Hero; 