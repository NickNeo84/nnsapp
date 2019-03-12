var query = require('./conectDB').query;

module.exports.setPoints = setPoints;
module.exports.getPoints = getPoints;

function setPoints(points, user) {
    console.log('work setPoints')
    getPoints(user).then(function(result){
        var l_points = result+points;
        // console.log(result);
        return l_points
    }).then(function(l_points){
        // console.log(l_points);
        query('update users set points = ? where id = ?', [l_points,user]).then(function (result) {
        }).catch(function (err){
            console.log(err);
        });
    }).catch(function(err){
        console.log(err);
    });
};

function getPoints(user){
    return new Promise(function (resolve, reject) {
        query('select points from users where id = ?', [user]).then(function (result) {
        // console.log(result);
            resolve(result[0].points);
        }).catch(function (err) {
        console.log("error in select points");    
        console.log(err);
        });  
    }); 
};