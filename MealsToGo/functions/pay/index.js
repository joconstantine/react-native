module.exports.payRequest = (request, response, stripeClient) => {
  const { token, amount } = request.body;

  stripeClient.paymentIntents
    .create({
      amount,
      currency: 'USD',
      payment_method_types: ['card'],
      payment_method_data: {
        type: 'card',
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntent) => {
      response.json(paymentIntent);
    })
    .catch((e) => {
      console.log(e);
      response.status(400).send(e);
    });
};
