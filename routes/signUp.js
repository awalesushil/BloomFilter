var express = require('express');
var router = express.Router();
var db = require('./database');
var md5 = require('md5');
var bf = require('../BloomFilter');

var sess;

router.post('/', function(req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var signUpEmail = req.body.signUpEmail.toLowerCase();
    var signUpPassword = md5(req.body.signUpPassword);
    var signUpRePassword = md5(req.body.signUpRePassword);
    var gender = req.body.gender;
    var dateOfBirth = new Date(req.body.dateOfBirth).toISOString().slice(0,10);;
    var phoneNumber = req.body.phoneNumber;

    if (signUpPassword === signUpRePassword) {
            var sql = "INSERT INTO users (first_name, last_name, user_name, password, gender, date_of_birth, phone_number) " +
                "VALUES ('" + firstName + "','" + lastName + "','" + signUpEmail + "','" + signUpPassword + "','" + gender + "','" + dateOfBirth + "','" + phoneNumber + "')";
            db.query(sql, function (err, result) {
                if (err) throw err;
                bf.set(signUpEmail);
            });

            sess = req.session;
            sess.email = signUpEmail;
            res.redirect("/dashboard");
    } else {
        res.status(400);
        res.send("Passwords do not match!");
    }
});


router.post('/check', function(req, res, next){
    res.status(200);
    var bit = bf.get(req.body.signUpEmail);
    res.send({
        bit: bit
    });
});

module.exports = router;


