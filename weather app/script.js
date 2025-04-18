document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-button").addEventListener("click", getWeather);

    document.getElementById("city").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            getWeather();
        }
    });
});

function getWeather() {
    let city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    let apiKey = "f298e738c0d37d48001b642398bf2cd4"; // Your OpenWeatherMap API key
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found! (Error ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("city-name").innerText = `🌍 Weather in ${data.name}`;
            document.getElementById("temp").innerText = `🌡️ Temperature: ${data.main.temp}°C`;
            document.getElementById("desc").innerText = `🌤️ Condition: ${data.weather[0].description}`;
            document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").innerText = `💨 Wind Speed: ${data.wind.speed} m/s`;

            let iconCode = data.weather[0].icon;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById("weather-result").style.opacity = "1";
            changeBackground(data.weather[0].main);
        })
        .catch(error => {
            console.error("Error:", error);
            alert(error.message);
        });
}

function changeBackground(weatherCondition) {
    let body = document.body;

    let backgrounds = {
        "Clear": "url('https://source.unsplash.com/1600x900/?clear,sky')",
        "Clouds": "url('https://source.unsplash.com/1600x900/?cloudy,sky')",
        "Rain": "url('https://source.unsplash.com/1600x900/?rain')",
        "Drizzle": "url('https://source.unsplash.com/1600x900/?drizzle')",
        "Thunderstorm": "url('https://source.unsplash.com/1600x900/?thunderstorm')",
        "Snow": "url('https://source.unsplash.com/1600x900/?snow')",
        "Mist": "url('https://source.unsplash.com/1600x900/?mist')",
        "Fog": "url('https://source.unsplash.com/1600x900/?fog')",
        "Haze": "url('https://source.unsplash.com/1600x900/?haze')"
    };

    body.style.backgroundImage = backgrounds[weatherCondition] || "url('https://source.unsplash.com/1600x900/?weather')";
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
}

