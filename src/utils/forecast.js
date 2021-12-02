import fetch from 'node-fetch';

//takes lat and log and return its current weather

const forecast = (lat,lon,callback) => {
    const URL = 'http://api.weatherstack.com/current?access_key=4fcc6f7345939439b85b61132ed6d69b&query='+lat+','+lon+'&units=f';
   // console.log(URL)
    fetch(URL)
    .then(response => response.json())
    .then(data => {
    if(data.error){
       // console.log("ERROR : "+data.error.info)
       //throw Error(data.error.info)
       callback("ERROR : "+data.error.info,undefined);
    }
    else{
        // console.log(data.current);
       // console.log(data.current.weather_descriptions[0]+". It is "+ data.current.temperature+" degrees out.It feels like "+data.current.feelslike+" degrees out")
       callback(undefined,data.current.weather_descriptions[0]+". It is "+ data.current.temperature+" degrees out.It feels like "+data.current.feelslike+" degrees out")
    }
   
})
//catch is used to handle network error..for server response error user have to handle 
//itself in then block
.catch(error =>
    {//console.log("Unable to connect to weather service.Try after sometime");
        callback("Unable to connect to weather service.Try after sometime",undefined)
        }
)
}

export default forecast