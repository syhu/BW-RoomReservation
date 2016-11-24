var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var user = require('./user.js');
var login = require('./login.js')
var logout = require('./logout.js')

/******************   functions   ******************/
function hashPW(account, password)
{
  var hash = crypto.createHash('md5');
  hash.update(account + password);
  return hash.digest('hex');
}

/******************   Routes   ******************/
router.get('/', function(req, res, next) {
  if(req.query.User == "")
  {
    res.render('index', { title: 'Express' });
  }
  else
  {
    res.render('index', { title: 'Express', user: req.query.User})
  }
});

router.get('/loading',function(req, res, next)
{
  res.render('loading', { title: 'Loading'});
})

router.get('/login',function(req, res, next) {
  if (req.query.error == 'passwordError')
  {
    res.render('login', { title: 'Login', err: '密碼錯誤' });
  }
  else if (req.query.error == 'userNotFound')
  {
    res.render('login', { title: 'Login', err: '無此使用者'})
  }
  else if (req.query.error == 'alreadyLogin')
  {
    res.render('login', { title: 'Login', err: '此帳號已在其他裝置使用中'})
  }
  else
  {
    res.render('login', { title: 'Login'})
  }
});

router.post('/login',function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  login.loginCheck(account, hashPW(account, password), function(err, situation, user)
  {
    if(situation == 0)
    {
      res.redirect('/?User=' + user);
    }
    else if(situation == 1)
    {
      res.redirect('/login?error=passwordError');
    }
    else if(situation == 2)
    {
      res.redirect('/login?error=userNotFound');
    }
    else if(situation == 3)
    {
      res.redirect('/login?error=alreadyLogin');
    }
  });
})

router.get('/sign',function(req, res, next) {
  if (req.query.error == 'accountRepeat')
  {
    res.render('sign', { title: 'Sign', sign: '帳號重複' })
  }
  else
  {
    res.render('sign', { title: 'Sign' })
  }
})

router.post('/sign',function(req, res, next) {
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
  console.log("名字 -> " + name);
  console.log("帳號 -> " + account);
  console.log("密碼 -> " + password);
  console.log("變種密碼 -> " + hash);
  console.log("信箱 -> " + email);
  console.log("電話 -> " + telphone);
  console.log("性別 -> " + sex);
  console.log("身分證 -> " + identity);
  console.log("生日 -> " + birthday);
  console.log("地址 -> " + address);
  user.userSave(name, account, hash, email, telphone, sex, identity, birthday, address, function(err, repeat)
  {
    if(repeat == 0)
    {
      res.redirect('/');
    }
    else
    {
      res.redirect('/sign?error=accountRepeat');
    }
  });
})

router.get('/logout',function(req, res, next){
  var name = req.query.user;
  logout.logout(name);
  res.redirect('/');
})

module.exports = router;
