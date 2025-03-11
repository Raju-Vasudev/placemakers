import React, { useEffect, useState, useCallback } from 'react';
import { Box, Container, Typography, Card, IconButton, Grid } from '@mui/material';
import { Section, GradientTypography, SectionSubheading, SectionHeadingWrapper } from './StyledComponents';
import { getClientLogos } from '../../utils/clientUtils';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessIcon from '@mui/icons-material/Business';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

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
  const [isGridView, setIsGridView] = useState(false);
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
    if (!scrollContainerRef.current || clients.length === 0 || isGridView) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrameId;
    let currentScroll = 0;
    const SCROLL_SPEED = 1.5;

    const scroll = () => {
      if (!isPaused) {
        currentScroll += SCROLL_SPEED;
        
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
  }, [clients, isPaused, isGridView]);

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

  const GridViewComponent = () => (
    <Box
      sx={{
        mt: 4,
        height: '500px',
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: (theme) => 
            `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          borderRadius: '4px',
          '&:hover': {
            background: (theme) => 
              `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
          },
        },
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {clients.map((client, index) => (
          <Grid item xs={12} sm={6} md={3} key={`${client.name}-${index}`}>
            <ClientCard {...client} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const CarouselView = () => (
    <Box 
      sx={{ 
        position: 'relative',
        px: { xs: 0, md: 2 },
        overflow: 'hidden',
      }}
    >
      <Box
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        sx={{
          display: 'flex',
          overflowX: 'hidden',
          py: 2,
          px: { xs: 2, md: 0 },
          gap: 2,
          width: '100%',
          '& > *': {
            flex: '0 0 auto',
          },
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
  );

  return (
    <Section id="clients">
      <Container maxWidth="xl">
        <SectionHeadingWrapper>
          <GradientTypography variant="h2" component="h2">
            Our Clients
          </GradientTypography>
          <SectionSubheading variant="h5">
            Trusted by leading organizations across industries
          </SectionSubheading>
          {clients.length > 0 && (
            <IconButton
              onClick={() => setIsGridView(!isGridView)}
              sx={{
                mt: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              {isGridView ? <ViewCarouselIcon /> : <GridViewIcon />}
            </IconButton>
          )}
        </SectionHeadingWrapper>

        {clients.length > 0 ? (
          isGridView ? <GridViewComponent /> : <CarouselView />
        ) : (
          <EmptyState />
        )}
      </Container>
    </Section>
  );
};

export default Clients; 