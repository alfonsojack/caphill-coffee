import "./SelectedShop.css";
import React from "react";
import Error from "../Error/Error";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

//TESTING!!!
const SelectedShop = ({ getShops, calculateAverageRating }) => {

  const { id } = useParams();
  const [shops, setShops] = useState([]);
  const [isRated, setIsRated] = useState(
    "You have already rated this shop, try another!"
  );
  const [avgRating, setAvgRating] = useState(0);
  const [selectedShop, setSelectedShop] = useState(null);
  const [upIsActive, setUpIsActive] = useState(false);
  const [downIsActive, setDownIsActive] = useState(false);
  const [selShopError, setSelShopError] = useState("");

  useEffect(() => {
    setIsRated("Rate this shop!");
    getShops()
      .then((data) => {
        if (data) {
          setShops(data);
          findSelectedShop(data);
          setAvg(data.find((shop) => shop.id === parseInt(id)));
        } else {
          console.log("Data is undefined or empty.");
        }
      })
      .catch((error) => setSelShopError(error.message));
  }, []);

  const findSelectedShop = (shops) => {
    const foundShop = shops.find((shop) => shop.id === parseInt(id));
    return setSelectedShop(foundShop);
  };

  const setAvg = (shops) => {
    const avg = calculateAverageRating(shops);
    return setAvgRating(avg);
  };

  const handleReviewUpdate = async (id, ratingKeyToIncrement) => {
    if (isRated === "Rate this shop!" || isRated.includes("Request failed")) {
      setIsRated("You have already rated this shop, try another!");
      const apiUrl = process.env.REACT_APP_API_URL + `/SelectedShop/${id}`
      console.log(apiUrl)
      return fetch(apiUrl, {
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
          setAvg(updatedCoffeeShop);
          if (ratingKeyToIncrement === "thumbsUp") {
            setUpIsActive(true);
            setDownIsActive(false);
          } else if (ratingKeyToIncrement === "thumbsDown") {
            setUpIsActive(false);
            setDownIsActive(true);
          }
        })
        .catch((error) => {
          setIsRated(`Request failed: ${error}`);
        });
    }
  };

  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="selected-shop-container">
      {selShopError ? (
        <Error
          error={selShopError}
          message="Something's wrong. Click home to try again."
        />
      ) : !selectedShop ? (

        <p>Loading</p>
      ) : (
        <div className="shop-card-container">
          <div className="link-container">
            <h2 className="shop-name outside">{selectedShop.name}</h2>
            <Link to="/" className="home-button">
              🏠
            </Link>
          </div>
          <div className="img-container">
            <img
              src={selectedShop.img}
              alt="coffee shop picture"
              className="shop-img"
            />
          </div>
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
                {daysOfTheWeek.map((day) => (
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
            <div>
              <div>
                <p className="rated-msg outside">{isRated}</p>
              </div>
              <div className='thumbs-container'>
              <button
                  className={upIsActive ? 'thumb activated' : 'thumb'}
                  onClick={(e) => {
                    handleReviewUpdate(selectedShop.id, "thumbsUp");
                  }}
                >
                  <span role="img" aria-label="thumbs-up">
                    👍
                  </span>
                </button>

              <button
                  className={downIsActive ? 'thumb activated' : 'thumb'}
                  onClick={(e) => {
                    handleReviewUpdate(selectedShop.id, "thumbsDown");
                  }}
                >
                  <span role="img" aria-label="thumbs-down">
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
  calculateAverageRating: PropTypes.func.isRequired,
};