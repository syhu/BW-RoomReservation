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

/******************   Routes   ******************/

/*** Home Page ***/
router.get('/',  function(req, res, next) {
  if(req.session.account)
  {
    res.render('index', { title: 'foundation', user: req.session.userName});
  }
  else if(req.query.identity)
  {
    if(req.session.account)
    {
      res.redirect('/');
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
      res.redirect('/');
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
  if (req.query.error == 'passwordError')
  {
    res.render('login', { title: 'Login', err: '密碼錯誤' });
  }
  else if (req.query.error == 'userNotFound')
  {
    res.render('login', { title: 'Login', err: '無此使用者'})
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
      res.redirect('/');
    }
    else if(situation == 1)
    {
      res.redirect('/login?error=passwordError');
    }
    else if(situation == 2)
    {
      res.redirect('/login?error=userNotFound');
    }
  });
})

/*** Register Page ***/
router.get('/register',function(req, res, next) {
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
  var hash = hashPW(account, password);
  var email = req.body.email;
  var telphone = req.body.telphone;
  var sex = req.body.sex;
  var identity = req.body.identity;
  var birthday = req.body.birthday;
  var address = req.body.address
  user.userSave(name, account, hash, email, telphone, sex, identity, birthday, address, function(err, repeat, userAccount , userName)
  {
    if(repeat == 0)
    {
      nowUseAccount = userAccount;
      nowUserName = userName;
      res.redirect('/');
    }
    else
    {
      res.locals.error = 'accountRepeat';
      res.redirect('/register');
    }
  });
})

/*** Log out ***/
router.get('/logout',function(req, res, next){
  req.session.destroy();
  res.redirect('/?identity=visitor');
})

module.exports = router;
