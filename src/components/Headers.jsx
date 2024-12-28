import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function Headers({ theme, toggleTheme }) {
  return (
    <div>
      <h1>Placemakers</h1>
      <Button onClick={toggleTheme} variant="contained" color="primary">
        Toggle to {theme === 'light' ? 'dark' : 'light'} Mode
      </Button>
    </div>
  );
}
Headers.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Headers;
