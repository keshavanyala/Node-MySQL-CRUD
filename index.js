const mysql = require('mysql');
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

app.get('/employees', (req, res)=>{
  connection.query('select * from employee', (err, rows, fields)=>{
      if(!err)
        res.send(rows);
      else
        console.log(err);
    })
});

app.get('/employees/:id', (req, res)=>{
  connection.query('select * from employee where id = ?',[req.params.id], (err, rows, fields)=>{
      if(!err)
        res.send(rows);
      else
        console.log(err);
    })
});

app.delete('employees/:id', (req, res)=>{
  connection.query('delete from employee where id = ?', [req.params.id], (err, rows, fields)=>{
    if(!err){
      res.send('Deleted successfully.');
    } else {
      console.log(err);
    }
  })
});

app.post('employees', (req, res)=>{
  connection.query('insert into employee(name, dept, salary) values(?,?,?)', [req.params.name,req.params.dept,req.params.salary], (err, rows, fields)=>{
    if(!err){
      res.send('Employee Added successfully.');
    } else {
      console.log(JSON.stringify(err));
    }
  })
});

//Insert an employees now its not working
app.post('/employees', (req, res) => {
  let emp = req.body;
  var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
  CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  connection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
      if (!err)
          rows.forEach(element => {
              if(element.constructor == Array)
              res.send('Inserted employee id : '+element[0].EmpID);
          });
      else
          console.log(err);
  })
});

//Update an employees now its not working
app.put('/employees', (req, res) => {
  let emp = req.body;
  var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
  CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  connection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
      if (!err)
          res.send('Updated successfully');
      else
          console.log(err);
  })
});