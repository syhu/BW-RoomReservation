var mongoose = require('mongoose');
var schema = mongoose.Schema;
var foundationSchema = new mongoose.Schema
({
  id: Number,
  userName: String,
  contract: String,
  contractPhone: String,
  name: String,
  abbreviation: String,
  createTime: String,
  modifyTime: String
});
module.exports = mongoose.model('abbreviation', foundationSchema);
