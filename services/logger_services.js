
var configs = require(process.env.CONFIG || "../configurations");
var path = require('path');
var winston = require('winston');

var logLevel = configs.tracing.level;



winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
    verbose: 'blue'
});

var transportsList =  [];

if(configs.tracing.consoleMode){
    transportsList.push(new(winston.transports.Console)({
        level: logLevel,
        colorize: true,
        timestamp: function () {
            return (new Date()).toLocaleTimeString();
        },
        prettyPrint: true
    }));
}

if(configs.tracing.fileMode){
    transportsList.push(new(winston.transports.File)({
        level: logLevel,
        filename: process.cwd() + '/node_traces.log',
        timestamp: function () {
            return (new Date()).toLocaleTimeString();
        },
        prettyPrint: true
    }));
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});




module.exports = logger;

