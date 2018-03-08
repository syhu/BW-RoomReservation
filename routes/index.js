/******************   System settings   ******************/
/*** Include plugin ***/
var express = require('express');
var crypto = require('crypto');
var mongoose = require('mongoose');
var router = express.Router();

/*** Include javascript file ***/
var abbreviation = require('./abbreviation.js');
var lesson = require('./lesson.js');
var login = require('./login.js');
var position = require('./position.js');
var user = require('./user.js');

/*** Variable ***/

/******************   functions   ******************/
function hashPW(account, password) {
    var hash = crypto.createHash('md5');
    hash.update(account + password);
    return hash.digest('hex');
}

function hashID(account, identity) {
    var hash = crypto.createHash('md5');
    hash.update(account + identity);
    return hash.digest('hex');
}

function timePlus(millionSecond) {
    var millionSecond = parseInt(millionSecond) + 604800000;
    var newTime = new Date();
    var reDay = newTime.setTime(millionSecond);
    return reDay;
}

function timeFormat(millionSecond) {
    var origDay = new Date(millionSecond);
    var year = origDay.getFullYear();
    var month = padLeft(origDay.getMonth() + 1);
    var day = padLeft(origDay.getDate());
    var time = year + '/' + month + '/' + day;
    return time;
}

function getNowTime() {
    var date = new Date();
    var today = [];
    var time = [];
    today[0] = date.getFullYear();
    today[1] = padLeft(date.getMonth() + 1);
    today[2] = padLeft(date.getDate());
    time[0] = padLeft(date.getHours());
    time[1] = padLeft(date.getMinutes());
    time[2] = padLeft(date.getSeconds());
    realTime = today.join('/') + ' ' + time.join(':');
    return realTime;
}

function padLeft(num) {
    num = '' + num;
    if (num.length == 1) {
        return ('0' + num);
    } else {
        return num;
    }
}

function getRandString(num) {
    var string = '';
    for (var i = 1; i <= num; i++) {
        var aa = Math.floor((Math.random() * 3) + 1);
        if (aa == 1) {
            s = getRandSingleLowerAlphebet();
        } else if (aa == 2) {
            s = getRandSingleCapitalAlphebet();
        } else if (aa == 3) {
            s = getRandSingleNumber();
        }
        var string = string + s;
    }
    return string;
}

function getRandEmail() {
    var string = ''
    var first = getRandString(5);
    var second = getRandString(5);
    var third = getRandString(3);
    string = first + '@' + second + '.' + third;
    return string;
}

function getRandID(sex) {
    var string = getRandSingleCapitalAlphebet();
    aa = (sex == 'male') ? '1' : '2';
    string = string + aa;
    for (var i = 1; i <= 8; i++) {
        var string = string + getRandSingleNumber();
    }
    return string;
}

function getRandNumber(num) {
    var n = "";
    for (var i = 1; i <= num; i++) {
        n = n + getRandSingleNumber()
    }
    return n;
}

function getRandTime() {
    var millionSecond = Math.round(new Date().getTime());
    var aa = Math.floor((Math.random() * millionSecond) + 1);
    var time = timeFormat(aa);
    return time;
}

function getRandSingleNumber() {
    var num = Math.floor((Math.random() * 10) + 48);
    num = String.fromCharCode(num);
    return num
}

function getRandSingleLowerAlphebet() {
    var num = Math.floor((Math.random() * 26) + 97);
    num = String.fromCharCode(num);
    return num
}

function getRandSingleCapitalAlphebet() {
    var num = Math.floor((Math.random() * 26) + 65);
    num = String.fromCharCode(num);
    return num
}

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }
            if (index < iterations) {
                index++;
                func(loop);
            } else {
                done = true;
                callback();
            }
        },
        iteration: function() {
            return index;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}
/******************   Routes   ******************/

/*** Home Page ***/
router.get('/', function(req, res, next) {
    if (req.session.account) {
        if (req.session.logining == req.query.a) {
            if (req.session.logining == 0) {
                req.session.logining = 1;
            }
            res.render('index', {
                title: 'foundation',
                user: req.session.userName,
                information: req.session.information
            });
        } else {
            res.redirect('/?a=' + req.session.logining);
        }
    } else if (req.query.identity) {
        if (req.session.account) {
            res.redirect('/?a=' + req.session.logining);
        } else if (req.query.identity == 'visitor') {
            res.render('index', {
                title: 'Express',
                identity: 'visitor'
            });
        } else {
            res.redirect('/?identity=visitor');
        }
    } else {
        if (req.session.account) {
            res.redirect('/?a=' + req.session.logining);
        } else {
            res.redirect('/?identity=visitor');
        }
    }
});

router.post('/getLesson', function(req, res, next) {
    searchData = req.body.strJson;
    lesson.getLessonLocation(searchData, function(data) {
        res.send({
            success: data
        })
    })
})

router.post('/searchLessonDetail', function(req, res, next) {
    searchData = req.body.strJson;
    lesson.searchLessonDetail(searchData, function(result) {
        res.send({
            success: result
        })
    })
})

/*** Loading ***/
router.get('/loading', function(req, res, next) {
    res.render('loading', {
        title: 'Loading'
    });
})

/*** Login Page ***/
router.get('/login', function(req, res, next) {
    if (req.session.account) {
        res.redirect('/?a=' + req.session.logining);
    } else {
        res.render('login', {
            title: 'Login'
        })
    }
});

router.post('/login', function(req, res, next) {
    data = JSON.parse(req.body.strJson)
    var account = data[0].account;
    var password = data[0].password;
    if (req.xhr || req.accepts('json, html') === 'json') {
        login.loginCheck(account, hashPW(account, password), function(err, situation, user, userInformation) {
            if (situation == 0) {
                req.session.account = account;
                req.session.userName = user;
                req.session.logining = 0;
                req.session.information = userInformation;
                res.send({
                    success: 'loginFinish'
                });
            } else if (situation == 1) {
                res.send({
                    success: 'passwordError'
                });
            } else if (situation == 2) {
                res.send({
                    success: 'userNotFound'
                });
            }
        });
    }
})

/*** Register Page ***/
router.get('/register', function(req, res, next) {
    if (req.session.account) {
        res.redirect('/?a=' + req.session.logining);
    }
    if (res.locals.error == 'accountRepeat') {
        res.render('register', {
            title: 'Register',
            register: '帳號重複'
        })
    } else {
        res.render('register', {
            title: 'Register'
        })
    }
})

router.post('/register', function(req, res, next) {
    var name = req.body.name;
    var account = req.body.account;
    var password = req.body.password;
    var pwHash = hashPW(account, password);
    var email = req.body.email;
    var telephone = req.body.telephone;
    var sex = req.body.gender;
    console.log(sex);
    var identity = req.body.identity;
    var idHash = hashID(account, identity);
    var birthday = req.body.birthday1 + '/' + req.body.birthday2 + '/' + req.body.birthday3;
    var address = req.body.address;
    if (req.xhr || req.accepts('json, html') === 'json') {
        user.userSave(name, account, pwHash, email, telephone, sex, idHash, birthday, address, function(err, repeat, userAccount, userName) {
            if (repeat == 0) {
                req.session.succ = 1;
                res.send({
                    success: "no"
                });
            } else {
                res.locals.error = 'accountRepeat';
                res.send({
                    success: "yes"
                });
            }
        });
    }
})

/*** Register successful page ***/
router.get('/successful', function(req, res, next) {

    if (!req.session.succ) {
        req.session.destroy();
        res.render('successful', {
            title: 'Successful'
        })
    } else {
        res.redirect('/');
    }
})

/*** Log out ***/
router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/blank');
})

/*** Lessson manage page***/
router.get('/lessonNormalManage', function(req, res, next) {
    if (req.session.account) {
        lesson.searchLesson('', '', 'success', function(err, todayLesson) {
            if (todayLesson != 'no data') {
                res.render('lessonNormalManage', {
                    user: req.session.userName,
                    showLesson: todayLesson,
                    information: req.session.information
                });
            } else if (todayLesson == 'no data') {
                res.render('lessonNormalManage', {
                    user: req.session.userName,
                    information: req.session.information
                });
            }
        })
    } else {
        res.redirect('/?identity=visitor');
    }
})

router.post('/lessonNormalManage', function(req, res, next) {
    var account = req.session.account;
    var lessonName = req.body.lessonName;
    var lessonCount = req.body.lessonCount;
    var lessonBuilding = req.body.lessonBuilding;
    var lessonFloor = req.body.lessonFloor;
    var lessonClass = req.body.lessonClass;
    var lessonTime = req.body.lessonTime;
    var lessonPeriod = req.body.lessonPeriod;
    var lessonPeople = req.body.lessonPeople;
    var lessonNote = req.body.lessonNote;
    var contract = req.body.contract;
    var contractPhone = req.body.contractPhone;
    var lessonNameContract = lessonName + '(' + contract + ')';
    var sentTime = getNowTime();
    var splitTime = lessonTime.split('/');
    var millionSecond = new Date(splitTime[0], splitTime[1] - 1, splitTime[2]).getTime();
    var userName = req.session.userName;
    var aim = '上課';
	
    var currentTime = [];
    currentTime[0] = lessonTime;
    origMillionSecond = millionSecond;
    for (var no = 2; no <= lessonCount; no++) {
        var millionSecond = timePlus(millionSecond);
        var timeCurrentFormat = timeFormat(millionSecond);
        currentTime[(no - 1)] = timeCurrentFormat
    }
    var timeTemp = lessonTime.replace(/\//g, '');
    var applyUseTime = timeTemp.substr(2);
    var first = 1;
    var applyLocation = lessonClass;
    var applyPeriod = lessonPeriod;
    if (req.xhr || req.accepts('json, html') === 'json') {
        lesson.searchLessonRepeat(currentTime, lessonPeriod, lessonClass, function(repeat) {
            if (repeat == 0) {
                abbreviation.searchLessonAbbreviation(lessonNameContract, function(err, data) {
                    if (data == 'no data') {
                        abbreviation.createLessonAbbreviation(userName, lessonName, '', sentTime, contract, contractPhone, function(err, repeat, total) {
                            var lessonIndex = total;
                            var lessonId = applyUseTime + '-' + lessonIndex + '-' + first + '-' +
                                applyLocation + '-' + applyPeriod;
                            var mode = 'normal';
                            lesson.createLesson(account, userName, lessonName, lessonId, lessonCount, lessonBuilding, lessonFloor, lessonClass, lessonTime, sentTime, origMillionSecond, aim, lessonPeriod, lessonPeople, lessonNote, mode, contract, contractPhone, function(err) {

								if (err) {
									res.send({
										success: "no"
									});
									return;
								}								
								
								console.log('create normal lesson success');
								res.send({
                                    success: "yes"
                                });
                            });
                        })
                    } else {
                        var lessonIndex = data[0].id;
                        var lessonId = applyUseTime + '-' + lessonIndex + '-' + first + '-' +
                            applyLocation + '-' + applyPeriod;
                        lesson.createLesson(account, userName, lessonName, lessonId, lessonCount, lessonBuilding, lessonFloor, lessonClass, lessonTime, sentTime, millionSecond, aim, lessonPeriod, lessonPeople, lessonNote, function(err) {
                            if (err) {
								res.send({
									success: "no"
								});
								return;
							}
							console.log('create single lesson success');
							res.send({
                                success: "yes"
                            });
                        });
                    }
                })
            } else {
                res.send({
                    success: "no"
                });
            }
        })
    }
})

/*** Personal information page***/
router.get('/information', function(req, res, next) {
    if (req.session.account) {
        res.render('information', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
})

/*** Lesson Manage System ***/
router.get('/lesson', function(req, res, next) {
    if (req.session.account) {
        res.render('lesson', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
});

router.post('/getUserLessonList', function(req, res, next) {
    account = req.session.account;
    lesson.getUserLessonList(account, function(lessonData) {
        res.send({
            success: lessonData
        })
    })
})

/*** User Manage ***/
router.get('/userManage', function(req, res, next) {
    authorty = req.session.information[0].authorty;
    if (req.session.account && (authorty == 'Admin' || authorty == 'Hyper')) {
        user.getAllUser(function(data) {
            if (data == 'no data') {
                res.render('userManage', {
                    user: req.session.userName,
                    information: req.session.information
                });
            } else {
                res.render('userManage', {
                    user: req.session.userName,
                    information: req.session.information,
                    userData: data
                });
            }
        })
    } else {
        res.redirect('/?identity=visitor');
    }
});

router.post('/getSearchUser', function(req, res, next) {
    var searchData = req.body.strJson;
    user.getSearchUser(searchData, function(err, data) {
        if (data == '[]') {
            res.send({
                success: 　 "no data"
            });
        } else {
            res.send({
                success: data
            });
        }
    })
})

router.post('/getUpdateUser', function(req, res, next) {
    user.getAllUser(function(data) {
        if (data == 'no data') {
            res.send({
                success: 'no data'
            });
        } else {
            res.send({
                success: data
            });
        }
    })
})

router.post('/updateAuthorty', function(req, res, next) {
    var data = req.body.strJson;
    user.updateAuthorty(data, function(check) {
        if (check == 'ok') {
            res.send({
                success: 'success'
            });
        } else if (check == 'no good') {
            res.send({
                success: 'no'
            });
        }
    })
})
/*** Search Account Reapet ***/
router.post('/searchAccount', function(req, res, next) {
    var account = req.body.account;
    if (req.xhr || req.accepts('json, html') === 'json') {
        user.searchAccountReapet(account, function(err, repeat) {
            if (repeat == 0) {
                res.send({
                    success: "no"
                });
            } else {
                res.send({
                    success: "yes"
                });
            }
        })
    }
})

/*** Check Change Lesson Manage Page ***/
router.get('/audit', function(req, res, next) {
    if (req.session.account && (req.session.information[0].authorty != 'User')) {
        res.render('audit', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
})

/*** Aduit lesson Pass ***/
router.post('/auditpass', function(req, res, next) {
    var lessonID = req.body.lessonID;
    lesson.getLessonInfo(lessonID, function(err, data) {
        var lessonCount = data[0].count;
        var lessonPeriod = data[0].period;
        var lessonClass = data[0].lessonClass
        var checkReapet = false;
        var timeCurrentFormat = data[0].time;
        var millionSecond = data[0].millionSecond;
        var sentTime = getNowTime();
        var currentTime = [];
        currentTime[0] = timeCurrentFormat;
        for (var no = 2; no <= lessonCount; no++) {
            var millionSecond = timePlus(millionSecond);
            var timeCurrentFormat = timeFormat(millionSecond);
            currentTime[(no - 1)] = timeCurrentFormat
        }
        console.log(currentTime);
        lesson.createAllLesson(data, currentTime, sentTime, function() {
            res.send({
                success: 'yes'
            });
        })
    })
})

router.post('/auditFail', function(req, res, next) {
    var lessonID = req.body.lessonID;
    var sentTime = getNowTime();
    var reason = 'Q_Q'
    lesson.auditFail(lessonID, reason, sentTime, function() {
        res.send({
            success: 'yes'
        });
    })
})

/*** Lesson identity Manage Page ***/
router.get('/lessonManage', function(req, res, next) {
    authorty = req.session.information[0].authorty;
    if (req.session.account && (authorty == 'Admin' || authorty == 'Hyper')) {
        res.render('lessonManage', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
})

router.post('/lessonManage', function(req, res, next) {
    var lessonName = req.body.lessonName;
    var lessonAbbreviation = req.body.lessonAbbreviation;
    var userName = req.session.userName;
    var currectTime = getNowTime();
    var contract = req.body.contract;
    var contractPhone = req.body.contractPhone;
    if (req.xhr || req.accepts('json, html') === 'json') {
        abbreviation.createLessonAbbreviation(userName, lessonName, lessonAbbreviation, currectTime, contract, contractPhone, function(err, repeat, id) {
            if (repeat == 0) {
                res.send({
                    success: "no repeat"
                })
            } else if (repeat == 1) {
                res.send({
                    success: "repeat"
                })
            } else if (repeat == 2) {
                res.send({
                    success: "abbrRepeat"
                })
            }
        })
    }
})

router.post('/editLessonDetail', function(req, res, next) {
    var sentTime = getNowTime();
    var data = req.body.strJson;
    lesson.editLessonDetail(data, sentTime, function(repeat) {
        console.log(repeat)
        if (repeat == 'success') {
            res.send({
                success: 'yes'
            })
        } else if (repeat == 'repeat') {
            res.send({
                success: 'no'
            })
        } else if (repeat == 'no change') {
            res.send({
                success: 'no change'
            })
        }
    })
})

router.post('/deleteLesson', function(req, res, next) {
    var lessonID = req.body.lessonID;
    lesson.deleteLesson(lessonID, function(result) {
        console.log('deleteLesson result: ' + result);

        if (result == 'success') {
            res.send({
                success: 'yes'
            })
        } else {
            res.send({
                success: 'no'
            })
        }
    })
})

router.post('/updateLessonAbbreviation', function(req, res, next) {
    var data = req.body.strJson;
    var sentTime = getNowTime();
    abbreviation.checkAbbreviationReapet(data, function(repeat) {
        if (repeat == 0) {
            abbreviation.updateLessonAbbreviationData(data, sentTime, function() {
                res.send({
                    success: 'yes'
                })
            })
        } else if (repeat == 1) {
            res.send({
                success: 'no'
            })
        } else if (repeat == 2) {
            res.send({
                success: 'repeat'
            })
        }
    })
})

router.post('/getupdateLessonID', function(req, res, next) {
    if (req.xhr || req.accepts('json, html') === 'json') {
        abbreviation.searchLessonAbbreviation('', function(err, data) {
            if (data == 'no data') {
                res.send({
                    success: 'no data'
                });
            } else {
                res.send({
                    success: data
                });
            }
        })
    }
})

/*** Use classroom apply Page ***/
router.get('/apply', function(req, res, next) {
    if (req.session.account) {
        res.render('apply', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
})

router.post('/apply', function(req, res, next) {
    var account = req.session.account;
    var lessonName = req.body.lessonName;
    var lessonCount = 1;
    var lessonBuilding = req.body.lessonBuilding;
    var lessonFloor = req.body.lessonFloor;
    var lessonClass = req.body.lessonClass;
    var lessonTime = req.body.lessonTime;
    var lessonPeriod = req.body.lessonPeriod;
    var lessonPeople = req.body.lessonPeople;
    var lessonNote = '';
    var splitTime = lessonTime.split('/');
    var millionSecond = new Date(splitTime[0], splitTime[1] - 1, splitTime[2]).getTime();
    var userName = req.session.userName;
    var sentTime = getNowTime();
    var aim = req.body.lessonAim;
    var contract = req.body.contract;
    var contractPhone = req.body.contractPhone;
    var lessonNameContract = req.body.lessonName + '(' + contract + ')';
    console.log(contract + ' -> ' + contractPhone);
    var timeTemp = lessonTime.replace(/\//g, '');
    var applyUseTime = timeTemp.substr(2);
    var first = 1;
    var applyLocation = lessonClass;
    var applyPeriod = lessonPeriod;
    if (req.xhr || req.accepts('json, html') === 'json') {
        lesson.checkSingleReapet(lessonTime, lessonPeriod, lessonClass, function(repeat) {
            if (repeat == 0) {
                abbreviation.searchLessonAbbreviation(lessonNameContract, function(err, data) {
                    if (data == 'no data') {
                        abbreviation.createLessonAbbreviation(userName, lessonName, '', sentTime, contract, contractPhone, function(err, repeat, total) {
                            var lessonIndex = total;
                            var lessonId = applyUseTime + '-' + lessonIndex + '-' + first + '-' +
                                applyLocation + '-' + applyPeriod;
                            var mode = 'single';
                            lesson.createLesson(account, userName, lessonName, lessonId, lessonCount, lessonBuilding, lessonFloor, lessonClass, lessonTime, sentTime, millionSecond, aim, lessonPeriod, lessonPeople, lessonNote, mode, contract, contractPhone, function() {
                                res.send({
                                    success: "yes"
                                });
                            })
                        })
                    } else {
                        var lessonIndex = data[0].id;
                        var lessonId = applyUseTime + '-' + lessonIndex + '-' + first + '-' +
                            applyLocation + '-' + applyPeriod;
                        lesson.createLesson(account, userName, lessonName, lessonId, lessonCount, lessonBuilding, lessonFloor, lessonClass, lessonTime, sentTime, millionSecond, aim, lessonPeriod, lessonPeople, lessonNote, function() {
                            res.send({
                                success: "yes"
                            });
                        })
                    }
                })
            } else {
                res.send({
                    success: "no"
                });
            }
        })
    }
})

/*** Update Lesson List ***/
router.post('/updateAuditLesson', function(req, res, next) {
    lesson.searchLesson('', '', 'uncheck', function(err, auditLesson) {
        if (auditLesson == '[]') {
            res.send({
                success: 'no'
            });
        } else {
            res.send({
                'success': 'yes',
                'showLesson': auditLesson
            });
        }
    })
})

router.post('/getAllPassLesson', function(req, res, next) {
    lesson.searchLesson('', '', 'success', function(err, todayLesson) {
        console.log('todayLesson:');
        console.log(todayLesson);

        if (todayLesson != 'no data') {
            res.send({
                success: 'yes',
                howLesson: todayLesson
            });
        } else {
            res.send({
                success: 'no'
            });
        }
    })
})

/*** Position Manage Page ***/
router.get('/positionManage', function(req, res, next) {
    authorty = req.session.information[0].authorty;
    if (req.session.account && (authorty == 'Admin' || authorty == 'Hyper')) {
        res.render('positionManage', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
})

router.post('/positionManage', function(req, res, next) {
    var userName = req.session.userName;
    var building = req.body.building;
    var floor = req.body.floor;
    var classroom = req.body.classroom;
    var people = req.body.people;
    var note = req.body.note;
    var location = building + classroom;
    var sentTime = getNowTime();
    position.checkPositionReapet(location, function(repeat) {
        if (repeat == 1) {
            res.send({
                success: 'yes'
            })
        } else {
            position.createNewPosition(userName, building, floor, classroom, location, people, note, sentTime, 'no', function() {
                res.send({
                    success: 'no'
                })
            })
        }
    })
})

router.post('/getPositionData', function(req, res, next) {
    position.getPositionData(function(data) {
        res.send({
            success: data
        })
    })
})

router.post('/lockPosition', function(req, res, next) {
    var data = req.body.strJson;
    position.lockPosition(data, function() {
        res.send({
            success: 'yes'
        })
    })
})

router.post('/deletePosition', function(req, res, next) {
    var location = req.body.val
    position.deletePosition(location, function() {
        res.send({
            success: 'yes'
        })
    })
})

/*** User Feedback Page ***/
router.get('/feedback', function(req, res, next) {
    if (req.session.account) {
        res.render('feedback', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
})

/*** Super Fast Create Any Data Page ***/
router.get('/superfast', function(req, res, next) {
    if (req.session.account && (req.session.information[0].authorty == 'Hyper')) {
        res.render('superfast', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
})

router.post('/fastCreateUser', function(req, res, next) {
    var data = req.body.strJson;
    var createData = JSON.parse(data)
    var method = createData.method;
    var num = createData.num;
    var detailData = createData.detailData;
    if (method == 'rand') {
        asyncLoop(num, function(loop) {
                var name = getRandString(10);
                var account = getRandString(10);
                var pw = getRandString(10);
                var pwHash = hashPW(account, pw);
                var email = getRandEmail();
                var telephone = getRandNumber(8);
                var telephone = '09' + telephone;
                var sex = Math.floor((Math.random() * 2) + 1);
                var sex = (sex == 1) ? 'male' : 'female';
                var id = getRandID(sex);
                var idHash = hashID(account, id)
                var birthday = getRandTime();
                var address = getRandString(10);
                user.searchAccountReapet(account, function(err, repeat) {
                    if (repeat == 0) {
                        user.userSave(name, account, pwHash, email, telephone, sex, idHash, birthday, address, function(err, num) {
                            loop.next();
                        })
                    }
                })
            },
            function() {
                res.send({
                    success: 'yes'
                })
            })
    } else {
        res.send({
            success: 'no'
        })
    }
})

router.post('/fastCreateUncheckLesson', function(req, res, next) {
    res.send({
        success: 'no'
    })
})

router.post('/fastCreateCheckSingleLesson', function(req, res, next) {
    res.send({
        success: 'no'
    })
})

router.post('/fastCreatePosition', function(req, res, next) {
    res.send({
        success: 'no'
    })
})

/*** Search Lesson Page ***/
router.get('/searchLesson', function(req, res, next) {
    if (req.session.account) {
        res.render('searchLesson', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.render('searchLesson');
    }
})

/*** Forget Password Page ***/
router.get('/forgetPassword', function(req, res, next) {
    if (req.session.account) {
        res.render('forgetPassword', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.render('forgetPassword');
    }
})

/*** Buffer Blank Page ***/
router.get('/blank', function(req, res, next) {
    res.render('blank');
})

/*** Get Account Session Data ***/
router.post('/getAccountSession', function(req, res, next) {
    if (req.session.account) {
        res.send({
            success: ''
        })
    } else {
        res.send({
            success: req.session.account
        })
    }
})

/*** class Move Manage ***/
router.get('/classMoveManage', function(req, res, next) {
    if (req.session.account && (req.session.information[0].authorty == 'Hyper' || req.session.information[0].authorty == 'Admin')) {
        res.render('classMoveManage', {
            user: req.session.userName,
            information: req.session.information
        });
    } else {
        res.redirect('/?identity=visitor');
    }
})

module.exports = router;