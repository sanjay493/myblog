const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app =express();

const {getHomePage, techNews, NotFound} = require('./routes/index');
const {addNewsPage, addNews, editNews, editNewsPage} = require('./routes/news');


const port = 5000;

const db = mysql.createConnection({
    host:'eu-cdbr-west-02.cleardb.net',
    user:'b80c97a8ae59f0',
    password: 'e0664e82',
    database:'heroku_330833ee1cd03c6'
});

db.connect((err) => {
    if(err){throw err;}
    console.log('Connected to Database')
});

global.db = db;

app.set('port', process.env.PORT || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// routes for the app

app.get('/', getHomePage);
app.get('/add', addNewsPage);
app.get('/edit/:id', editNewsPage);
//app.get('/delete/:id', deleteNews);
app.post('/add', addNews);
app.post('/edit/:id', editNews);


app.get('/technews',techNews);
app.get('*', NotFound);

app.listen(port,"0.0.0.0", () => {
    console.log('Server is Running at port:', port);
});
