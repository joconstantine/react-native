import React, { useState, createContext, useEffect, useContext } from 'react';

import {
  restaurantsRequest,
  restaurantsTransform,
} from './restaurants.service';
import { LocationsContext } from '../locations/locations.context';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { locations } = useContext(LocationsContext);

  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);
    setTimeout(() => {
      restaurantsRequest(loc)
        .then(restaurantsTransform)
        .then((results) => {
          setRestaurants(results);
          setErrors(null);
          setIsLoading(false);
        })
        .catch((err) => {
          setErrors(err);
          setIsLoading(false);
        });
    }, 2000);
  };
  useEffect(() => {
    if (locations) {
      const locationString = `${locations.lat},${locations.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [locations]);

  return (
    <RestaurantContext.Provider value={{ restaurants, isLoading, errors }}>
      {children}
    </RestaurantContext.Provider>
  );
};
