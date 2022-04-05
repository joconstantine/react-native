import React from 'react';
import { LiteCreditCardInput } from 'react-native-credit-card-input';

import { cardTokenRequest } from '../../../services/checkout/checkout.service';

export const CreditCardInput = ({ name, onSuccess, onError }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes('incomplete');

    if (isIncomplete) {
      return;
    }
    const [exp_month, exp_year] = values.expiry.split('/');
    const card = {
      number: values.number,
      exp_month,
      exp_year,
      cvc: values.cvc,
      name,
    };
    try {
      const info = await cardTokenRequest(card);
      onSuccess(info);
    } catch (e) {
      onError(e);
    }
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
