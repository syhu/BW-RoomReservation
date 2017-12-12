var mongoose = require('mongoose');
var async = require('async');

module.exports = {
    searchLessonRepeat: function(currentTime, period, lessonClass, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            var repeat = false;
            var length = currentTime.length;

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

            function searchRepeat(thisTime, callback) {
                Lesson.find({
                    time: thisTime,
                    period: period,
                    lessonClass: lessonClass,
                    checkSituation: 'success'
                }, function(err, data) {
                    console.log(data);
                    var counts = 0;
                    for (var no in data) {
                        counts++;
                    }
                    if (counts != 0) {
                        callback(1);
                    } else if (counts == 0) {
                        callback(0);
                    }
                });
            }

            asyncLoop(length, function(loop) {
                    thisTime = currentTime[(loop.iteration() - 1)];
                    searchRepeat(thisTime, function(result) {
                        if (result == 1) {
                            repeat = true;
                        }

                        loop.next();
                    })
                },
                function() {
                    mongoose.disconnect();
                    if (repeat == true) {
                        console.log('disconnect successful');
                        mongoose.disconnect();
                        mongoose.connection.close();
                        callback(1);
                    } else if (repeat == false) {
                        console.log('disconnect successful');
                        mongoose.connection.close();
                        mongoose.disconnect();
                        callback(0);
                    }
                }
            );
        });
    },
    checkSingleReapet: function(currentTime, period, lessonClass, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            Lesson.find({
                time: currentTime,
                period: period,
                lessonClass: lessonClass,
                checkSituation: 'success'
            }, function(err, data) {
                var counts = 0;
                for (var no in data) {
                    counts++;
                }
                if (counts != 0) {
                    mongoose.disconnect();
                    callback(1);
                } else if (counts == 0) {
                    mongoose.disconnect();
                    callback(0);
                }
            });
        });
    },
    createLesson: function(account, userName, name, id, count, building, floor, lessonClass, applyTime, sentTime, millionSecond, aim, period, people, note, mode, contract, contractPhone, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            if (mode == 'single') {
                doc = new Lesson({
                    account: account,
                    user: userName,
                    lessonID: id,
                    name: name,
                    count: count,
                    building: building,
                    floor: floor,
                    lessonClass: lessonClass,
                    time: applyTime,
                    millionSecond: millionSecond,
                    period: period,
                    people: people,
                    note: note,
                    aim: aim,
                    contract: contract,
                    contractPhone: contractPhone,
                    createTime: sentTime,
                    modifyTime: sentTime,
                    checkSituation: 'success'
                });
                doc.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc.count + ' save successful');
                        mongoose.disconnect();
                        mongoose.connection.close();
                        console.log('disconnect successful');
                        callback();
                    }
                });
            } else if (mode == 'normal') {
                doc = new Lesson({
                    account: account,
                    user: userName,
                    lessonID: id,
                    name: name,
                    count: count,					
                    building: building,
                    floor: floor,
                    lessonClass: lessonClass,
                    time: applyTime,
                    millionSecond: millionSecond,
                    period: period,
                    people: people,
                    note: note,
                    aim: aim,
                    contract: contract,
                    contractPhone: contractPhone,
                    createTime: sentTime,
                    modifyTime: sentTime,
                    checkSituation: 'uncheck',
                    failReason: ''
                });
                doc.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc.count + ' save successful');
                        mongoose.disconnect();
                        mongoose.connection.close();
                        console.log('disconnect successful');
                        callback();
                    }
                });
            }
        });
    },
    createAllLesson: function(lessonAllData, timeCurrentFormat, sentTime, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            var length = timeCurrentFormat.length;
            var account = lessonAllData[0].account;
            var user = lessonAllData[0].user;
            var id = lessonAllData[0].lessonID;
            var name = lessonAllData[0].name;
            var count = lessonAllData[0].count;
            var building = lessonAllData[0].building;
            var floor = lessonAllData[0].floor;
            var lessonClass = lessonAllData[0].lessonClass;
            var period = lessonAllData[0].period;
            var people = lessonAllData[0].people;
            var note = lessonAllData[0].note;
            var aim = lessonAllData[0].aim;
            var contract = lessonAllData[0].contract;
            var contractPhone = lessonAllData[0].contractPhone;

            function asyncLoop(iterations, func, callback) {
                var index = -1;
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

                    iterations: function() {
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

            //審核通過
            function auditpass(i, id, thisTime, callback) {
                if (i == 0) {
                    Lesson.update({
                        lessonID: id
                    }, {
                        $set: {
                            checkSituation: 'success',
                            modifyTime: sentTime
                        }
                    }, function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            checkSameTimeLessom(thisTime);
                            callback();
                        }
                    })
                } else {
                    addLesson(i, thisTime, function() {
                        callback();
                    });
                }
            }

            //將正常時間轉換成時間戳
            function dateChangeUnixtime(thisTime, callback) {
                var splitTime = thisTime.split('/');
                var millionSecond = new Date(splitTime[0], splitTime[1] - 1, splitTime[2]).getTime();
                callback(millionSecond);
            }

            //將時間戳轉換成正常時間
            function formatDate(thisTime, callback) {
                var timeTemp = thisTime.replace(/\//g, '');
                var applyUseTime = timeTemp.substr(2);
                callback(applyUseTime);
            }

            //製造新的課程ID
            function updateLessonID(id, num, thisTime, callback) {
                var splitID = id.split('-');
                formatDate(thisTime, function(newFormatTime) {
                    splitID[0] = newFormatTime;
                    splitID[2] = (num + 1);
                    newID = splitID.join('-');
                    callback(newID);
                })
            }

            //檢查是否有同時間地點的課程
            function checkSameTimeLessom(thisTime) {
                Lesson.find({
                    time: thisTime,
                    checkSituation: 'uncheck'
                }, function(err, data) {
                    for (var no in data) {
                        auditFail(data[no])
                    }
                })
            }

            //同時間地點的自動審核失敗
            function auditFail(data) {
                Lesson.update({
                    lessonID: data.lessonID
                }, {
                    $set: {
                        checkSituation: 'fail',
                        modifyTime: sentTime
                    }
                }, function(err) {
                    return;
                })
            }

            //新增課程
            function addLesson(num, thisTime, callback) {
                dateChangeUnixtime(thisTime, function(millionSecond) {
                    updateLessonID(id, num, thisTime, function(newID) {
                        doc = new Lesson({
                            account: account,
                            user: user,
                            lessonID: newID,
                            name: name,
                            count: count,
                            building: building,
                            floor: floor,
                            lessonClass: lessonClass,
                            time: thisTime,
                            millionSecond: millionSecond,
                            period: period,
                            people: people,
                            note: note,
                            aim: aim,
                            contract: contract,
                            contractPhone: contractPhone,
                            createTime: sentTime,
                            modifyTime: sentTime,
                            checkSituation: 'success'
                        });
                        doc.save(function(err, doc) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(thisTime);
                                checkSameTimeLessom(thisTime);
                                console.log(doc.lessonID + ' save successful');
                                callback();
                            }
                        });
                    });
                });
            }

            asyncLoop((length - 1), function(loop) {
                    thisTime = timeCurrentFormat[loop.iterations()];
                    auditpass(loop.iterations(), id, thisTime, function() {
                        loop.next();
                    });
                },
                function() {
                    mongoose.disconnect();
                    mongoose.connection.close();
                    console.log('disconnect successful');
                    callback();
                }
            )
        });
    },
    auditFail: function(lessonID, reason, sentTime, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            Lesson.update({
                lessonID: lessonID
            }, {
                $set: {
                    modifyTime: sentTime,
                    checkSituation: 'fail',
                    reason: reason
                }
            }, function(err) {
                mongoose.disconnect();
                mongoose.connection.close();
                console.log('disconnect successful');
                callback();
            })
        })
    },
    getLessonInfo: function(lessonID, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            Lesson.find({
                lessonID: lessonID
            }, function(err, data) {
                mongoose.disconnect();
                mongoose.connection.close();
                console.log('disconnect successful');
                callback(err, data);
            });
        });
    },
    searchLesson: function(requireFirstDay, requireSecondDay, check, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            var today = new Date();
            var now = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
            if (requireFirstDay == '' && requireSecondDay == '') {
                if (check == '') {
                    Lesson.find({}).sort({
                        'time': 'asc'
                    }).exec(function(err, data) {
                        mongoose.disconnect();
                        mongoose.connection.close();
                        console.log('disconnect successful');
                        callback(err, data);
                    });
                } else {
                    Lesson.find({
                        checkSituation: check
                    }).sort({
                        'time': 'asc'
                    }).exec(function(err, data) {
                        mongoose.disconnect();
                        mongoose.connection.close();
                        console.log('disconnect successful');
                        callback(err, data);
                    });
                }
            } else if (requireFirstDay != '' && requireSecondDay != '') {
                var first = requireFirstDay.split('/');
                var firstMillionSecond = new Date(first[0], (first[1] - 1), first[2]).getTime();
                var second = requireSecondDay.split('/');
                var secondMillionSecond = new Date(second[0], (second[1] - 1), second[2]).getTime();
                if (secondMillionSecond >= firstMillionSecond) {
                    if (check == '') {
                        Lesson.find({
                            'millionSecond': {
                                '$gte': firstMillionSecond,
                                '$lte': secondMillionSecond
                            }
                        }).sort({
                            'time': 'asc'
                        }).exec(function(err, data) {
                            mongoose.disconnect();
                            mongoose.connection.close();
                            console.log('disconnect successful');
                            callback(err, data);
                        });
                    } else {
                        Lesson.find({
                            'millionSecond': {
                                '$gte': firstMillionSecond,
                                '$lte': secondMillionSecond
                            },
                            checkSituation: check
                        }).sort({
                            'time': 'asc'
                        }).exec(function(err, data) {
                            mongoose.disconnect();
                            mongoose.connection.close();
                            console.log('disconnect successful');
                            callback(err, data);
                        });
                    }
                }
            } else {
                console.log('Please send full data about require.');
                mongoose.disconnect();
                mongoose.connection.close();
                console.log('disconnect successful');
            }
        });
    },
    getUserLessonList: function(account, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            Lesson.find({
                account: account
            }).sort({
                'time': 'asc'
            }).exec(function(err, data) {
                mongoose.disconnect();
                mongoose.connection.close();
                console.log('disconnect successful');
                callback(data)
            })
        });
    },
    getLessonLocation: function(searchData, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            var data = JSON.parse(searchData);
            date = data[0].date;
            location = data[0].location;
            if (location == '') {
                Lesson.find({
                    time: date
                }, function(err, data) {
                    mongoose.disconnect();
                    mongoose.connection.close();
                    console.log('disconnect successful');
                    callback(data);
                })
            } else {
                Lesson.find({
                    time: date,
                    lessonClass: location
                }, function(err, data) {
                    mongoose.disconnect();
                    mongoose.connection.close();
                    console.log('disconnect successful');
                    callback(data);
                })
            }
        })
    },
    searchLessonDetail: function(searchData, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Abbreviation = require('./lessonAbbreviation_model.js');
            var Lesson = require('./lesson_model.js');
            var Position = require('./position_model.js');
            var data = JSON.parse(searchData);
            firstDay = data[0].timestart;
            secondDay = data[0].timedue;
            period = data[0].timezone;
            location = data[0].location;
            escapeClass = data[0].emptyclass;
            lesson = data[0].lesson;
            getAllAbbrData(function(allAbbrData) {
                splitAllAbbrData = allAbbrData.split(',');
                allAbbr = splitAllAbbrData[0];
                allName = splitAllAbbrData[1];
                if (escapeClass == 1) {
                    Lesson.find({
                        millionSecond: {
                            '$gte': firstDay,
                            '$lte': secondDay
                        },
                        checkSituation: 'success'
                    }).sort({
                        'time': 'asc'
                    }).exec(function(err, data) {
                        Position.find({}, function(err, positionData) {
                            allPosition = '';
                            for (var a in positionData) {
                                allPosition = allPosition + positionData[a].location + ' '
                            }
                            allPosition = allPosition.trim();
                            allPosition = allPosition.split(' ');
                            escape = [];
                            if (period != '') {
                                data = checkPeriod(data, period);
                            }
                            if (location != '') {
                                data = checkLocation(data, location);
                            }
                            noEscapeClass = getAllUsedClass(data);
                            for (i = firstDay; i <= secondDay; i = i + 86400000) {
                                checkEscapeClass(i, escape, allPosition, period, location)
                            }
                            for (i = 0; i < escape.length; i++) {
                                if (noEscapeClass.indexOf(escape[i]) != -1) {
                                    escape.splice(i, 1);
                                    i--
                                }
                            }
                            for (var a in positionData) {
                                for (var e in escape) {
                                    splite = escape[e].split(' ');
                                    console.log(positionData[a].lock + ' ' + positionData[a].location + ' ' + splite[1]);
                                    if ((positionData[a].lock == 'yes') && (splite[1] == positionData[a].location)) {
                                        escape[e] = escape[e] + ' lock';
                                    }
                                }
                            }
                            for (var e in escape) {
                                if (escape[e].substr(-5) != ' lock') {
                                    escape[e] = escape[e] + ' no';
                                }
                            }
                            mongoose.disconnect();
                            mongoose.connection.close();
                            callback(escape);
                        })
                    })
                } else {
                    if (lesson == '') {
                        Lesson.find({
                            millionSecond: {
                                '$gte': firstDay,
                                '$lte': secondDay
                            },
                            checkSituation: 'success'
                        }).sort({
                            'time': 'asc'
                        }).exec(function(err, data) {
                            if (period != '') {
                                data = checkPeriod(data, period);
                            }
                            if (location != '') {
                                data = checkLocation(data, location);
                            }
                            mongoose.disconnect();
                            mongoose.connection.close();
                            if (data.length == 0) {
                                callback('no data');
                            } else {
                                callback(data);
                            }
                        })
                    } else {
                        search = getCorrectName(allName, allAbbr, lesson);
                        if (search != '') {
                            Lesson.find({
                                millionSecond: {
                                    '$gte': firstDay,
                                    '$lte': secondDay
                                },
                                checkSituation: 'success',
                                name: search
                            }).sort({
                                'time': 'asc'
                            }).exec(function(err, data) {
                                if (period != '') {
                                    data = checkPeriod(data, period);
                                }
                                if (location != '') {
                                    data = checkLocation(data, location);
                                }
                                mongoose.disconnect();
                                mongoose.connection.close();
                                if (data.length == 0) {
                                    callback('no data');
                                } else {
                                    callback(data);
                                }
                            })
                        } else {
                            mongoose.disconnect();
                            mongoose.connection.close();
                            callback('no data');
                        }
                    }
                }
            });

            function getAllAbbrData(callback) {
                var allAbbr = '';
                var allName = '';
                Abbreviation.find(function(err, data) {
                    for (var a in data) {
                        if (data[a].abbreviation == '') {
                            aa = '\'' + a + '\'';
                        } else {
                            aa = data[a].abbreviation
                        }
                        allAbbr = allAbbr + aa + ' ';
                        newDate = data[a].name.split('(')
                        allName = allName + newDate[0] + ' ';
                    }
                    allAbbr = allAbbr.trim()
                    allName = allName.trim()
                    callback(allAbbr + ',' + allName);
                })
            }

            function getCorrectName(allName, allAbbr, name) {
                allAbbr = allAbbr.split(' ');
                allName = allName.split(' ');
                searchName = '';
                check = allAbbr.indexOf(name);
                if (check == -1) {
                    check = allName.indexOf(name);
                    if (check == -1) {
                        searchName = '';
                    } else {
                        searchName = allName[check];
                    }
                } else {
                    searchName = allName[check];
                }
                return searchName;
            }

            function checkPeriod(searchData, period) {
                for (i = 0; i < searchData.length; i++) {
                    if (searchData[i].period != period) {
                        searchData.splice(i, 1);
                        i--;
                    }
                }
                return searchData
            }

            function checkLocation(searchData, location) {
                for (i = 0; i < searchData.length; i++) {
                    if (searchData[i].building + searchData[i].lessonClass != location) {
                        searchData.splice(i, 1);
                        i--;
                    }
                }
                return searchData
            }

            function checkEscapeClass(millionSecond, escape, allPosition, period, location) {
                if (period == '' && location == '') {
                    for (var a in allPosition) {
                        escape.push(unixToTime(millionSecond) + ' ' + allPosition[a] + ' ' + 'A1')
                        escape.push(unixToTime(millionSecond) + ' ' + allPosition[a] + ' ' + 'A2')
                        escape.push(unixToTime(millionSecond) + ' ' + allPosition[a] + ' ' + 'P1')
                        escape.push(unixToTime(millionSecond) + ' ' + allPosition[a] + ' ' + 'P2')
                        escape.push(unixToTime(millionSecond) + ' ' + allPosition[a] + ' ' + 'P3')
                    }
                } else if (period != '' && location == '') {
                    for (var a in allPosition) {
                        escape.push(unixToTime(millionSecond) + ' ' + allPosition[a] + ' ' + period)
                    }
                } else if (period == '' && location != '') {
                    escape.push(unixToTime(millionSecond) + ' ' + location + ' ' + 'A1')
                    escape.push(unixToTime(millionSecond) + ' ' + location + ' ' + 'A2')
                    escape.push(unixToTime(millionSecond) + ' ' + location + ' ' + 'P1')
                    escape.push(unixToTime(millionSecond) + ' ' + location + ' ' + 'P2')
                    escape.push(unixToTime(millionSecond) + ' ' + location + ' ' + 'P3')
                } else if (period != '' && location != '') {
                    escape.push(unixToTime(millionSecond) + ' ' + location + ' ' + period)
                }
            }

            function unixToTime(millionSecond) {
                millionSecond = parseInt(millionSecond);
                var origDay = new Date(millionSecond);
                var year = origDay.getFullYear();
                var month = padLeft(origDay.getMonth() + 1);
                var day = padLeft(origDay.getDate());
                var time = year + '/' + month + '/' + day;
                return time;
            }

            function padLeft(num) {
                num = '' + num;
                if (num.length == 1) {
                    return ('0' + num);
                } else {
                    return num;
                }
            }

            function getAllUsedClass(searchData) {
                var ec = [];
                for (var a in searchData) {
                    if (ec.indexOf(unixToTime(searchData[a].millionSecond) + ' ' + searchData[a].building + searchData[a].lessonClass + ' ' + searchData[a].period) == -1) {
                        newTime = unixToTime(searchData[a].millionSecond)
                        ec.push(newTime + ' ' + searchData[a].building + searchData[a].lessonClass + ' ' + searchData[a].period);
                    }
                }
                return ec;
            }
        })
    },
    editLessonDetail: function(editData, sentTime, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            var Position = require('./position_model.js');
            var data = JSON.parse(editData);
            console.log(data);
            id = data[0].id;
            building = data[0].building;
            floor = data[0].floor;
            lessonClass = data[0].lessonClass;
            time = data[0].time;
            period = data[0].period;
            people = data[0].people;
            note = data[0].note;

            Lesson.find({
                building: building,
                floor: floor,
                lessonClass: lessonClass,
                time: time,
                period: period
            }).sort({
                'time': 'asc'
            }).exec(function(err, data) {
                console.log(data);
                if (data.length > 1) {
                    console.log('1');
                    mongoose.disconnect();
                    mongoose.connection.close();
                    console.log('disconnect successful');
                    callback('repeat')
                } else if (data.length == 1) {
                    console.log(data[0].lessonID)
                    console.log(id)
                    if (data[0].lessonID != id) {
                        console.log('2');
                        mongoose.disconnect();
                        mongoose.connection.close();
                        console.log('disconnect successful');
                        callback('repeat')
                    } else {
                        if (data[0].people != people) {
                            Lesson.update({
                                lessonID: id
                            }, {
                                $set: {
                                    people: people,
                                    modifyTime: sentTime
                                }
                            }, function(err) {
                                console.log('3');
                                mongoose.disconnect();
                                mongoose.connection.close();
                                console.log('disconnect successful');
                                callback('success')
                            })
                        } else {
                            console.log('4');
                            mongoose.disconnect();
                            mongoose.connection.close();
                            console.log('disconnect successful');
                            callback('no change')
                        }
                    }
                } else if (data.length == 0) {
                    Lesson.update({
                        lessonID: id
                    }, {
                        $set: {
                            building: building,
                            floor: floor,
                            lessonClass: lessonClass,
                            time: time,
                            period: period,
                            people: people,
                            modifyTime: sentTime
                        }
                    }, function(err) {
                        mongoose.disconnect();
                        mongoose.connection.close();
                        console.log('disconnect successful');
                        callback('success')
                    })
                }
            })
        })
    },
    deleteLesson: function(lessonID, callback) {
        mongoose.connect('mongodb://localhost/foundation');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('mongoose opened !');
            var Lesson = require('./lesson_model.js');
            var Position = require('./position_model.js');

            Lesson.remove({
                lessonID: lessonID
            }).exec(function(err, data) {
                mongoose.disconnect();
                mongoose.connection.close();
                if (err) {
                    return callback('failed');
                } else
                    return callback('success');
            });

        });
    }
}