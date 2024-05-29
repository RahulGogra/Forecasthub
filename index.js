

document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("search");

    if (input && input.tagName === "INPUT") {
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("myBtn").click();
            }
        });
    } else {
        console.error("Input element with ID 'search' not found or not an input element.");
    }


});

function hideAndInput() {
    let img = document.querySelector('#add-default-weather img');
    let input = document.querySelector('#add-default-weather div');

    img.style.display = 'none';
    input.style.display = 'block';
}

async function go() {
    let input = document.getElementById('addDataInput').value;
    try {
        const apiKey = '4e5c6944576a89c664d1ca4e754d2c83';
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();

        let outputDiv = document.getElementById('defaultData');

        // Create a new weather container
        let defaultWeatherClass = document.createElement('div');
        defaultWeatherClass.className = "default-weather-class";

        let defaultLocation = document.createElement('div');
        defaultLocation.className = "default-location";
        defaultLocation.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;

        let defaultTemperature = document.createElement('div');
        defaultTemperature.className = "default-temperature";
        defaultTemperature.innerHTML = `${weatherData.main.temp}°C`;

        let defaultDescription = document.createElement('div');
        defaultDescription.className = "default-description";
        defaultDescription.innerHTML = weatherData.weather[0].description;

        // Create a remove button
        var removeButton = document.createElement("span");
        removeButton.className = "remove-btn";
        removeButton.innerHTML = "X";
        removeButton.onclick = function () {
            // Remove the corresponding weather container when the remove button is clicked
            outputDiv.removeChild(defaultWeatherClass);
        };

        // Append elements to the weather container
        defaultWeatherClass.appendChild(defaultLocation);
        defaultWeatherClass.appendChild(defaultTemperature);
        defaultWeatherClass.appendChild(defaultDescription);
        defaultWeatherClass.appendChild(removeButton);

        // Append the weather container to the output div
        outputDiv.appendChild(defaultWeatherClass);

        // Clear the input field after adding data
        document.getElementById("addDataInput").value = "";
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle the error, e.g., display an error message to the user
    }
    cancel();
}

function cancel() {
    let img = document.querySelector('#add-default-weather img');
    let input = document.querySelector('#add-default-weather div');

    img.style.display = 'flex';
    input.style.display = 'none';
}

// Function to load default location (Delhi) data
async function loadDefaultLocation() {
    

}

async function locationName() {
    try {
        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = '';
        var location = document.getElementById("search").value;

        const apiKey = '4e5c6944576a89c664d1ca4e754d2c83';
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

        const weatherResponse = await fetch(weatherApiUrl);
        const forecastResponse = await fetch(forecastApiUrl);
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        // Update DOM elements with actual data from API response
        document.getElementById("location").innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
        document.getElementById("temperature").innerHTML = `${weatherData.main.temp}°C`;
        document.getElementById("description").innerHTML = weatherData.weather[0].description;
        document.getElementById("weather").style.display = "flex";

        for (let i = 0; i < 6; i++) {
            const entry = forecastData.list[i];
            forecastContainer.innerHTML += `
              <div class="forecastData">
                <div>${entry.dt_txt}</div>
                <div>${entry.main.temp}°C</div>
                <div>${entry.weather[0].description}</div>
                <img src="http://openweathermap.org/img/w/${entry.weather[0].icon}.png" alt="Weather Icon">
              </div>
            `;
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle the error, e.g., display an error message to the user
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}


