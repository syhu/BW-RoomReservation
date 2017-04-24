var mongoose = require('mongoose');

module.exports = {
  createLessonAbbreviation : function(userName, lessonName, lessonAbbreviation, time, contract, contractPhone, callback)
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
        var fullLessonName = lessonName + '(' + contract + ')';
        doc = new Abbreviation
        ({
          id: counts,
          userName : userName,
          name : fullLessonName,
          abbreviation : lessonAbbreviation,
          contract : contract,
          contractPhone : contractPhone,
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
  },
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
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(err, data);
          }
          else if(data == '')
          {
            mongoose.disconnect();
            mongoose.connection.close();
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
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(err, data);
          }
          else if(data == '')
          {
            mongoose.disconnect();
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(err, 'no data');
          }
        });
      }
    });
  },
  updateLessonAbbreviation : function(abbreviationData, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Abbreviation = require('./lessonAbbreviation_model.js');
      var data = JSON.parse(abbreviationData);
      id = data[0].id;
      abbreviation = data[0].abbreviation;
      contract = data[0].contract;
      contractPhone = data[0].contractPhone;
      Abbreviation.update({id: id}, {$set: {abbreviation: abbreviation, contract: contract, contractPhone: contractPhone}}, function(err){
        mongoose.disconnect();
        callback();
      })
    })
  }
}
