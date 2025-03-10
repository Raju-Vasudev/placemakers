import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Section, GradientTypography } from './StyledComponents';

const About = () => {
  return (
    <Section id="about">
      <Container>
        <Box textAlign="center" mb={6}>
          <GradientTypography variant="h2" component="h2" gutterBottom>
            About Us
          </GradientTypography>
          <Typography variant="h5" color="textSecondary" paragraph>
            We are a leading facility management company dedicated to excellence
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              At Placemakers, we understand that managing facilities is more than just maintaining buildings – it's about creating environments where people thrive. Our comprehensive approach combines innovative technology with decades of industry expertise to deliver solutions that enhance operational efficiency, reduce costs, and improve occupant satisfaction.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Our team of experienced professionals is committed to providing customized facility management solutions that meet your unique needs. Whether you're managing a single facility or multiple locations, we have the expertise and resources to help you achieve your goals.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

export default About; 