const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.querySelector('#day1').textContent = today.toLocaleDateString('fr-FR', options);

for (let i = 1; i <= 6; i++) {
  let nextDay = new Date(today);
  nextDay.setDate(today.getDate() + i);
  document.querySelector(`#day${i + 1}`).textContent = nextDay.toLocaleDateString('fr-FR', options);
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById("city").textContent = position.coords.longitude + ' , ' + position.coords.latitude;
            getWeather(position.coords.latitude,position.coords.longitude )
          });
    } else {
        document.getElementById("city").textContent = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

async function getWeather(latiude=34.886306, longitude=134.379711) {
    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latiude}&longitude=${longitude}&daily=temperature_2m_max&daily=temperature_2m_min&daily=apparent_temperature_max&daily=wind_speed_10m_max&daily=precipitation_hours&daily=sunshine_duration`)
    response = await response.json()
    console.log(response)
    for(let i =0; i<=6; i++) {
        let emoji = "☀️";
        if(response.daily.sunshine_duration[i] <= 40000 ) emoji = "☁️";
        if(response.daily.sunshine_duration[i] >= 40000 && response.daily.sunshine_duration[i] <= 48000 ) emoji = "⛅";
        if(response.daily.wind_speed_10m_max[i] >= 50) emoji = '🌫️';
        if(response.daily.precipitation_hours[i] >= 5) emoji = '⛈️';
        document.querySelector(`#temp${i+1}`).textContent = `${emoji} ${response.daily.temperature_2m_min[i]}°C - ${response.daily.temperature_2m_max[i]}°C ${emoji}`
    }
}

getLocation()
