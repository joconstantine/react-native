import React, { useState, useEffect } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { Navigation } from './src/infrastructure/navigation';
import { theme } from './src/infrastructure/theme';

const firebaseConfig = {
  apiKey: '#enterpublicAPIKey',
  authDomain: 'mealstogo-8e420.firebaseapp.com',
  projectId: 'mealstogo-8e420',
  storageBucket: 'mealstogo-8e420.appspot.com',
  messagingSenderId: '192515463494',
  appId: '1:192515463494:web:329cc5adffc8c4330eed47',
};

initializeApp(firebaseConfig);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, 'jo@email.com', '123456')
      .then((user) => {
        setIsAuthenticated(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
