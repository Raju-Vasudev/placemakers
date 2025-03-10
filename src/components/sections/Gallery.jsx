import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton, Grid } from '@mui/material';
import { Section, GradientTypography } from './StyledComponents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

const galleryImages = [
  {
    title: "DevOps Pipeline",
    src: "images/gallery/DevOps.png",
    gradient: "linear-gradient(45deg, #FF6B6B, #4ECDC4)"
  },
  {
    title: "AI ML Deep Learning",
    src: "images/gallery/AI-ML-DL-NN Relation.png",
    gradient: "linear-gradient(45deg, #6C5B7B, #C06C84)"
  },
  {
    title: "Project Repository",
    src: "images/gallery/AI Project github URL.png",
    gradient: "linear-gradient(45deg, #355C7D, #6C5B7B)"
  },
  {
    title: "System Architecture",
    src: "images/gallery/Screenshot 2025-03-10 at 10.23.39.png",
    gradient: "linear-gradient(45deg, #2C3E50, #3498DB)"
  },
  {
    title: "Project Dashboard",
    src: "images/gallery/Screenshot 2025-03-06 at 15.43.21.png",
    gradient: "linear-gradient(45deg, #16A085, #F4D03F)"
  },
  {
    title: "Development Process",
    src: "images/gallery/Screenshot 2025-03-06 at 08.44.38.png",
    gradient: "linear-gradient(45deg, #D4145A, #FBB03B)"
  },
  {
    title: "Project Overview",
    src: "images/gallery/Screenshot 2025-03-05 at 21.51.10.png",
    gradient: "linear-gradient(45deg, #009688, #4CAF50)"
  }
];

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextSlide = () => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const CarouselView = () => (
    <Box
      sx={{
        position: 'relative',
        height: '500px',
        overflow: 'hidden',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      {galleryImages.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: currentSlide === index ? 1 : 0,
            transform: `translateX(${
              currentSlide === index
                ? '0%'
                : slideDirection === 'next'
                ? '-100%'
                : '100%'
            })`,
            transition: 'transform 1.5s ease, opacity 1s ease',
            background: image.gradient,
          }}
        >
          <img
            src={image.src}
            alt={image.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = image.gradient;
            }}
          />
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              padding: '0 20px',
            }}
          >
            {image.title}
          </Typography>
        </Box>
      ))}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          gap: '10px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
        }}
      >
        <IconButton onClick={handlePrevSlide} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={handleNextSlide} sx={{ color: 'white' }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );

  const GridViewComponent = () => (
    <Box
      sx={{
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
      <Grid container spacing={3}>
        {galleryImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                height: 300,
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                background: image.gradient,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <img
                src={image.src}
                alt={image.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '16px',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = image.gradient;
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '10px',
                  textAlign: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {image.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Section id="gallery">
      <Container>
        <Box textAlign="center" mb={6}>
          <GradientTypography variant="h2" component="h2" gutterBottom>
            Gallery
          </GradientTypography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Explore our project showcase
          </Typography>
          <IconButton
            onClick={() => setIsGridView(!isGridView)}
            sx={{ mb: 2 }}
          >
            {isGridView ? <ViewCarouselIcon /> : <GridViewIcon />}
          </IconButton>
        </Box>
        {isGridView ? <GridViewComponent /> : <CarouselView />}
      </Container>
    </Section>
  );
};

export default Gallery; 