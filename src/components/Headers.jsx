import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Container, IconButton, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
        <Logo 
          src="/placemakers/placemakers-logo.svg" 
          alt="Place Makers" 
          sx={{ 
            height: '60px',
            objectFit: 'contain',
          }}
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Button
              sx={{ 
                width: '100%', 
                py: 1,
                color: 'text.primary',
                '&:hover': {
                  background: (theme) => 
                    `linear-gradient(45deg, ${theme.palette.primary.main}20 30%, ${theme.palette.secondary.main}20 90%)`,
                },
              }}
              onClick={() => scrollToSection(item.id)}
            >
              <ListItemText primary={item.title} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar 
        position="fixed"
        sx={{
          background: isScrolled ? (theme) => theme.palette.background.default : 'transparent',
          boxShadow: isScrolled ? 1 : 'none',
          '& .MuiToolbar-root': {
            minHeight: { xs: '64px', sm: '72px' }
          }
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: 2, 
                  display: { sm: 'none' },
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => scrollToSection('home')}
              >
                <Logo 
                  src="/placemakers/placemakers-logo.svg" 
                  alt="Place Makers"
                  sx={{
                    height: { xs: '40px', sm: '50px' },
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Box>
            
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
              {navItems.map((item) => (
                <StyledButton 
                  key={item.id}
                  color="inherit"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.title}
                </StyledButton>
              ))}
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            background: (theme) => theme.palette.background.default,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Toolbar /> {/* Spacer for fixed AppBar */}
    </>
  );
};

export default Headers;