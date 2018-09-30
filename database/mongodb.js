var configs = require("../configurations");
var MongoClient = require('mongodb').MongoClient;
var logger = require('../services/logger_services');


//var url = configs.database.mongodb.prefix + configs.database.mongodb.ip + ":"+configs.database.mongodb.port+ "/";
//var dbConnection = "configs";

/*Connecting to database
 exports.doConnect = function (next){
    db.connect(url, function(err, client) {
        if (err){
             logger.error("db connection error: "+err);
             return next(err);
        }
       logger.write('connected');
        dbConnection= client.db(configs.database.mongodb.database);
        return next(null);
    });
} */


var url = "mongodb://localhost:27017/";

exports.read = function (data, callback) {
    logger.debug("read query data : "+ JSON.stringify(data));
    var collection = data.collection;
    var where = data.where || {};
    logger.debug("read query where : "+ JSON.stringify(where));
        
    MongoClient.connect(url,{useNewUrlParser:true}, function(err, db){
        if (err) throw err;
        var dbo = db.db("beatax");
        dbo.collection(collection).find(where).toArray(function(err, results) {
     
    if(err){
            logger.debug("db error : ");
            logger.debug(err);
            return callback(err, results);
        }
        logger.debug("db result : "+ JSON.stringify(results));
        return callback(err, results);
    });
});
  
}


exports.create = function (data, callback) {
    logger.debug("create query data : "+ JSON.stringify(data.payload));
    var collection = data.collection;
    MongoClient.connect(url,{useNewUrlParser:true}, function(err, db){
        if (err) throw err;
        var dbo = db.db("beatax");
    dbo.collection(collection).insertOne(data.payload, function(err, results){
        if(err){
            logger.debug("db error : ");
            logger.debug(err);
            return callback(err, results);
        }
        logger.debug("db result : "+ JSON.stringify(results));
        return callback(err, results);
    });
});
}

exports.update = function (data, callback) {
    logger.debug("update query data : "+ JSON.stringify(data.updatePayload));
    var collection = data.collection;
    var where = data.where;
    logger.debug("update query where : "+ JSON.stringify(where));
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("beatax");
    dbo.collection(collection).update( where,data.updatePayload, function(err, results){
        if(err){
            logger.debug("db error : ");
            logger.debug(err);
            return callback(err, results);
        }
        logger.debug("db result : "+ JSON.stringify(results));
        return callback(err, results);
    });
});
}
exports.delete = function (data, callback) {
    logger.debug("delete query data : "+ JSON.stringify(data.payload));
    var collection = data.collection;
    var where = data.where || {};
    logger.debug("update query where : "+ JSON.stringify(where));
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("beatax");
    dbo.collection(collection).deleteOne(data.payload,function(err, results){
        if(err){
            logger.debug("db error : ");
            logger.debug(err);
            return callback(err, results);
        }
        logger.debug("db result : "+ JSON.stringify(results));
        return callback(err, results);
    });
});
}