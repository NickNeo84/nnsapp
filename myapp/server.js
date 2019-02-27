require('rootpath')();
const express = require('express');
path = require('path');

const app = express();




 app.use(express.static('./dist/myapp'));


require('./inputPost')(app);

// app.get('./*', (req,res) =>{
//     console.log('work1');
//     res.sendfile(path.join(__dirname,'/dist/myapp/index.html'));
// });


app.listen(process.env.PORT || 8080, () => {
    console.log('start');   
})