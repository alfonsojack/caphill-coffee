import "./SelectedShop.css";
import React from "react";

const SelectedShop = ({ selectedShop }) => {
  return (
    //entire container
    <div className='selected-shop-container'>
      //header container
      <div className='header-container'>
        <header>
          <h1>Cap Hill Coffee</h1>
        </header>
      </div>
      //tan box container
      <div className='page-container'>
        //green box container
        <div className='selected-shop-info-container'>
          <div className='img-container'>
            <img
              src={selectedShop.img}
              alt='coffee shop picture'
              className='shop-img'
            />
          </div>
          //parent containers left & right
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
              <ul>
                {selectedShop.dineIn && <li>Dine In</li>}
                {selectedShop.takeOut && <li>Take Out</li>}
                {selectedShop.wheelchairAccessible && (
                  <li>Wheelchair Accessible</li>
                )}
                {selectedShop.foodProvided && <li>Food Provided</li>}
              </ul>
            </div>
          </div>
          //rating container
          <div className='rating-container'>
            <div className='average'>
              <p>Average Rating: {selectedShop.rating}</p> 
            </div>
          //thumbs container
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
