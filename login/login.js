import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyARw8g9SqGHoKjyQSL4HbYlDh7aRbTev3k",
    authDomain: "forecast-hub0.firebaseapp.com",
    databaseURL: "https://forecast-hub0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "forecast-hub0",
    storageBucket: "forecast-hub0.appspot.com",
    messagingSenderId: "67083858628",
    appId: "1:67083858628:web:cb0a7d96ad41d08b334f91"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

document.getElementById('logInButton').addEventListener('click', function () {
    // Call the logIn function from the firebase.js file
    logIn(
        document.getElementById('email').value,
        document.getElementById('password').value
    );

    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
});

function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User logged in successfully
            const user = userCredential.user;
            console.log('User logged in:', user);
            window.location.href = "../index.html";

        })
        .catch((error) => {
            console.error('Login error:', error.message);
        });
}

document.getElementById('signUpButton').addEventListener('click', function () {
    // Call the logIn function from the firebase.js file
    signUp(
        document.getElementById('signUpemail').value,
        document.getElementById('signUppassword').value,
        document.getElementById('name').value
    );
    document.getElementById('name').value ="";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
});

function signUp(email, password, displayName) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Update user profile (displayName)
            return updateProfile(user, { displayName: displayName });
        })
        .then(() => {
            // User signed up successfully
            console.log('User signed up successfully');
            window.location.href = "../index.html";
        })
        .catch((error) => {
            console.error('Sign up error:', error.message);
        });
}


