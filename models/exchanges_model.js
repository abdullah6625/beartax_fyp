var logger = require('../services/logger_services');
var dbService = require('../database');
var utils = require('../utils');


exports.exchanges=function(data,next)
{
       try{
            data.collection="exchanges";
            dbService.create(data,function(err,result){
                return next(err,result);
            });     




       }catch(e){ logger.error("Exception:" )  ;
       logger.error(e.stack);
       utils.serverException(e, next);}
}
exports.getExchange=function(data,next)
{
       try{
            data.collection="exchanges";
            dbService.read(data,function(err,result){
                return next(err,result);
            });     




       }catch(e){ logger.error("Exception:" )  ;
       logger.error(e.stack);
       utils.serverException(e, next);}
}
exports.updateExchange=function(data,next){
    try {
        data.collection="exchanges";
        data.updatePayload = {$set: {exchangeKey:data.payload.exchangeKey,exchangeSecret:data.payload.exchangeSecret}};
        data.where={exchangeId:data.payload.exchangeId};
        dbService.update(data,function(err,result){
            return next(err,result);
        });
    } catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
exports.deleteExchange=function(data,next){
    try {
        data.collection="exchanges";
        
        dbService.delete(data,function(err,result){
            return next(err,result);
        });
    } catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
