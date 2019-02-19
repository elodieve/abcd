var express = require('express');
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
 var router = require ('./routes/router.js');
var userRouter = require('./routes/loginRoute');
var commandRouter = require('./routes/commandRouter');
var app = express();



mongoose.Promise = Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Succesfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', userRouter);
app.use('/commandes', commandRouter);

var port = 3000;

app.listen(port, function(){
	console.log("Mon serveur fonctionne sur http://localhost:"+port+"\n"); 
});

