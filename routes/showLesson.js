var mongoose = require('mongoose');

module.exports = {
  searchLesson : function(requireFirstDay, requireSecondDay, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      var today = new Date();
      var now = today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate();
      console.log(now);
      if (requireFirstDay == '' && requireSecondDay == '')
      {
        Lesson.find({time: now}, function(err, data)
        {
          if(data != '')
          {
            console.log(data);
            callback(err, data)
          }
          else if(data == '')
          {
            console.log('no data');
            callback(err, 'no data')
          }
          console.log(data);
          mongoose.disconnect();
          console.log('disconnect successful');
        });
      }
      else if (requireFirstDay != '' && requireSecondDay != '')
      {
        var first = requireFirstDay.split('/');
        var firstMillionSecond = new Date(first[0], first[1], first[2]).getTime();
        var second = requireSecondDay.split('/');
        var secondMillionSecond = new Date(second[0], second[1], second[2]).getTime();
        if (secondMillionSecond >= firstMillionSecond)
        {
          Lesson.find({'millionSecond': {'$gte': firstMillionSecond, '$lte': secondMillionSecond}}, function(err, data)
          {
            console.log(data);
            mongoose.disconnect();
            console.log('disconnect successful');
            callback(err, data);
          });
        }
      }
      else
      {
        console.log('Please send full data about require.');
        mongoose.disconnect();
        console.log('disconnect successful');
      }
    });
  }
}
