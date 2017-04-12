var userManage = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){


        //列表
        this._userList = $("#userList")
        //查詢 清除
        this._cancelFilter = $("#cancelFilter");
        this._btnFilter = $("#btnFilter");
        //查詢欄位
        this._filterName = $("#filterName");
        this._filterAccount = $("#filterAccount");
        this._filterAuthority = $("#filterAuthority");
        //
        this._bounce_new = $("#bounce_new")

        this._start();
    },

    _start:function(){
      var objThis = this;
      objThis._initialAll();

      objThis._getUserList();
    },
    _initialAll:function(){
        var objThis = this;

        $("input").iCheck({
          checkboxClass:"icheckbox_flat-blue",
          radioClass:"iradio_flat-blue"
        });

        //清除
        this._cancelFilter.on("click",$.proxy(function(e){
            this._filterName.val('');
            this._filterAccount.val('');
            this._filterAuthority.val('請選擇');
        },this));
        this._btnFilter.on("click",$.proxy(function(e){

            bootbox.alert("查詢成功");
        },this));
    },
    _checkAdmin:function(){
        return true;
     },
     _getUserList:function(){
        var objThis = this;
        var _td;
        var _tr;

        objThis._userList.empty();

        for(var i = 1; i < 10; i++){
            _tr = $("<tr />");
            //#
            _td = $("<td />",{"text":i});
            _tr.append(_td);
            //姓名
            _td = $("<td />",{"text":"撿到錢" + i});
            _tr.append(_td);
            //帳號
            _td = $("<td />",{"text":"test" + i});
            _tr.append(_td);
            //信箱
            _td = $("<td />",{"text":i});
            _tr.append(_td);
            //權限
            _td = $("<td />",{"text":i});
            _tr.append(_td);
            //操作
            _td = $("<td />");
            _input = $("<input />",{"type":"hidden","value":i,"id":"id" + i});
            _td.append(_input)
            _input = $("<span />",{"class":"label label-success","text":"升級管理員","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
            _input.on("click",$.proxy(function(e){
              bootbox.alert("這是升級");
            },this));
            _td.append(_input);
            _input = $("<span />",{"class":"label label-danger","text":"降級管理員","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
            _input.on("click",$.proxy(function(e){
              bootbox.alert("這是降級" + i);
            },this));
            _td.append(_input);

            _input = $("<span />",{"class":"label label-default","text":"詳細資料","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
            _input.on("click",$.proxy(function(e){
              objThis._bounce_new.modal('show');
            },this));
            _td.append(_input);

            _tr.append(_td);
            objThis._userList.append(_tr);

        }


     }
  }
  return _const;

}());

var userManage;
$(function(){
  userManage = new userManage();
})
