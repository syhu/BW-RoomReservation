var mongoose = require('mongoose');

module.exports = {
  createLesson : function(lessonName, lessonAbbreviation, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Abbreviation = require('./lessonAbbreviation_model.js');
      var now = new Date();
      // doc = new Abbreviation;
    });
  }
}
