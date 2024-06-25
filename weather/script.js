const searchForm = document.querySelector(".search-form")
const descriptionWeather = document.querySelector('.description')
const searchButton = searchForm.querySelector(".search-form__btn");
const searchInput = searchForm.querySelector(".search-form__txt");
const temperatureElement = descriptionWeather.querySelector(".temperature");
const weatherElement = descriptionWeather.querySelector(".weather");
const locationElement = descriptionWeather.querySelector(".location");
const humidityElement = descriptionWeather.querySelector(".humidity");
const windElement = descriptionWeather.querySelector(".wind");
const pressureElement = descriptionWeather.querySelector(".pressure");
const weatherIconElement = document.querySelector("#weatherIcon");

const startCityValue = 'Hrodno'

async function onSearchButtonClick(evt) {
    evt.preventDefault();
    const city = searchInput.value;
    const data = await fetchWeather(city);
    updateWeather(data);
}

searchButton.addEventListener("click", onSearchButtonClick);

async function fetchWeather(city) {
    
    const cityName = city || startCityValue; 
    const url = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=4abf0403d3184196b749814d88fdc4be`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
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

    weatherIconElement.src = searchWeatherIcon(weatherCode);
}

function searchWeatherIcon(weatherCode) {
    if (weatherCode >= 200 && weatherCode < 300) {
        return "images/thunderstorm.png";
    }
    if (weatherCode >= 300 && weatherCode < 600) {
        return "images/rain.png";
    }
    if (weatherCode >= 600 && weatherCode < 700) {
        return "images/snow.png";
    }
    if (weatherCode >= 700 && weatherCode < 800) {
        return "images/mist.png";
    }
    if (weatherCode === 800) {
        return "images/sun.png";
    }
    if (weatherCode > 800) {
        return "images/cloudy.png";
    }
}

