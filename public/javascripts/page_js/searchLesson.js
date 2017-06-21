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



      this._lessonloadingList = $(".lessonloadingList");


      //資料表
      this._emptylistTable = $('#emptylistTable');
      this._lessonlistTable = $('#lessonlistTable');

      this._start();
    },

    _start:function(){
      var objThis = this;
      // this._lessonlistTable.hide();
      // this._emptylistTable.hide();
      this._lessonloadingList.hide();


      var today = layout._showTime();
      objThis._EmptyDataTable();   /* 空教室列表初始化 */
      objThis._LessonDataTable();   /* 課程列表初始化 */

      $("#lessonlistTable_wrapper").hide();   /* 課程列表隱藏 */
      $("#emptylistTable_wrapper").hide();    /* 空教室列表隱藏 */

      objThis._initialAll();
      objThis._getPositionList();
      objThis._filterTimeStart.val(today)
      objThis._filterTimeDue.val(today)
      $('input').iCheck('check');   //将输入框的状态设置为checked

    },
    _initialAll:function(){

      this._filterEmptyClass.on("ifClicked",$.proxy( function (e) {
          var objThis = this;
          if($(e.currentTarget).is(":checked") == true){
            objThis._filterLesson.removeAttr("disabled");
          }
          else{
            objThis._filterLesson.attr("disabled","disabled").val('');
          }

       },this))
      this._btnFilter.on("click",$.proxy(function(e){
        var arr = new Array();
        var obj = new Object;
        var date = new Date();
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

        this._getlessonList(arr);

      },this));
      //清除查詢
      this._cancelFilter.on("click",$.proxy(function(){
        var today = layout._showTime();
        this._filterTimeZone.val('請選擇');
        this._filterLocation.val('請選擇');
        this._filterTimeStart.val(today);
        this._filterTimeDue.val(today);
        this._filterLesson.val('').attr("disabled","disabled");
        $('input').iCheck('check');   //将输入框的状态设置为checked
        // this._filterEmptyClass = $("#filterEmptyClass");
      },this));
    },
    _LessonDataTable:function(){
      var objThis = this;
       var today = new Date();

       var Table = this._lessonlistTable.dataTable(
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
               "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "全部"]]
           });

           objThis._lessonlistTable.fnClearTable();

    },
    _EmptyDataTable: function () {
      var objThis = this;
       var today = new Date();

       var Table = this._emptylistTable.dataTable(
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
               "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "全部"]]
           });

           objThis._emptylistTable.fnClearTable();
    },
    //取得列表查詢
    _getlessonList:function(val){
      var objThis = this;

      layer.msg('<b>資料查詢中</b>', { icon:0,shade:[0.5,'black']});

      $("#lessonlistTable_wrapper").hide();   /* 課程列表隱藏 */
      $("#emptylistTable_wrapper").hide();    /* 空教室列表隱藏 */

      // objThis._lessonlistTable.hide();
      // objThis._emptylistTable.hide();

      $.ajax({
        type:'post',
        url:'/searchLessonDetail',
        data:{strJson: JSON.stringify(val)},
        success:function(datas){
            var data = datas.success
            // console.log(datas)
            if (data == 'no data')
            {
              layer.msg('<b>查無資料</b>', {time: 1500, icon:2,shade:[0.5,'black']});

            }
            else
            {

              $("#emptylistTable_wrapper").show();

              if(objThis._filterEmptyClass.is(":checked")){
                layer.msg('<b>空教室查詢成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                objThis._setemptyList(datas.success);
                $("#lessonlistTable_wrapper").hide();   /* 課程列表隱藏 */

              }else{
                $("#lessonlistTable_wrapper").show();

                layer.msg('<b>課程查詢成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                objThis._setlessonList(datas.success);
                $("#emptylistTable_wrapper").hide();    /* 空教室列表隱藏 */
              }
            }
        },
        beforeSend:function(){
          objThis._lessonloadingList.show();
        },
        complete:function(){
          objThis._lessonloadingList.hide();
        }
      });
    },
    //查空教室
    _setemptyList:function(strJson){
      var objThis = this;
      var _tr;
      var _td;
      // console.log(strJson)
      objThis._emptylistTable.fnClearTable();



      for (var data in strJson)
      {
        var emptyData = strJson[data].split(' ')
        _tr = $("<tr />");
        //#
        _td = $("<td />",{"text":(parseInt(data)+1)});
        _tr.append(_td);
        //課程名稱
        _td = $("<td />",{"text":emptyData[0]});
        _tr.append(_td);
        //使用教室
        _td = $("<td />",{"text":emptyData[1]});
        _tr.append(_td);
        //上課人數
        _td = $("<td />",{"text":emptyData[2]});
        _tr.append(_td);
        //上鎖
        if (emptyData[3] == 'lock')
        {
          _td = $("<td />",{"text":'已上鎖'});
        }
        else
        {
          _td = $("<td />",{"text":''});
        }
        _tr.append(_td);
        objThis._emptylistTable.fnAddData(_tr);

      }

      // objThis._emptylistTable.show();
    },
    //查課程
    _setlessonList:function(strJson){
      var objThis = this;

      var _tr;
      var _td;

      // console.log(strJson)
      objThis._lessonlistTable.fnClearTable();

      $.each(strJson,function(i,v){
        _tr = $("<tr />");
        //#
        _td = $("<td />",{"text":(i+1)});
        _tr.append(_td);
        //課程名稱
        _td = $("<td />",{"text":v.name});
        _tr.append(_td);
        //使用教室
        _td = $("<td />",{"text":v.building + " " + v.lessonClass});
        _tr.append(_td);
        //上課人數
        _td = $("<td />",{"text":v.people});
        _tr.append(_td);
        //時間 - 時段
        _td = $("<td />",{"text":v.time + " - " + v.period});
        _tr.append(_td);
        //聯絡人
        _td = $("<td />",{"text":v.contract});
        _tr.append(_td);
        //聯絡電話
        _td = $("<td />",{"text":v.contractPhone});
        _tr.append(_td);
        //詳細資料
        _input = $("<span />",{"class":"label label-default btn-embossed","text":"詳細資料","style":"font-size:100%"});
        _input.bind("click",function(){
          bootbox.alert("<b style='font-size:20px;'>課程資訊</b><hr/>" +
                "<b style='font-size:20px;'>課程名稱</b>：" + v.name +
                "<br/><br/>時間 - 時段：" + v.time + "-" + v.period +
								"<br/><br/>使用教室：" + v.building + " " +  v.lessonClass +
								"<br/><br/>上課人數：" + v.people +

								"<br/><br/>聯絡人姓名：" + v.contract +
								"<br/><br/>聯絡人電話：" + v.contractPhone +
								"<br/><br/>使用目標：" + v.aim	+
                "<br/><br/>備註：" + v.note +
                "<br/><br/>建立時間：" + v.createTime +
								"<br/><br/>修改時間：" + v.modifyTime +
                "<br/><br/>上傳者：" + v.user

          )
        })
        _td = $("<td />");
        _td.append(_input)
        _tr.append(_td)
        objThis._lessonlistTable.fnAddData(_tr);

      })


      // objThis._lessonlistTable.show();

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
