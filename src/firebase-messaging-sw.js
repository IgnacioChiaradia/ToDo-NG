importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyBqYpHGkLRH63swu-765-34cn7Y9nTwocQ",
    authDomain: "todo-ng-fe422.firebaseapp.com",
    projectId: "todo-ng-fe422",
    storageBucket: "todo-ng-fe422.appspot.com",
    messagingSenderId: "203194547472",
    appId: "1:203194547472:web:e6e746ae0c5f9c70deb995",
    measurementId: "G-7615MX1DFW"
});
const messaging = firebase.messaging();