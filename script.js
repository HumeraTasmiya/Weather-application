
const apiKey = "95e1868f4f08cb1173d57ea61a5aa75a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

// Function to map weather conditions to image URLs
function getWeatherIcon(weatherCondition) {
    // Add your logic to map weather conditions to corresponding image URLs
    switch (weatherCondition) {
        case 'Clear':
            return 'https://pixelgig.github.io/Weather-App/img/clear.png';
        case 'Clouds':
            return 'https://pixelgig.github.io/Weather-App/img/cloudy.png';
        case 'Rain':
            return 'https://th.bing.com/th?id=OIP.0OqtSn7BcN8r__X4aYkgcgHaFQ&w=296&h=210&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2';
            case 'Snow':
                return 'https://pixelgig.github.io/Weather-App/img/snow.png';
          case 'Haze':
            return 'https://icon-library.com/images/haze-weather-icon/haze-weather-icon-16.jpg';  
            case 'Mist':
            return 'https://icon-library.com/images/haze-weather-icon/haze-weather-icon-16.jpg';  
            case 'Thunderstorm':
                return 'https://th.bing.com/th?id=OIP.mnEV-wm0PayfS5K0QwoS0wAAAA&w=235&h=265&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2';        
        default:
            return 'https://pixelgig.github.io/Weather-App/img/unknown.png';

    }
}

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon
        const weatherCondition = data.weather[0].main;
        const weatherIconUrl = getWeatherIcon(weatherCondition);
        weatherIcon.setAttribute('src', weatherIconUrl);
        weatherIcon.setAttribute('alt', weatherCondition);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Weather data not found. Please try again.');
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value = ''; // Clear input field after search
});
