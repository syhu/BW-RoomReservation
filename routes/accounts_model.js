var mongoose = require('mongoose');
var schema = mongoose.Schema;
var foundationSchema = new mongoose.Schema
({
  name: String,
  account: {type: String, unique: true},
  pwHash: String,
  email: String,
  telephone: String,
  sex: String,
  idHash: String,
  birthday: String,
  address: String,
  authenticate: Boolean,
  createTime: String,
  authorty: String
});
module.exports = mongoose.model('accounts', foundationSchema);
