import React, { useState, createContext, useEffect } from 'react';

import { locationsRequest, locationsTransform } from './locations.service';

export const LocationsContext = createContext();

export const LocationsContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('san francisco');
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const onSearch = (searchKeyword = '') => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };
  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationsRequest(keyword.toLowerCase())
      .then(locationsTransform)
      .then((result) => {
        setLocations(result);
        setErrors(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrors(err);
        setIsLoading(false);
      });
  }, [keyword]);

  return (
    <LocationsContext.Provider
      value={{ isLoading, locations, errors, search: onSearch, keyword }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
