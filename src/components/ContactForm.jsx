import React from 'react';
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
        <Box component="form" id="contact-form" onSubmit={onSubmit} sx={{ p: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
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
                onChange={onChange}
                onBlur={onBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                onChange={onChange}
                onBlur={onBlur}
                error={touched.message && Boolean(errors.message)}
                helperText={touched.message && errors.message}
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
          type="submit"
          form="contact-form"
          variant="contained"
          endIcon={<SendIcon />}
          disabled={isSubmitting || !isValid}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            color: 'white',
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
            },
            '&:disabled': {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
            },
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactForm; 