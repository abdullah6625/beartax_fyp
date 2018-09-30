var nodemailer = require('nodemailer');
var configs = require("../configurations");

var transporter = nodemailer.createTransport({
    service: configs.email.services,
    auth: {
           user: configs.email.from,			//email ID
           pass: configs.email.password			//Password 
       }
   });
exports.sendMail = function sendMail(otp,recievermail){
       var details = {
           from: configs.email.from, // sender address same as above
<<<<<<< HEAD
           to: recievermail, 					// Receiver's email id
=======
           to: 'hafiz.bsse2605@iiu.edu.pk', 					// Receiver's email id
>>>>>>> 6da0a23abb98f52bd232a6014d5210397ace14ef
           subject: configs.email.otp.subject, // Subject of the mail.
           html: configs.email.otp.html + otp					// Sending OTP 
       };
   
   
       transporter.sendMail(details, function (error, data) {
           if(error)
               console.log(error)
           else
               console.log(data);
           });
       }
// sendMail(otp.toString() );