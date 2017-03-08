var mongoose = require('mongoose');
var schema = mongoose.Schema;
var foundationSchema = new mongoose.Schema
({
  lessonID: String,
  name: String,
  count: String,
  building: String,
  floor: String,
  lessonClass: String,
  time: String,
  millionSecond: String,
  week: String,
  period: String,
  people: String,
  note: String,
  createTime: String,
  modifyTime: String,
  checkSituation: Boolean
});
module.exports = mongoose.model('lessons', foundationSchema);
