import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, IconButton, Grid, Paper } from '@mui/material';
import { Section, GradientTypography } from './StyledComponents';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import { getGalleryImages } from '../../utils/galleryUtils';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const StyledCarouselImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: theme.spacing(2),
  transition: 'transform 0.3s ease-out',
}));

const Gallery = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGalleryImages = () => {
      try {
        const images = getGalleryImages();
        setGalleryImages(images);
        if (images.length === 0) {
          setError('No images found in the gallery directory');
        } else {
          setError(null);
        }
      } catch (err) {
        console.error('Error loading gallery images:', err);
        setError('Error loading gallery images. Please check the console for details.');
      }
    };

    loadGalleryImages();
  }, []);

  const handleNext = useCallback(() => {
    if (galleryImages.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }
  }, [galleryImages.length]);

  const handlePrev = () => {
    if (galleryImages.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isGridView && !isPaused && galleryImages.length > 0) {
      const timer = setInterval(() => {
        handleNext();
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(timer);
    }
  }, [isGridView, isPaused, handleNext, galleryImages.length]);

  const CarouselView = () => (
    <Box
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{
        position: 'relative',
        height: '500px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: (theme) => `0 4px 20px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`,
      }}
    >
      <Box
        sx={{
          height: '100%',
          position: 'relative',
          background: galleryImages[currentIndex]?.gradient || 'linear-gradient(45deg, #f3f3f3, #e0e0e0)',
          transition: 'all 0.3s ease-out',
        }}
      >
        {galleryImages[currentIndex] && (
          <>
            <StyledCarouselImage
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].title}
              onError={(e) => {
                console.error(`Error loading image: ${galleryImages[currentIndex].src}`);
                e.target.style.display = 'none';
                e.target.parentElement.style.background = galleryImages[currentIndex].gradient;
              }}
            />
            <Paper
              elevation={0}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: 2,
              }}
            >
              <Typography variant="h6" align="center">
                {galleryImages[currentIndex].title}
              </Typography>
            </Paper>
          </>
        )}
      </Box>

      {galleryImages.length > 1 && (
        <>
          <IconButton
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.4)',
              },
            }}
            onClick={handlePrev}
          >
            <ArrowBackIcon sx={{ color: 'white' }} />
          </IconButton>

          <IconButton
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.4)',
              },
            }}
            onClick={handleNext}
          >
            <ArrowForwardIcon sx={{ color: 'white' }} />
          </IconButton>

          <Box
            sx={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              zIndex: 1,
            }}
          >
            {galleryImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2)',
                    bgcolor: 'white',
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}
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
              onClick={() => {
                setIsGridView(false);
                setCurrentIndex(index);
              }}
              sx={{
                height: 300,
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                background: image.gradient,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <StyledCarouselImage
                src={image.src}
                alt={image.title}
                onError={(e) => {
                  console.error(`Error loading image: ${image.src}`);
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
      <AddPhotoAlternateIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
      <Typography variant="h6" color="text.secondary" align="center">
        {error || 'No Images in Gallery'}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        Add your images to the src/assets/gallery directory to display them here.
        <br />
        Supported formats: JPG, JPEG, PNG
      </Typography>
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
          {galleryImages.length > 0 && (
            <IconButton
              onClick={() => setIsGridView(!isGridView)}
              sx={{
                mb: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              {isGridView ? <ViewCarouselIcon /> : <GridViewIcon />}
            </IconButton>
          )}
        </Box>

        {galleryImages.length > 0 ? (
          isGridView ? <GridViewComponent /> : <CarouselView />
        ) : (
          <EmptyState />
        )}
      </Container>
    </Section>
  );
};

export default Gallery; 