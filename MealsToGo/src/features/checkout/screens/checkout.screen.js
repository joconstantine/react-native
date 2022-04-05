import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import { CreditCardInput } from '../components/credit-card.component';
import { SafeArea } from '../../../components/utilities/safe-area.component';
import { CartContext } from '../../../services/cart/cart.context';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacers/spacer.component';
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from '../components/checkout.styles';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card.component';
import { payRequest } from '../../../services/checkout/checkout.service';

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  const [name, setName] = useState(null);
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!cart || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your card is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  const onPay = () => {
    if (!card || !card.id) {
      navigation.navigate('CheckoutError', {
        error: 'Please fill in a valid credit card',
      });
      return;
    }
    setIsLoading(true);
    payRequest(card.id, sum * 100, name)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate('CheckoutSuccess');
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate('CheckoutError', {
          error: err,
        });
      });
  };

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Orders</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }) => {
              return (
                <List.Item key={item} title={`${item} - ${price / 100}`} />
              );
            })}
          </List.Section>
          <Text>Total: {sum}</Text>
        </Spacer>
        <NameInput
          label="Name"
          value={name}
          onChangeText={(t) => {
            if (t.length) {
              setName(t);
            } else {
              setName(null);
            }
          }}
        />
        <Spacer position="top" size="large">
          {name && (
            <CreditCardInput
              name={name}
              onSuccess={setCard}
              onError={(err) => {
                navigation.navigate('CheckoutError', {
                  error: err,
                });
              }}
            />
          )}
        </Spacer>
        <Spacer position="top" size="xl" />
        <PayButton
          disabled={isLoading}
          icon="cash-usd"
          mode="contained"
          onPress={onPay}
        >
          Pay Now
        </PayButton>
        <ClearButton
          disabled={isLoading}
          icon="cart-off"
          mode="contained"
          onPress={clearCart}
        >
          Clear Cart
        </ClearButton>
      </ScrollView>
    </SafeArea>
  );
};
