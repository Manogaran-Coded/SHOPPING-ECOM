const app=require("./app");
//const dotenv=require("dotenv");
const connectDatabase=require("./config/database")
const EventEmitter = require('events');
const emitter = new EventEmitter()
const cloudinary=require("cloudinary");
emitter.setMaxListeners(50)
//Handling Uncaught Exception
process.on("uncaught Exception",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
});


//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path: "backend/config/config.env"});
}


//connecting to database

connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});
//console.log(youtube);
//unhandled Promise Rejection

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to undhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });

});



