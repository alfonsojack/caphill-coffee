import "./SelectedShop.css";
import React from "react";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const SelectedShop = ({ getShops }) => {
  const [shops, setShops] = useState([])

  useEffect(() => {
    getShops()
      .then(data => setShops(data))
      .catch(error => console.log(error.message))
  }, [])
  console.log("shops:=====", shops);
const { id } = useParams();

const selectedShop = shops.find((shop) => shop.id === parseInt(id));
console.log("selectedShop:=====", selectedShop);



// const handleReviewUpdate =(e) => {
//   e.preventDefault();
//   selectedShop.rating[e.target.value()] += 1
//   const bodyObj = {
//     id: id,
//     // rating,

//   }
//   postReview(bodyObj)
// }
console.log('id:', id)
const handleReviewUpdate = (ratingKeyToIncrement) => {
console.log("ratingKeyToIncrement:=====", ratingKeyToIncrement);

  return (fetch(`http://localhost:3001/SelectedShop/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ratingKey: ratingKeyToIncrement, id: id }),
  })
    .then(response => response.json())
    .then(updatedCoffeeShop => {
      console.log('Updated Coffee Shop:', updatedCoffeeShop);
    })
    .catch(error => {
      console.log('Request failed:', error);
    })
)}

handleReviewUpdate('thumbsUp')



// const postReview = (bodyObj) => {
//  return fetch(`http://localhost:3001/api/v1/pathData/${id}`, {
//   method: "POST",
//   body: JSON.stringify(bodyObj),
//   headers: {
//     "Content-Type": "application/json",
//   }
//  })
// }



  return (
// entire container
    <div className='selected-shop-container'>
      {/* tan box container */}
      {!selectedShop ? (<p>Loading</p>) : (<div className='page-container'>
      {/* green box container */}
        <div className='shop-card-container'>
          <div className='img-container'>
            <img
              src={selectedShop.img}
              alt='coffee shop picture'
              className='shop-img' 
            />
          </div>
      {/* parent containers left & right */}
          <div className='shop-info-parent-container'>
            <div className='shop-info-left-container'>
              <p>
                <strong>Address:</strong> {selectedShop.address}
              </p>
              <p>
                <strong>Phone number:</strong> {selectedShop.phoneNumber}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={selectedShop.website}>{selectedShop.website}</a>
              </p>
            </div>
            <div className='shop-info-right-container'>
              <p>
                <strong>Hours:</strong>

              </p>
                {selectedShop.dineIn && <p>Dine In</p>}
                {selectedShop.takeOut && <p>Take Out</p>}
                {selectedShop.wheelchairAccessible && (
                  <p>Wheelchair Accessible</p>
                )}
                {selectedShop.foodProvided && <p>Food Provided</p>} 
            </div>
          </div>
        {/* rating container */}
          <div className='rating-container'>
            <div className='average'>
              <p>Average Rating: </p> 
            </div>
        {/* thumbs container */}
            <div className='thumbs-container'>
              <span role='img' aria-label='thumbs-up'>
                👍
              </span>
              <span role='img' aria-label='thumbs-down'>
                👎
              </span>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default SelectedShop;
