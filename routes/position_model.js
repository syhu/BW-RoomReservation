var mongoose = require('mongoose');
var schema = mongoose.Schema;
var foundationSchema = new mongoose.Schema
({
  user: String,
  location: String,
  building: String,
  floor: String,
  classroom: String,
  people: String,
  lock: String,
  createTime: String,
  modifyTime: String,
  note: String
});
module.exports = mongoose.model('position', foundationSchema);
