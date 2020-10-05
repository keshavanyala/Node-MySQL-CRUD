const mysql      = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json())

var connection = mysql.createConnection({
  
  host     : 'knrds.clajuce4jz5w.us-east-2.rds.amazonaws.com',
  user     : 'root',
  password : 'Ankilla123',
  database : 'knrds'
});

connection.connect((err) =>{

if(!err)
    console.log('DB connection Succeded.');
else
    console.log('DB connection Failed.'+JSON.stringify(err, undefined, 2));

})

app.listen(3000, ()=>console.log('Express server is running at port no : 3000'));


app.get('/employees', (res, req)=>{
    
})