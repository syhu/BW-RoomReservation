var mongoose = require('mongoose');

module.exports = {
  checkPositionReapet : function(location, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Position = require('./position_model.js');
      Position.find({location: location}, function(err, data)
      {
        var counts = 0;
        for (var no in data)
        {
          counts++;
        }
        if (counts == 0)
        {
          mongoose.disconnect();
          mongoose.connection.close();
          callback(0)
        }
        else
        {
          mongoose.disconnect();
          mongoose.connection.close();
          callback(1)
        }
      })
    });
  },
  createNewPosition : function(userName, building, floor, classroom, location, people, note, sentTime, lock, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Position = require('./position_model.js');
      console.log(location);
      doc = new Position
      ({
        user: userName,
        location: location,
        building: building,
        floor: floor,
        classroom: classroom,
        people: people,
        lock: lock,
        createTime: sentTime,
        modifyTime: sentTime,
        note: note
      });
      doc.save(function(err, doc)
      {
        if(err){console.log(err);}
        else
        {
          console.log(doc.location + ' save successful');
          mongoose.disconnect();
          mongoose.connection.close();
          console.log('disconnect successful');
          callback();
        }
      });
    })
  },
  getPositionData : function(callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Position = require('./position_model.js');
      Position.find({}, function(err, data)
      {
        mongoose.disconnect();
        mongoose.connection.close();
        callback(data);
      })
    })
  },
  lockPosition : function(positionData, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Position = require('./position_model.js');
      var data = JSON.parse(positionData)
      location = data[0].location;
      lock = data[0].lock;
      if (lock == 'no')
      {
        Position.update({location: location}, {$set: {lock: 'yes'}}, function(err){
          mongoose.disconnect();
          mongoose.connection.close();
          callback();
        })
      }
      else if (lock == 'yes')
      {
        Position.update({location: location}, {$set: {lock: 'no'}}, function(err){
          mongoose.disconnect();
          mongoose.connection.close();
          callback();
        })
      }
    })
  }
}
