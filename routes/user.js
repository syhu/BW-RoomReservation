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
            mongoose.connection.close();
            console.log('disconnect successful');
            var err = new Error('something wrong');
            callback(err, 1);
          }
        });
      }
    });
  },
  getAllUser : function(callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var User = require('./accounts_model.js');
      User.find({}).sort({'authorty':'asc'}).exec(function(err, data)
      {
        var counts = 0;
        for(var key in data)
        {
          counts++;
        }
        if (counts == 0)
        {
          mongoose.disconnect();;
          mongoose.connection.close();
          console.log('disconnect successful');
          callback('no data');
        }
        else
        {
          mongoose.disconnect();
          mongoose.connection.close();
          console.log('disconnect successful');
          callback(data);
        }
      })
    })
  },
  getSearchUser : function(searchData, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var User = require('./accounts_model.js');
      var data = JSON.parse(searchData)
      name = data[0].name;
      account = data[0].account;
      authorty = data[0].authorty;
      User.find({account: new RegExp(account, 'i'), name: new RegExp(name, 'i'), authorty: new RegExp(authorty, 'i')}, function(err, data){
        mongoose.disconnect();
        mongoose.connection.close();
        console.log('disconnect successful');
        callback(err,data);
      })
    })
  },
  updateAuthorty : function(userData, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var User = require('./accounts_model.js');
      var data = JSON.parse(userData)
      account = data[0].account;
      authorty = data[0].authorty;
      if (authorty == 'User')
      {
        User.update({account: account}, {$set: {authorty: 'Owner'}}, function(err){
          mongoose.connection.close();
          mongoose.disconnect();
          callback('ok');
        })
      }
      else if (authorty == 'Owner')
      {
        User.update({account: account}, {$set: {authorty: 'User'}}, function(err){
          mongoose.connection.close();
          mongoose.disconnect();
          callback('ok');
        })
      }
      else if(authorty == 'Admin')
      {
        mongoose.connection.close();
        mongoose.disconnect();
        callback('no good');
      }
    })
  },
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
        mongoose.connection.close();
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
  },
};
