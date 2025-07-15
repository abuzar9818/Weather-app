const submit = document.getElementById("submit");
const cityInput = document.getElementById("city");

async function fetchWeather(city) {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '474f329b03msh3f07c3f0e0e17f1p197d52jsn363c5f65dc30',
            'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
        }
    }

    document.getElementById("cityName").innerText = city;

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.cod && result.cod !== 200) {
            alert(`Error: ${result.message}`);
            return;
        }

        const main = result.main ?? {};
        const visibility = result.visibility ?? "N/A";
        const visibility2 = result.visibility2 ?? "N/A";

        document.getElementById("temp_min").innerText = main.temp_min ?? "N/A";
        document.getElementById("temp_max").innerText = main.temp_max ?? "N/A";
        document.getElementById("sea_level").innerText = main.sea_level ?? "N/A";
        document.getElementById("visibility2").innerText = visibility;
        document.getElementById("temp").innerText = main.temp ?? "N/A";
        document.getElementById("temp2").innerText = main.temp ?? "N/A";
        document.getElementById("feels_like").innerText = main.feels_like ?? "N/A";
        document.getElementById("visibility").innerText = visibility;
        document.getElementById("grnd_level").innerText = main.grnd_level ?? "N/A";
        document.getElementById("pressure").innerText = main.pressure ?? "N/A";
        document.getElementById("humidity").innerText = main.humidity ?? "N/A";
        document.getElementById("humidity2").innerText = main.humidity ?? "N/A";


    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to fetch weather data. Please check the city name or your internet connection.");
    }
}

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});
 const cities = [
      { name: "Boston", id: "boston" },
      { name: "Lucknow", id: "lucknow" },
      { name: "Beijing", id: "beijing" },
    ];

    async function fetchWeatherData(cityName, idPrefix) {
      const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${cityName}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '474f329b03msh3f07c3f0e0e17f1p197d52jsn363c5f65dc30',
          'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.cod && result.cod !== 200) {
          console.warn(`${cityName}: ${result.message}`);
          return;
        }

        const main = result.main ?? {};
        const visibility = result.visibility ?? "N/A";

        document.getElementById(`${idPrefix}_temp_min`).innerText = main.temp_min ?? "-";
        document.getElementById(`${idPrefix}_temp_max`).innerText = main.temp_max ?? "-";
        document.getElementById(`${idPrefix}_sea_level`).innerText = main.sea_level ?? "-";
        document.getElementById(`${idPrefix}_temp`).innerText = main.temp ?? "-";
        document.getElementById(`${idPrefix}_feels_like`).innerText = main.feels_like ?? "-";
        document.getElementById(`${idPrefix}_visibility`).innerText = visibility;
        document.getElementById(`${idPrefix}_grnd_level`).innerText = main.grnd_level ?? "-";
        document.getElementById(`${idPrefix}_pressure`).innerText = main.pressure ?? "-";
        document.getElementById(`${idPrefix}_humidity`).innerText = main.humidity ?? "-";
      } catch (err) {
        console.error(`Error fetching data for ${cityName}:`, err);
      }
    }

    cities.forEach(city => fetchWeatherData(city.name, city.id));