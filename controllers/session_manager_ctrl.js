var session = require('express-session');

exports.createSession = function(req, userInfo, next){
    req.session.user = userInfo;
    }

    exports.sessionChecker = function (req, res, next) {
        if (!req.session.user && !req.cookies.user_sid) {
            res.send({code:"RC0300", message:"Login Required!"});
            return
        } else {
            next();
        }    
    };