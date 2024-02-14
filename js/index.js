const searchcity = document.getElementById('btnsearch');
const city = document.getElementById('txtcity');
const apikey = "XXXXX";
let lbcityname = document.getElementById('lbcityname');
let lbtemperature = document.getElementById('lbtemperature');
let lbwind = document.getElementById('lbwind');
let lbhumidity = document.getElementById('lbhumidity');
let lbdescription = document.getElementById('lbdescription');
let lbemoji = document.getElementById('lbemoji');

searchcity.addEventListener('click', async event =>{
 const cityname = city.value;
 if (cityname) {
    console.log(cityname)
    try{
       const weatherData = await getWeatherData(cityname);
       displayWeatherInfor(weatherData)
    }catch(error){
        getError(error);
    }
 } else {
   getError("Plaease enter city");

 }
})

async function getWeatherData(city){
    const apiUrl  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
       lbcityname.textContent =  "unknown city try again";
    } else {
        return await response.json();
    }
}
 function displayWeatherInfor(data){
    console.log(data);
    const { name: city, main:{temp,humidity}, weather:[{description,id}]} = data;

    lbcityname.textContent = city;
    lbtemperature.textContent = (temp - 273.15).toFixed(1);
    lbhumidity.textContent =  "Humidity : " + humidity;
    lbdescription.textContent = description;
    lbemoji.textContent = getDisplayEmoji(id)
    
}
function getDisplayEmoji(weatherID){
    switch(true){
    case (weatherID >= 200 && weatherID < 300):
        return "⛈️";
     case (weatherID >= 300 && weatherID < 400):
        return "⛈️";
    case (weatherID >= 400 && weatherID < 600):
        return "⛈️";
    case (weatherID >= 600 && weatherID < 700):
        return "🌨️";
    case (weatherID >= 700 && weatherID < 800):
        return "'🌤️'";
    case (weatherID === 800):
        return "☀️";
    case (weatherID >= 801 && weatherID < 900):
        return "☁️";
    default:
        return "🔍"
    }
    
}
function getError(message){
    lbcityname.textContent =  "Please enter city name";
}