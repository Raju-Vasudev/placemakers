import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Section, GradientTypography } from './StyledComponents';

const clients = [
  {
    name: 'Tech Corp',
    description: 'Leading technology company with multiple office locations',
  },
  {
    name: 'Healthcare Plus',
    description: 'Network of modern healthcare facilities',
  },
  {
    name: 'Retail Group',
    description: 'Major retail chain with nationwide presence',
  },
  {
    name: 'Education First',
    description: 'Educational institutions and campus facilities',
  },
  {
    name: 'Industrial Solutions',
    description: 'Manufacturing and industrial facilities',
  },
  {
    name: 'Corporate Plaza',
    description: 'Premium office spaces and business centers',
  },
];

const Clients = () => {
  return (
    <Section id="clients">
      <Container>
        <Box textAlign="center" mb={6}>
          <GradientTypography variant="h2" component="h2" gutterBottom>
            Our Clients
          </GradientTypography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Trusted by leading organizations
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {clients.map((client, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  background: (theme) => theme.palette.background.paper,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Typography variant="h5" component="h3" gutterBottom>
                  {client.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {client.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Clients; 