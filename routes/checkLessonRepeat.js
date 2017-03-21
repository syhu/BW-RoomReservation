var mongoose = require('mongoose');
var async = require('async');

module.exports = {
  searchLessonRepeat : function(currentTime, period, lessonClass, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      var repeat = false ;
      var length = currentTime.length;

      function asyncLoop(iterations, func, callback) {
        var index = 1;
        var done = false;
        var loop = {
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

            iteration: function() {
                return index;
            },

            break: function() {
                done = true;
                callback();
            }
        };
        loop.next();
        return loop;
      }

      function searchRepeat(thisTime, callback) {
          Lesson.find({time: thisTime, period: period, lessonClass: lessonClass}, function(err, data)
          {
            var counts = 0;
            for (var no in data)
            {
              counts++;
            }
            if (counts != 0)
            {
              // console.log('repeat');
              callback(1);
            }
            else if(counts == 0)
            {
              // console.log('no repeat');
              callback(0);
            }
          });
      }

      asyncLoop(length, function(loop) {
          thisTime = currentTime[(loop.iteration()-1)];
          // console.log(thisTime);
          searchRepeat(thisTime, function(result) {

              // log the iteration
              // console.log(loop.iteration());

              if (result == 1)
              {
                repeat = true;
              }

              // Okay, for cycle could continue
              loop.next();
          })},
          function(){
            // console.log('cycle ended');
            mongoose.disconnect();
            if (repeat == true)
            {
              callback(1);
            }
            else if(repeat == false)
            {
              console.log('disconnect successful');
              callback(0);
            }
          }
      );
    });
  }
}
