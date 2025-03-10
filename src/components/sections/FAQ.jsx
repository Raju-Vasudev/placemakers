import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import { Section, GradientTypography } from './StyledComponents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'What services do you provide?',
    answer:
      'We offer comprehensive facility management services including maintenance, security, cleaning, engineering solutions, parking management, and electrical system maintenance.',
  },
  {
    question: 'How do you ensure quality service?',
    answer:
      'We maintain high standards through regular quality checks, trained professionals, modern equipment, and adherence to industry best practices. We also collect regular feedback from our clients to continuously improve our services.',
  },
  {
    question: 'Do you offer 24/7 support?',
    answer:
      'Yes, we provide round-the-clock support for emergency situations and critical facility management needs. Our team is always ready to respond to urgent requests.',
  },
  {
    question: 'What types of facilities do you manage?',
    answer:
      'We manage various types of facilities including office buildings, healthcare facilities, educational institutions, retail spaces, and industrial complexes.',
  },
  {
    question: 'How do you handle emergency situations?',
    answer:
      'We have a dedicated emergency response team and established protocols for different types of emergencies. Our team is trained to handle various situations promptly and efficiently.',
  },
  {
    question: 'What makes your company different from others?',
    answer:
      'Our unique approach combines innovative technology, experienced professionals, and customized solutions. We focus on preventive maintenance and proactive problem-solving to ensure smooth facility operations.',
  },
];

const FAQ = () => {
  return (
    <Section id="faq">
      <Container>
        <Box textAlign="center" mb={6}>
          <GradientTypography variant="h2" component="h2" gutterBottom>
            FAQ
          </GradientTypography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Frequently Asked Questions
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  background: (theme) => theme.palette.background.paper,
                  borderRadius: '8px !important',
                  '&:before': {
                    display: 'none',
                  },
                  '&:first-of-type': {
                    borderTopLeftRadius: '8px !important',
                    borderTopRightRadius: '8px !important',
                  },
                  '&:last-of-type': {
                    borderBottomLeftRadius: '8px !important',
                    borderBottomRightRadius: '8px !important',
                  },
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      margin: (theme) => theme.spacing(2, 0),
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      transform: 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      '&.Mui-expanded': {
                        transform: 'rotate(180deg)',
                      },
                    },
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontWeight: 600,
                      background: (theme) => 
                        `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pb: 3 }}>
                  <Typography 
                    variant="body1" 
                    color="textSecondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

export default FAQ; 