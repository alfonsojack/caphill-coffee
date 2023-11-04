import "./CardContainer.css";
import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const CardContainer = ({  calculateAverageRating, getShops }) => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    getShops()
      .then(data => setShops(data))
      .catch(error => setError(error.message))
  }, [])

  const shopCards = shops.map((shop) => {

    return (
      <Link to={`/SelectedShop/${shop.id}`} key={shop.id}>
        <Card
          className={`${shop.id}-card`}
          name={shop.name}
          img={shop.img}
          avgRating={calculateAverageRating(shop)}
        />
      </Link>
    );
  });
  return <div className='card-container'>{shopCards}</div>;
};

export default CardContainer;

CardContainer.propTypes = {
  shops: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      contactlessPay: PropTypes.bool.isRequired,
      dineIn: PropTypes.bool.isRequired,
      foodProvided: PropTypes.bool.isRequired,
      hours: PropTypes.objectOf(PropTypes.string).isRequired,
      id: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        thumbsUp: PropTypes.number,
        thumbsDown: PropTypes.number,
      }).isRequired,
      takeOut: PropTypes.bool.isRequired,
      website: PropTypes.string.isRequired,
      wheelchairAccessible: PropTypes.bool.isRequired,
    })
  ).isRequired,
  calculateAverageRating: PropTypes.func.isRequired,
};
