var express = require('express');
var router = express.Router();
const request = require('superagent');
require('dotenv').config()

function setUrl(data){
    if(data.redirectUrl && data.systemString && data.authSampleCode){
        process.env.EXPRESS_APP_REDIRECT_URI = data.redirectUrl
        process.env.EXPRESS_APP_CLIENT_ID = data.systemString
        process.env.EXPRESS_APP_CLIENT_SECRET = data.authSampleCode
    }
}

router.post('/', function (req, res, next) {
    try {
        setUrl(req.body || req.query)
        requestAccessToken(req.body.code || req.query.code, req.body.state || req.query.state)
            .then((response) => {
                requestProfile(response.body.access_token)
                    .then(response => {
                        res.status(200).json({ code: response.body, profile: response.body });
                    })
            })
            .catch((error) => {
                res.status(500).send(`${error}`)
                console.error(error)
            })
    } catch (error) {
        console.log(error)
    }

});

function requestAccessToken(code, state) {
    return request.post(process.env.LINKEDLN_ACCESS_URL)
        .send('grant_type=authorization_code')
        .send(`redirect_uri=${process.env.EXPRESS_APP_REDIRECT_URI}`)
        .send(`client_id=${process.env.EXPRESS_APP_CLIENT_ID}`)
        .send(`client_secret=${process.env.EXPRESS_APP_CLIENT_SECRET}`)
        .send(`code=${code}`)
        .send(`state=${state}`)
}

function requestProfile(token) {
    return request.get(process.env.LINKEDLN_USERINFO_URL)
        .set('Authorization', `Bearer ${token}`)
}

module.exports = router;