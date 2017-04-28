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
            this._btnFilter.click();
        },this));
        //查詢
        this._btnFilter.on("click",$.proxy(function(e){
            var obj = new Object;
            var arr = new Array();

            obj.name = "";
            obj.account = "";
            obj.authorty = "";

            if(this._filterName.val()!="")  obj.name = this._filterName.val();
            if(this._filterAccount.val()!="")  obj.account = this._filterAccount.val();
            if(this._filterAuthority.val()!="請選擇")  obj.authorty = this._filterAuthority.val();

            arr = arr.concat(obj);
            this._selectUserList(arr);
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
           _td = $("<td />",{"nowrap":"nowrap","text":(i+1)});
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
           switch (v.authorty) {
             case 'Hyper':
                labelClass = 'label label-info badge';
                text = '超級管理者';
                break;
             case 'Admin':
                labelClass = 'label label-primary badge';
                text = '最高管理者';
                break;
             case 'Owner':
                labelClass = 'label label-warning badge';
                text = '管理員';
                break;
             case 'User':
                labelClass = 'label label-default badge';
                text = '使用者';
                break;
           }
           _input = $("<span />",{"class":labelClass,"text":text,"style":"font-size:100%;"});
           _td = $("<td />");
           _td.append(_input);
           _tr.append(_td);
           //操作
           _td = $("<td />");

           switch (v.authorty) {
             case "User":
               _input = $("<span />",{"class":"label label-success","text":"升級管理員","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
               _input.bind("click",$.proxy(function(e){
                 bootbox.confirm("您確定要升級 <b style='color:red;'>" + v.account + " </b>帳號嗎?",function(result){
                    if(result){

                      var obj = new Object;
                      var arr = new Array();
                      obj.account = v.account;
                      obj.authorty = v.authorty;
                      arr = arr.concat(obj);

                      $.ajax({
                        type:'post',
                        data:{strJson:JSON.stringify(arr)},
                        url:'/updateAuthorty',
                        success:function(datas){
                          if (datas.success == 'success')
                          {
                            layer.msg('<b>升級成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                          }
                          else if(datas.success == 'no')
                          {
                            layer.msg('<b>升級失敗，請別動不該動的權限</b>', {time: 1500, icon:2,shade:[0.5,'black']});
                          }
                        },
                        complete:function(){
                          objThis._getUserList();
                        }
                     });
                    }

                 });



               },this));
               _td.append(_input);
               break;
             case "Owner":
              _input = $("<span />",{"class":"label label-danger","text":"降級管理員","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
              _input.bind("click",$.proxy(function(e){
                bootbox.confirm("您確定要降級 <b style='color:red;'>" + v.account + " </b>帳號嗎?",function(result){
                   if(result){

                     var obj = new Object;
                     var arr = new Array();
                     obj.account = v.account;
                     obj.authorty = v.authorty;
                     arr = arr.concat(obj);

                     $.ajax({
                       type:'post',
                       data:{strJson:JSON.stringify(arr)},
                       url:'/updateAuthorty',
                       success:function(datas){
                         if (datas.success == 'success')
                         {
                           layer.msg('<b>降級成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                         }
                         else if(datas.success == 'no')
                         {
                           layer.msg('<b>降級失敗，請別動不該動的權限</b>', {time: 1500, icon:2,shade:[0.5,'black']});
                         }
                       },
                       complete:function(){
                         objThis._getUserList();
                       }
                     });
                   }

                });


              },this));
              _td.append(_input);
               break;
           }
           _input = $("<span />",{"class":"label label-default","text":"詳細資料","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
           _input.bind("click",$.proxy(function(e){

             bootbox.alert("<br/><b style='font-size:20px;'><font style='color:red;'>" + v.name + "</font> 的詳細資料</b><br/>" +
             "<br/><br/><b>名稱：</b>" + v.name +
             "<br/><br/><b>性別：</b>" + "男" +
             "<br/><br/><b>帳號：</b>" + v.account +
             "<br/><br/><b>電話：</b>" + v.telephone +
             "<br/><br/><b>信箱：</b>" + v.email +
             "<br/><br/><b>生日：</b>" + v.birthday +
             "<br/><br/><b>地址：</b>" + v.address

              )

           },this));
           _td.append(_input);

           _tr.append(_td);

           objThis._userList.append(_tr)


       });

     },
     _selectUserList:function(val){
       var objThis = this;
       $.ajax({
         type:'post',
         url:'/getSearchUser',
         data:{strJson : JSON.stringify(val)},
         success:function(datas){
           console.log(datas);
             var data = datas.success
             objThis._setUserList(data);
         },
         complete:function(){
            // bootbox.alert("查詢成功");
            layer.msg('<b>查詢成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});

         }
       });

     }
  }
  return _const;

}());

var userManage;
$(function(){
  userManage = new userManage();
  setTimeout('layout._resize_tab();',100)    /* 調整背景 */

})
