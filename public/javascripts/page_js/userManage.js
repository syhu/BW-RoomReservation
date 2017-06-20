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

        this._nobodyList = $("#nobodyList");
        this._loadingList = $("#loadingList");


        this._start();
    },

    _start:function(){
      var objThis = this;

      objThis._UserDataTable();   /* 使用者列表初始化 */
      this._loadingList.hide();
      this._nobodyList.hide();

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
    _UserDataTable:function(){
			var objThis = this;
			 var today = new Date();

			 var Table = this._userList.dataTable(
					 {
							 dom: 'lBfrtip',
							 buttons: [
							 ],
							 "oLanguage": {
									 "sSearch": "搜尋： ",
									 "sLengthMenu": "<span>顯示筆數:_MENU_</span> ",
									 "oPaginate": { "sFirst": "第一頁", "sLast": "最後一頁", "sNext": ">", "sPrevious": "<" },
									 "sInfo": "第 _START_ - _END_ 筆資料。總共 _TOTAL_ 筆",
									 "sProcessing": "資料讀取中...",
									 "sEmptyTable": "查無資料",
									 sSearchPlaceholder: "請輸入關鍵字..",
									 "sZeroRecords": "查無資料",
									 sInfoEmpty: ""
							 },
							 "serverSide": false,
							 "deferLoading": 57,
							 "iDisplayLength": 10,
							 "aLengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "全部"]]
					 });

					 objThis._userList.fnClearTable();

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
      //  console.log(strJson)
      objThis._userList.fnClearTable();
      //  objThis._userList.empty();
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
                labelClass = 'label label-info badge btn-embossed';
                text = '超級管理者';
                break;
             case 'Admin':
                labelClass = 'label label-primary badge btn-embossed';
                text = '最高管理者';
                break;
             case 'Owner':
                labelClass = 'label label-warning badge btn-embossed';
                text = '管理員';
                break;
             case 'User':
                labelClass = 'label label-default badge btn-embossed';
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
               _input = $("<span />",{"class":"label label-success btn-embossed","text":"升級管理員","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
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
              _input = $("<span />",{"class":"label label-danger btn-embossed","text":"降級管理員","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
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
           _input = $("<span />",{"class":"label label-default btn-embossed","text":"詳細資料","id":"update" + i,"style":"margin-right:10px;font-size:100%;"});
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

          //  objThis._userList.append(_tr)
           objThis._userList.fnAddData(_tr);


       });

     },
     _selectUserList:function(val){
       var objThis = this;
       objThis._nobodyList.hide();
       $.ajax({
         type:'post',
         url:'/getSearchUser',
         data:{strJson : JSON.stringify(val)},
         success:function(datas){
             var data = datas.success
             objThis._loadingList.hide();
             objThis._setUserList(data);
             if(data.length == 0){
               objThis._nobodyList.show();
             }
         },
         beforeSend:function(){
           objThis._loadingList.show();
         },
         complete:function(){
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
