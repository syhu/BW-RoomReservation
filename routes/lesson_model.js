var mongoose = require('mongoose');
var schema = mongoose.Schema;
var foundationSchema = new mongoose.Schema
({
  lessonID: String,
  data: String,
  timeSection: String,
  lessonCount: String,
  position: String,
  classroom: String,
  lessonName: String,
  peopleNum: String,
  note: String,
  createTime: String,
  modifyTime: String
});
module.exports = mongoose.model('lesson', foundationSchema);
