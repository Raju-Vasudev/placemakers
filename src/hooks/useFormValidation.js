import { useState, useCallback } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters long';
    if (name.length > 50) return 'Name must be less than 50 characters';
    return '';
  };

  const validateMessage = (message) => {
    if (!message) return 'Message is required';
    if (message.length < 10) return 'Message must be at least 10 characters long';
    if (message.length > 1000) return 'Message must be less than 1000 characters';
    return '';
  };

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'name':
        return validateName(value);
      case 'message':
        return validateMessage(value);
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback((formData) => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateField]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleValidateField = useCallback((name, value) => {
    const error = validateField(name, value);
    setErrors(prev => {
      if (!error) {
        const { [name]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: error };
    });
    return error;
  }, [validateField]);

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateForm,
    handleBlur,
    handleValidateField,
    resetValidation,
  };
}; 