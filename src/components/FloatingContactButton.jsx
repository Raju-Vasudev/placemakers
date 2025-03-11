import React from 'react';
import { Fab, Tooltip, useScrollTrigger, Zoom } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const FloatingContactButton = ({ onClick }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Zoom in={trigger}>
      <Tooltip 
        title="Contact Us" 
        placement="left"
        aria-label="Open contact form"
      >
        <Fab
          color="primary"
          aria-label="Open contact form"
          onClick={onClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1000,
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            '&:hover': {
              background: (theme) =>
                `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
            },
            '&:focus-visible': {
              outline: (theme) => `3px solid ${theme.palette.primary.dark}`,
              outlineOffset: '2px',
            },
          }}
        >
          <MessageIcon aria-hidden="true" />
          <span className="visually-hidden">Contact Us</span>
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default FloatingContactButton; 