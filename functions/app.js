var express = require('express');
require('dotenv').config()
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var linkedln_callback = require('../routes/linkedln_callback');
var router = express.Router();
const app = express();

router.use(logger('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(cors());

router.get('/verify',(req,res,next) => {
    res.status(200).json({applicationHealth : '100',message : 'verified' })
})

router.use('/callback', linkedln_callback);


app.use('/.netlify/function/api',router);
module.exports.handler = serverless(app);
// app.listen( process.env.PORT || 3005,()=>{
//     console.log('listening on port', process.env.PORT || 3005);
// });