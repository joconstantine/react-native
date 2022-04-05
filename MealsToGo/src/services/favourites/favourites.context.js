import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async (favs, uid) => {
    try {
      const value = JSON.stringify(favs);
      await AsyncStorage.setItem(`@favourites-${uid}`, value);
    } catch (e) {
      console.log('error storing', e);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (value) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log('error loading', e);
    }
  };

  const add = (restaurant) => {
    if (user) {
      setFavourites([...favourites, restaurant], user.uid);
    }
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );

    if (user) {
      setFavourites(newFavourites, user.uid);
    }
  };

  useEffect(() => {
    if (user) {
      saveFavourites(favourites, user.id);
    }
  }, [favourites, user]);

  useEffect(() => {
    if (user) {
      loadFavourites(user.uid);
    }
  }, [user]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
