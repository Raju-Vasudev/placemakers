import React, { useEffect, useState, useCallback } from 'react';
import { Box, Container, Typography, Card, IconButton } from '@mui/material';
import { Section, GradientTypography } from './StyledComponents';
import { getClientLogos } from '../../utils/clientUtils';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const ClientCard = ({ name, logoPath }) => (
  <Card
    sx={{
      p: 3,
      height: '100%',
      minWidth: { xs: '280px', sm: '300px', md: '320px' },
      maxWidth: { xs: '280px', sm: '300px', md: '320px' },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 2,
      background: (theme) => theme.palette.background.paper,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease-in-out',
      mx: 2,
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
      },
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: 160,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <img
        src={`/images/clients/${logoPath}`}
        alt={`${name} logo`}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          transition: 'transform 0.3s ease-in-out',
        }}
      />
    </Box>
    <Typography
      variant="h6"
      component="h3"
      align="center"
      sx={{
        fontWeight: 600,
        color: 'text.primary',
      }}
    >
      {name}
    </Typography>
  </Card>
);

const ScrollButton = ({ direction, onClick, disabled }) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    sx={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      backgroundColor: 'background.paper',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
      },
      ...(direction === 'left' ? { left: -20 } : { right: -20 }),
      display: { xs: 'none', md: 'flex' },
    }}
  >
    {direction === 'left' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
  </IconButton>
);

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = React.useRef(null);
  const autoScrollIntervalRef = React.useRef(null);
  const SCROLL_INTERVAL = 2000; // Increased to 2000ms for smoother continuous scrolling
  const SCROLL_AMOUNT = 1; // Small increment for smooth continuous scrolling

  useEffect(() => {
    const loadClientLogos = () => {
      const clientsData = getClientLogos();
      setClients(clientsData);
    };

    loadClientLogos();
  }, []);

  // Continuous scrolling effect
  useEffect(() => {
    if (!scrollContainerRef.current || clients.length === 0) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrameId;
    let currentScroll = 0;

    const scroll = () => {
      if (!isPaused) {
        currentScroll += SCROLL_AMOUNT;
        
        // Reset scroll position when reaching the end of the first set
        if (currentScroll >= scrollContainer.scrollWidth / 2) {
          currentScroll = 0;
        }
        
        scrollContainer.scrollLeft = currentScroll;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [clients, isPaused]);

  // Pause auto-scroll on hover or touch
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    // Add a small delay before resuming to allow for touch scrolling
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Create duplicated array for continuous scrolling
  const displayClients = [...clients, ...clients, ...clients];

  return (
    <Section id="clients">
      <Container maxWidth="xl">
        <Box textAlign="center" mb={6}>
          <GradientTypography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
              fontWeight: 700,
            }}
          >
            Our Clients
          </GradientTypography>
          <Typography
            variant="h5"
            color="textSecondary"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Trusted by leading organizations across industries
          </Typography>
        </Box>

        {clients.length > 0 && (
          <Box 
            sx={{ 
              position: 'relative',
              px: { xs: 0, md: 2 },
              overflow: 'hidden', // Hide overflow for seamless scrolling
            }}
          >
            <Box
              ref={scrollContainerRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              sx={{
                display: 'flex',
                overflowX: 'hidden', // Hide scrollbar but allow scrolling
                py: 2,
                px: { xs: 2, md: 0 },
                gap: 2,
                width: '100%',
                '& > *': {
                  flex: '0 0 auto',
                },
                // Remove scrollbar from all browsers
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                msOverflowStyle: 'none',
              }}
            >
              {displayClients.map((client, index) => (
                <ClientCard key={`${client.name}-${index}`} {...client} />
              ))}
            </Box>
          </Box>
        )}

        {clients.length === 0 && (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ mt: 4 }}
          >
            Add your client logos to the /public/images/clients directory to display them here.
            The client name will be derived from the image filename.
          </Typography>
        )}
      </Container>
    </Section>
  );
};

export default Clients; 