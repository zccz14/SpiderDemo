var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('weather', new Schema({
    date: Date, // 日期
    location: String, // 地点
    temp: Number, // 温度
    humi: Number, // 相对湿度
    rain: Number, // 降雨
    windd: String, // 风向
    windv: Number, // 风速等级
}));