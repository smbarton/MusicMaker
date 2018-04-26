//DATABASE SETUP ===========
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookiePasrer = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var ejs = require('ejs');   //for ejs files

var port = process.env.PORT || 8080;


//CONNECT TO DATABASE

var uri = "mongodb://sbart:sbart@ds125255.mlab.com:25255/sb_database";

var options = {useMongoClient: true};

//Connect to our databse with mongoose
var db = mongoose.connect(uri, options);

//Handle the connection events
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("DB connected");
})


//CONFIGURE APP

app.use(morgan('dev')); //log every request to the console
app.use(cookiePasrer());    //read cookies (needed for auth)
//configure body parser
app.use(bodyParser.urlencoded({extended: true}));   //get information from forms
app.use(bodyParser.json());
//required for passprot
app.use(session({secret: 'pandas', resave: true, saveUninitialized: true}));   //sesion secret
app.use(passport.initialize());
app.use(passport.session());    //persisten login sessions
app.use(flash());   //use connect-flash for flash stored in session

//set file paths to acces local files
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/audio", express.static(__dirname + "/audio"));
app.use("/css", express.static(__dirname + "/css"));

app.use(express.static(__dirname +'/views'))

app.set('view engine', 'ejs');  //set up ejs for templating


//ROUTES

require('./config/passport')(passport); //pass passport for configuration

require('./routes/routes.js')(app, passport);   //loads our routes and pass in our app and fully configured passport


//START THE SERVER

app.listen(port);
console.log('listening on port ' + port);

module.exports = function() {
    path = require('path')
    
    //Load the FS module and the config file
    fs = require('fs')
    config = JSON.parse(fs.readFileSync('config.json'));
    
    //sets path to the views
    app.set('views', path.join(__dirname, '/views/'));
    
    //sets the index page
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/views/index.ejs');
    })
    
    //start the HTTP server
    app.listen(config.server.port, config.server.host);
}