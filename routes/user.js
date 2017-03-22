var mongoose = require('mongoose');

module.exports = {
  userSave : function(name, account, pwHash, email, telephone, sex, idHash, birthday, address, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var User = require('./accounts_model.js');
      var now = new Date();
      if (account == 'administrator')
      {
        doc = new User
        ({
          name: name,
          account: account,
          pwHash: pwHash,
          email: email,
          telephone: telephone,
          sex: sex,
          idHash: idHash,
          birthday: birthday,
          address: address,
          authenticate: false,
          authorty: 'Admin',
          createTime: now,
          lastLoginTime: now
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
      }
      else
      {
        doc = new User
        ({
          name: name,
          account: account,
          pwHash: pwHash,
          email: email,
          telephone: telephone,
          sex: sex,
          idHash: idHash,
          birthday: birthday,
          address: address,
          authenticate: false,
          authorty: 'User',
          createTime: now,
          lastLoginTime: now
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
      }
    });
  }
};
