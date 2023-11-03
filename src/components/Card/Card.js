import './Card.css'

const Card = ( { name, img}) => {
  return (
    <div className='card'>
      <img src={img}/>
      <h3>{name}</h3>
      <h4>Rating: 100%</h4>
    </div>
  )
}

export default Card