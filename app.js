const { response } = require("express");
const express = require("express");
const https = require("https");
 bodyParser = require("body-parser")


const app = express();

app.use (bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")
    });
app.post("/", function(req, res){

    

const query = req.body.cityName;
const apiKey ="a3d9285d83cca414bf02e0664febd247";
const unit = "metric"


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + ""
    https.get(url, function(response){
        console.log(response.statusCode);
        

    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
       
        
        res.write("<P>the weather is currently " + weatherDescription + "</p>");
        res.write("<h1>the temperature is " + temp + " degree celcius</h1>");
        res.write("<img src=" + imageUrl +"></img>")
       
        res.send();
    })
})

})
    
     




app.listen (3000, function(){
    console.log("server is running on 3000")
})




