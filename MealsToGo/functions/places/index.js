const functions = require('firebase-functions');
const { mocks, addMockImages } = require('./mock');
const url = require('url');

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg',
    ];
    return restaurant;
  }

  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${
      functions.config().google.key
    }`,
  ];
  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;
  if (mock === 'true') {
    const data = mocks[location];
    if (data && data.results) {
      data.results = data.results.map(addMockImages);
    }

    return response.json(data);
  }

  client
    .placesNearby({
      params: {
        location,
        radius: 1500,
        type: 'restaurant',
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      const data = res.data;
      if (data && data.results) {
        data.results = data.results.map(addMockImages);
      }
      return response.json(data);
    })
    .catch((e) => {
      return response.status(400).send(e.response.data.error_message);
    });
};
