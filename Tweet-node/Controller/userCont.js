const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Tweet = require('../model/tweet');
const mongoose = require('mongoose')
module.exports.addUser = (req, res, next) => {
    console.log(req.body);
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                User.create(req.body)
                    .then((user) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, msg: 'Successfull' });
                        //res.render('users', {users: users});
                    });
            }
            else {
                res.statusCode = 409;
                res.setHeader('Content-Type', 'application/json');
                res.json({ msg: "User " + req.body.username + " Exists" });
            }
        }, err => next(err));
};

module.exports.loginUser = (req, res) => {
    let searchname = req.body.username;
    let passwordname = req.body.password;
    console.log(req.body);


    User.findOne({ username: searchname, password: passwordname }, (err, obj) => {
        if (obj == null) {
            res.json({ "status": 404, msg: { str1: 'Incorrect Username or Password.', str2: 'User not found.' } });
        }
        else {

            jwt.sign({ UserId: obj._id }, 'TopSecret', { expiresIn: 60 * 60 }, (err, token) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({
                        "status": 200, token: token, msg: {
                            str1: 'Successfully LoggedIn',

                        }
                    });
                }
            });
        }
    });

};

module.exports.postTweet = function (req, res) {

    console.log("hell0oo", req.token);
    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Authentication Failed', str2: '' } });
        }
        else {
            console.log(authdata, "authdata");
            req.body.author = mongoose.Types.ObjectId(authdata.UserId);
            var tweet = new Tweet(req.body);
            console.log(req.body);
            tweet.save((err, data) => {
                if (err) {
                    console.log(err)
                    res.json({ "status": 404, msg: { str1: 'Post failed.', str2: '' } });
                }
                else {
                    console.log("success");
                    console.log(data.tweet);
                    res.json({
                        "status": 200, msg: {
                            str1: 'Successfully Posted',
                            str2: ''
                        }
                    });

                }
            })
        }
    });
};

module.exports.getUsers = (req, res, next) => {
    User.aggregate([
        { $project: { username: 1 } }
    ])
        .then(users => {
            console.log(users, "hello");
            res.json(users);
        });
};



module.exports.getMentions = (req, res, next) => {
    //Use authentication middleware before getTweets
    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Authentication Failed', str2: '' } });
        }
        else {
            console.log(authdata, "authdata");
            req.body.username = authdata.UserId;
            console.log(req.body.username);
            User.findOne({ _id: authdata.UserId })
                .then((docs) => {
                    console.log(docs.username)
                    Tweet.find({ tweet: { $regex: docs.username, $options: 'i' } }).sort({ createdAt: -1 })
                        .populate('author', '-_id username')
                        .then(tweets => {
                            res.status(200);
                            res.json({
                                success: true,
                                message: 'fetched tweets with mentions',
                                data: { tweets: tweets }
                            })
                        })
                })
                .catch((err) => {
                    //res.status(500); 

                    res.json({
                        success: false,
                        message: err.message,
                    });
                });
        }
    });


}

module.exports.getTweets = function (req, res, next) {

    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            Tweet.find({ "author": authdata.UserId }).sort({ createdAt: -1 })
                .then((docs) => {
                    res.json({ "status": 200, data: docs });
                })
                .catch((err) => {
                    res.json({ "status": 404 });
                    rs.end(err);
                })
        }

    });

}

module.exports.deleteTweet = function (req, res, next) {
    console.log("dsdfs");
    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log(req.params._id);
            Tweet.findByIdAndDelete(req.params._id).then(docs => {
                return Tweet.find({ "author": authdata.UserId });

            })
                .then((Data) => {
                    res.json({ "status": 200, data: Data, msg: { str1: 'Tweet Successfully Deleted', str2: '' } });
                })
                .catch((err) => {
                    res.json({ "status": 404 });
                    rs.end(err);
                })
        }

    });
}

module.exports.getallTweets = function (req, res, next) {
    Tweet.find({}).sort({ createdAt: -1 }).populate('author', '-_id username').
        then((data) => {
            res.statusCode = 200;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log(data);
            res.json(data);
        }, (err) => next(err));
};





