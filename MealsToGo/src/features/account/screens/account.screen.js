import React from 'react';
import LottieView from 'lottie-react-native';

import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  Title,
  AccountCover,
  AnimationWrapper,
} from '../components/account.styles';
import { Spacer } from '../../../components/spacers/spacer.component';

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require('../../../../assets/watermelon.json')}
        />
      </AnimationWrapper>
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </AuthButton>
        <Spacer position="top" size="large">
          <AuthButton
            icon="account-box-outline"
            mode="contained"
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
