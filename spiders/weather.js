var SG = require('superagent');

var Weather = require('../models/weather');
var url = 'http://www.qx121.com/weather/data/sk.json';

var alias = {
    58467: '慈溪',
    58468: '余姚',
    58561: '镇海',
    58562: '鄞州',
    58563: '北仑',
    58565: '奉化',
    58566: '象山',
    58567: '宁海',
};


module.exports = function() {
    SG.get(url)
        .set('Accept', 'application/json')
        .end(function(err, res) {
            if (err) {
                console.log('error', err);
            } else {
                var data = res.body;
                var date = new Date();
                date.setMinutes(0, 0, 0);
                for (var key in alias) {
                    new Weather({
                        date: date, // 时间
                        location: alias[key], // 地名
                        temp: data[key].temp[11], // 温度
                        humi: data[key].humi[11], // 相对湿度
                        rain: data[key].rain[11], // 降雨
                        windd: data[key].windd[11], // 风向
                        windv: data[key].windv[11],// 风力
                        pressure: data[key].pressure[11], // 气压
                        visi: data[key].visi[11], // 可见度
                    }).save(function(err, weather) {
                        if (err) {
                            console.log('error', err);
                        } else {
                            console.log('save', weather.location);
                        }
                    });
                }
            }
        });
}
