const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app =express();

const {getHomePage, techNews, NotFound} = require('./routes/index');
const {addNewsPage, addNews, deleteNews, editNews, editNewsPage} = require('./routes/news');


const port = 4000;

const db = mysql.createConnection({
    host:'us-cdbr-iron-east-01.cleardb.net/',
    user:'b50af25f0084f4',
    password: '000b550f',
    database:'heroku_df575a44503662a'
});

db.connect((err) => {
    if(err){throw err;}
    console.log('Connected to Database')
});

global.db = db;

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extented: false}));
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

app.listen(process.env.PORT);
