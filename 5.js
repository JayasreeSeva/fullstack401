// DOM Elements for Authentication
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const signupForm = document.getElementById('signup-form');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupButton = document.getElementById('signup-button');

// DOM Elements for Dashboard and Weather
const dashboard = document.getElementById('dashboard');
const userName = document.getElementById('user-name');
const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather-button');
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const logoutButton = document.getElementById('logout-button');

// Sample email and password for demonstration (replace with actual authentication logic)
const correctEmail = "user@example.com";
const correctPassword = "password";

// Event Listener for Login
loginButton.addEventListener('click', () => {
    const email = loginEmail.value;
    const password = loginPassword.value;
    if (email === correctEmail && password === correctPassword) {
        openDashboard(email);
    } else {
        alert("Incorrect email or password. Please try again.");
    }
});

// Event Listener for Signup
signupButton.addEventListener('click', () => {
    const email = signupEmail.value;
    const password = signupPassword.value;
    // For simplicity, assume signup is successful, and automatically login.
    openDashboard(email);
});

// Event Listener for Getting Weather
getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value;
    const apiKey = 'd91f7056d55b70db74fdcda6a6711df5'; // Replace with your actual API key
    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    // Make a GET request to the Weatherstack API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the UI with weather information
            cityName.textContent = city;
            temperature.textContent = data.current.temperature;
            weatherDescription.textContent = data.current.weather_descriptions[0];
            weatherResult.style.display = 'block';
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error scenarios in your application
        });
});


// Event Listener for Logout
logoutButton.addEventListener('click', () => {
    openLogin();
});

// Helper Functions
function openDashboard(email) {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    dashboard.style.display = 'block';
    userName.textContent = email;
}

function openLogin() {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    dashboard.style.display = 'none';
    weatherResult.style.display = 'none';
}

// Initially, show the login form
openLogin();
