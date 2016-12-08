/******************   System settings   ******************/

/*** Include plugin ***/
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');

/*** Include javascript file ***/
var user = require('./user.js');
var login = require('./login.js');

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
      res.render('index', { title: 'foundation', user: req.session.userName});
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
  login.loginCheck(account, hashPW(account, password), function(err, situation, user)
  {
    if(situation == 0)
    {
      req.session.account = account;
      req.session.userName = user;
      req.session.logining = 0;
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
  var password = req.body.password;
  var pwHash = hashPW(account, password);
  var email = req.body.email;
  var telephone = req.body.telephone;
  var sex = req.body.sex;
  var identity = req.body.identity;
  var idHash = hashID(pwHash, identity);
  var birthday = req.body.birthday;
  var address = req.body.address
  console.log(name)
  console.log(account)
  console.log(password)
  console.log(pwHash)
  console.log(email)
  console.log(telephone)
  console.log(sex)
  console.log(identity)
  console.log(idHash)
  console.log(birthday)
  console.log(address)
  user.userSave(name, account, pwHash, email, telephone, sex, idHash, birthday, address, function(err, repeat, userAccount , userName)
  {
    if(repeat == 0)
    {
      nowUseAccount = userAccount;
      nowUserName = userName;
      res.redirect('/successful');
    }
    else
    {
      res.locals.error = 'accountRepeat';
      res.redirect('/register');
    }
  });
})

/*** Register successful page ***/
router.get('/successful', function(req, res, next){

  if(!req.session.account)
  {
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
    res.render('lessonManage', { user: req.session.userName});
  }
  else
  {
    res.redirect('/?identity=visitor');
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

module.exports = router;
