var mongoose = require('mongoose');

module.exports = {
  searchLessonAbbreviation : function(callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Abbreviation = require('./lessonAbbreviation_model.js');
      Abbreviation.find(function(err, data)
      {
        if(data != '')
        {
          console.log(data);
          callback(err, data);
        }
        else if(data == '')
        {
          console.log('no data');
          callback(err, 'no data');
        }
        mongoose.disconnect();
        console.log('disconnect successful');
      });
    });
  }
}
