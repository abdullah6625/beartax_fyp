var configs = require('../configurations')
var constants = require('../constants')


exports.getStore = function (session) {
    if(configs.supportedDB == constants.supportedDatabases.nedb){

        var NedbStore = require('nedb-session-store')(session);

        var store = new NedbStore({
            filename: './data/sessions.db'
        });
    }
    else if(configs.supportedDB == constants.supportedDatabases.mongodb){

        var MongoStore = require('connect-mongo')(session);

        var store = new MongoStore({ url: configs.database.mongodb.prefix + configs.database.mongodb.ip + ":"+configs.database.mongodb.port+ "/"+configs.database.mongodb.database })
    }


    return store;
}


