var logger = require('../services/logger_services');
var dbService = require('../database');
var utils = require('../utils');

// we will use our db layer in all our models
exports.getAllUsers =function(data,next)
{   
    try{
         data.collection="users";
         dbService.read(data, function (err, result) {
            return next(err, result);
                        });

}catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}

exports.signup=function(data,next){
      try{
                  data.collection="users",
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
exports.login = function(data, next){
  try{
      data.collection ="users";
      data.where = {email:data.payload.email};
      dbService.read(data, function (err, result) {
          return next(err, result);
      });

  }catch (e) {
      logger.error("Exception:" );
      logger.error(e.stack);
      utils.serverException(e, next);
  }


}
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
