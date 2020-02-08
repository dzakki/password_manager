import React from "react";
import { Provider } from "react-redux";
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from './config/firebase';
import store from './store';
import RouterApp from './components/Router';
import Alert from './components/Alert';
function App(props) {
  const firebaseAuth = {
    user: props.user,
    signOut: props.signOut,
    signInWithGoogle: props.signInWithGoogle
  }

  return (
    <Provider store={store}>
      <RouterApp firebaseAuth={firebaseAuth} />
      <Alert />
    </Provider>
  );
}

const firebaseAppAuth = firebaseApp.auth()

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
}

export default withFirebaseAuth({providers, firebaseAppAuth})(App);
