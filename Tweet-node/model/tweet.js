const mongoose = require('mongoose');
const Schema = mongoose.Schema;

tweetSchema = new Schema({
    tweet: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nbTweetuser'
    }
},
    {
        timestamps: true   

    });

module.exports = mongoose.model('nbTweet', tweetSchema);