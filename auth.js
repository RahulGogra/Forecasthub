import { getAuth, signInWithEmailAndPassword, onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
// ... rest of your code

document.addEventListener('DOMContentLoaded', function () {
   

function logOut() {
    signOut(auth)
        .then(() => {
            var signInLink = document.querySelector('#mySidenav a[href="../index.html"]');
            signInLink.textContent = 'SignIn/SignUp';
            signInLink.href = './login/login.html';
            // User signed out successfully
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Sign out error:', error.message);
        });
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed:', user);

    var signInLink = document.querySelector('#mySidenav a[href="./login/login.html"]');
    var sideNav = document.getElementById('mySidenav');

    // Create logout link element
    var logoutLink = document.createElement('a');
    logoutLink.textContent = 'Logout';
    logoutLink.href = "#";
    logoutLink.onclick = logOut;
    logoutLink.id = 'logoutLink'; // Set an id for easy reference

    if (user) {
        // User is signed in
        console.log('User is signed in:', user);

        var userName = user.displayName || user.email;

        if (signInLink) {
            signInLink.textContent = userName;
            signInLink.href = "../index.html"; // Redirect to profile or dashboard page
        }
        
        document.getElementById('defaultData').style.display = 'flex';
        document.getElementById('defaultDataPara').style.display = 'flex';

        // Append logout link to the side menu if it doesn't exist
        if (sideNav && !document.getElementById('logoutLink')) {
            sideNav.appendChild(logoutLink);
        }
    } else {
        // User is signed out
        console.log('User is signed out');

        if (signInLink) {
            signInLink.textContent = 'SignIn/SignUp';
            signInLink.href = './login/login.html';
        }

        document.getElementById('defaultData').style.display = 'none';
        document.getElementById('defaultDataPara').style.display = 'none';


        // Remove logout link from the side menu if it exists
        var existingLogoutLink = document.getElementById('logoutLink');
        if (existingLogoutLink && sideNav) {
            sideNav.removeChild(existingLogoutLink);
        }
    }
});

})