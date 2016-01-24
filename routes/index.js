var express = require('express');
var router = express.Router();
var Url = require('../models/url')


router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/:url', function(req, res, next) {
	var url = req.params.url
	
	res.send(url)
})

router.use('/new/', function(req, res, next) {
    var url = req.url.slice(1)
    if (!url) {
        return res.json({
            error: 'No url specified'
        })
    }
    res.send(url)
})

module.exports = router;
