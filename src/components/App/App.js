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

  const getShops = () => {
    return fetch(`http://localhost:3001/`)
      .then(response => {
        if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        console.log('hello', response.json)
        return response.json()
      })
  }
  
  useEffect(() => {
    getShops()
      .then(data => setShops(data))
      .catch(error => console.log(error.message))
  }, [])
  



  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<CardContainer shops={shops}/>} />
        <Route path='/SelectedShop/:id' element={<SelectedShop getShops={getShops} />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;


// coffeshop {
//   ratings: [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0]
// }

// goodRatings = coffeeshops.ratings.filter(num => num === 1) 

// goodRatings.length / coffeeshop.ratings.length

// 7/10 .6324 .toFixed(2)