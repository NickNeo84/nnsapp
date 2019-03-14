const config = require('config.json');
const jwt = require('jsonwebtoken');
var query = require('../_helpers/conectDB').query;


// users hardcoded for simplicity, store in a db for production applications const 
// users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
 var users = [];

async function getUsers(){
    return query('select * from users', []).then(function (result) {
        // здесь код будет выполнятся после запроса
        var string=JSON.stringify(result);
        var json =  JSON.parse(string);
        users = json;        
    }).catch(function (err) {
        // здесь будет сообщение об ошибке
        console.log('Error');
        console.log(err);
    });
}

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) { 
    let a = await getUsers();
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
    let a = await getUsers(); 
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
