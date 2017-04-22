var feedback = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){
      this._bounce_area = $('#bounce_area');

      this._new = $('.new');
      this._todayTime = $(".todayTime");

      this._optionText = $("#optionText");
      this._optionList = $('#optionList');
      this._optionData = $('#optionData');
      this._authority = $("#authority").val();


      this._start();
    },

    _start:function(){
      var objThis = this;
      objThis._initialAll();
      // objThis._getFeedbackList();
      objThis._setFeedbackList()
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



    },

    _checkSubmit:function(){
      var returnCheck = true;
      //課程名稱
      if(this._lessonName.val() == '')
      {
        returnCheck = false;
        this._form_name.addClass("has-error");
        layer.msg('<b>請輸入課程名稱</b>', {time: 1500, icon:2,shade:[0.5,'black']});
      }
      else
      {
        this._form_name.removeClass("has-error");
      }
      return returnCheck;
    },
    _getFeedbackList:function(){
      var objThis = this;
      //G_G
      $.ajax({
        type:'post',
        url:'/',
        success:function(datas){
            var data = datas.success
            objThis._setFeedbackList(data);
        }
      });

    },
    _setFeedbackList:function(strJson){
      var objThis = this;
      var _div;
      var _input;
      var _message;
      var _feedback;
      var _br;
      var _row;
      var _textarea
      var _button
      var _label

      //最高管理者
      if(objThis._authority == "Admin"){
        _div = $("<div />",{"class":"row text-primary bg-primary","style":"padding:20px 20px 20px 20px;border-radius:10px;cursor:pointer"});
        _input = $("<span />",{"text":"1.test123"});
        _div.bind("click",function(){
            objThis._optionData.empty();

            _div = $("<div />",{"class":"row bg-danger","style":"padding:20px 20px 20px 20px;border-radius:5px;height:500px;"});
            _row = $("<div />",{"class":"row","style":"padding:0px 20px 0px 20px;"});

            _message = $("<div />",{"class":"triangle-right left bg-info ","style":"float:left;border-radius:10px;",
                        "text":"這系統太棒了，前端做的太棒了"});
            _row.append(_message)
            _div.append(_row);

            _row = $("<div />",{"class":"row","style":"padding:0px 20px 0px 20px;"});
            _feedback = $("<div />",{"class":"triangle-right right bg-primary ","style":"float:right;border-radius:10px;",
                        "text":"謝謝"});
            _row.append(_feedback)
            _div.append(_row);

            objThis._optionData.append(_div)

            _row = $("<div />",{"class":"row"});
            _div = $("<div />",{"class":"col-md-9"});
            _textarea = $("<textarea />",{"class":"form-control","id":"1","rows":"3","placeholder":"請填寫意見..."});
            _div.append(_textarea);
            _row.append(_div);

            _div = $("<div />",{"class":"col-md-3"});
            _button = $("<button />",{"class":"btn btn-primary btn-lg","text":"提交意見","style":"margin-left:10px;"})
            _button.bind("click",function(){
                bootbox.alert("管理者提交")
            })
            _div.append(_button);
            _row.append(_div);

            objThis._optionText.append(_row);    //右邊下面
        })
        _div.append(_input);

        objThis._optionList.append(_div)

      }
      else{     //使用者

        _div = $("<div />",{"class":"row text-primary bg-primary","style":"padding:20px 20px 20px 20px;border-radius:10px;cursor:pointer"});
        _input = $("<span />",{"text":"新增意見"});
        _div.bind("click",function(){
            objThis._optionData.empty();

            _div = $("<div />",{"class":"row bg-danger","style":"padding:20px 20px 20px 20px;border-radius:5px;height:500px;"});
            _row = $("<div />",{"class":"row","style":"padding:0px 20px 0px 20px;"});
            _message = $("<div />",{"class":"triangle-right right bg-info ","style":"float:right;border-radius:10px;",
                        "text":"這系統太棒了，前端做的太棒了"});
            _row.append(_message)
            _div.append(_row);

            _row = $("<div />",{"class":"row","style":"padding:20px 20px 10px 20px;"});
            _feedback = $("<div />",{"class":"triangle-right left bg-primary","style":"float:left;border-radius:10px;",
                        "text":"謝謝"});
            _row.append(_feedback)
            _div.append(_row);

            objThis._optionData.append(_div)    //右邊訊息
            _row = $("<div />",{"class":"row"});
            _div = $("<div />",{"class":"col-md-9"});
            _textarea = $("<textarea />",{"class":"form-control","id":"1","rows":"3","placeholder":"請填寫意見..."});
            _div.append(_textarea);
            _row.append(_div);

            _div = $("<div />",{"class":"col-md-3"});
            _button = $("<button />",{"class":"btn btn-primary btn-lg","text":"提交意見","style":"margin-left:10px;"})
            _button.bind("click",function(){
                bootbox.alert("使用者提交")
            })
            _div.append(_button);
            _row.append(_div);

            objThis._optionText.append(_row);    //右邊下面
        })
        _div.append(_input);

        objThis._optionList.append(_div)    //左邊訊息

      }




    }
  }
  return _const;
}());

var feedback;
$(function(){
  feedback = new feedback();
})
