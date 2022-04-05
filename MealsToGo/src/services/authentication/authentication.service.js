import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
} from 'firebase/auth';

export const loginRequest = (email, password) => {
  return signInWithEmailAndPassword(getAuth(), email, password);
};

export const signupRequest = (email, password) => {
  return createUserWithEmailAndPassword(getAuth(), email, password);
};

export const stateChangedHook = (onStateChange) => {
  return onAuthStateChanged(getAuth(), (user) => onStateChange(user));
};

export const logoutRequest = () => {
  return signOut(getAuth());
};
