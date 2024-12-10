// Getting reference to the HTML elements
const cityInput = document.getElementById('city-input');
const form = document.getElementById('search-form');
const weatherInfo = document.getElementById('weather-info');

// Add an event listener to the form
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityName = cityInput.value.trim();

    if(cityName) {
        try {
            const weatherData = await getWeather(cityName);
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayError('An error occurred while fetching weather data.');
        }
    } else {
        displayError('Please Enter a City Name');
    }
});

// function to fetch weather data
async function getWeather(city) {
    const apiKey = 'f5jdwsvS9pxQfFouykSACnI7VLAlQLoG';
    const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

    try {
        const locationResponse = await fetch(locationUrl);
        const locationData = await locationResponse.json();

        if (locationData.length > 0) {
            const locationKey = locationData[0].Key;
            const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            return weatherData[0];
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        throw error;
    }
}

// Function to display weather information
function displayWeather(data) {
    const weatherHtml = `
        <h2>Weather is ${data.WeatherText}</h2>
        <p>Temperature: ${data.Temperature.Metric.Value} °C</p>
        <p>Weather: ${data.WeatherText}</p>
    `;
    weatherInfo.innerHTML = weatherHtml;
}

// Function to display error message
function displayError(message) {
    const errorHtml = `
        <p style="color: red;">${message}</p>
    `;
    weatherInfo.innerHTML = errorHtml;
}