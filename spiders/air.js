var SG = require('superagent');
var CIO = require('cheerio');

var Air = require('../models/air');
var url = 'http://www.pm25.com/ningbo.html';

module.exports = function() {
    SG.get(url).end(function(err, res) {
	if(err) return;
        var date = new Date();
        date.setMinutes(0, 0, 0);
        var $ = CIO.load(res.text);
        $('.bi_location_content_active').children().children().children().each(function(i, e) {
            var t = e.attribs;
            new Air({
                date: date,
                location: t.mon,
                aqi: t.aqi,
                pm25: t.pm25
            }).save(function(err, air) {
                if (err) {
                    console.log('error', err);
                } else {
                    console.log('save', air.location);
                }
            });
        });
    });
}
