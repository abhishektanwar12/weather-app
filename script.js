const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const tempDisplay = document.getElementById("temp");
const humidityDisplay = document.getElementById("humidity");
const windDisplay = document.getElementById("wind");
const conditionDisplay = document.getElementById("condition");

cityInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        searchBtn.click();
    }
});
searchBtn.addEventListener("click", async function(){
    const city = cityInput.value;
    if(city === ""){
        alert("Please enter a city!");
        return;
    }
    const apiKey = "f408003781cf6e7d59bd0227acb8d872";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    tempDisplay.innerText = "Loading...";
    humidityDisplay.innerText = "";
    windDisplay.innerText = "";
    conditionDisplay.innerText = "";
    const response = await fetch(url);
    const data = await response.json();
    if(data.cod == "404"){
        alert("City not found!");
        return;
    }
    tempDisplay.innerText = `Temperature: ${data.main.temp}°C`;
    humidityDisplay.innerText = `Humidity: ${data.main.humidity}%`;
    windDisplay.innerText = `Wind Speed: ${data.wind.speed} m/s`;
    conditionDisplay.innerText = `Condition: ${data.weather[0].description}`;
    const weather = data.weather[0].description.toLowerCase();

    let emoji = "☀️";

    if(weather.includes("cloud")){
        emoji = "☁️";
    }
    else if(weather.includes("rain")){
        emoji = "🌧️";
    }
    else if(weather.includes("snow")){
        emoji = "❄️";
    }

    conditionDisplay.innerText = `Condition: ${emoji} ${weather}`;
});