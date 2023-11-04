import './Error.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Error = ({ error, message }) => {
  
  return (
    <div className='error-cont'>
      <h2 className='error-h2'>ERROR</h2>
      {error && <h3 className='error-h3-error'>{error} </h3>}
      <h3 className='error-h3-msg'>{message}</h3>
      <Link to='/' className='error-home-button'>
            🏠
      </Link>
    </div>
  )
}

export default Error

Error.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string.isRequired
};
