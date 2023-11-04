import './Card.css'
import PropTypes from 'prop-types';

const Card = ( { name, img}) => {
  return (
    <div className='card'>
      <img src={img} alt={`${name} image`}/>
      <h3>{name}</h3>
      <h4>Rating: 100%</h4>
    </div>
  )
}

export default Card

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};