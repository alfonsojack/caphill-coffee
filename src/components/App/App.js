import "./App.css";
import Error from "../Error/Error";
import Header from "../Header/Header";
import CardContainer from "../CardContainer/CardContainer";
import SelectedShop from "../SelectedShop/SelectedShop";
import sampleCoffeeShops from "../../MockData";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

function App() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState('')

  const getShops = () => {
    return fetch(`http://localhost:3001/`)
      .then(response => {
        if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        return response.json()
      })
  }
  
  const calculateAverageRating = (shop) => {
    const totalRatings = shop.rating.thumbsUp + shop.rating.thumbsDown
    const avgRatingUnfixed = shop.rating.thumbsUp / totalRatings
    const avgRating = (avgRatingUnfixed * 100).toFixed(0)
    return avgRating
  }

  useEffect(() => {
    getShops()
      .then(data => setShops(data))
      .catch(error => setError(error.message))
  }, [])


  return (
    <div className='App'>
      <Header />
      {error ? (
        <div className="app-error-cont">
          <Error error={error} message="Something's wrong on our end. Please come back later."/>
        </div>
      ) : (
      <Routes>
        <Route path='/' element={<CardContainer shops={shops} calculateAverageRating={calculateAverageRating}/>} />
        <Route path='/SelectedShop/:id' element={<SelectedShop getShops={getShops} calculateAverageRating={calculateAverageRating} />} />
        <Route path='/*' element={<Error error={error} message="You've gone down the wrong path. Click home to retrack your steps"/>} />
      </Routes>
      )}
    </div>
  );
}

export default App;

