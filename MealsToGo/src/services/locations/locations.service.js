import camelize from 'camelize';

export const locationsRequest = (searchTerm) => {
  const reqUrl = `https://us-central1-mealstogo-8e420.cloudfunctions.net/geocode?city=${searchTerm}&mock=true`;

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

export const locationsTransform = (result) => {
  const { geometry = {} } = camelize(result.results)[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
