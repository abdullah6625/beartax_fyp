var models = require('../models');
var logger = require('../services/logger_services');
var utils = require('../utils');



function sendRequest(route,data, next) {
    try {
        switch (route) {

            case 'getAllUsers':
                models.users.getAllUsers(data, next);
                break;
          case 'signup':
                models.users.signup(data, next);
                break;
        case 'login':
                models.users.login(data, next);
                break;
           case 'exchanges':
                models.exchanges.exchanges(data, next);
                break;
               
            case 'getExchange':
                models.exchanges.getExchange(data, next);
                break;
            case 'updateExchange':
                models.exchanges.updateExchange(data, next);
                break;
        case 'deleteExchange':
                models.exchanges.deleteExchange(data, next);
                break;
                case 'deleteTransaction':
                models.transactions.deleteTransaction(data, next);
                break;
         case 'addTransaction':
                models.transactions.addTransaction(data, next);
                break;
        case 'getTransactions':
                models.transactions.getTransactions(data, next);
                break;
    case 'updateTransaction':
            models.transactions.updateTransaction(data, next);
                break;
        }
    } catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
exports.sendRequest = sendRequest;