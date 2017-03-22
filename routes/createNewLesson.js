var mongoose = require('mongoose');
var async = require('async');

module.exports = {
  createLesson : function(userName, name, id, count, building, floor, lessonClass, applyTime, sentTime, millionSecond, aim, period, people, note, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      doc = new Lesson
      ({
        user: userName,
        lessonID: id,
        name: name,
        count: count,
        building: building,
        floor: floor,
        lessonClass: lessonClass,
        time: applyTime,
        millionSecond: millionSecond,
        period: period,
        people: people,
        note: note,
        aim: aim,
        createTime: sentTime,
        modifyTime: sentTime,
        checkSituation: 'false'
      });
      doc.save(function(err, doc)
      {
        if(err){console.log(err);}
        else
        {
          console.log(doc.count + ' save successful');
          mongoose.disconnect();
          console.log('disconnect successful');
          callback();
        }
      });
    });
  },

  createAllLesson : function(lessonAllData, timeCurrentFormat, sentTime, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      var length = timeCurrentFormat.length;
      var user = lessonAllData[0].user;
      var id = lessonAllData[0].lessonID;
      var name = lessonAllData[0].name;
      var count = lessonAllData[0].count;
      var building = lessonAllData[0].building;
      var floor = lessonAllData[0].floor;
      var lessonClass = lessonAllData[0].lessonClass;
      var period = lessonAllData[0].period;
      var people = lessonAllData[0].people;
      var note = lessonAllData[0].note;
      var aim = lessonAllData[0].aim;
      function asyncLoop(iterations, func, callback)
      {
        var index = -1;
        var done = false;
        var loop =
          {
            next: function()
            {
              if (done) { return; }
              if (index < iterations)
              {
                index++;
                func(loop);
              }
              else
              {
                done = true;
                callback();
              }
            },

            iterations: function()
            {
              return index;
            },

            break: function()
            {
              done = true;
              callback();
            }
          };
          loop.next();
          return loop;
      }

      function auditpass(i, id, thisTime, callback)
      {
        if (i == 0)
        {
          Lesson.update({lessonID: id}, {$set: {checkSituation: 'true', modifyTime: sentTime}}, function(err)
          {
            if(err){console.log(err);}
            else
            {
              callback();
            }
          })
        }
        else
        {
          addLesson(i, thisTime, function()
          {
            callback();
          });
        }
      }

      function dateChangeUnixtime(thisTime, callback)
      {
        var splitTime = thisTime.split('/');
        var millionSecond = new Date(splitTime[0], splitTime[1]-1, splitTime[2]).getTime();
        callback(millionSecond);
      }

      function formatDate(thisTime, callback)
      {
        var timeTemp = thisTime.replace(/\//g, '');
        var applyUseTime = timeTemp.substr(2);
        callback(applyUseTime);
      }

      function updateLessonID(id, num, thisTime, callback)
      {
        var splitID = id.split('-');
        formatDate(thisTime, function(newFormatTime)
        {
          splitID[0] = newFormatTime;
          splitID[2] = (num + 1);
          newID = splitID.join('-');
          callback(newID);
        })
      }

      function addLesson(num, thisTime, callback)
      {
        dateChangeUnixtime(thisTime, function(millionSecond)
        {
          updateLessonID(id, num, thisTime, function(newID)
          {
            doc = new Lesson
            ({
              user: user,
              lessonID: newID,
              name: name,
              count: count,
              building: building,
              floor: floor,
              lessonClass: lessonClass,
              time: thisTime,
              millionSecond: millionSecond,
              period: period,
              people: people,
              note: note,
              aim: aim,
              createTime: sentTime,
              modifyTime: sentTime,
              checkSituation: 'true'
            });
            doc.save(function(err, doc)
            {
              if(err){console.log(err);}
              else
              {
                console.log(doc.lessonID + ' save successful');
                callback();
              }
            });
          });
        });
      }

      asyncLoop((length-1), function(loop)
      {
        thisTime = timeCurrentFormat[loop.iterations()];
        auditpass(loop.iterations(), id, thisTime, function()
        {
          loop.next();
        });
      },
        function()
        {
          mongoose.disconnect();
          console.log('disconnect successful');
          callback();
        }
      )
    });
  }
}
