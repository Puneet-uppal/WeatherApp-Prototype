const express=require("express");
//GET request for API(native method using https)
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");


    // res.send("server is up and running");
});

app.post("/",function(req,res){
    console.log("Post request recieved");
    const query=req.body.cityName;
    const apiKey="dc262d054a4837ede65b741a5f2356a7";
    const units="metric";
    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url,function(response){
        // console.log(response);
        // console.log(response.statusCode);

        //to get data in hexadecimal form
        response.on("data",function(data){
            // console.log(data);
            //to get data in object form
            const weatherdata=JSON.parse(data);
            // console.log(weatherdata);

            //creating object to show stringify 
            // var object={
            //     name:"puneet",
            //     age:21,
            // };
            // console.log(JSON.stringify(object));

            //how to fetch certain property of weather api
            var temp=weatherdata.main.temp;
            var weatherDescription=weatherdata.weather[0].description;
            var icon=weatherdata.weather[0].icon;
            res.write("<p>the description of weather is"+weatherDescription+"</p>");
            res.write("<h1></h1>the temperature in "+query+" is "+temp+" degree C</h1>");
            var imgurl="https://openweathermap.org/img/w/"+icon+".png";
            res.write("<br><img src=imgurl>");
            // console.log(temp)
            // console.log(weatherdescription)
            
            // console.log(temp);
            res.send();
        });
    });
})

app.listen(8000,function(){
    console.log("server has started on port 8000");
});