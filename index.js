require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV
const express = require("express");
const app = express();
const mysql = require('mysql'); 

//Create connection
const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

//Connect to database
dbConn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

app.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM tasks ORDER BY id desc', function(err,rows){
        if(err) {
            // render to views/books/index.ejs
            // res.render('index',{data:''}); 
            res.send('something went wrong');  
        } else {
            // render to views/books/index.ejs
            // res.render('index',{data:rows});
            res.send(rows); 
        }
    });
  });

//Get todo list 

//Add task

//Edit task

//Delete task

//Update task

//Update query

//Listen on pc port
const port = process.env.PORT
app.listen(port , () => {
    console.log(`Server running on PORT ${port}\nClick Here: http://localhost:${port}`)
})