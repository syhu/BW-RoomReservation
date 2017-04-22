var positionManage = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){
      this._bounce_area = $('#bounce_area');

      this._new = $('.new');
      this._todayTime = $(".todayTime");

      //新增地點
      this._btnCancel = $('#btnCancel');
      this._btnSubmit = $('#btnSubmit');
      this._areaBuilding = $("#areaBuilding");
      this._areaFloor =  $("#areaFloor");
      this._areaClass = $("#areaClass");
      this._areaPeople = $("#areaPeople");
      this._areaNote = $("#areaNote");
      this._area = $("#area");

      this._start();
    },

    _start:function(){
      var objThis = this;
      objThis._initialAll();
      objThis._getPositionList();
    },

    _initialAll:function(){
      //初始化彈跳視窗位置
      this._bounce_area.css('position','absolute');
      // this._bounce_area.css('top', '20%');

      //顯示當天時間
      var now = new Date();
			this._todayTime.append
        (   now.getFullYear() + '/' + (now.getMonth()+1) + '/'
          + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":"
          + now.getSeconds());

      //新增地點
      this._new.on('click', $.proxy(function(){

        this._areaBuilding.val('');
        this._areaFloor.val('');
        this._areaClass.val('');
        this._areaPeople.val('');
        this._areaNote.val('');

        //開啟新增地點視窗
        this._bounce_area.modal('show');
      }, this));

      //關閉新增地點視窗
      this._btnCancel.on('click', $.proxy(function(){
        this._bounce_area.modal('hide');
      },this));

      //確認新增地點
      this._btnSubmit.on('click', $.proxy(function(){
        var objThis = this;
        if('a' == 'a')
        {
          bootbox.confirm({
            message:"<br/><b style='font-size:20px;'>確定新增場地嗎?</b><br/>" +
            "<br/><br/><b>大樓：</b>" + objThis._areaBuilding.val() +
            "<br/><br/><b>樓層：</b>" + objThis._areaFloor.val() +
            "<br/><br/><b>教室：</b>" + objThis._areaClass.val() +
            "<br/><br/><b>容納人數：</b>" + objThis._areaPeople.val() +
            "<br/><br/><b>備註：</b>" + objThis._areaNote.val(),
            buttons:{
              confirm:{
                  label:'確定申請',
                  className:'btn-success'
              },
              cancel:{
                  label:'取消',
                  className:'btn-default'
              }

            },
            callback:function(e)
            {
                if(e)
                {
                  var positionData =
                  {
                    building : objThis._areaBuilding.val(),
                    floor: objThis._areaFloor.val(),
                    classroom: objThis._areaClass.val(),
                    people: objThis._areaPeople.val(),
                    note: objThis._areaNote.val()
                  };
                  $.ajax({
                    type: 'post',
                    url: '/positionManage',
                    data: positionData,
                    dataType: 'json',
                    success: function(message)
                    {
                      if (message.success == 'no')
                      {
                        layer.msg('<b>新增場地成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                      }
                      else if(message.success == 'yes')
                      {
                        layer.msg('<b>新增場地失敗，該場地已被新增過</b>', {time: 1500, icon:2,shade:[0.5,'black']});
                      }
                    },
                    error: function(xhr)
                    {
                      alert('error: ' + xhr);console.log(xhr);
                      layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
                    },
                    complete:function(){
                      objThis._getPositionList();
                    }
                  })
                  objThis._bounce_area.modal('hide');
                }
              }
          })
        }
      }, this));
    },

    _checkSubmit:function(){
    },
    _getPositionList:function(){
      var objThis = this;
      $.ajax({
        type:'post',
        url:'/getPositionData',
        success:function(datas){
            var data = datas.success
            objThis._setPositionList(data);
        }
      });

    },
    _setPositionList:function(strJson){
      var objThis = this;
      var _tr;
      var _td;
      var _input;
      objThis._area.empty();
      console.log(strJson)
      $.each(strJson,function(i,v){
        var trClass;
          switch(i%4){
              case 0:
                trClass = 'active'
                break;
              case 1:
                trClass = 'success'
                break;
              case 2:
                trClass = 'warning'
                break;
              case 3:
                trClass = 'danger'
                break;

          }
          _tr = $("<tr />",{"class":trClass});
          //#
          _td = $("<td />",{"text":(i+1)});
          _tr.append(_td);
          //大樓名稱
          _td = $("<td />",{"style":"text-align:left","text":v.building});
          _tr.append(_td);
          //樓層
          _td = $("<td />",{"style":"text-align:left","text":v.floor});
          _tr.append(_td);
          //教室名稱
          _td = $("<td />",{"text":v.classroom});
          _tr.append(_td);
          //容納人數
          _td = $("<td />",{"nowrap":"nowrap","text":v.people});
          _tr.append(_td);
          //備註
          _td = $("<td />",{"nowrap":"nowrap","text":v.note});
          _tr.append(_td);
          //操作
          _td = $("<td />");
  				_input = $("<span />",{"class":"label label-success","text":"編輯","style":"margin-right:10px;font-size:100%;"});
  				_input.bind("click",function(){
					       bootbox.alert("編輯" + v.location);
          })
          _td.append(_input);
          _tr.append(_td);

          _input = $("<span />",{"class":"label label-danger","text":"刪除","style":"margin-right:10px;font-size:100%;"});
          _input.bind("click",function(){
            bootbox.alert("刪除" + v.location);
          });
          _td.append(_input);
          _tr.append(_td);

          if (v.lock == 'no')
          {
            _input = $("<span />",{"class":"label label-success","text":"鎖定場地","id":"lock" + i,"style":"margin-right:10px;:10px;font-size:100%;"});
            _input.bind("click",$.proxy(function(e){
              bootbox.confirm("您確定要鎖定 <b style='color:red;'>" + v.location + " </b>場地嗎?",function(result){
                 if(result){
                   var obj = new Object;
                   var arr = new Array();
                   obj.location = v.location;
                   obj.lock = v.lock;
                   arr = arr.concat(obj);
                   $.ajax({
                     type:'post',
                     data:{strJson:JSON.stringify(arr)},
                     url:'/lockPosition',
                     success:function(){
                      objThis._getPositionList();
                    },
                    complete:function(){
                      layer.msg('<b>鎖定場地成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                    }
                  });
                 }
              });
            },this));
          }
          else if(v.lock == 'yes')
          {
            _input = $("<span />",{"class":"label label-danger","text":"解鎖場地","id":"unlock" + i,"style":"margin-right:10px;font-size:100%;"});
            _input.bind("click",function(){
              bootbox.confirm("您確定要解鎖 <b style='color:red;'>" + v.location + " </b>場地嗎?",function(result){
                 if(result){
                   var obj = new Object;
                   var arr = new Array();
                   obj.location = v.location;
                   obj.lock = v.lock;
                   arr = arr.concat(obj);
                   $.ajax({
                     type:'post',
                     data:{strJson:JSON.stringify(arr)},
                     url:'/lockPosition',
                     success:function(){
                      objThis._getPositionList();
                    },
                    complete:function(){
                      layer.msg('<b>解鎖場地成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                    }
                  });
                 }
              });
            });
          }
          _td.append(_input)
          _tr.append(_td);

          objThis._area.append(_tr)
      });

    }
  }
  return _const;
}());

var positionManage;
$(function(){
  positionManage = new positionManage();
})
