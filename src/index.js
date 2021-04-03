import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: 'AIzaSyA0C_6O04biBpvVC579SBzGSUQ_IY2bF4I',
    authDomain: 'rexfriends-dev.firebaseapp.com',
    projectId: 'rexfriends-dev',
    storageBucket: 'rexfriends-dev.appspot.com',
    messagingSenderId: '581619494498',
    appId: '1:581619494498:web:ec5b8f17fbfe63f1252b3b',
    measurementId: 'G-MJ0ZRL7M0M'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

if (firebaseApp != null) {
    // console.log('firebase app started successfully');
} else {
    // console.log('firebase app failed to start');
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);


ReactDOM.render(
    // <React.StrictMode>

    <App />,

    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
