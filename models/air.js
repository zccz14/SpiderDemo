var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('air', new Schema({
    date: Date, // 日期
    location: String, // 地点
    aqi: Number, // AQI
    pm25: Number, // PM2.5
}));