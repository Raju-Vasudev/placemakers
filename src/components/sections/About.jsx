import React from 'react';
import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Section, GradientTypography, SectionSubheading, SectionHeadingWrapper } from './StyledComponents';
import { aboutConfig } from '../../config/aboutConfig';

const About = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Section id="about">
      <Container maxWidth="lg">
        <SectionHeadingWrapper>
          <GradientTypography variant="h2" component="h2">
            {aboutConfig.title}
          </GradientTypography>
          <SectionSubheading variant="h5">
            {aboutConfig.subtitle}
          </SectionSubheading>
        </SectionHeadingWrapper>

        <Box mb={6}>
          {aboutConfig.introduction.map((text, index) => (
            <Typography 
              key={index} 
              variant="body1" 
              sx={{ 
                mb: 2,
                color: theme.palette.text.primary 
              }}
            >
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
                  background: isDarkMode 
                    ? 'rgba(42, 42, 42, 0.9)' 
                    : 'rgba(255, 255, 255, 0.9)',
                  color: theme.palette.text.primary,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: isDarkMode ? 8 : 6,
                  },
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2 
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%', 
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: theme.palette.text.primary
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6,
                    overflow: 'auto',
                    height: '70%',
                    pr: 1,
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '4px',
                    }
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