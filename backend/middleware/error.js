const { Error } = require("mongoose");
const ErrorHandler=require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.stack||"Internal Server Error";

    //Wrong Mongo DB Error
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid: ${err.path}`;
        err=new ErrorHandler(message,400);
    }

    //Mongoose duplicate Error

    if(err.code===11000)
    {
        const message=`Duplicate ${object.keys(err.keyValue)} Entered`
        err=new ErrorHandler(message,400);
    }

        //Wrong JW Web Token error
        if(err.name==="JsonWebTokenError"){
            const message=`Json Web Token is invalid, try again`;
            err=new ErrorHandler(message,400);
        }

           //JWT Expire Error
           if(err.name==="TokenExpiredError"){
            const message=`Json Web Token is Expired, try again`;
            err=new ErrorHandler(message,400);
        }
    

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
};