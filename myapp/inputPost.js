const bodyParser = require("body-parser");

const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

module.exports = function (app) {


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
 app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.post('/test', function (req, res) {
//    console.log(req.body);
    var one = req.body.one;
    var two = req.body.two;
    var answ = one+two;
    var check;
    var checkID;
    var cssSet;
    if (answ==req.body.answ){
        check = "Правильно!"
        checkID= true;
        cssSet= "truetype";
    } else{
        check = "Не верно!"
        cssSet = "falsetype";
        checkID = false;
    }
    res.send({'check':check, 'checkID':checkID, 'cssSet':cssSet});
  });

}