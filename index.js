require('mongoose').connect('mongodb://localhost/spider');
// spiders
var air = require('./spider/air');
var weather = require('./spider/weather');

var period = 1 * 60 * 60 * 1000;

// greeting 
console.log('Spider Start');

function get() {
    console.log('log', new Date());
    air();
    weather();
}
// first get
get();
// get every period
setInterval(get, period);

