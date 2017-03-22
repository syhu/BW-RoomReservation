var mongoose = require('mongoose');
var async = require('async');

module.exports = {
  createLesson : function(userName, name, id, count, building, floor, lessonClass, time, millionSecond, aim, period, people, note, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      var now = new Date();
      var today = now.getFullYear() + '/' + (now.getMonth()+1) + '/'
        + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":"
        + now.getSeconds();
      doc = new Lesson
      ({
        user: userName,
        lessonID: id,
        name: name,
        count: count,
        building: building,
        floor: floor,
        lessonClass: lessonClass,
        time: time,
        millionSecond: millionSecond,
        period: period,
        people: people,
        note: note,
        aim: aim,
        createTime: today,
        modifyTime: today,
        checkSituation: 'false'
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
          callback();
        }
      });
    });
  },

  createAllLesson : function(lessonAllData, timeCurrentFormat, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      var length = timeCurrentFormat.length;
      var now = new Date();
      var today = now.getFullYear() + '/' + (now.getMonth()+1) + '/'
        + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":"
        + now.getSeconds();
      // console.log(lessonAllData);
      // console.log(timeCurrentFormat);
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
      for (var i = 0 ; i <= length-1 ; i++)
      {
        // console.log(i + '->' + timeCurrentFormat[i]);
      }
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
          Lesson.update({lessonID: id}, {$set: {checkSituation: 'true', modifyTime: today}}, function(err)
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
              createTime: today,
              modifyTime: today,
              checkSituation: 'true'
            });
            console.log(doc);
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
          console.log('cycle ended');
          mongoose.disconnect();
          console.log('disconnect successful');
          callback();
        }
      )
      // console.log
      // (
      //   'user -> ' + user + '\n' +
      //   'name -> ' + name + '\n' +
      //   'building -> ' + building + '\n' +
      //   'floor ->' + floor + '\n' +
      //   'lessonClass -> ' + lessonClass + '\n' +
      //   'period -> ' + period + '\n' +
      //   'people -> ' + people + '\n' +
      //   'note -> ' + note + '\n' +
      //   'aim -> ' + aim + '\n'
      // );
      // callback();
    });
  }
}
