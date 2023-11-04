import "./SelectedShop.css";
import React from "react";


import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const SelectedShop = ({ getShops, calculateAverageRating }) => {
  console.log("getShops:=====", getShops);
  const [shops, setShops] = useState([]);

  const [isRated, setIsRated] = useState(true);

  useEffect(() => {
    setIsRated(false);
    getShops()
      .then((data) => setShops(data))
      .catch((error) => console.log(error.message));
  }, []);
  const { id } = useParams();

  const selectedShop = shops.find((shop) => shop.id === parseInt(id));

  const handleReviewUpdate = async (id, ratingKeyToIncrement) => {
    console.log("Rating click for ID:", id, " Rating:", ratingKeyToIncrement);
    if (!isRated) {
      setIsRated(true);
      return fetch(`http://localhost:3001/SelectedShop/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ratingKey: ratingKeyToIncrement }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((updatedCoffeeShop) => {
          console.log("Updated Coffee Shop:", updatedCoffeeShop);
        })
        .catch((error) => {
          console.error("Request failed:", error);
        });
    }
  };

  return (
    <div className='selected-shop-container'>
      {!selectedShop ? (
        <p>Loading</p>
      ) : (
        <div className='shop-card-container'>
          <Link to='/' className='home-button'>
            🏠
          </Link>
          <div className='img-container'>
            <img
              src={selectedShop.img}
              alt='coffee shop picture'
              className='shop-img'
            />
          </div>
          <h2 className='shop-name'>{selectedShop.name}</h2>
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
              <div>
                <strong>Hours:</strong>
                <ol>
                  {Object.entries(selectedShop.hours).map(([day, time]) => (
                    <li key={day}>
                      {day}: {time}
                    </li>
                  ))}
                </ol>
              </div>
              <p><strong>Dine In:</strong> {selectedShop.dineIn ? "✅" : "❌"}</p>
              <p><strong>Take Out:</strong> {selectedShop.takeOut ? "✅" : "❌"}</p>
              <p><strong>Wheelchair Accessible:</strong> {selectedShop.wheelchairAccessible ? "✅" : "❌"}</p>
              <p><strong>Food Provided:</strong>{selectedShop.foodProvided ? "✅" : "❌"}</p>
              <p><strong>Contactless Pay:</strong>{selectedShop.contactlessPay ? "✅" : "❌"}</p>
            </div>
          </div>
          <div className="rating-container">
            <div className="average">
              <p>Average Rating: {calculateAverageRating(selectedShop)}%</p>
            </div>
            <div className='thumbs-container'>
              {isRated ? (
                <p className='rated-msg'>
                  You have already rated this shop, try another!
                </p>
              ) : (
                <p className='unrated-msg'>Rate this shop!</p>
              )}
              <button>
                <span
                  role='img'
                  aria-label='thumbs-up'
                  onClick={(e) => {
                    handleReviewUpdate(selectedShop.id, "thumbsUp");
                  }}
                >
                  👍
                </span>
              </button>
              <button>
                <span
                  role='img'
                  aria-label='thumbs-down'
                  onClick={(e) => {
                    handleReviewUpdate(selectedShop.id, "thumbsDown");
                  }}
                >
                  👎
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedShop;

SelectedShop.propTypes = {
  getShops: PropTypes.func.isRequired,
};
