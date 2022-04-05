import camelize from 'camelize';

export const restaurantsRequest = (location) => {
  const reqUrl = `https://us-central1-mealstogo-8e420.cloudfunctions.net/placesNearby?location=${location}&mock=true`;

  return fetch(reqUrl, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(mappedResults);
};
