import React, { useState, createContext } from 'react';

import {
  loginRequest,
  signupRequest,
  stateChangedHook,
  logoutRequest,
} from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  stateChangedHook((u) => {
    if (u) {
      setUser(u);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    setError(null);
    loginRequest(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsLoading(false);
        console.log(userCredential.user);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      return;
    }
    setIsLoading(true);
    signupRequest(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsLoading(false);
        console.log(userCredential.user);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  };

  const onLogout = () => {
    setUser(null);
    logoutRequest().then(() => console.log('Successfully signed out'));
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
