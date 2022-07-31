const timeE1=document.getElementById('time');
const dateE1=document.getElementById('date');
const currentWeatherItemE1=document.getElementById('current-weather-items');
const timezone=document.getElementById('time-zone');
const countryE1=document.getElementById('country');
const weatherForecastE1=document.getElementById('weather-forecast');
const currentTempE1=document.getElementById('current-temp');

const days=['Sunday','Monday','Tuesday','Wednesday','Thusday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];

setInterval(()=>{

    const time =new Date();
    const month=time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const minutes= time.getMinutes();
    const hoursIn12HrFormat=hour>=13? hour%12:hour;
   
    const ampm = hour>=12?'PM':'AM';
    timeE1.innerHTML=hoursIn12HrFormat+':'+minutes+' '+`<span id="am-pm" >${ampm}</span>`
    dateE1.innerHTML= days[day]+' '+','+' '+ date+' '+months[month]

},1000);

var API_key='312dc0bc4d34bd5c2cac5be284614e9f';

function apicall(){
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success.coords);

        let vlat =success.coords.latitude;
        let vlon =success.coords.longitude;
        var lat = vlat.toFixed(2);
        var lon = vlon.toFixed(2);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '902e75e8bamsh0fbdb54bb78822ap1b98f9jsnc02cda50a619',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
        };
        
        fetch('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=13&lon=74.49&units=metric&lang=en', options)
            .then(response => response.json())
            .then(response => {
                console.log(response.data);
                showWeatherData(response);

            })
            

        

    })
}

apicall()

function showWeatherData(response){
    let{clouds_hi,pres,sunrise_ts,sunset_ts,temp}=response.data[0];
    

    currentWeatherItemE1.innerHTML= 
    ` <div class="weather-item">
    <div>Humidity</div>
    <div class="data">${clouds_hi}%</div>
     </div>
   <div class="weather-item">
    <div>Pressure</div>
    <div class="data">${pres}</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div class="data">${window.moment(sunrise_ts*1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Sunset</div>
    <div class="data">${window.moment(sunset_ts*1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Temperature</div>
    <div class="data">${temp}</div>
</div>`

let otherDayForcast='';
response.data.forEach((day,idx)=>{
    if(idx==0)
    {
        countryE1.innerHTML=
        `<img src="https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">Today</div>
        <div class="temp">Day - ${day.high_temp}&#176; C</div>
        <div class="temp">Night - ${day.low_temp}&#176; C</div>
        </div>`;

        currentTempE1.innerHTML=`<img src="https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">Today</div>
        <div class="temp">Day - ${day.high_temp}&#176; C</div>
        <div class="temp">Night - ${day.low_temp}&#176; C</div>
        </div>`;
    }
    else{
        otherDayForcast+=
        ` <div class="weather-forecast-item">
        <div class="day">${day.valid_date}</div>
        <img src=" https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png">
        
        <div class="temp">Day - ${day.high_temp}&#176; C</div>
        <div class="temp">Night -${day.low_temp}&#176; C</div>
    </div>`
    }
})

weatherForecastE1.innerHTML=otherDayForcast;

   
}


