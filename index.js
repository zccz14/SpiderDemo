require('mongoose').connect('mongodb://localhost/spider');
// spiders
var air = require('./spiders/air');
var weather = require('./spiders/weather');
var road = require('./spiders/road');

var period = 1 * 60 * 60 * 1000;

// greeting 
console.log('Spider Start');

function get() {
    console.log('log', new Date());
    air();
    weather();
    road();
}
// first get
get();
// get every period
setInterval(get, period);

