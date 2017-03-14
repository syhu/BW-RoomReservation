var lessonIDManage = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){
      this._bounce_new = $('#bounce_new');
      this._btnCancel = $('#btnCancel');
      this._btnSubmit = $('#btnSubmit');
      this._form_name = $('.form_name');
      this._form_abbreviation = $('.form_abbreviation');
      this._lesson = $('#lesson');
      this._lessonName = $('#lessonName');
      this._lessonAbbreviation = $('#lessonAbbreviation');
      this._new = $('#new');
      this._todayTime = $("#todayTime");

      this._start();
    },

    _start:function(){
      var objThis = this;
      objThis._initialAll();
    },

    _initialAll:function(){
      //初始化彈跳視窗位置
      this._bounce_new.css('position','absolute');
      this._bounce_new.css('top', '20%');

      //顯示當天時間
      var now = new Date();
			this._todayTime.append
        (   now.getFullYear() + '/' + (now.getMonth()+1) + '/'
          + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":"
          + now.getSeconds());

      //新增課程編號
      this._new.on('click', $.proxy(function(){
        this._lessonName.val('');
        this._lessonAbbreviation.val('');
        //開啟新增課程視窗
        this._bounce_new.modal('show');
      }, this));

      //關閉新增課程編號視窗
      this._btnCancel.on('click', $.proxy(function(){
        this._bounce_new.modal('hide');
      },this));

      //確認新增課程編號
      this._btnSubmit.on('click', $.proxy(function(){
        if(this._checkSubmit())
        {
          var abbreviationData =
          {
            lessonName : this._lessonName.val(),
            lessonAbbreviation : this._lessonAbbreviation.val()
          };
          $.ajax({
            type: 'post',
            url: '/lessonIDManage',
            data: abbreviationData,
            dataType: 'json',
            success: function(message)
            {
              if (message.success == 'no repeat')
              {
                layer.msg('<b>新增課程成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
              }
              else if(message.success == 'repeat')
              {
                layer.msg('<b>新增課程失敗，課程已被新增過</b>', {time: 1500, icon:2,shade:[0.5,'black']});
              }
            },
            error: function(xhr)
            {
              alert('error: ' + xhr);console.log(xhr);
              layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
            }
          })
          this._bounce_new.modal('hide');
        }
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
    }
  }
  return _const;
}());

var lessonIDManage;
$(function(){
  lessonIDManage = new lessonIDManage();
})
