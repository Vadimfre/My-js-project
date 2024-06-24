// Получаем элементы
const searchButton = document.querySelector(".search-form__btn");
const searchInput = document.querySelector(".search-form__txt");
const temperatureElement = document.querySelector(".temperature");
const weatherElement = document.querySelector(".weather");
const locationElement = document.querySelector(".location");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const pressureElement = document.querySelector(".pressure");
const weatherIconElement = document.getElementById("weatherIcon");

searchButton.addEventListener("click", fetchWeather);

async function fetchWeather(event) {
    event.preventDefault();
    const city = searchInput.value || "Hrodno"; 
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=4abf0403d3184196b749814d88fdc4be`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        updateWeather(data);
        console.log(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeather(data) {
    const weatherData = data.data[0];

    const temperature = weatherData.temp;
    const weatherDescription = weatherData.weather.description;
    const cityName = weatherData.city_name;
    const humidity = weatherData.rh;
    const windSpeed = weatherData.wind_spd;
    const pressure = weatherData.pres;
    const weatherCode = weatherData.weather.code;

    temperatureElement.textContent = `${temperature}°C`;
    weatherElement.textContent = weatherDescription;
    locationElement.textContent = cityName;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windElement.textContent = `Wind: ${windSpeed} m/s`;
    pressureElement.textContent = `Pressure: ${pressure} mb`;

    let iconPath = "images/sun.png";

    if (weatherCode >= 200 && weatherCode < 300) {
        iconPath = "images/thunderstorm.png";
    } else if (weatherCode >= 300 && weatherCode < 600) {
        iconPath = "images/rain.png";
    } else if (weatherCode >= 600 && weatherCode < 700) {
        iconPath = "images/snow.png";
    } else if (weatherCode >= 700 && weatherCode < 800) {
        iconPath = "images/mist.png";
    } else if (weatherCode === 800) {
        iconPath = "images/sun.png";
    } else if (weatherCode > 800) {
        iconPath = "images/cloudy.png";
    }

    weatherIconElement.src = iconPath;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchWeather(new Event('load'));
});
