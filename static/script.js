let display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    try {
        display.value = eval(display.value);  // Note: eval() can be dangerous, use it cautiously
    } catch (error) {
        display.value = 'Error';
    }
}

document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let latitude = document.getElementById('latitude').value;
    let longitude = document.getElementById('longitude').value;

    // Call the Open-Meteo API for current weather
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(response => response.json())
        .then(data => {
            if (data.current_weather) {
                let temperature = data.current_weather.temperature;
                let windSpeed = data.current_weather.windspeed;
                
                // Display weather data
                document.getElementById('weather-result').innerHTML = `
                    <p>Current Temperature: ${temperature}°C</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
            } else {
                document.getElementById('weather-result').innerHTML = "Weather data not available for this location.";
            }
        })
        .catch(error => {
            document.getElementById('weather-result').innerHTML = "Error fetching data. Please try again.";
        });
});

document.getElementById('converter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let inputValue = document.getElementById('input-value').value;
    let fromUnit = document.getElementById('from-unit').value;
    let toUnit = document.getElementById('to-unit').value;
    
    let conversionFactor = {
        'meters': { 'feet': 3.281, 'miles': 0.000621371 },
        'kilometers': { 'feet': 3281, 'miles': 0.621371 }
    };
    
    let result = inputValue * conversionFactor[fromUnit][toUnit];
    document.getElementById('conversion-result').innerHTML = `Result: ${result}`;
});
