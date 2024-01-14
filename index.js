var express = require('express');
require('dotenv').config()
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var linkedln_callback = require('./routes/linkedln_callback');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/verify',(req,res,next) => {
    res.status(200).json({applicationHealth : '100',message : 'verified' })
})

app.use('/callback', linkedln_callback);

app.listen( process.env.PORT || 3005,()=>{
    console.log('listening on port', process.env.PORT || 3005);
});