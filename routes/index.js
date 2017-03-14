/******************   System settings   ******************/

/*** Include plugin ***/
var express = require('express');
var crypto = require('crypto');
var mongoose = require('mongoose');
var router = express.Router();

/*** Include javascript file ***/
var allLessonAbbreviation = require('./showLessonAbbreviation.js');
var createAbbreviation = require('./createLessonAbbreviation.js');
var createNewLesson = require('./createNewLesson.js');
var login = require('./login.js');
var search = require('./search.js');
var specifyLesson = require('./showLesson.js');
var user = require('./user.js');

/*** Variable ***/

/******************   functions   ******************/
function hashPW(account, password)
{
  var hash = crypto.createHash('md5');
  hash.update(account + password);
  return hash.digest('hex');
}

function hashID(pwHash, identity)
{
  var hash = crypto.createHash('md5');
  hash.update(pwHash + identity);
  return hash.digest('hex');
}

/******************   Routes   ******************/

/*** Home Page ***/
router.get('/',  function(req, res, next) {
  if(req.session.account)
  {
    if (req.session.logining == req.query.a)
    {
      if(req.session.logining == 0)
      {
        req.session.logining = 1;
      }
      res.render('index', { title: 'foundation', user: req.session.userName, information: req.session.information});
    }
    else
    {
      res.redirect('/?a=' + req.session.logining);
    }
  }
  else if(req.query.identity)
  {
    if(req.session.account)
    {
      res.redirect('/?a=' + req.session.logining);
    }
    else if (req.query.identity == 'visitor')
    {
      res.render('index', { title: 'Express', identity: 'visitor'});
    }
    else
    {
      res.redirect('/?identity=visitor');
    }
  }
  else
  {
    if(req.session.account)
    {
      res.redirect('/?a=' + req.session.logining);
    }
    else
    {
      res.redirect('/?identity=visitor');
    }
  }
});

/*** Loading ***/
router.get('/loading',function(req, res, next)
{
  res.render('loading', { title: 'Loading'});
})

/*** Login Page ***/
router.get('/login', function(req, res, next) {
  if(req.session.account)
  {
    res.redirect('/?a=' + req.session.logining);
  }
  if (req.session.error == req.query.error)
  {
    req.session.error = "";
    console.log(req.session.error);
    res.render('login', { title: 'Login'})
  }
  else if(req.query.error !=  req.session.error)
  {
    if(!req.query.error)
    {
      res.render('login', { title: 'Login'})
    }
    else if(req.session.error == "")
    {
      res.redirect('/login');
    }
    else
    {
      res.redirect('/login?error=' + req.session.error);
    }
  }
  else
  {
    res.render('login', { title: 'Login'})
  }
});

router.post('/login', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  login.loginCheck(account, hashPW(account, password), function(err, situation, user, userInformation)
  {
    if(situation == 0)
    {
      console.log(userInformation);
      req.session.account = account;
      req.session.userName = user;
      req.session.logining = 0;
      req.session.information = userInformation;
      res.redirect('/?a=0');
    }
    else if(situation == 1)
    {
      req.session.error = 'passwordError';
      res.redirect('/login?error=passwordError');
    }
    else if(situation == 2)
    {
      req.session.error = 'userNotFound';
      res.redirect('/login?error=userNotFound');
    }
  });
})

/*** Register Page ***/
router.get('/register',function(req, res, next) {
  if(req.session.account)
  {
    res.redirect('/?a=' + req.session.logining);
  }
  if (res.locals.error == 'accountRepeat')
  {
    res.render('register', { title: 'Register', register: '帳號重複' })
  }
  else
  {
    res.render('register', { title: 'Register' })
  }
})

router.post('/register',function(req, res, next) {
  var name = req.body.name;
  var account = req.body.account;
  var password = req.body.fuck;
  var pwHash = hashPW(account, password);
  var email = req.body.email;
  var telephone = req.body.telephone;
  var sex = req.body.sex;
  var identity = req.body.identity;
  var idHash = hashID(pwHash, identity);
  var birthday = req.body.birthday1 + '/' + req.body.birthday2 + '/' + req.body.birthday3;
  var address = req.body.address;
  console.log('test');
  if(req.xhr || req.accepts('json, html') === 'json')
  {
    user.userSave(name, account, pwHash, email, telephone, sex, idHash, birthday, address, function(err, repeat, userAccount , userName)
    {
      if(repeat == 0)
      {
        req.session.succ = 1;
        res.send({ success: "no"});
      }
      else
      {
        res.locals.error = 'accountRepeat';
        res.send({ success: "yes"});
      }
    });
  }
})

/*** Register successful page ***/
router.get('/successful', function(req, res, next){

  if(!req.session.succ)
  {
    req.session.destroy();
    res.render('successful', {title: 'Successful'})
  }
  else
  {
    res.redirect('/');
  }
})

/*** Log out ***/
router.get('/logout',function(req, res, next){
  req.session.destroy();
  res.redirect('/?identity=visitor');
})

/*** Lessson manage page***/
router.get('/lessonManage', function(req, res, next){
  if(req.session.account)
  {
    // specifyLesson.searchLesson('', '', function(err, todayLesson)
    specifyLesson.searchLesson('2017/01/01', '2017/12/31', function(err, todayLesson)
    {
      if(todayLesson != 'no data')
      {
        res.render('lessonManage', { user: req.session.userName, showLesson: todayLesson});
      }
      else if(todayLesson == 'no data')
      {
        res.render('lessonManage', { user: req.session.userName});
      }
    })
  }
  else
  {
    res.redirect('/?identity=visitor');
  }
})

router.post('/lessonManage', function(req, res, next){
  var lessonName = req.body.lessonName;
  var lessonCount = req.body.lessonCount;
  var lessonBuilding = req.body.lessonBuilding;
  var lessonFloor = req.body.lessonFloor;
  var lessonClass = req.body.lessonClass;
  var lessonTime = req.body.lessonTime;
  var lessonWeek = req.body.lessonWeek;
  var lessonPeriod = req.body.lessonPeriod;
  var lessonPeople = req.body.lessonPeople;
  var lessonNote = req.body.lessonNote;
  var splitTime = lessonTime.split('/');
  var millionSecond = new Date(splitTime[0], splitTime[1], splitTime[2]).getTime();
  if(req.xhr || req.accepts('json, html') === 'json')
  {
    // var lessonID =
    createNewLesson.createLesson(lessonName, lessonCount, lessonBuilding, lessonFloor, lessonClass, lessonTime, millionSecond, lessonWeek, lessonPeriod, lessonPeople, lessonNote, function(err)
    {
      res.send({ success: "yes"});
    });
  }
})

/*** Personal information page***/
router.get('/information', function(req, res, next){
  if(req.session.account)
  {
    res.render('information', { user: req.session.userName});
  }
  else
  {
    res.redirect('/?identity=visitor');
  }
})

/*** Lesson Manage System ***/
router.get('/lesson', function(req, res, next){
  if(req.session.account)
  {
    res.render('lesson', { user: req.session.userName});
  }
  else
  {
    res.redirect('/?identity=visitor');
  }
});

/*** User Manage ***/
router.get('/userManage', function(req, res, next){
  if(req.session.account)
  {
    res.render('userManage', { user: req.session.userName});
  }
  else
  {
    res.redirect('/?identity=visitor');
  }
});

/*** Search Account Reapet ***/
router.post('/searchAccount', function(req, res, next){
  var account = req.body.account;
  if(req.xhr || req.accepts('json, html') === 'json')
  {
    search.searchAccountReapet(account, function(err, repeat){
      if(repeat==0)
      {
        res.send({ success: "no"});
      }
      else
      {
        res.send({ success: "yes"});
      }
    })
  }
})

/*** Check Change Lesson Manage Page ***/
router.get('/audit', function(req, res, next){
  if(req.session.account)
  {
    res.render('audit', { user: req.session.userName});
  }
  else
  {
    res.redirect('/?identity=visitor');
  }
})

module.exports = router;

/*** Lesson identity Manage Page ***/
router.get('/lessonIDManage', function(req, res, next){
  if(req.session.account)
  {
    allLessonAbbreviation.searchLessonAbbreviation(function(err, data)
    {
      if(data == 'no data')
      {
        res.render('lessonIDManage', { user: req.session.userName});
      }
      else
      {
        res.render('lessonIDManage', { user: req.session.userName, showLessonAbbreviation: data});
      }
    })
  }
  else
  {
    res.redirect('/?identity=visitor');
  }
})

router.post('/lessonIDManage', function(req, res, next){
  var lessonName = req.body.lessonName;
  var lessonAbbreviation = req.body.lessonAbbreviation;
  var userName = req.session.userName;
  if(req.xhr || req.accepts('json, html') === 'json')
  {
    createAbbreviation.createLessonAbbreviation(userName, lessonName, lessonAbbreviation, function(err, repeat)
    {
      if(repeat == 0)
      {
        res.send({success : "no repeat"})
      }
      else if (repeat == 1)
      {
        res.send({success: "repeat"})
      }
    })
  }
})
