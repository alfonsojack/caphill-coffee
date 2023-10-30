import "./SelectedShop.css";
import React from "react";
import { useParams } from "react-router-dom"

const SelectedShop = ({ shops }) => {

const { id } = useParams();

const selectedShop = shops.find((shop) => shop.id === parseInt(id));

  return (
// entire container
    <div className='selected-shop-container'>
      {/* tan box container */}
      <div className='page-container'>
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
              <p>Average Rating: {selectedShop.rating}</p> 
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
      </div>
    </div>
  );
};

export default SelectedShop;
