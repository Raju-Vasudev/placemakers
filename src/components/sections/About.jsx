import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Section, GradientTypography } from './StyledComponents';
import { aboutConfig } from '../../config/aboutConfig';

const About = () => {
  return (
    <Section id="about">
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <GradientTypography variant="h2" component="h2" gutterBottom>
            {aboutConfig.title}
          </GradientTypography>
          <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
            {aboutConfig.subtitle}
          </Typography>
        </Box>

        <Box mb={6}>
          {aboutConfig.introduction.map((text, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 2 }}>
              {text}
            </Typography>
          ))}
        </Box>

        <Grid2 
          container 
          spacing={3} 
          justifyContent="center"
          sx={{
            '& .MuiGrid2-root': {
              display: 'flex',
              justifyContent: 'center',
            }
          }}
        >
          {aboutConfig.agendaItems.map((item, index) => (
            <Grid2 key={index} xs={12} sm={6} md={4} lg={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  width: { xs: '280px', sm: '240px', md: '260px' },
                  height: { xs: '280px', sm: '240px', md: '260px' },
                  p: 2.5,
                  mb: 2,
                  background: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography 
                  variant="h5" 
                  color="primary" 
                  sx={{ 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: { xs: '1.3rem', sm: '1.2rem' },
                  }}
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    textAlign: 'center',
                    overflow: 'auto',
                    flex: 1,
                    fontSize: { xs: '0.9rem', sm: '0.85rem' },
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: '4px',
                    },
                  }}
                >
                  {item.content}
                </Typography>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Section>
  );
};

export default About; 