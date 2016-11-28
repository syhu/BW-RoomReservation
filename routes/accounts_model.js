var mongoose = require('mongoose');
var schema = mongoose.Schema;
var foundationSchema = new mongoose.Schema
({
  name: String,
  account: {type: String, unique: true},
  hash: String,
  email: String,
  telphone: String,
  sex: String,
  identity: String,
  birthday: String,
  address: String,
  authenticate: Boolean,
  createTime: String
});
module.exports = mongoose.model('accounts', foundationSchema);
