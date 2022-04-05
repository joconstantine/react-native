import React, { useContext, useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

import { LocationsContext } from '../../../services/locations/locations.context';
import { RestaurantContext } from '../../../services/restaurants/restaurants.context';
import { Search } from '../components/search.component';
import { MapCallout } from '../components/map-callout.component';

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const RestaurantMap = ({ navigation }) => {
  const { locations } = useContext(LocationsContext);
  const { restaurants = [] } = useContext(RestaurantContext);

  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = locations;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    const computedLatDelta = northeastLat - southwestLat;
    setLatDelta(computedLatDelta);
  }, [locations, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <MapView.Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <MapView.Callout
                onPress={() =>
                  navigation.navigate('RestaurantDetail', { restaurant })
                }
              >
                <MapCallout restaurant={restaurant} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
};

export const MapScreen = ({ navigation }) => {
  const { locations } = useContext(LocationsContext);
  if (!locations) {
    return <Map region={{ lng: 0, lat: 0 }} />;
  }
  return <RestaurantMap navigation={navigation} />;
};
