import fetch from 'node-fetch';

const geoCode = (location,callback)=>{
    //takes location and return its lat and long.
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoicmFnaW5pNzciLCJhIjoiY2t1czVwMWZqMGtrcDJxbzJjYjR3azY2eCJ9.f-NqpH6y_KQ8XB-p3-9mkg&limit=1';
    fetch(geocodeUrl)
    .then(response => response.json())
    .then(body => {
    //if no place provided
        if(body.message){
       // console.log("Location provided looks Invalid");
       // throw Error("Location provided looks invalid");
       callback("Location provided looks Invalid",undefined)
        }
    //wrong place provided
        else if(!body.features.length){
        //console.log("Unable to find location.Try another search")
       // throw Error("Unable to find location.Try another search")
       callback("Unable to find location.Try another search",undefined)
         }
        else{
        //console.log("Place "+body.features[0].place_name+" longitude "+body.features[0].center[0]+" Latitude "+body.features[0].center[1])
        callback(undefined,{
            location : body.features[0].place_name,
            longitude : body.features[0].center[0],
            latitude : body.features[0].center[1]
        })
         }
    
}).catch(error =>
     {
        //console.log("Unable to connect to location service.Try after sometime");
        callback("Unable to connect to location service.Try after sometime",undefined)
        }
)
}

//module.exports = geoCode;
export default geoCode