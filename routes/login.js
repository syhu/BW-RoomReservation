var mongoose = require('mongoose');

module.exports = {
  loginCheck : function(account, pwHash, callback)
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
            if(pwHash == data[0].pwHash)
            {
              var now = new Date();
              User.update({account: account}, {$set: {lastLoginTime: now}}, function(err)
              {
                if(err){console.log(err);}
                else
                {
                  mongoose.disconnect();
                  mongoose.connection.close();
                  callback(err, 0, data[0].name, data);
                }
              })
            }
            else
            {
              mongoose.disconnect();
              mongoose.connection.close();
              callback(err, 1, null,'');
            }
          }
          else
          {
            var err = new Error('something wrong');
            mongoose.disconnect();
            mongoose.connection.close();
            callback(err, 2, null,'');
          }
        }
      });
    });
  }
}
