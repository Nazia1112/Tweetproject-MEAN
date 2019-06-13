var express = require('express');
var router = express.Router();
const userCont = require('../Controller/userCont');

router.post('/register', userCont.addUser);

router.post('/login', userCont.loginUser);

router.post('/tweet',TokenVerfy, userCont.postTweet );

router.get('/',userCont.getUsers);

router.get('/getMentions',TokenVerfy,userCont.getMentions);

router.get('/getTweets',TokenVerfy, userCont.getTweets);

router.delete('/deleteTweet/:_id',TokenVerfy, userCont.deleteTweet);

router.get('/getallTweets', userCont.getallTweets);


function TokenVerfy(req,res,next)
{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined)
    {
        
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token=bearerToken;
        console.log("rfegretetvf");
        next();
    }
    else{
        console.log("err");
        res.json({"status":403,msg: {str1:'Authentication Failed', str2: ''}})
    }
}

module.exports = router;
