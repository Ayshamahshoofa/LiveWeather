const apiKey = "a1c5d1c79e8d7ae033cb6303dbf857f2";

document.getElementById("date").innerText = new Date().toLocaleDateString(
  "en-US",
  { weekday: "long", day: "numeric", month: "long", year: "numeric" }
);

async function getWeather() {
  let city = document.getElementById("city").value;
  if (city.trim() === "") return alert("Enter a city name!");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      showError();
      return;
    }

    const data = await res.json();
    hideError();

    document.getElementById("temp").innerText = `${data.main.temp}°C`;
    document.getElementById("location").innerText = data.name;
    document.getElementById("condition").innerText = data.weather[0].main;
    
    document.getElementById("wind").innerText = `${data.wind.speed} km/h`;
    document.getElementById("pressure").innerText = `${data.main.pressure} hPa`;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    document.getElementById("sunrise").innerText = `🌅 Sunrise: ${sunrise}`;
    document.getElementById("sunset").innerText = `🌇 Sunset: ${sunset}`;
  } 
  catch {
    showError();
  }
}

function showError() {
  document.getElementById("location").innerText = "Location Not Found";
  document.getElementById("temp").innerText = "--°C";
  document.getElementById("condition").innerText = "--";
  document.getElementById("wind").innerText = "--";
  document.getElementById("pressure").innerText = "--";
  document.getElementById("humidity").innerText = "--";
  document.getElementById("sunrise").innerText = "🌅 Sunrise: --";
  document.getElementById("sunset").innerText = "🌇 Sunset: --";
  document.getElementById("error-box").style.display = "block";
}

function hideError() {
  document.getElementById("error-box").style.display = "none";
}
