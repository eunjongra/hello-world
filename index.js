// index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // 1
var methodOverride = require('method-override'); // 1
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.set('useUnifiedTopology', true); // 1
mongoose.connect('mongodb+srv://rushi1004:feillae!534355@ejra.jjoe5.mongodb.net/ejra?retryWrites=true&w=majority'); // 2
var db = mongoose.connection; //3

//4
db.once('open', function(){
  console.log('DB connected');
});
//5
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3
app.use(methodOverride('_method')); // 2

// Routes
app.use('/', require('./routes/home')); // 1
app.use('/contacts', require('./routes/contacts')); // 2


// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});