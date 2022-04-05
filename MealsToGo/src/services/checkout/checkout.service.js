import createStripe from 'stripe-client';

const stripe = createStripe(
  'pk_test_51J812AEVYb5LWxk8w0kt9x53Ji5wzppLYnpziXu3mJI7JOgKGbfQKYdHgKKBHutQhpEx1IyvZdR8Jzt4eIeTkfWP00vdssOKFS'
);

export const cardTokenRequest = (card) => {
  return stripe.createToken({ card });
};

export const payRequest = (token, amount, name) => {
  const reqUrl = 'https://us-central1-mealstogo-8e420.cloudfunctions.net/pay';

  return fetch(reqUrl, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject('Something went wrong processing your payment');
    }
    return res.json();
  });
};
