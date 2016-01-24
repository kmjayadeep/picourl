var mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    url: {
        type: String,
        unique: true
    },
    sUrl: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('url', Schema)
