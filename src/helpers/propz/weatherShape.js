import PropTypes from 'prop-types';

const weatherShape = PropTypes.shape({
  city: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  state: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default weatherShape;
