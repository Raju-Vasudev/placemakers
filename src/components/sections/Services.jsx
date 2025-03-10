import React, { useState } from 'react';
import { Box, Container, Typography, CardContent, Button, Collapse } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Section, ServiceCard, GradientTypography, IconWrapper } from './StyledComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { servicesConfig } from '../../config/servicesConfig';

const ServiceCardItem = ({ service }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <ServiceCard 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: (theme) => `0 8px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'}`
        }
      }}
    >
      <CardContent 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 3 }
        }}
      >
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <IconWrapper 
            sx={{ 
              mb: 2.5,
              width: { xs: 60, sm: 70 },
              height: { xs: 60, sm: 70 },
              '& svg': {
                fontSize: { xs: '1.75rem', sm: '2rem' }
              }
            }}
          >
            <Icon fontSize="large" />
          </IconWrapper>
          
          <Typography 
            variant="h5" 
            component="h3" 
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            {service.title}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="textSecondary" 
            align="center" 
            sx={{ 
              mb: 3,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.6
            }}
          >
            {service.description}
          </Typography>
          
          <Button
            onClick={() => setExpanded(!expanded)}
            endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            sx={{
              minWidth: 140,
              px: 2.5,
              py: 1,
              borderRadius: 2,
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              color: 'white',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
              }
            }}
          >
            {expanded ? 'Hide Details' : 'View Details'}
          </Button>

          <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
            <Box 
              sx={{ 
                mt: 3,
                pt: 3,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}
            >
              {service.subgroups ? (
                service.subgroups.map((subgroup, subIndex) => (
                  <Box 
                    key={subIndex} 
                    sx={{ 
                      mb: 3,
                      '&:last-child': { mb: 0 }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        mb: 1.5
                      }}
                    >
                      {subgroup.title}
                    </Typography>
                    {subgroup.description && (
                      <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        sx={{ 
                          mb: 1.5,
                          lineHeight: 1.6
                        }}
                      >
                        {subgroup.description}
                      </Typography>
                    )}
                    <Box 
                      component="ul" 
                      sx={{ 
                        listStyle: 'none', 
                        p: 0,
                        m: 0,
                        display: 'grid',
                        gap: 1
                      }}
                    >
                      {subgroup.items.map((item, itemIndex) => (
                        <Box 
                          component="li" 
                          key={itemIndex}
                          sx={{ 
                            color: 'text.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.95rem',
                            '&::before': {
                              content: '"•"',
                              color: 'primary.main',
                              mr: 1.5,
                              fontSize: '1.2rem'
                            }
                          }}
                        >
                          {item}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))
              ) : (
                <Box 
                  component="ul" 
                  sx={{ 
                    listStyle: 'none', 
                    p: 0,
                    m: 0,
                    display: 'grid',
                    gap: 1
                  }}
                >
                  {service.items.map((item, itemIndex) => (
                    <Box 
                      component="li" 
                      key={itemIndex}
                      sx={{ 
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.95rem',
                        '&::before': {
                          content: '"•"',
                          color: 'primary.main',
                          mr: 1.5,
                          fontSize: '1.2rem'
                        }
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>
        </Box>
      </CardContent>
    </ServiceCard>
  );
};

const Services = () => {
  return (
    <Section id="services">
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <GradientTypography 
            variant="h2" 
            component="h2" 
            sx={{
              fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
              mb: 2,
              fontWeight: 700
            }}
          >
            {servicesConfig.title}
          </GradientTypography>
          <Typography 
            variant="h5" 
            color="textSecondary" 
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            {servicesConfig.subtitle}
          </Typography>
        </Box>
        <Grid2 
          container 
          spacing={{ xs: 3, md: 4 }}
          sx={{
            alignItems: 'stretch'
          }}
        >
          {servicesConfig.serviceGroups.map((service, index) => (
            <Grid2 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              sx={{
                display: 'flex'
              }}
            >
              <ServiceCardItem service={service} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Section>
  );
};

export default Services; 