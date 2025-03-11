import React, { useState } from 'react';
import { Box, Container, Typography, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Section, ServiceCard, GradientTypography, IconWrapper, SectionSubheading, SectionHeadingWrapper } from './StyledComponents';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { servicesConfig } from '../../config/servicesConfig';

// Fixed dimensions for cards
const CARD_DIMENSIONS = {
  width: { xs: '280px', sm: '240px', md: '260px' },
  height: { xs: '280px', sm: '240px', md: '260px' },
  iconSize: { xs: 56, sm: 64 },
  titleHeight: { xs: 48, sm: 52 },
  descriptionHeight: { xs: 72, sm: 76 }
};

const ServiceCardItem = ({ service }) => {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <>
      <ServiceCard 
        elevation={3}
        sx={{ 
          width: CARD_DIMENSIONS.width,
          height: CARD_DIMENSIONS.height,
          p: 2.5,
          mb: 2,
          background: isDarkMode 
            ? 'rgba(42, 42, 42, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: isDarkMode ? 8 : 6,
          }
        }}
      >
        <CardContent 
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 0 },
            '&:last-child': { pb: 0 }
          }}
        >
          <IconWrapper sx={{ mb: 2 }}>
            <Icon fontSize="large" />
          </IconWrapper>
          
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 'bold',
              mb: 1.5,
              height: CARD_DIMENSIONS.titleHeight,
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.text.primary
            }}
          >
            {service.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2,
              height: CARD_DIMENSIONS.descriptionHeight,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              color: theme.palette.text.secondary
            }}
          >
            {service.description}
          </Typography>
          
          <Box sx={{ mt: 'auto' }}>
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => setOpen(true)}
              endIcon={<KeyboardArrowRightIcon />}
              aria-label={`Learn more about ${service.title}`}
              sx={{
                fontWeight: 'bold',
                '&:hover': {
                  background: isDarkMode 
                    ? 'rgba(60, 112, 186, 0.1)' 
                    : 'rgba(27, 75, 145, 0.1)',
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </CardContent>
      </ServiceCard>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        aria-labelledby={`service-dialog-title-${service.id}`}
        aria-describedby={`service-dialog-description-${service.id}`}
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: theme.palette.background.paper,
          }
        }}
      >
        <DialogTitle id={`service-dialog-title-${service.id}`}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" component="div" fontWeight="bold" color="text.primary">
              {service.title}
            </Typography>
            <IconButton 
              onClick={() => setOpen(false)} 
              size="small"
              aria-label="Close dialog"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              id={`service-dialog-description-${service.title}`}
              paragraph
              color="text.primary"
            >
              {service.description}
            </Typography>
          </Box>
          
          {service.subgroups ? (
            service.subgroups.map((subgroup, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="text.primary">
                  {subgroup.title}
                </Typography>
                {subgroup.description && (
                  <Typography variant="body1" paragraph color="text.primary">
                    {subgroup.description}
                  </Typography>
                )}
                <Box component="ul" sx={{ pl: 2 }}>
                  {subgroup.items.map((item, itemIndex) => (
                    <Typography 
                      component="li" 
                      variant="body1" 
                      key={itemIndex}
                      sx={{ mb: 1 }}
                      color="text.primary"
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="text.primary">
                Services Offered
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {service.items.map((item, index) => (
                  <Typography 
                    component="li" 
                    variant="body1" 
                    key={index}
                    sx={{ mb: 1 }}
                    color="text.primary"
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpen(false)} 
            variant="outlined"
            aria-label="Close service details"
          >
            Close
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setOpen(false);
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Contact us about this service"
          >
            Contact Us
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Services = () => {
  const theme = useTheme();
  
  return (
    <Section id="services">
      <Container maxWidth="lg">
        <SectionHeadingWrapper>
          <GradientTypography variant="h2" component="h2">
            {servicesConfig.title}
          </GradientTypography>
          <SectionSubheading variant="h5">
            {servicesConfig.subtitle}
          </SectionSubheading>
        </SectionHeadingWrapper>

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
          {servicesConfig.serviceGroups.map((service) => (
            <Grid2 key={service.title} xs={12} sm={6} md={4} lg={4}>
              <ServiceCardItem service={service} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Section>
  );
};

export default Services; 