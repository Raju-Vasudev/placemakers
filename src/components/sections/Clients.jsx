import React, { useEffect, useState, useCallback } from 'react';
import { Box, Container, Typography, Card, IconButton } from '@mui/material';
import { Section, GradientTypography } from './StyledComponents';
import { getClientLogos } from '../../utils/clientUtils';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessIcon from '@mui/icons-material/Business';

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
        src={logoPath}
        alt={`${name} logo`}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          transition: 'transform 0.3s ease-in-out',
        }}
        onError={(e) => {
          console.error(`Error loading client logo: ${logoPath}`);
          e.target.style.display = 'none';
          const icon = document.createElement('div');
          icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="64" width="64" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>';
          e.target.parentElement.appendChild(icon);
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

const EmptyState = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      mt: 4,
      p: 4,
      border: '2px dashed',
      borderColor: 'divider',
      borderRadius: 2,
    }}
  >
    <BusinessIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
    <Typography variant="h6" color="text.secondary" align="center">
      No Client Logos Found
    </Typography>
    <Typography variant="body1" color="text.secondary" align="center">
      Add your client logos to the src/assets/clients directory to display them here.
      <br />
      Supported formats: JPG, JPEG, PNG, SVG, WEBP
    </Typography>
  </Box>
);

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = React.useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClientLogos = () => {
      try {
        const clientsData = getClientLogos();
        setClients(clientsData);
        if (clientsData.length === 0) {
          setError('No client logos found');
        } else {
          setError(null);
        }
      } catch (err) {
        console.error('Error loading client logos:', err);
        setError('Error loading client logos. Please check the console for details.');
      }
    };

    loadClientLogos();
  }, []);

  // Continuous scrolling effect
  useEffect(() => {
    if (!scrollContainerRef.current || clients.length === 0) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrameId;
    let currentScroll = 0;
    const SCROLL_SPEED = 1.5; // Increased speed (was 0.5)

    const scroll = () => {
      if (!isPaused) {
        currentScroll += SCROLL_SPEED;
        
        // Reset scroll position when reaching the end of the first set
        if (currentScroll >= scrollContainer.scrollWidth / 3) {
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

        {clients.length > 0 ? (
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
        ) : (
          <EmptyState />
        )}
      </Container>
    </Section>
  );
};

export default Clients; 