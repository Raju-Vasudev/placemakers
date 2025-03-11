import React from 'react';
import { Fab, Tooltip, useScrollTrigger, Zoom } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const FloatingContactButton = ({ onClick }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <Tooltip title="Contact Us" placement="left">
        <Fab
          color="primary"
          aria-label="contact"
          onClick={onClick}
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
          }}
        >
          <MessageIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default FloatingContactButton; 