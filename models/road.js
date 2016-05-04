var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('road', new Schema({
    date: Date, // 日期
    name: String, // 地点
    direction: String, // 方向
    traffic: Number, // 交通指数
    speed: Number, // 平均车速
    level: String, // 拥堵等级
}));