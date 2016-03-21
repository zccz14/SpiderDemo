var fs = require('fs');
var SG = require('superagent');
var CIO = require('cheerio');

var target = {
    url: 'www.pm25.com/ningbo.html'
};

var period = 1 * 60 * 60 * 1000;

// greeting 
console.log('PM25 Spider Start');

function get() {
    console.log('get at ', new Date());
    SG.get(target.url).end(function(err, res) {
        var $ = CIO.load(res.text);
        $('.bi_location_content_active').children().children().children().each(function(i, e) {
            var t = e.attribs;
            var result = new Date() + ' , ' + t.mon + ' , ' + t.aqi + ' , ' + t.pm25 + '\n';
            fs.appendFileSync('data-utf8.csv', result);
        });
    })
}
// first get
get();
// get every period
setInterval(get, period);

