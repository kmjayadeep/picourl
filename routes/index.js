var express = require('express');
var router = express.Router();
var Url = require('../models/url')
var config = require('../config.json')


router.get('/', function(req, res, next) {
    res.render('index', config);
});

router.get('/:url', function(req, res, next) {
    var url = req.params.url

    Url.findOne({
        sUrl: url
    }, function(err, u) {
    	if(err||!u)
    		return res.send('Invalid Url')
    	res.redirect(u.url)
    })
})

router.use('/new/', function(req, res, next) {
    var url = req.url.slice(1)
    if (!url) {
        return res.json({
            error: 'No url specified'
        })
    }
    Url.findOne({
            url: url
        }, function(err, u) {
            if (err)
                return res.json({
                    error: 'Error'
                })
            if (u)
                return res.json({
                    original_url: u.url,
                    short_url: config.baseUrl + u.sUrl
                })
            Url.getNewId(function(err, id) {
                if (err)
                    return res.json({
                        error: 'Error'
                    })
                var u = new Url({
                    url: url,
                    sUrl: id
                })
                u.save(function(err) {
                    if (err)
                        return res.json({
                            error: 'Unable to generate link'
                        })
                    return res.json({
                        original_url: u.url,
                        short_url: config.baseUrl + u.sUrl
                    })
                })
            })
        })
        // res.send(url)
})

module.exports = router;
