var mongoose = require('mongoose');

module.exports = {
  loginCheck : function(account, hash, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var User = require('./accounts_model.js');
      User.find({account: account}, function(err, data)
      {
        if(err){console.log(err);}
        else
        {
          var counts = 0;
          for (var key in data)
          {
            counts++
          }
          if(counts != 0)
          {
            if (data[0].loginSituation == false)
            {
              if(hash == data[0].hash)
              {
                User.update({account: account}, {$set: {loginSituation: true}}, function(err)
                {
                  if (err) {console.log(err);}
                  else
                  {
                    mongoose.disconnect();
                    callback(err, 0, data[0].name);
                  }
                });
              }
              else
              {
                mongoose.disconnect();
                callback(err, 1, null);
              }
            }
            else
            {
              mongoose.disconnect();
              callback(err, 3, null);
            }
          }
          else
          {
            var err = new Error('something wrong');
            mongoose.disconnect();
            callback(err, 2, null);
          }
        }
      });
    });
  }
}
