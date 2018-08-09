'use strict';

var logger = require('../services/logger_services');


exports.httpResponse =  function(response, req, res, next){
    return res.send(response);
}

exports.parseReqBody =  function(req, res, next){
    var body = req.body;
    return next(null, body);
}

exports.serverException =  function(e, next){
    var error  = {code:"RC0500", message:"Internal Server Error!", errorDescription:e.message + ", type : " + e.type};
    if(typeof  next == "function"){
        return next(error);
    }else{
        return error;
    }

}

exports.serverError =  function(code, error, next){
    var error  = {code:code, message:"Other error", errorDescription: error};
    if(typeof  next == "function"){
        return next(error);
    }else{
        return error;
    }

}

exports.logHttpReq =  function(req, res, next){
    logger.info("route : " + req.originalUrl || req.url);
    logger.info("method : " + req.method);
    logger.verbose("headers: "+JSON.stringify(req.headers));
    logger.debug("body: "+JSON.stringify(req.body));

    return next();
}