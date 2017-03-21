var mongoose = require('mongoose');

module.exports = {
  getLessonInfo : function(lessonID, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      Lesson.find({lessonID: lessonID}, function(err, data)
      {
        mongoose.disconnect();
        console.log('disconnect successful');
        callback(err, data);
      });
    });
  }
}
