var moment = require("moment");

var date = moment();
date.add(10,'year').subtract(6,'months');

console.log(date.format('MMM Do YYYY'));
new Date().getTime()  = moment().valueOf();//to samo
var createdAt = 1345;
var date = moment(createdAt);
console.log(date.format('h:mm a'))



