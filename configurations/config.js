var constants = require("../constants");

module.exports = {

    port : 3000,
    tracing:{
        level : "debug",
        consoleMode : true,
        fileMode : true,
    },
    database :{
        mongodb :{
            ip : "localhost",
            port : "27017",
            prefix : "mongodb://",
            database : "beatax",
            username :"",
            password :"",
        }
    },
    email:{
        from:"abdullahmasood186@gmail.com",
        services: "gmail",
        password : "03328574726",
        otp :{           
            subject : "no-reply-emailVerification",
            html : "Type this code to signup ",
        }
    },
    supportedDB : constants.supportedDatabases.mongodb
}