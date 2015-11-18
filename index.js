var express = require('express');
var exphbs  = require('express-handlebars');
myConnection = require('express-myconnection');
bodyParser = require('body-parser');
cookieParser = require('cookie-parser');
var cookieSession =require('cookie-session');
session = require('express-session');
var mysql = require('mysql');

var post = require('./routes/post');
//var showFeeds = require('./routes/showFeeds');
 

  var dbOptions = {
   host: 'localhost',
   user: 'root',
   password: 'nwabisamilisantmasiko',
   port: 3306,
   database: 'Entertainment'
 };


var app = express();

app.use(express.static('public'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());



var fs = require('fs');

app.use(function(req, res, next){
  console.log('in my middleware!');
  //proceed to the next middleware component
  next();
});

 
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/dashboard', function(req, res){
	res.render('dashboard');
});

app.get('/poetry', function(req, res){
	res.render('poetry');
});
app.get('/write', function(req, res){
	res.render('write', {layout: false});
});
app.get('/categories', function(req, res){
	res.render('categories');
});
app.get('/feeds', function(req, res){
	res.render('feeds');
});


//update
 // app.get('/', post.showFeeds);
  app.get('/posts', post.showFeeds);
  app.get('/posts/add', post.showAdd);
  app.post('/posts/edit/:Id',  post.update);
  app.post('/posts/update/:Id', post.update);
  app.post('/write', post.add);
  // app.get('/posts', post.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/posts/delete/:Id', post.delete);
app.listen(3000);