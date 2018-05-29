var express = require('express');
var router = express.Router();
var db = require('./database');
var md5 = require("md5");

var sess;

router.post('/', function(req, res, next) {
    var loginEmail = req.body.loginEmail;
    var password = md5(req.body.loginPassword);

        var sql = "SELECT * FROM users WHERE user_name = '" + loginEmail + "'";
        db.query(sql, function (err, result, fields) {
            if (err) throw err;

            if (result[0].password === password) {
                sess = req.session;
                sess.email = loginEmail;
                res.redirect("/dashboard");
            } else {
                res.redirect("/");
            }
        });
});

module.exports = router;
