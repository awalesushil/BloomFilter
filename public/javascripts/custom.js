var startInterval;

function checkAvailability() {
    startInterval = setInterval(function () {
        check();
    }, 100);
}

function killChecker() {
    clearInterval(startInterval);
}

function check() {
    var signUpEmail = document.getElementById("signUpEmail").value.trim().toLowerCase();
    if (signUpEmail.length !== 0) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/signUp/check',
            dataType: 'JSON',
            data: {
                signUpEmail: signUpEmail
            }
        }).done(function (data) {
            if (data['bit'] === 1) {
                document.getElementById("message").innerHTML = "<p class='red-text'>" +
                    "Username is taken. Try another. <i class='far fa-times-circle'></i></p>";
                document.getElementById("signUpBtn").disabled = true;
            } else {
                document.getElementById("message").innerHTML = "<p class='green-text'>" +
                    "Username is available. <i class='far fa-check-circle'></i></p>";
                document.getElementById("signUpBtn").disabled = false;
            }
        })
            .fail(function (err) {
                console.log(err);
            })
    } else {
        document.getElementById("message").innerHTML = "";
    }
}

$(document).ready(function() {
    $('.bordered').DataTable();

    var i = 0;
    var txt = "Probably there. Definitely not there.";
    var speed = 60; /* The speed/duration of the effect in milliseconds */

    typeWriter(); /* Initialize typewriter */

    function typeWriter(){

        if (i < txt.length) {
            if (txt.charAt(i) != "."){
                document.getElementById("tagline").innerHTML += txt.charAt(i);
            } else {
                document.getElementById("tagline").innerHTML += ".<br/>";
            }
            i++;
            setTimeout(typeWriter, speed);
        }
    }

});