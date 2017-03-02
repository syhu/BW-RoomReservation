var mongoose = require('mongoose');

module.exports = {
  createLesson : function(name, count, building, floor, lessonClass, time, week, period, people, note, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      var now = new Date();
      doc = new Lesson
      ({
        lessonID: 123,
        name: name,
        count: count,
        building: building,
        floor: floor,
        lessonClass: lessonClass,
        time: time,
        week: week,
        period: period,
        people: people,
        note: note,
        createTime: now,
        modifyTime: now,
        checkSituation: false
      });
      doc.save(function(err, doc)
      {
        if(err){console.log(err);}
        else
        {
          console.log(doc.count + ' save successful');
          mongoose.disconnect();
          mongoose.connection.close();
          console.log('disconnect successful');
          callback(null);
        }
      });
    });
  }
}
