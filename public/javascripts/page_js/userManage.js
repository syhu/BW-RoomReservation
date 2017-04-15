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
        //查詢
        this._btnFilter.on("click",$.proxy(function(e){
            var obj = new Object;
            var arr = new array();

            obj.name = "";
            obj.account = "";
            obj.authorty = "";

            if(this._filterName.val()!="")  obj.name = this._filterName.val();
            if(this._filterAccount.val()!="")  obj.name = this._filterAccount.val();
            if(this._filterAuthority.val()!="請選擇")  obj.name = this._filterAuthority.val();

            arr = arr.concat(obj);
            this._selectUserLData(arr);

        },this))
    },
    _checkAdmin:function(){
        return true;
     },
     _getUserList:function(){
       var objThis = this;

       $.ajax({
         type:'post',
         url:'/getUpdateUser',
         success:function(datas){
           console.log(datas);
             var data = datas.success
             objThis._setUserList(data);
         }
       });
     },
     _setUserList:function(strJson){
       var objThis = this;
       var _td;
       var _tr;
       console.log(strJson)
       objThis._userList.empty();
       $.each(strJson,function(i,v){

           _tr = $("<tr />");
           //#
           _td = $("<td />",{"text":(i+1)});
           _tr.append(_td);
           //姓名
           _td = $("<td />",{"style":"text-align:left","text":v.name});
           _tr.append(_td);
           //帳號
           _td = $("<td />",{"style":"text-align:left","text":v.account});
           _tr.append(_td);
           //Email
           _td = $("<td />",{"text":v.email});
           _tr.append(_td);
           //權限
           _td = $("<td />",{"nowrap":"nowrap","text":v.authorty});
           _tr.append(_td);
           //操作
           _td = $("<td />");

           switch (v.authorty) {
             case "User":
               _input = $("<span />",{"class":"label label-success","text":"升級管理員","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
               _input.bind("click",$.proxy(function(e){
                 bootbox.alert("這是升級" + v.account);
               },this));
               _td.append(_input);
               break;
             case "Owner":
              _input = $("<span />",{"class":"label label-danger","text":"降級管理員","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
              _input.bind("click",$.proxy(function(e){
                  bootbox.alert("這是降級" + v.account);
              },this));
              _td.append(_input);
               break;
           }
           _input = $("<span />",{"class":"label label-default","text":"詳細資料","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
           _input.bind("click",$.proxy(function(e){
             objThis._bounce_new.modal('show');
           },this));
           _td.append(_input);

           _tr.append(_td);

           objThis._userList.append(_tr)


       });

     },
     _selectUserLData:function(val){
       var objThis = this;

       $.ajax({
         type:'post',
         url:'/getUpdateUser',
         data:{strJson : JSON.stringify(val)},
         success:function(datas){
           console.log(datas);
             var data = datas.success
             objThis._setUserList(data);
         }
       });

     }
  }
  return _const;

}());

var userManage;
$(function(){
  userManage = new userManage();
})
