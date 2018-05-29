var express = require('express');
var router = express.Router();
var db = require('./database');

var sess;

router.get('/', function(req, res, next) {
    sess = req.session;
    if (sess.email) {
            var sql = " SELECT * FROM users ";
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.render('dashboard', {
                    title: 'Dashboard',
                    users: result,
                    email: sess.email
                });
            });
    } else {
        res.redirect("/");
    }
});

router.get('/logout', function(req, res, next) {
    req.session.email = null;
    res.redirect("/");
});

module.exports = router;