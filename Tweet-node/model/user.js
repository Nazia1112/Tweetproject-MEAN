const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nbTweet'
    }]
});



module.exports = mongoose.model('nbTweetuser', userSchema);