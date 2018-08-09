var logger = require('../services/logger_services');
var dbService = require('../database');
var utils = require('../utils');






exports.deleteTransaction=function(data,next){
    try {
        data.collection="transactions";
        data.where={transactionId:data.payload.transactionId}
        dbService.delete(data,function(err,result){
            return next(err,result);
        });
    } catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
exports.addTransaction=function(data,next){
    try{
                data.collection="transactions",
                dbService.create(data,function(err,results){
                  return next(err, results);
                });
    }catch (e)
    {
      logger.error("Exception:" );
      logger.error(e.stack);
      utils.serverException(e, next);   
    }
}
exports.getTransactions=function(data,next)
{
       try{
            data.collection="transactions";
            dbService.read(data,function(err,result){
                return next(err,result);
            });     




       }catch(e){ logger.error("Exception:" )  ;
       logger.error(e.stack);
       utils.serverException(e, next);}
}
exports.updateTransaction=function(data,next){
    try {
        data.collection="transactions";
        data.updatePayload = {$set: {type:data.payload.type,currency:data.payload.currency}};
        data.where={transactionId:data.payload.transactionId};
        dbService.update(data,function(err,result){
            return next(err,result);
        });
    } catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}