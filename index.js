const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
var path = require('path');
const authentication = require('./routes/authentication')(router);
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err)=>{
if(err){
    console.log('couldnt connect to database',err);
}
else{
console.log('connected to '+config.db) ;

}

});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/App/dist'));
app.use('/authentication',authentication);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/App/dist/index.html'));
});

app.use('/', router);
const port  = process.env.PORT || 3000;
app.listen(port,()=> console.log('listening 3000'));


