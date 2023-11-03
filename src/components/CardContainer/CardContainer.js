import './CardContainer.css'
import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

const CardContainer = ( { shops }) => {

// const [shops, setShops] = useState([])

// const getShops = () => {
//   return fetch(`http://localhost:3001/`)
//     .then(response => {
//       if(!response.ok) {
//         throw new Error(`${response.status} ${response.statusText}`)
//       }
//       console.log('hello', response.json)
//       return response.json()
//     })
// }

// useEffect(() => {
//   getShops()
//     .then(data => setShops(data))
//     .catch(error => console.log(error.message))
// }, [])

  //http://localhost:3001/api/v1/pathData

  // const handleReviewUpdate = async (id, ratingKeyToIncrement) => {
  //   console.log("Updating rating for ID:", id, " Incrementing:", ratingKeyToIncrement);
  
  //   return fetch(`http://localhost:3001/SelectedShop/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ ratingKey: ratingKeyToIncrement }), //id should not be in the body anymore, it's getting it from the URL 
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  //     return response.json();
  //   })
  //   .then(updatedCoffeeShop => {
  //     console.log('Updated Coffee Shop:', updatedCoffeeShop);
  //   })
  //   .catch(error => {
  //     console.error('Request failed:', error);
  //   });
  // }

const shopCards = shops.map((shop) => {
  return (
    <Link to={`/SelectedShop/${shop.id}`} key={shop.id}>
      <Card
            name={shop.name}
            img={shop.img}
            // Do not pass handleReviewUpdate if you're not using it in Card component
      />
    </Link>
)
})
  return (
    <div className='card-container'>
      {shopCards}
    </div>
  )
}

export default CardContainer