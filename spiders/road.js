var SG = require('superagent');
var CIO = require('cheerio');

var Road = require('../models/road');
var url = [];
for (var i = 1; i <= 18; i++) url.push('http://szmap.sutpc.com/roadcongmore.aspx?page=' + i);

module.exports = function () {
    url.forEach(function (url) {
        SG.get(url).end(function (err, res) {
            if (err) {
                console.log('GG');
                return;
            }
            var date = new Date();
            date.setSeconds(0, 0);
            var $ = CIO.load(res.text);
            var list = $('td').map(function (i, e) {
                return $(e).text().trim();
            }).toArray();
            list.splice(0, 4);
            while (list.length > 0) {
                var item = list.splice(0, 4);
                var arr = item[0].split(' ');
                new Road({
                    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
                    name: arr[0],
                    direction: arr[1],
                    traffic: item[1],
                    speed: item[2],
                    level: item[3]
                }).save(function (err, item) {
                    if (err) {
                        console.log('error', err);
                    } else {
                        console.log('save', item.date);
                    }
                })
            }
        });
    });
}
