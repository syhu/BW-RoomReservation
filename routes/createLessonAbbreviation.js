var mongoose = require('mongoose');

module.exports = {
  createLessonAbbreviation : function(userName, lessonName, lessonAbbreviation, time, callback)
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
        var counts = 0;
        for (var key in data)
        {
          counts ++;
        }
        counts = counts+1;
        var total = counts;
        var fullLessonName = lessonName + '(' + userName + ')';
        doc = new Abbreviation
        ({
          id: counts,
          userName : userName,
          name : fullLessonName,
          abbreviation : lessonAbbreviation,
          createTime : time,
          modifyTime : time
        });

        Abbreviation.find({name: fullLessonName}, function(err, data)
        {
          var counts = 0;
          for (var key in data)
          {
            counts ++;
          }
          if (counts == 0)
          {
            doc.save(function(err, doc)
            {
              if(err){console.log(err);}
              else
              {
                console.log(doc.name + ' save successful');
                mongoose.disconnect();
                mongoose.connection.close();
                console.log('disconnect successful');
                callback(null, 0, total);
              }
            });
          }
          else
          {
            mongoose.disconnect();
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(null, 1, total);
          }
        });
      })
    });
  }
}
