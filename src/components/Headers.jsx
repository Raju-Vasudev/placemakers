import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, Container, IconButton, Drawer, List, ListItem, ListItemText, Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../context/ThemeContext';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  transition: 'all 0.3s ease',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: 'all 0.3s ease',
}));

const Logo = styled('img')({
  height: '50px',
  marginRight: '16px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 2),
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
    opacity: 0,
  },
  '&:hover': {
    background: 'transparent',
    '&::after': {
      width: '80%',
      opacity: 1,
    },
  },
}));

const navItems = [
  { title: 'Home', id: 'home' },
  { title: 'About Us', id: 'about' },
  { title: 'Services', id: 'services' },
  { title: 'Gallery', id: 'gallery' },
  { title: 'Clients', id: 'clients' },
  { title: 'Contact', id: 'contact' },
  { title: 'FAQ', id: 'faq' },
];

const Headers = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastFocusedElementRef = useRef(null);
  const { mode, toggleTheme } = useThemeContext();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = (event) => {
    if (event) {
      lastFocusedElementRef.current = event.currentTarget;
    }
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
    // Return focus to the element that opened the drawer
    if (lastFocusedElementRef.current) {
      setTimeout(() => {
        lastFocusedElementRef.current.focus();
      }, 100);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setMobileOpen(false);
      
      // Set focus to the section for better keyboard navigation
      setTimeout(() => {
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
      }, 1000);
    }
  };

  const handleKeyDown = (event, sectionId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const drawer = (
    <Box 
      onClick={handleDrawerClose} 
      sx={{ textAlign: 'center' }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
        <Logo 
          src="/placemakers/placemakers-logo.svg" 
          alt="Placemakers Logo"
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.id} 
            disablePadding
            component="li"
          >
            <Button
              fullWidth
              onClick={() => scrollToSection(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              sx={{ textAlign: 'center', py: 1.5 }}
              aria-label={`Navigate to ${item.title} section`}
            >
              <ListItemText primary={item.title} />
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding component="li">
          <Button
            fullWidth
            onClick={handleThemeToggle}
            sx={{ textAlign: 'center', py: 1.5 }}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            <ListItemText primary={`${mode === 'light' ? 'Dark' : 'Light'} Mode`} />
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <a 
        href="#main-content" 
        className="skip-link"
        style={{
          position: 'absolute',
          top: '-40px',
          left: 0,
          background: '#2B5BA1',
          color: 'white',
          padding: '8px',
          zIndex: 9999,
          transition: 'top 0.3s',
        }}
        onFocus={(e) => {
          e.target.style.top = '0';
        }}
        onBlur={(e) => {
          e.target.style.top = '-40px';
        }}
      >
        Skip to main content
      </a>
      <StyledAppBar 
        position="fixed" 
        elevation={isScrolled ? 4 : 0}
        component="nav"
        aria-label="Main navigation"
        sx={{
          bgcolor: isScrolled ? 'background.paper' : 'transparent',
          boxShadow: isScrolled ? 2 : 'none',
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar 
            disableGutters 
            sx={{ 
              minHeight: isScrolled ? 64 : 80,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo 
                src="/placemakers/placemakers-logo.svg" 
                alt="Placemakers Logo"
                style={{ height: isScrolled ? '40px' : '50px', cursor: 'pointer' }}
                onClick={() => scrollToSection('home')}
                onKeyDown={(e) => handleKeyDown(e, 'home')}
                tabIndex="0"
                role="button"
                aria-label="Go to home section"
              />
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {navItems.map((item) => (
                <StyledButton 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  aria-label={`Navigate to ${item.title} section`}
                >
                  {item.title}
                </StyledButton>
              ))}
              <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton 
                  onClick={handleThemeToggle} 
                  color="inherit"
                  aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
                  className="theme-toggle-button"
                  sx={{ ml: 2 }}
                >
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Tooltip>
            </Box>
            
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton 
                  onClick={handleThemeToggle} 
                  color="inherit"
                  aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
                  className="theme-toggle-button"
                  sx={{ mr: 1 }}
                >
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Tooltip>
              <IconButton
                color="inherit"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-menu"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
      
      <Box component="nav">
        <Drawer
          id="mobile-navigation-menu"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box component="div" sx={{ height: { xs: 56, md: 64 } }} />
    </>
  );
};

export default Headers;