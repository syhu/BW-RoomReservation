var mongoose = require('mongoose');

module.exports = {
  searchAccountReapet : function(account, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var User = require('./accounts_model.js');
      doc = new User
      ({
        account: account,
      });
      User.find({account: account}, function(err, data)
      {
        var counts = 0;
        for(var key in data)
        {
          counts++;
        }
        mongoose.disconnect();
        console.log('disconnect successful');
        if (counts == 0)
        {
          callback(err, 0);
        }
        else
        {
          var err = new Error('something wrong');
          callback(err, 1);
        }
      });
    });
  }
};
