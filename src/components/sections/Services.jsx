import React, { useState } from 'react';
import { Box, Container, Typography, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Section, ServiceCard, GradientTypography, IconWrapper } from './StyledComponents';
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

  return (
    <>
      <ServiceCard 
        elevation={3}
        sx={{ 
          width: CARD_DIMENSIONS.width,
          height: CARD_DIMENSIONS.height,
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
          <Box 
            display="flex" 
            flexDirection="column"
            alignItems="flex-start"
            sx={{ height: '100%' }}
          >
            {/* Icon */}
            <IconWrapper 
              sx={{ 
                width: CARD_DIMENSIONS.iconSize,
                height: CARD_DIMENSIONS.iconSize,
                mb: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                '& svg': {
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                  color: 'primary.main'
                }
              }}
            >
              <Icon fontSize="large" />
            </IconWrapper>
            
            {/* Title */}
            <Typography 
              variant="h5" 
              component="h3" 
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '1.3rem', sm: '1.2rem' },
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {service.title}
            </Typography>
            
            {/* Description */}
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
                }
              }}
            >
              {service.description}
            </Typography>
            
            {/* Button */}
            <Button
              onClick={() => setOpen(true)}
              endIcon={<KeyboardArrowRightIcon />}
              variant="text"
              sx={{
                alignSelf: 'center',
                color: 'primary.main',
                mt: 2,
                '&:hover': {
                  background: 'none',
                  color: 'primary.dark',
                  '& .MuiSvgIcon-root': {
                    transform: 'translateX(4px)'
                  }
                },
                '& .MuiSvgIcon-root': {
                  transition: 'transform 0.2s ease-in-out'
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
        TransitionProps={{
          timeout: 400
        }}
        PaperProps={{
          elevation: 0
        }}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '16px',
            m: { xs: 2, sm: 4 },
            p: { xs: 0, sm: 2 },
            background: (theme) => 
              theme.palette.mode === 'dark' 
                ? 'rgba(22, 28, 36, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(4px)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            py: 3,
            px: { xs: 3, sm: 4 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'divider',
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(22, 28, 36, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <IconWrapper 
              sx={{ 
                width: 52,
                height: 52,
                borderRadius: '14px',
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                '& svg': { 
                  fontSize: '1.75rem',
                  color: 'primary.main'
                }
              }}
            >
              <Icon fontSize="large" />
            </IconWrapper>
            <Typography 
              variant="h5" 
              component="span" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                color: 'text.primary'
              }}
            >
              {service.title}
            </Typography>
          </Box>
          <IconButton 
            onClick={() => setOpen(false)} 
            aria-label="close"
            sx={{ 
              width: 40,
              height: 40,
              borderRadius: '12px',
              color: 'text.secondary',
              '&:hover': { 
                background: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
                color: 'text.primary'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent 
          sx={{ 
            p: { xs: 3, sm: 4 },
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '8px',
              backgroundColor: (theme) => 
                theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.2)',
            }
          }}
        >
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ 
              mb: 4, 
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
            {service.description}
          </Typography>

          {service.subgroups ? (
            service.subgroups.map((subgroup, subIndex) => (
              <Box 
                key={subIndex} 
                sx={{ 
                  mb: 4,
                  '&:last-child': { mb: 0 },
                  p: 3,
                  borderRadius: '12px',
                  background: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(0, 0, 0, 0.02)',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&::before': {
                      content: '""',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'block'
                    }
                  }}
                >
                  {subgroup.title}
                </Typography>
                {subgroup.description && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      lineHeight: 1.7,
                      pl: 1.5
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
                    gap: 1.5,
                    pl: 1.5
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
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'text.primary',
                          transform: 'translateX(4px)'
                        },
                        '&::before': {
                          content: '"•"',
                          color: 'primary.main',
                          mr: 1.5,
                          fontSize: '1.2rem',
                          lineHeight: 1,
                          opacity: 0.7
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
                p: 3,
                m: 0,
                display: 'grid',
                gap: 1.5,
                borderRadius: '12px',
                background: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'rgba(0, 0, 0, 0.02)',
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
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
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'text.primary',
                      transform: 'translateX(4px)'
                    },
                    '&::before': {
                      content: '"•"',
                      color: 'primary.main',
                      mr: 1.5,
                      fontSize: '1.2rem',
                      lineHeight: 1,
                      opacity: 0.7
                    }
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const Services = () => {
  return (
    <Section 
      id="services"
      sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' 
          ? 'background.default' 
          : 'grey.50',
        py: { xs: 8, md: 10 }
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
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
            color="text.secondary" 
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
        <Box 
          sx={{ 
            maxWidth: theme => ({ xs: 400, sm: 600, md: 1200 }),
            mx: 'auto'
          }}
        >
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
            {servicesConfig.serviceGroups.map((service, index) => (
              <Grid2 key={index} xs={12} sm={6} md={4} lg={4}>
                <ServiceCardItem service={service} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </Section>
  );
};

export default Services; 