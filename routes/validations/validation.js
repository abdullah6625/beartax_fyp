'use strict';

var joi = require("joi");

module.exports ={


    getUsers: {
        body: {}
    },
    login:{
            body:{
                
                payload:joi.object({
                    email:joi.string().email().required(),
                    password:joi.string().required()
                }),
            
            }
    },
    signup:{
        body:{
            payload:joi.object({
                  name:joi.string().required(),
                  userName:joi.string().required(),
                  email:joi.string().email().required(),
                  password:joi.string().required(),
                  contactNumber:joi.string().required(),
                  otp:joi.number().required()
                  

            }).required(),
        }


    }, exchanges:{
                  body:{
                      payload:joi.object({
                             exchangeId:joi.number().required(),
                             exchangeName:joi.string().required(),
                             exchangeKey:joi.string().required(),
                             exchangeSecret:joi.string().required()

                      }),
                  }
    },


    getExchange: {
        body: {}
    },
    updateExchange:{
        body:{
            payload:joi.object({
                exchangeKey:joi.string().required(),
                exchangeSecret:joi.string().required()
            }).required()
        }
    } ,
    deleteExchange:{
        body:{
                        payload:joi.object({
                            exchangeId:joi.number().required()})
        }
    },
   
    addTransaction:{
                    body:{
                    payload:joi.object({
                        exchangeId:joi.string().required(),
                        transactionId:joi.number().required(),
                        type:joi.string().required(),
                        proceeds:joi.number().required(),
                        amount:joi.number().required(),
                        currency:joi.string().required()
                           

                    })

                    }
    },
    deleteTransaction:{
        body:{
            payload:joi.object({
                transactionId:joi.number().required()})
}
    },
    getTransactions:{
        body:{}
    },
    updateTransaction:{
        body:{
            payload:joi.object({
                type:joi.string().required(),
                currency:joi.string().required()
            }).required()
        }
    } ,
    otps:{
        body:{
            payload:joi.object({
<<<<<<< HEAD
                email: joi.string().email().required(),
                contactNumber: joi.string().required()
=======
                contactNumber:joi.number().required()
>>>>>>> 6da0a23abb98f52bd232a6014d5210397ace14ef
            }).required()
        },
    }
}
 