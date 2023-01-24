require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV
const path = require('path');
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const mysql = require('mysql');
const table = process.env.DB_TABLE;

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM tasks ORDER BY id desc', function(err,rows){
        if(err) {
            // render to views/error-page.ejs
            res.render('error-page',{error:err}); 
        } else {
            // render to views/books/index.ejs
            res.render('index',{data:rows});
            // res.send(rows); 
        }
    });
  });

//Get todo list 

//Add task
app.get('/add', function(req, res, next) {    
    // render to add.ejs
    // res.render('add')
    res.render('add', {data : {
        team_member: '',
        title: '',
        priority: ''
    }, error: ''})
  })

  app.post('/add',  function(req, res, next){
    // add a new task
    let team_member = req.body.team_member;
    let title = req.body.title;
    let priority = req.body.priority;

    var form_data = {
        team_member: team_member,
        title: title,
        priority: priority
    }
    // validae data, and render back to add.ejs if needed
    if(team_member == '') {
        res.render('add', {data: form_data, error: "Team member can't be empty"})
    }
    else if(title == '') {
        res.render('add', {data: form_data, error: "Title can't be empty"})
    }
    else if(priority == 'Pick priority') {
        res.render('add', {data: form_data, error: "Please pick priority"})
    }
    else {
        // insert query
        dbConn.query('INSERT INTO ' + table +' SET ?', form_data, function(err, result) {
        if (err) {
            console.error("Couldn't add task: " + err)
            // render to add.ejs
            res.render('add', {data: form_data, error: "Couldn't add task: " + err})
        } else {
            console.log ('Task '+ title +' was added to DB successfully')          
            res.redirect('/');
        }
        })
    }
  })

//Edit task

//Delete task
app.get('/delete/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConn.query('DELETE FROM ' + table + ' WHERE id = ' + id, function(err, result) {
        if (err) {
            // set flash message
            console.error(err)
            // render to error page
            res.render('error-page',{error:err});
        } else {
            // set flash message
            console.log('Task successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/')
        }
    })
  })

//Update task

//Update query

//Listen on pc port
const port = process.env.PORT
app.listen(port , () => {
    console.log(`Server running on PORT ${port}\nClick Here: http://localhost:${port}`)
})