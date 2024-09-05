import React, { useEffect, useState } from "react";

import { Header } from "./container";
import { Navbar } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SpecialMenu from "./container/SpecialMenu/SpecialMenu";
import OrderTrackingPage from "./container/OrderTrackingPage/OrderTrackingPage";
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isInValidLocation, setIsInValidLocation] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          checkValidLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsInValidLocation(true);
        }
      );
    } else {
      console.log("Geolocation is not available");
      setIsInValidLocation(true);
    }
    console.log(isInValidLocation);
  }, []);

  const checkValidLocation = (latitude, longitude) => {
    // Define your valid location range here
    const validLatitude = [17.4257427, 17.4401427];
    const validLongitude = [78.5111404, 78.5261404];

    console.log(latitude, longitude);
    setIsInValidLocation(
      latitude < validLatitude[0] ||
        latitude > validLatitude[1] ||
        longitude < validLongitude[0] ||
        longitude > validLongitude[1]
    );
  };

  return (
    <Router>
      <Navbar cartItems={cartItems} setCartItems={setCartItems} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isInValidLocation={isInValidLocation} />
              {!isInValidLocation && (
                <SpecialMenu
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              )}
            </>
          }
        />
        <Route path="/track-order" element={<OrderTrackingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
