import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function Headers({ theme }) {
  return (
    <div>
      <h1>Placemakers</h1>
      <Button
        onClick={console.log('theme', theme)}
        variant="contained"
        color="primary"
      >
        Toggle to {theme === 'light' ? 'dark' : 'light'} Mode
      </Button>
      <Button variant="contained" color="primary">
        Add a new Place
      </Button>
    </div>
  );
}
Headers.propTypes = {
  toogleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Headers;
