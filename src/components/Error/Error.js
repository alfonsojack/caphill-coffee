import './Error.css'
import { Link } from 'react-router-dom'

const Error = ({ error, message }) => {
  return (
    <div className='error-cont'>
      <h2 className='error-h2'>ERROR</h2>
      <h3 className='error-h3'>{error} </h3>
      <h3 className='error-h3'>{message}</h3>
      <Link to='/' className='error-home-button'>
            🏠
      </Link>
    </div>
  )
}

export default Error