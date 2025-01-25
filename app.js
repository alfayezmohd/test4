// Firebase Configurations
var firebaseConfig = {
    apiKey: "AIzaSyDC2_Y8ZVuDB8bC_VbIWMSh89k7OEHVbaU",
	authDomain: "pwa-fcm-3cf3f.firebaseapp.com",
	projectId: "pwa-fcm-3cf3f",
	storageBucket: "pwa-fcm-3cf3f.firebasestorage.app",
	messagingSenderId: "774811935507",
	appId: "1:774811935507:web:c5a7ccc3dec7129621b0e6"
};
// Initializing Firebase App
firebase.initializeApp(firebaseConfig);

// Initializing Cloud Messanging
const messaging = firebase.messaging();


// Registering Service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(res => {
        console.log("Register Success");
        messaging.useServiceWorker(res);
    }).catch(e => {
        console.log(e);
    });
}

// Subscribing to push Notifications
const subscribe = () => {
    const token = document.getElementById('token');
    // getting PushNotification permission from browser
    Notification.requestPermission().then(permission => {
        if (permission == "granted") {
            // if Permission is allowed then getting firebase messanging token from firebase
            messaging.getToken().then(currentToken => {
                console.log(currentToken);
                // displaying token in index file
                token.textContent = currentToken;
            });
        } else {
            token.textContent = "Permission not granted";
        }
    }).catch(e=>{
        token.textContent=e;
    });
};


// Sending Push Notifications
const sendPush = () => {
    // Getting From Data when button clicked
    const token = document.getElementById('usertoken').value;
    const notificationTitle = document.getElementById('title').value;
    const notificationBody = document.getElementById('body').value;

    // Adding data to payload for sending push notifications
    let body = {
        to: token,
        notification: {
            title: notificationTitle,
            body: notificationBody,
            click_action: "/",
        }
    };

    // Setting options for push notification
    const options = {
        method: "POST",
        headers: new Headers({
            // Add your server key after key=
            Authorization: "key=BAmXHrgByxRZTcWUBmY8slE7YbzeHw3O4w6gSyWc3ULd3c-sDVCEuWzrSo3ndMcZj57KF-G5XzKt-T5RgSiGZdE",
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
    };

    // Sending Push notifications to user using fetch api
    fetch("https://fcm.googleapis.com/fcm/send", options)
        .then(res => res.json())
        .then(data => {
            if (data.failure == 1) {
                alert("Token Expire");
            } else {
                alert("Send Success");
            }
        })
        .catch(err => {
            alert(err);
        });
};