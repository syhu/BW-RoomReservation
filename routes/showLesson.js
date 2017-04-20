var mongoose = require('mongoose');

module.exports = {
  searchLesson : function(requireFirstDay, requireSecondDay, check, callback)
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
      if (requireFirstDay == '' && requireSecondDay == '')
      {
        Lesson.find({time: now, checkSituation: check}).sort({'time':'asc'}).exec(function(err, data)
        {
            if(data != '')
            {
              mongoose.disconnect();
              console.log('disconnect successful');
              callback(err, data)
            }
            else if(data == '')
            {
              console.log('no data');
              mongoose.disconnect();
              console.log('disconnect successful');
              callback(err, 'no data')
            }
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
          if (check == '')
          {
            Lesson.find({'millionSecond': {'$gte': firstMillionSecond, '$lte': secondMillionSecond}}).sort({'time':'asc'}).exec(function(err, data)
            {
                mongoose.disconnect();
                console.log('disconnect successful');
                callback(err, data);
            });
          }
          else
          {
            Lesson.find({'millionSecond': {'$gte': firstMillionSecond, '$lte': secondMillionSecond}, checkSituation: check}).sort({'time':'asc'}).exec(function(err, data)
            {
                mongoose.disconnect();
                console.log('disconnect successful');
                callback(err, data);
            });
          }
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
