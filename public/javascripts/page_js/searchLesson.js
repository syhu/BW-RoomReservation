var searchLesson = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){
      //查詢
      this._filterTimeZone = $("#filterTimeZone");
      this._filterLocation = $("#filterLocation");
      this._filterLesson = $("#filterLesson");
      this._filterTimeStart = $("#filterTimeStart");
      this._filterTimeDue = $("#filterTimeDue");
      this._filterEmptyClass = $("#filterEmptyClass");
      this._btnFilter = $("#btnFilter");
      this._cancelFilter = $("#cancelFilter");


      this._start();
    },

    _start:function(){
      var objThis = this;
      objThis._initialAll();
      objThis._getPositionList();
      $('input').iCheck('check');   //将输入框的状态设置为checked

    },

    _initialAll:function(){
      this._btnFilter.on("click",$.proxy(function(){
        var arr = new Array();
        var obj = new Object;

        var start = this._filterTimeStart.val() == '' ? "0" : new Date(this._filterTimeStart.val()).getTime();
        var due = this._filterTimeDue.val() == '' ? "0" : new Date(this._filterTimeDue.val()).getTime();

        if(start > due){
          layer.msg('<b>請選擇正確的時間範圍</b>', {time: 1500, icon:2,shade:[0.5,'black']});
          this._filterTimeStart.val('');
          this._filterTimeDue.val('');
          return false;
        }

        obj.timezone = this._filterTimeZone.val() != '請選擇' ? this._filterTimeZone.val() : "";
        obj.location = this._filterLocation.val() != '請選擇' ? this._filterLocation.val() : "";
        obj.timestart = start;
        obj.timedue = due;
        obj.lesson = this._filterLesson.val() != '' ? this._filterLesson.val() : "";
        obj.emptyclass = this._filterEmptyClass.is(":checked") == true ? "1" : "0";
        arr = arr.concat(obj);

        this._getlessonList(JSON.stringify(arr));
      },this));
      //清除查詢
      this._cancelFilter.on("click",$.proxy(function(){
        this._filterTimeZone.val('請選擇');
        this._filterLocation.val('請選擇');
        this._filterTimeStart.val('');
        this._filterTimeDue.val('');
        this._filterLesson.val('');
        $('input').iCheck('check');   //将输入框的状态设置为checked
        // this._filterEmptyClass = $("#filterEmptyClass");
      },this));
    },
    //取得列表查詢
    _filterEmptyClass:function(val){
      var objThis = this;
      $.ajax({
        type:'post',
        // url:'/searchLessonDetail',
        data:{val},
        success:function(datas){
            var data = datas.success
        }
      });
    },
    //取得地點
    _getPositionList:function(){
      var objThis = this;
      $.ajax({
        type:'post',
        url:'/getPositionData',
        success:function(datas){
            var data = datas.success
            objThis._setPositionOption(data);
        }
      });

    },
    _setPositionOption:function(strJson){
      var objThis = this;
      objThis._filterLocation.empty().append("<option value='請選擇'>請選擇</option>");


      var jsonData = '[';
      $.each(strJson,function(i,v){
        if(v.lock == 'no'){
            objThis._filterLocation.append("<option value='" + v.location + "'>" + v.location + "</option>")
        }
      });
    },

  }
  return _const;
}());

var searchLesson;
$(function(){
  searchLesson = new searchLesson();
  setTimeout('layout._resize_tab();',100)    /* 調整背景 */
});
