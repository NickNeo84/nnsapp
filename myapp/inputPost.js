
const express = require('express');
const bodyParser = require("body-parser");

module.exports = function (app) {


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/test', function (req, res) {
//    console.log(req.body);
    var one = req.body.one;
    var two = req.body.two;
    var answ = one+two;
    var check;
    var checkID;
    if (answ==req.body.answ){
        check = "Правильно!"
        checkID= true;
    } else{
        check = "Не верно!"
        checkID = false;
    }
    res.send({'check':check, 'checkID':checkID});
  });

}