var winston = require('winston');
var fs = require('fs');
winston.emitErrs = true;
var logDir = 'logs';

// Create the logs directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: logDir + '/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
