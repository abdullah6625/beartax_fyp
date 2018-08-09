  
    'use strict'
    var sessionManager = require('../../controllers/session_manager_ctrl');
  var express =  require('express');
  var router = express.Router();
  var expressValidation= require('express-validation');
 var   apiController =require('../../controllers/api_ctrl');
 var validations = require('../validations'); 
 var utils = require('../../utils');
 
 
 router.get('/',apiController.index,utils.httpResponse,utils.logHttpReq);   
   router.get('/users',utils.logHttpReq, sessionManager.sessionChecker, expressValidation(validations.getUsers),apiController.getAllusers,utils.httpResponse);
   router.post('/signup',utils.logHttpReq,expressValidation(validations.signup), apiController.signup,utils.httpResponse);
   router.post('/login', utils.logHttpReq, expressValidation(validations.login), apiController.login, utils.httpResponse);
   router.post('/exchanges',utils.logHttpReq, sessionManager.sessionChecker,expressValidation(validations.exchanges),apiController.exchanges,utils.httpResponse);
   router.get('/exchanges',utils.logHttpReq, sessionManager.sessionChecker,expressValidation(validations.getExchange),apiController.getExchange,utils.httpResponse);
  router.put('/exchanges',utils.logHttpReq, sessionManager.sessionChecker,expressValidation(validations.updateExchange),apiController.updateExchange,utils.httpResponse);   
   router.delete('/exchanges',utils.logHttpReq, sessionManager.sessionChecker,expressValidation(validations.deleteExchange),apiController.deleteExchange,utils.httpResponse);
   router.delete('/transactions',utils.logHttpReq, sessionManager.sessionChecker,expressValidation(validations.deleteTransaction),apiController.deleteTransaction,utils.httpResponse);
   router.post('/transactions',utils.logHttpReq, sessionManager.sessionChecker,expressValidation(validations.addTransaction),apiController.addTransaction,utils.httpResponse);
   router.get('/transactions',utils.logHttpReq, sessionManager.sessionChecker,expressValidation(validations.getTransactions),apiController.getTransactions,utils.httpResponse);
  router.put('/transactions',utils.logHttpReq, sessionManager.sessionChecker,expressValidation(validations.updateTransaction),apiController.updateTransaction,utils.httpResponse);  
  router.post('otp',utils.logHttpReq,expressValidation(validations.otp),apiController.sendotp,utils.httpResponse)
  module.exports = router;