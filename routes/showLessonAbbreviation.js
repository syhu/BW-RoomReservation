var mongoose = require('mongoose');

module.exports = {
  searchLessonAbbreviation : function(lessonName, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Abbreviation = require('./lessonAbbreviation_model.js');
      if (lessonName == '')
      {
        Abbreviation.find({}).sort({'createTime':'desc'}).exec(function(err, data)
        {
          if(data != '')
          {
            mongoose.disconnect();
            console.log('disconnect successful');
            callback(err, data);
          }
          else if(data == '')
          {
            mongoose.disconnect();
            console.log('disconnect successful');
            callback(err, 'no data');
          }
        });
      }
      else
      {
        Abbreviation.find({name: lessonName}).sort({'createTime':'desc'}).exec(function(err, data)
        {
          if(data != '')
          {
            mongoose.disconnect();
            console.log('disconnect successful');
            callback(err, data);
          }
          else if(data == '')
          {
            mongoose.disconnect();
            console.log('disconnect successful');
            callback(err, 'no data');
          }
        });
      }
    });
  }
}
