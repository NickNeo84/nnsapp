const bodyParser = require("body-parser");

const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const parseNumber = require('_helpers/parse-number');
var numbersText = require('./numbers.json');

var query = require('./_helpers/conectDB').query;
var setPoints = require('./_helpers/setPoints').setPoints;
var getPoints = require('./_helpers/setPoints').getPoints;

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
    // console.log(req.user.sub);
    var one = req.body.one;
    var two = req.body.two;
    var answ = one+two;
    var check;
    var checkID;
    var cssSet;
    var user = req.user.sub;

    if (answ==req.body.answ){
        check = "Правильно!";
        checkID= true;
        cssSet= "truetype";
        setPoints(5, user);        
    } else{
        check = "Не верно!";
        cssSet = "falsetype";
        checkID = false;
    }
    
    res.send({'check':check, 'checkID':checkID, 'cssSet':cssSet});

    // getPoints(user).then(function(result){
    //     // здесь код будет выполнятся после запроса
    //     res.send({'check':check, 'checkID':checkID, 'cssSet':cssSet});
    // }).catch(function (err) {
    //     // здесь будет сообщение об ошибке
    //     console.log('Error');
    //     console.log(err);
    // });

  });

    app.post('/num', function (req, res) {

        var number = ''+req.body.num;
        var numb = parseNumber(number, 0);      
        // console.log(numb);
 
        res.send(numb);
        // console.log(numbersText.units);
       
    });

   app.post('/textNum', function (req, res) {

        var number = ''+req.body.num;
        var unit = +parseNumber(number,1); 
        var decade = +parseNumber(number,2); 
        var handred = +parseNumber(number,3); 
        var textNumber = '';

        //  console.log(unit+' '+decade+' '+handred);
        
        for(var attributename in numbersText.handreds){
            if (attributename == handred){
                textNumber += numbersText.handreds[attributename];
            };
        };
        if(decade == 1){
            for(var attributename in numbersText.secDec){
                if (attributename == unit){
                    textNumber += ' '+numbersText.secDec[attributename];
                };
            };
        } else {
            for(var attributename in numbersText.decades){
                if (attributename == decade){
                    textNumber += ' '+numbersText.decades[attributename];
                };
        };

        
            for(var attributename in numbersText.units){
            if (attributename == unit){
                textNumber += ' '+numbersText.units[attributename];
            };
        };
    };
    
    

    // console.log(textNumber);
        res.send({'num':textNumber});
    });
      
    app.post('/setPoints', function (req, res) {
         setPoints(req.body.points, req.user.sub);
    });

    app.get('/getPoints', function (req, res) {
        getPoints(req.user.sub).then(function(result){
            res.send({result});
        }).catch(function (err) {
            console.log(err);
        });
   });
}