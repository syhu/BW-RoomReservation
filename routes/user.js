var mongoose = require('mongoose');

module.exports = {
  userSave : function(name, account, hash, email, telphone, sex, identity, birthday, address, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var User = require('./accounts_model.js');
      var now = new Date();
      doc = new User
      ({
        name: name,
        account: account,
        hash: hash,
        email: email,
        telphone: telphone,
        sex: sex,
        identity: identity,
        birthday: birthday,
        address: address,
        authenticate: false,
        createTime: now
      });
      User.find({account: account}, function(err, data)
      {
        var counts = 0;
        for(var key in data)
        {
          counts++;
        }
        if (counts == 0)
        {
          doc.save(function(err, doc)
          {
            if(err){console.log(err);}
            else
            {
              console.log(doc.account + ' save successful');
              mongoose.disconnect();
              mongoose.connection.close();
              console.log('disconnect successful');
              callback(null, 0);
            }
          });
        }
        else
        {
          mongoose.disconnect();
          console.log('disconnect successful');
          var err = new Error('something wrong');
          callback(err, 1);
        }
      });
    });
  }
};
