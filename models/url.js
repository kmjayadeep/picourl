var mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    url: {
        type: String,
        unique: true
    },
    sUrl: {
        type: Number,
        unique: true
    }
})

Schema.statics.getNewId = function(cb) {
    this.findOne({})
    .sort({
        _id:-1
    })
    .exec(function(err, u) {
        console.log(u)
        if (err)
            return cb(err)
        if (u)
            return cb(null, 1+u.sUrl);
        else
            return cb(null, 0)

    })
}

module.exports = mongoose.model('url', Schema)
