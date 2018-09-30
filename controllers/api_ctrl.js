   'use strict'
   var requestBroker = require('./request_broker_ctrl');
   var logger = require('../services/logger_services');
   var constants = require('../constants/');
   var utils = require('../utils');
   var async = require('async');
   var sessionManager = require('./session_manager_ctrl');
   var emailSender= require('../services/email_services');
   

  
   exports.index = (function(req,res,next){

    return next('helo world');
   });
   exports.getAllusers =function(req,res,next){
          
    try{
            logger.debug("request body : " + JSON.stringify(req.body));

                var data ={};
                data.payload=req.body.payload;
                data.serveFrom=constants.servingFromDB;
                data.route="getAllUsers";
                async.waterfall([
                       function(callback){
                           requestBroker.send(data,function(err,response){ 
                                return callback(err,response);
                           });
                           
                         }

                ],
                    function(err, results){
                    if(err){
                        return next(err);
                    }
                    else{
                        return next(results);
                    }
                     } );
        

   }catch(e){
            logger.error("Exception:" )  ;
            logger.error(e.stack);
            utils.serverException(e, next);
   }
   }
   exports.signup=function(req,res,next)
   {
           try{

            logger.debug("request body : " + JSON.stringify(req.body));
            var data ={};
            data.payload=req.body.payload;
            data.serveFrom=constants.servingFromDB;
        
            async.waterfall([ function(callback){
                   
                
                  data.route="otpconf";
                    requestBroker.send(data,function(err,response){ 
                        if(err){
                            return callback(err, response);
                        }else{
                            return callback(err, response);
                        }});

                    
                  },
                  function callback(response,callback)
                  {
                       if(response.length==1)
                       {
                           data.route="signup";
                           requestBroker.send(data, function (error, response) {
                            return callback(error, response);
                        });
                        }else{
                            var error ={code: "RC005", message: "Not Authorize to signup" }
                            return callback(error); 
    }
}     

         ],

         function(err, results){
            if(err){
                return next(err);
            }
            else{
                return next(results);
            }
        });


    }catch(e){
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

   }
   
   exports.sendOtp = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        var otpObj = {};
        var otp = Math.floor(100000 + Math.random() * 900000)
        otpObj.otp = otp;
        otpObj.contactNumber = req.body.payload.contactNumber;
        otpObj.recieverEmail=req.body.payload.email;
        var recievermail=req.body.payload.email;
        data.payload = otpObj;
        //Sending mail
        emailSender.sendMail(otp,recievermail);
        //end       
        data.serveFrom = constants.servingFromDB;

        data.route = "sendOtp";
        async.waterfall([

            function(callback){
                requestBroker.send(data, function (error, response) {
                    return callback(error, response);
                });
            }

        ], function(err, results){
            if(err){
                return next(err);
            }
            else{
                return next(results);
            }
        });


    }catch(e){
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

   exports.login = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "login";
        async.waterfall([

            function(callback){
                requestBroker.send(data, function (error, response) {
                    return callback(error, response);
                });
            },
            function(response, callback){
                if(response.length==0){
                    var error ={code: "RC002", message: "User not exist" }             
                    return callback(error);
                }
                if(response[0].password!= data.payload.password){
                    var error ={code: "RC001", message: "Passward does not match" }
                    return callback(error);
                }
                sessionManager.createSession(req, response[0]);
                var result = {code: "RC0200", message: "Successfull",result:response};
                return callback(null,result);
            }
                 
        ], function(err, results){
            if(err){
                return next(err);
            }
            else{
                return next(results);
            }
        });


    }catch(e){
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}
exports.exchanges =function(req,res,next)
{
try{


    logger.debug("request body : " + JSON.stringify(req.body));
    var data={};
    data.payload=req.body.payload;
    data.serveFrom=constants.servingFromDB;
    data.route="exchange";
    async.waterfall([  function(callback){
        requestBroker.send(data, function (error, response) {
            return callback(error, response);});
        },
    
          



    
    function(err, results){
        if(err){
            return next(err);
        }
        else{
            return next(results);
        }
    }
]);

}catch(e){
    logger.error("Exception:" )  ;
    logger.error(e.stack);
    utils.serverException(e, next);
}


}
exports.getExchange=function(req,res,next)
{
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data={};
        data.payload=req.body.payload;
        data.serveFrom=constants.servingFromDB;
        data.route="getExchange";
       async.waterfall([
        function(callback){
            requestBroker.send(data, function (error, response) {
                return callback(error, response);});
            },
            function(err, results){
                if(err){
                    return next(err);
                }
                else{
                    return next(results);
                }
                 }
       ],);

    }catch(e){
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}
exports.updateExchange=function(req,res,next){

    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data={};
        data.payload=req.body.payload;
        data.serveFrom=constants.servingFromDB;
        data.route="updateExchange";
       async.waterfall([
        function(callback){
            requestBroker.send(data, function (error, response) {
                return callback(error, response);});
            },
            function(err, results){
                if(err){
                    return next(err);
                }
                else{
                    return next(results);
                }
                 }
       ],);

    }catch(e){
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
 
}
exports.deleteExchange=function(req,res,next){

    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data={};
        data.payload=req.body.payload;
        data.serveFrom=constants.servingFromDB;
        data.route="deleteExchange";  
        async.waterfall([
            function(callback){
                requestBroker.send(data, function (error, response) {
                    return callback(error, response);});
                },
                function(err, results){
                    if(err){
                        return next(err);
                    }
                    else{
                        return next(results);
                    }
                     }
        ])

    }catch(e){

        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
exports.deleteTransaction=function(req,res,next){

    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data={};
        data.payload=req.body.payload;
        data.serveFrom=constants.servingFromDB;
        data.route="deleteTransaction";  
        async.waterfall([
            function(callback){
                requestBroker.send(data, function (error, response) {
                    return callback(error, response);});
                },
                function(err, results){
                    if(err){
                        return next(err);
                    }
                    else{
                        return next(results);
                    }
                     }
        ])

    }catch(e){

        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
exports.addTransaction =function(req,res,next)
{
try{


    logger.debug("request body : " + JSON.stringify(req.body));
    var data={};
    data.payload=req.body.payload;
    data.serveFrom=constants.servingFromDB;
    data.route="addTransaction";
    async.waterfall([  function(callback){
        requestBroker.send(data, function (error, response) {
            return callback(error, response);});
        },
    
          



    
    function(err, results){
        if(err){
            return next(err);
        }
        else{
            return next(results);
        }
    }
]);

}catch(e){
    logger.error("Exception:" )  ;
    logger.error(e.stack);
    utils.serverException(e, next);
}


}
exports.getTransactions=function(req,res,next){
          
    try{
            logger.debug("request body : " + JSON.stringify(req.body));

                var data ={};
                data.payload=req.body.payload;
                data.serveFrom=constants.servingFromDB;
                data.route="getTransactions";
                async.waterfall([
                       function(callback){
                           requestBroker.send(data,function(err,response){ 
                                return callback(err,response);
                           });
                           
                         }

                ],
                    function(err, results){
                    if(err){
                        return next(err);
                    }
                    else{
                        return next(results);
                    }
                     } );
        

   }catch(e){
            logger.error("Exception:" )  ;
            logger.error(e.stack);
            utils.serverException(e, next);
   }
   }
   exports.updateTransaction=function(req,res,next){

    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data={};
        data.payload=req.body.payload;
        data.serveFrom=constants.servingFromDB;
        data.route="updateTransaction";
       async.waterfall([
        function(callback){
            requestBroker.send(data, function (error, response) {
                return callback(error, response);});
            },
            function(err, results){
                if(err){
                    return next(err);
                }
                else{
                    return next(results);
                }
                 }
       ],);

    }catch(e){
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
 
}