import "./SelectedShop.css";
import React from "react";
import Error from "../Error/Error";
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import PropTypes from 'prop-types';

const SelectedShop = ({ getShops, calculateAverageRating }) => {
  const { id } = useParams();
  console.log("getShops:=====", getShops);
  const [shops, setShops] = useState([]);
  const [isRated, setIsRated] = useState('You have already rated this shop, try another!');
  const [avgRating, setAvgRating] = useState(0);
  const [selectedShop, setSelectedShop] = useState(null)
  const [upIsActive, setUpIsActive] = useState(false);
  const [downIsActive, setDownIsActive] = useState(false);
  const [selShopError, setSelShopError] = useState('')


  useEffect(() => {
    console.log("helloooooooo", id);
    setIsRated('Rate this shop!');
    getShops()
      .then((data) => {
        if (data) {
          setShops(data);
          findSelectedShop(data);
          setAvg(data.find((shop) => shop.id === parseInt(id)))
        } else {
          console.log("Data is undefined or empty.");
        }
      })
      .catch((error) => setSelShopError(error.message));
  }, []);

  const findSelectedShop = (shops) => {
    const foundShop = shops.find((shop) => shop.id === parseInt(id));
    console.log("foundit", foundShop)
    return setSelectedShop(foundShop)
  }

  const setAvg = (shops) => {
    // const foundShop = shops.find((shop) => shop.id === parseInt(id));
    const avg = calculateAverageRating(shops)
    return setAvgRating(avg)
  }

  const handleReviewUpdate = async (id, ratingKeyToIncrement) => {
    console.log("Rating click for ID:", id, " Rating:", ratingKeyToIncrement);
    if (isRated === 'Rate this shop!' || isRated.includes('Request failed')) {
      setIsRated('You have already rated this shop, try another!');
      return fetch(`http://localhost:3001/SelectedShop/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ratingKey: ratingKeyToIncrement }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
        })
        .then((updatedCoffeeShop) => {
          console.log("Updated Coffee Shop:", updatedCoffeeShop);
          setAvg(updatedCoffeeShop);
          // Toggle the active state for thumbs buttons here
          if (ratingKeyToIncrement === "thumbsUp") {
            setUpIsActive(true);
            setDownIsActive(false);
          } else if (ratingKeyToIncrement === "thumbsDown") {
            setUpIsActive(false);
            setDownIsActive(true);
          }
        })
        .catch((error) => {
          setIsRated(`Request failed: ${error.message}`);
        });
    }
  };
  
  

  const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday" , "Saturday" , "Sunday"];

  return (
    <div className='selected-shop-container'>
      {selShopError ? (<Error error={selShopError} message="Something's wrong. Click home to try again."/>) :
      !selectedShop ? (
        <p>Loading</p>
      ) : (
        <div className='shop-card-container'>
            <div className="link-container">
            <h2 className='shop-name outside'>{selectedShop.name}</h2>
            <Link to='/' className='home-button'>
            🏠
            </Link></div>
          <div className='img-container'>
            <img
              src={selectedShop.img}
              alt='coffee shop picture'
              className='shop-img'
            />
          </div>
          {/* <h2 className='shop-name outside'>{selectedShop.name}</h2> */}
          <div className='shop-info-parent-container'>
            <div className='shop-info-left-container'>
              <ul><p className="address">
                <strong className="address-strong">Address:</strong> <span className="address-text">  {selectedShop.address}</span>
              </p>
              <p>
                <strong>Phone number:</strong> {selectedShop.phoneNumber}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={selectedShop.website}>{selectedShop.website}</a>
              </p>
              <p><strong>Dine In:</strong> {selectedShop.dineIn ? "  ✅" : "  ❌"}</p>
              <p><strong>Take Out:</strong> {selectedShop.takeOut ? "  ✅" : "  ❌"}</p>
              <p><strong>Wheelchair Accessible:</strong> {selectedShop.wheelchairAccessible ? "  ✅" : "  ❌"}</p>
              <p><strong>Food Provided:</strong>{selectedShop.foodProvided ? "  ✅" : "  ❌"}</p>
              <p><strong>Contactless Pay:</strong>{selectedShop.contactlessPay ? " ✅" : "  ❌"}</p></ul>
            </div>
            <div className='shop-info-right-container'>
              <div className='schedule'>
                <strong>Hours:</strong>
                  {daysOfTheWeek.map(day => (
                    <p key={day}>
                      <strong>{day}</strong>: {selectedShop.hours[day]}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="rating-container">
            <div className="average outside">
              <p className="outside">Average Rating: {avgRating}%</p>
            </div>
            <div >
              {/* <div> {isRated ? (
                <p className='rated-msg outside'>
                  You have already rated this shop, try another!
                </p>
              ) : (
                <p className='unrated-msg outside'>Rate this shop!</p>
              )}
              </div> */}
              <div>
                <p className='rated-msg outside'>
                  {isRated}
                </p>
              </div>
              <div className='thumbs-container'>
              <button
                  className={upIsActive ? 'thumb activated' : 'thumb'}
                  onClick={(e) => {
                    // setUpIsActive(!upIsActive); // Toggle the active state
                    handleReviewUpdate(selectedShop.id, "thumbsUp");
                  }}
                >
                  <span role='img' aria-label='thumbs-up'>👍</span>
                </button>
              <button
                  className={downIsActive ? 'thumb activated' : 'thumb'}
                  onClick={(e) => {
                  // setDownIsActive(!downIsActive); // Toggle the active state
                  handleReviewUpdate(selectedShop.id, "thumbsDown");
                  }}
              >
                <span
                  role='img'
                  aria-label='thumbs-down'
                >
                  👎
                </span>
              </button>
              </div>
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
