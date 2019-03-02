const config = require('config.json');
const jwt = require('jsonwebtoken');
var mysql = require('mysql');


// users hardcoded for simplicity, store in a db for production applications 
 const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

// var con = mysql.createConnection({
//     host: "us-cdbr-iron-east-03.cleardb.net",
//     user: "b4f35e762df736",
//     password: "",
//     database: "heroku_b228b13b156e0e9"
//   });


//   con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM users", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });


module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
