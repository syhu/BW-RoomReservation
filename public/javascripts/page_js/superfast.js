var superfast = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){
        //建立 清除
        this._cancelCreate = $("#cancelCreate");
        this._btnCreate = $("#btnCreate");
        //建立欄位
        this._createMethod = $("#createMethod");
        this._createData = $("#createData");
        this._createNum = $("#createNum");
        this._createDataDetail = $("#createDataDetail");
        this._start();
    },
    _start:function(){
      var objThis = this;
      objThis._initialAll();
    },
    _initialAll:function(){
        var objThis = this;

        $("input").iCheck({
          checkboxClass:"icheckbox_flat-blue",
          radioClass:"iradio_flat-blue"
        });

        //清除
        this._cancelCreate.on("click",$.proxy(function(e){
            this._createMethod.val('請選擇');
            this._createData.val('請選擇');
            this._createNum.val('');
        },this));
        //建立
        this._btnCreate.on("click",$.proxy(function(e){
          if(this._createMethod.val() != "請選擇" && this._createData.val()!="請選擇" && this._createNum.val()!="")
          {
            if (parseInt(this._createNum.val()) <= 50)
            {
              $(e.currentTarget).button('loading');
              this._createAllData();
            }
            else
            {
              layer.msg('<b>一次創太多了啦！不行不行，最多只能50個</b>', {time: 1500, icon:2,shade:[0.5,'black']});
            }
          }
          else
          {
            layer.msg('<b>快速新增選項每個皆為必填</b>', {time: 1500, icon:2,shade:[0.5,'black']});
          }
        },this))
    },
    _createAllData:function(){
      if (this._createData.val() == 'user')
      {
        this._createUser();
      }
      else if (this._createData.val() == 'uncheck')
      {
        this._createUncheck();
      }
      else if (this._createData.val() == 'checkSingle')
      {
        this._createCheckSingle();
      }
      else if (this._createData.val() == 'position')
      {
        this._createPosition();
      }
    },
    _createUser:function(){
      var objThis = this;
      var detail =
      {
        method: this._createMethod.val(),
        num: this._createNum.val(),
        detailData: this._createDataDetail.val()
      }
      $.ajax({
        type:'post',
        url:'/fastCreateUser',
        data:{strJson : JSON.stringify(detail)},
        success:function(datas){
          if (datas.success == 'yes')
          {
            layer.msg('<b>新增成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
          }
          else
          {
            layer.msg('<b>我還沒做QQ</b>', {time: 1500, icon:2,shade:[0.5,'black']});
          }
        },
        complete:function(){
            objThis._btnCreate.button('reset')
        }
      });
    },
    _createUncheck:function(dataDetail){
      var objThis = this;
      var detail =
      {
        method: this._createMethod.val(),
        num: this._createNum.val(),
        detailData: this._createDataDetail.val()
      }
      $.ajax({
        type:'post',
        url:'/fastCreateUncheckLesson',
        data:{strJson : JSON.stringify(detail)},
        success:function(datas){
          if (datas.success == 'yes')
          {
            layer.msg('<b>新增成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
          }
          else
          {
            layer.msg('<b>我還沒做QQ</b>', {time: 1500, icon:2,shade:[0.5,'black']});
          }
        },
        complete:function(){
            objThis._btnCreate.button('reset')
        }
      });
    },
    _createCheckSingle:function(dataDetail){
      var objThis = this;
      var detail =
      {
        method: this._createMethod.val(),
        num: this._createNum.val(),
        detailData: this._createDataDetail.val()
      }
      $.ajax({
        type:'post',
        url:'/fastCreateCheckSingleLesson',
        data:{strJson : JSON.stringify(detail)},
        success:function(datas){
          if (datas.success == 'yes')
          {
            layer.msg('<b>新增成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
          }
          else
          {
            layer.msg('<b>我還沒做QQ</b>', {time: 1500, icon:2,shade:[0.5,'black']});
          }
        },
        complete:function(){
            objThis._btnCreate.button('reset')
        }
      });
    },
    _createPosition:function(dataDetail){
      var objThis = this;
      var detail =
      {
        method: this._createMethod.val(),
        num: this._createNum.val(),
        detailData: this._createDataDetail.val()
      }
      $.ajax({
        type:'post',
        url:'/fastCreatePosition',
        data:{strJson : JSON.stringify(detail)},
        success:function(datas){
          if (datas.success == 'yes')
          {
            layer.msg('<b>新增成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
          }
          else
          {
            layer.msg('<b>我還沒做QQ</b>', {time: 1500, icon:2,shade:[0.5,'black']});
          }
        },
        complete:function(){
            objThis._btnCreate.button('reset')
        }
      });
    },
  }
  return _const;
}());
var superfast;
$(function(){
  superfast = new superfast();
  setTimeout('layout._resize_tab();',100)    /* 調整背景 */
})
