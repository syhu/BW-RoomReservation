var mongoose = require('mongoose');
module.exports = {
  logout : function(name)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open',function()
    {
      console.log('mongoose opened !');
      var User = require('./accounts_model.js');
      User.update({name: name}, {$set: {loginSituation: false}}, function(err)
      {
        if (err) {console.log(err);}
        else
        {
          mongoose.disconnect();
        }
      });
    })
  }
}
