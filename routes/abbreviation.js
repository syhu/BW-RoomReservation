var mongoose = require('mongoose');

module.exports = {
  createLessonAbbreviation : function(userName, lessonName, lessonAbbreviation, time, contract, contractPhone, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Abbreviation = require('./lessonAbbreviation_model.js');
      lessonAbbreviation = lessonAbbreviation.trim();
      Abbreviation.find(function(err, data)
      {
        var counts = 0;
        abbrData = '';
        for (var key in data)
        {
          abbrData = abbrData + data[key].abbreviation + ' ';
          counts ++;
        }
        abbrData = abbrData.trim();
        counts = counts+1;
        var total = counts;
        var fullLessonName = lessonName + '(' + contract + ')';
        doc = new Abbreviation
        ({
          id: counts,
          userName : userName,
          name : fullLessonName,
          abbreviation : lessonAbbreviation,
          contract : contract,
          contractPhone : contractPhone,
          createTime : time,
          modifyTime : time
        });
        function checkReapet(abbr)
        {
          var ca = 0;
          splitAbbrData = abbrData.split(' ');
          for (var a in splitAbbrData)
          {
            if (abbr == splitAbbrData[a])
            {
              ca++;
            }
          }
          if (ca != 0)
          {
            return 1;
          }
          else
          {
            return 0;
          }
        }

        function checkAbbreviationReapet(lessonAbbreviation)
        {
          allAbbr = lessonAbbreviation.split(' ');
          allAbbrLength = allAbbr.length;
          repeat = 0;
          for (i=0 ; i<allAbbrLength ; i++)
          {
            check = checkReapet(allAbbr[i]);
            if (check == 1)
            {
              return 1;
            }
          }
          return 0;
        }

        Abbreviation.find({name: fullLessonName}, function(err, data)
        {
          var counts = 0;
          for (var key in data)
          {
            counts ++;
          }
          if (counts == 0)
          {
            if (lessonAbbreviation != '')
            {
              check = checkAbbreviationReapet(lessonAbbreviation);
              if (check == 0)
              {
                doc.save(function(err, doc)
                {
                  if(err){console.log(err);}
                  else
                  {
                    console.log(doc.name + ' save successful');
                    mongoose.disconnect();
                    mongoose.connection.close();
                    console.log('disconnect successful');
                    callback(null, 0, total);
                  }
                });
              }
              else
              {
                mongoose.disconnect();
                mongoose.connection.close();
                console.log('disconnect successful');
                callback(null, 2, '');
              }
            }
            else
            {
              doc.save(function(err, doc)
              {
                if(err){console.log(err);}
                else
                {
                  console.log(doc.name + ' save successful');
                  mongoose.disconnect();
                  mongoose.connection.close();
                  console.log('disconnect successful');
                  callback(null, 0, total);
                }
              });
            }
          }
          else
          {
            mongoose.disconnect();
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(null, 1, '');
          }
        });
      })
    });
  },
  searchLessonAbbreviation : function(lessonName, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Abbreviation = require('./lessonAbbreviation_model.js');
      if (lessonName == '')
      {
        Abbreviation.find({}).sort({'createTime':'desc'}).exec(function(err, data)
        {
          if(data != '')
          {
            mongoose.disconnect();
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(err, data);
          }
          else if(data == '')
          {
            mongoose.disconnect();
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(err, 'no data');
          }
        });
      }
      else
      {
        Abbreviation.find({name: lessonName}).sort({'createTime':'desc'}).exec(function(err, data)
        {
          console.log(data);
          if(data != '')
          {
            mongoose.disconnect();
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(err, data);
          }
          else if(data == '')
          {
            mongoose.disconnect();
            mongoose.connection.close();
            console.log('disconnect successful');
            callback(err, 'no data');
          }
        });
      }
    });
  },
  updateLessonAbbreviationData : function(abbreviationData, sentTime, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Lesson = require('./lesson_model.js');
      var Abbreviation = require('./lessonAbbreviation_model.js');
      var data = JSON.parse(abbreviationData);
      id = data[0].id;
      splitName = data[0].name.split('(')
      name = splitName[0];
      oldContract = splitName[1].substr(0, splitName[1].length-1)
      abbreviation = data[0].abbreviation;
      contract = data[0].contract;
      contractPhone = data[0].contractPhone;
      newName = name + '(' + contract + ')';
      console.log(oldContract);
      console.log(contract);
      Abbreviation.update({id: id}, {$set: {name: newName, abbreviation: abbreviation, contract: contract, contractPhone: contractPhone, modifyTime: sentTime}}, function(err){
        Lesson.update({name: name, contract: oldContract}, {$set: {contract: contract, contractPhone: contractPhone, modifyTime: sentTime}}, {multi: true}, function(err){
          mongoose.disconnect();
          callback();
        })
      })
    })
  },
  checkAbbreviationReapet : function(abbreviationData, callback)
  {
    mongoose.connect('mongodb://localhost/foundation');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('mongoose opened !');
      var Abbreviation = require('./lessonAbbreviation_model.js');
      var data = JSON.parse(abbreviationData);
      id = data[0].id;
      abbr = data[0].abbreviation;
      name = data[0].name.split('(');
      contract = data[0].contract;
      newLessonContrace = name[0] + '(' + contract + ')';

      Abbreviation.find({id: id}, function(err, data)
      {
        oldAbbr = data[0].abbreviation;
        splitAbbr = oldAbbr.split(' ');
        splitAbbrInput = abbr.split(' ');
        checkAbbrReapet = 0;
        for (var a in splitAbbr)
        {
          check = splitAbbrInput.filter(function(item) { return item == splitAbbr[a] })
          if (check.length > 1) { checkAbbrReapet ++ }
        }
        if (checkAbbrReapet == 0)
        {
          Abbreviation.find(function(err, data)
          {
            var allAbbr = '';
            for (var key in data)
            {
              if ((key+1) != id){ allAbbr = allAbbr + data[key].abbreviation + ' '}
            }
            allAbbr = allAbbr.trim();
            Abbreviation.find({name: newLessonContrace}, function(err, data)
            {
              var c = 0
              for (var a in data)
              {
                c++
              }
              if (c != 0)
              {
                if ((data[0].id == id) && (data[0].name == newLessonContrace))
                {
                  splitAbbrData = allAbbr.split(' ');
                  checkAbbrReapet = 0;
                  for (var a in splitAbbrData)
                  {
                    check = splitAbbrData.indexOf(splitAbbrInput[a])
                    if (check != -1) { checkAbbrReapet ++ }
                  }
                  if (checkAbbrReapet == 0)
                  {
                    mongoose.disconnect();
                    callback('0');
                  }
                  else
                  {
                    mongoose.disconnect();
                    callback('2');
                  }
                }
                else
                {
                  mongoose.disconnect();
                  callback('1');
                }
              }
              else
              {
                mongoose.disconnect();
                callback('0');
              }
            })
          })
        }
        else
        {
          mongoose.disconnect();
          callback('2');
        }
      })
    })
  }
}
