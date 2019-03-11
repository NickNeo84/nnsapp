var pool;
const propertyDB = require('../propertyDB.json');

exports.connect = function(){
    pool = require('mysql').createPool(propertyDB
    );
};

exports.query = function (sql, props) {
  return new Promise(function (resolve, reject) {
      pool.getConnection(function (err, connection) {
          connection.query(
              sql, props,
              function (err, res) {
                  if (err) reject(err);
                  else resolve(res);
              }
          );
          connection.release();
      });
  });
};


// var mysql = require('mysql');

// module.exports = {
//     connect
// };

//  var connection;

// function connect(){
//         connection = mysql.createConnection({
//         host: "us-cdbr-iron-east-03.cleardb.net",
//         user: "b4f35e762df736",
//         password: "2ec83cf3",
//         database: "heroku_b228b13b156e0e9"
//       });

//       connection.connect(function(err) {              
//         if(err) {                                     
//           console.log('error when connecting to db:', err);
//           setTimeout(connect, 2000); 
//         }                                     
//       });    

//       connection.on('error', function(err) {
//         // console.log('db error', err);
//         if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
//           connect();                         
//         } else {                                      
//           throw err;                                  
//         }
//       });

//       return connection;
//     }

