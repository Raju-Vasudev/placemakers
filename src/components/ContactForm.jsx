import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Zoom,
  useTheme,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const ContactForm = ({
  open,
  onClose,
  formData,
  errors,
  touched,
  isSubmitting,
  onSubmit,
  onChange,
  onBlur,
  isValid,
}) => {
  const theme = useTheme();
  const firstInputRef = useRef(null);
  const submitButtonRef = useRef(null);

  // Focus management
  useEffect(() => {
    if (open && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current.focus();
      }, 100);
    }
  }, [open]);

  const handleKeyDown = (e) => {
    // Close on escape
    if (e.key === 'Escape') {
      onClose();
    }
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
          background: theme.palette.background.paper,
        }
      }}
      aria-labelledby="contact-form-dialog-title"
      aria-describedby="contact-form-dialog-description"
      onKeyDown={handleKeyDown}
    >
      <DialogTitle id="contact-form-dialog-title">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="div" fontWeight="bold">
            Send us a Message
          </Typography>
          <IconButton 
            onClick={onClose} 
            size="small"
            aria-label="Close contact form"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box 
          component="form" 
          id="contact-form" 
          onSubmit={onSubmit} 
          sx={{ p: 2 }}
          role="form"
          aria-describedby="form-description"
        >
          <Typography id="form-description" variant="body2" sx={{ mb: 3 }} className="visually-hidden">
            Please fill out the form below to contact us. All fields marked with an asterisk are required.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="contact-name"
                label="Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                required
                variant="outlined"
                inputRef={firstInputRef}
                inputProps={{
                  'aria-required': 'true',
                  'aria-invalid': touched.name && Boolean(errors.name),
                  'aria-describedby': touched.name && errors.name ? 'name-error' : undefined,
                }}
              />
              {touched.name && errors.name && (
                <span id="name-error" className="visually-hidden">
                  {errors.name}
                </span>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="contact-email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                required
                variant="outlined"
                inputProps={{
                  'aria-required': 'true',
                  'aria-invalid': touched.email && Boolean(errors.email),
                  'aria-describedby': touched.email && errors.email ? 'email-error' : undefined,
                }}
              />
              {touched.email && errors.email && (
                <span id="email-error" className="visually-hidden">
                  {errors.email}
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="contact-message"
                label="Message"
                name="message"
                multiline
                rows={6}
                value={formData.message}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.message && Boolean(errors.message)}
                helperText={touched.message && errors.message}
                required
                variant="outlined"
                inputProps={{
                  'aria-required': 'true',
                  'aria-invalid': touched.message && Boolean(errors.message),
                  'aria-describedby': touched.message && errors.message ? 'message-error' : undefined,
                }}
              />
              {touched.message && errors.message && (
                <span id="message-error" className="visually-hidden">
                  {errors.message}
                </span>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          sx={{ mr: 1 }}
          aria-label="Cancel and close form"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="contact-form"
          variant="contained"
          disabled={!isValid || isSubmitting}
          endIcon={<SendIcon />}
          ref={submitButtonRef}
          aria-label="Submit contact form"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </DialogActions>
      {/* Screen reader announcements */}
      <div aria-live="polite" className="visually-hidden">
        {isSubmitting ? 'Submitting your message, please wait...' : ''}
      </div>
    </Dialog>
  );
};

export default ContactForm; 