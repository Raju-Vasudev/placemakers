import React from 'react';
import { Box, Container, Typography, CardContent } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Section, ServiceCard, GradientTypography, IconWrapper } from './StyledComponents';
import BuildIcon from '@mui/icons-material/Build';
import SecurityIcon from '@mui/icons-material/Security';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

const services = [
  {
    title: 'Maintenance',
    description: 'Comprehensive maintenance services for all facility systems',
    icon: <BuildIcon fontSize="large" />,
  },
  {
    title: 'Security',
    description: '24/7 security monitoring and access control systems',
    icon: <SecurityIcon fontSize="large" />,
  },
  {
    title: 'Cleaning',
    description: 'Professional cleaning and sanitization services',
    icon: <CleaningServicesIcon fontSize="large" />,
  },
  {
    title: 'Engineering',
    description: 'Expert engineering solutions for facility optimization',
    icon: <EngineeringIcon fontSize="large" />,
  },
  {
    title: 'Parking',
    description: 'Efficient parking management and maintenance',
    icon: <LocalParkingIcon fontSize="large" />,
  },
  {
    title: 'Electrical',
    description: 'Complete electrical system maintenance and repairs',
    icon: <ElectricalServicesIcon fontSize="large" />,
  },
];

const Services = () => {
  return (
    <Section id="services">
      <Container>
        <Box textAlign="center" mb={6}>
          <GradientTypography variant="h2" component="h2" gutterBottom>
            Our Services
          </GradientTypography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Comprehensive facility management solutions
          </Typography>
        </Box>
        <Grid2 container spacing={4}>
          {services.map((service, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <ServiceCard>
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <IconWrapper>
                      {service.icon}
                    </IconWrapper>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" align="center">
                      {service.description}
                    </Typography>
                  </Box>
                </CardContent>
              </ServiceCard>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Section>
  );
};

export default Services; 