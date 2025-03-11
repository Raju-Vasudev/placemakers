import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ContactForm from './ContactForm';
import FloatingContactButton from './FloatingContactButton';
import { useFormValidation } from '../hooks/useFormValidation';

// Create Alert component outside to prevent recreation on each render
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  message: '',
};

const ContactFormContainer = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const lastFocusedElementRef = useRef(null);

  const {
    errors,
    touched,
    validateForm,
    handleBlur,
    handleValidateField,
    resetValidation,
  } = useFormValidation();

  const handleOpenContactForm = useCallback((event) => {
    if (event) {
      lastFocusedElementRef.current = document.activeElement;
    }
    setIsContactFormOpen(true);
  }, []);

  const handleCloseContactForm = useCallback(() => {
    setIsContactFormOpen(false);
    resetForm();
    
    // Return focus to the element that opened the form
    setTimeout(() => {
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      }
    }, 100);
  }, []);

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    handleValidateField(name, value);
  }, [handleValidateField]);

  const handleFieldBlur = useCallback((e) => {
    const { name, value } = e.target;
    handleBlur(name);
    handleValidateField(name, value);
  }, [handleBlur, handleValidateField]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    resetValidation();
  }, [resetValidation]);

  const isFormValid = useCallback(() => {
    const hasAllFields = Object.values(formData).every(value => value.trim());
    const hasNoErrors = Object.keys(errors).length === 0;
    return hasAllFields && hasNoErrors;
  }, [formData, errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation
    Object.keys(formData).forEach(field => handleBlur(field));
    
    const isValid = validateForm(formData);
    if (!isValid) {
      // Announce validation errors to screen readers
      const errorMessage = Object.values(errors).join('. ');
      const errorAnnouncement = document.getElementById('form-error-announcement');
      if (errorAnnouncement) {
        errorAnnouncement.textContent = `Form validation failed: ${errorMessage}`;
      }
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      });
      
      handleCloseContactForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, errors, validateForm, handleBlur, handleCloseContactForm]);

  return (
    <>
      <FloatingContactButton onClick={handleOpenContactForm} />
      
      <ContactForm
        open={isContactFormOpen}
        onClose={handleCloseContactForm}
        formData={formData}
        errors={errors}
        touched={touched}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onBlur={handleFieldBlur}
        isValid={isFormValid()}
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
          sx={{ width: '100%' }}
          aria-live="assertive"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      
      {/* Hidden elements for screen reader announcements */}
      <div 
        id="form-error-announcement" 
        className="visually-hidden" 
        aria-live="assertive" 
        role="alert"
      ></div>
      
      <div 
        id="form-status-announcement" 
        className="visually-hidden" 
        aria-live="polite"
      >
        {isSubmitting ? 'Submitting your message, please wait...' : ''}
      </div>
    </>
  );
};

export default ContactFormContainer; 