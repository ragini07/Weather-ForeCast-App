import geoCode from './utils/geoCode.js';
import forecast from './utils/forecast.js';
import express from 'express';
import hbs from 'hbs';
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// express is function that returns object
const app = express();
const port = 3000;

// console.log(__dirname);
// console.log(__filename);

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partailsPath = path.join(__dirname,'../templates/partials')

// we can use static html but handlebars makes it dynamic
//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
//registerPartials provides a quick way to load all partials from a specific directory
hbs.registerPartials(partailsPath);
 //console.log(publicDirectoryPath);


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Ragini'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help'
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        name : "Ragini",
        title : "About Me"
    })
})
app.get('/weather',(req,res)=>{
    //express internally stringify and return json
    const address = req.query.address;
    if(!address){
        return res.send({
            errorMessage : "Address must be provided"
        })
    }
    geoCode(address,(error,{location,longitude,latitude} = {})=>{
        
        if(error!==undefined){
            return res.send({
                errorMessage : error
            });
        }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error!==undefined){
                    return res.send({
                        errorMessage : error
                    });
                }
                    res.send({
                        address : req.query.address,
                        location : location,
                        forecastDetails : forecastData
                     })
                
            })
    
        
    })
  
   
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : '404',
        errorMessage : "Help Article not found"
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title : '404',
        errorMessage : "Page Not Found"
    })
})
app.listen(port,()=>{
    console.log("server is running on port "+port);
})