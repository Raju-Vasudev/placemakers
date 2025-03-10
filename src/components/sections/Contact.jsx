import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
  Link,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Zoom,
} from '@mui/material';
import { Section, GradientTypography, SectionSubheading, SectionHeadingWrapper } from './StyledComponents';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import { contactConfig } from '../../config/contactConfig';

const SocialLinks = () => (
  <Box display="flex" gap={2} mt={4}>
    <Link href={contactConfig.socialMedia.linkedin} target="_blank" color="primary">
      <LinkedInIcon fontSize="large" />
    </Link>
    <Link href={contactConfig.socialMedia.facebook} target="_blank" color="primary">
      <FacebookIcon fontSize="large" />
    </Link>
    <Link href={contactConfig.socialMedia.twitter} target="_blank" color="primary">
      <TwitterIcon fontSize="large" />
    </Link>
  </Box>
);

const ContactForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Zoom}
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: (theme) => theme.palette.background.paper,
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="div" fontWeight="bold">
            Send us a Message
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            color: 'white',
            '&:hover': {
              background: (theme) =>
                `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
            },
          }}
        >
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ContactInfo = () => (
  <Box sx={{ height: '100%' }}>
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: '100%',
        borderRadius: 2,
        background: (theme) => theme.palette.background.paper,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Box mb={4}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Contact Information
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Get in touch with us directly or use the message button to send us a message.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left side - Contact Information */}
        <Grid item xs={12} md={6}>
          <Box mb={3} display="flex" alignItems="flex-start" gap={2}>
            <LocationOnIcon color="primary" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Address
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {contactConfig.companyName}
                <br />
                {contactConfig.address.street}
                <br />
                {contactConfig.address.area}
                <br />
                {contactConfig.address.city}, {contactConfig.address.state} {contactConfig.address.pincode}
                <br />
                {contactConfig.address.country}
              </Typography>
            </Box>
          </Box>

          <Box mb={3} display="flex" alignItems="center" gap={2}>
            <PhoneIcon color="primary" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {contactConfig.contact.phone}
              </Typography>
            </Box>
          </Box>

          <Box mb={3} display="flex" alignItems="center" gap={2}>
            <EmailIcon color="primary" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Email
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {contactConfig.contact.email}
              </Typography>
            </Box>
          </Box>

          <Box mb={3} display="flex" alignItems="center" gap={2}>
            <AccessTimeIcon color="primary" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Working Hours
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {contactConfig.contact.workingHours}
              </Typography>
            </Box>
          </Box>

          <SocialLinks />
        </Grid>

        {/* Right side - Map */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              minHeight: '400px',
              overflow: 'hidden',
              borderRadius: 2,
              '& iframe': {
                width: '100%',
                height: '100%',
                border: 0,
              },
            }}
          >
            <iframe
              src={contactConfig.map.embedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  </Box>
);

const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSubmit = (formData) => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    handleCloseForm();
    setSnackbar({
      open: true,
      message: 'Thank you for your message! We will get back to you soon.',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Section id="contact">
      <Container maxWidth="lg">
        <SectionHeadingWrapper>
          <GradientTypography variant="h2" component="h2">
            Contact Us
          </GradientTypography>
          <SectionSubheading variant="h5">
            Get in touch with us for any inquiries or support
          </SectionSubheading>
        </SectionHeadingWrapper>
        <Grid container>
          <Grid item xs={12}>
            <ContactInfo />
          </Grid>
        </Grid>

        <Fab
          color="primary"
          aria-label="send message"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            '&:hover': {
              background: (theme) =>
                `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
            },
          }}
          onClick={handleOpenForm}
        >
          <MessageIcon />
        </Fab>

        <ContactForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Section>
  );
};

export default Contact; 