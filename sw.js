importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyDC2_Y8ZVuDB8bC_VbIWMSh89k7OEHVbaU",
	authDomain: "pwa-fcm-3cf3f.firebaseapp.com",
	projectId: "pwa-fcm-3cf3f",
	storageBucket: "pwa-fcm-3cf3f.firebasestorage.app",
	messagingSenderId: "774811935507",
	appId: "1:774811935507:web:c5a7ccc3dec7129621b0e6"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();