import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RestaurantsNavigator } from './restaurants.navigator';
import { MapScreen } from '../../features/map/screens/map.screen';
import { SettingsNavigator } from './settings.navigation';
import { CheckoutNavigator } from './checkout.navigator';

import { RestaurantContextProvider } from '../../services/restaurants/restaurants.context';
import { LocationsContextProvider } from '../../services/locations/locations.context';
import { FavouritesContextProvider } from '../../services/favourites/favourites.context';
import { CartContextProvider } from '../../services/cart/cart.context';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  RestaurantsNavigator: 'md-restaurant',
  Map: 'md-map',
  Checkout: 'md-cart',
  Settings: 'md-settings',
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ color, size }) => {
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationsContextProvider>
        <RestaurantContextProvider>
          <CartContextProvider>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen
                name="RestaurantsNavigator"
                component={RestaurantsNavigator}
              />
              <Tab.Screen name="Checkout" component={CheckoutNavigator} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </CartContextProvider>
        </RestaurantContextProvider>
      </LocationsContextProvider>
    </FavouritesContextProvider>
  );
};
