var positionManage = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){
      this._bounce_area = $('#bounce_area');

      this._new = $('.new');

      //查詢地點
      this._filterBuilding = $("#filterBuilding");
      this._filterFloor = $("#filterFloor");
      this._filterClass = $("#filterClass");
      this._cancelFilter = $("#cancelFilter");
      this._btnFilter = $("#btnFilter");

      this._hiddenPositionData = $("#hiddenPositionData");

      //新增地點
      this._btnCancel = $('#btnCancel');
      this._btnSubmit = $('#btnSubmit');
      this._areaBuilding = $("#areaBuilding");
      this._areaFloor =  $("#areaFloor");
      this._areaClass = $("#areaClass");
      this._areaPeople = $("#areaPeople");
      this._areaNote = $("#areaNote");
      this._form_name = $(".form_name")
      this._form_floor = $(".form_floor")
      this._form_class = $(".form_class")
      this._form_people = $(".form_people")

      this._positionloadingList = $("#positionloadingList");
      this._positionnobodyList = $("#positionnobodyList");



      this._area = $("#area");

      this._start();
    },

    _start:function(){
      var objThis = this;
      this._positionloadingList.hide();
      this._positionnobodyList.hide();

      objThis._initialAll();
      objThis._getPositionList();


    },

    _initialAll:function(){
      //初始化彈跳視窗位置
      this._bounce_area.css('position','absolute');
      // this._bounce_area.css('top', '20%');


      //大樓change
      this._filterBuilding.on("change",$.proxy(function(e){
        var objThis = this;
        var check = true;
        if($(e.currentTarget).val() != "請選擇"){
            objThis._filterFloor.empty().append("<option value='請選擇'>請選擇</option>")
            objThis._filterClass.empty().append("<option value='請選擇'>請選擇</option>")
            var data = JSON.parse(this._hiddenPositionData.val());
            $.each(data,function(i,v){
                check = true;
                if($(e.currentTarget).val() == v.building){
                  $("#filterFloor option").each(function(index,element){
                    if($(element).val() == v.floor )  check = false;
                  });
                  if(check){
                    objThis._filterFloor.append("<option value='" + v.floor + "'>" + v.floor + "</option>");
                  }
                }
            })
        }
      },this));
      //樓層change
      this._filterFloor.on("change",$.proxy(function(e){
        var objThis = this;
        if($(e.currentTarget).val() != "請選擇"){
          objThis._filterClass.empty().append("<option value='請選擇'>請選擇</option>");
          var data = JSON.parse(this._hiddenPositionData.val());
          $.each(data,function(i,v){
              if($(e.currentTarget).val() == v.floor && objThis._filterBuilding.val() == v.building){
                  objThis._filterClass.append("<option value='" + v.classroom + "'>" + v.classroom + "</option>");
              }
          })
        }
      },this));

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
        if(objThis._checkSubmit())
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
      var objThis = this;
      var returnCheck = true;
      //檢查大樓名稱
      if(objThis._areaBuilding.val() == ''){
        returnCheck = false;
        this._form_name.addClass("has-error");
        layer.msg('<b>請輸入大樓名稱</b>', {time: 1500, icon:2,shade:[0.5,'black']});

      }else{
        objThis._form_name.removeClass("has-error");
      }
      //檢查樓層
      var positiveInteger = /^[0-9]*[1-9][0-9]*$/ ;
      if(objThis._areaFloor.val() == "" || objThis._areaFloor.val() <1 || !positiveInteger.test(objThis._areaFloor.val()) ){
        returnCheck = false;
				objThis._form_floor.addClass("has-error");
				layer.msg('<b>請輸入正確的樓層格式</b>', {time: 1500, icon:2,shade:[0.5,'black']});
      }else{
        objThis._form_floor.removeClass("has-error");
      }
      //教室名稱
      if(objThis._areaClass.val() == ''){
        returnCheck = false;
        objThis._form_class.addClass("has-error");
        layer.msg('<b>請輸入教室名稱</b>', {time: 1500, icon:2,shade:[0.5,'black']});
      }else{
        objThis._form_class.removeClass("has-error");
      }
      //容納人數
      if(objThis._areaPeople.val() == "" || objThis._areaPeople.val() <1 || !positiveInteger.test(objThis._areaPeople.val()) ){
        returnCheck = false;
				objThis._form_people.addClass("has-error");
				layer.msg('<b>請輸入正確的容納人數格式</b>', {time: 1500, icon:2,shade:[0.5,'black']});
      }else{
        objThis._form_people.removeClass("has-error");
      }

      return returnCheck;
    },
    _getPositionList:function(){
      var objThis = this;
      $.ajax({
        type:'post',
        url:'/getPositionData',
        success:function(datas){
            var data = datas.success
            objThis._setPositionOption(data);
            objThis._setPositionList(data);
        }
      });

    },
    _setPositionOption:function(strJson){
      var objThis = this;
      objThis._filterBuilding.empty().append("<option value='請選擇'>請選擇</option>");
      objThis._filterFloor.empty().append("<option value='請選擇'>請選擇</option>");
      objThis._filterClass.empty().append("<option value='請選擇'>請選擇</option>");

      // console.log(strJson)
      var arrBuilding = new Array();
      var arrFloor = new Array();
      var arrClass = new Array();
      var jsonData = '[';
      $.each(strJson,function(i,v){

          arrBuilding.push(v.building);
          // arrFloor.push(v.floor)
          // arrClass.push(v.classroom)

          jsonData += '{"building":"' + v.building + '",';
          jsonData += '"floor":"' + v.floor + '",';
          jsonData += '"classroom":"' + v.classroom + '"},';


      });
      jsonData = jsonData.substring(0,jsonData.length - 1);
      jsonData += ']'
      // console.log(jsonData)
      objThis._hiddenPositionData.val(jsonData)

      //刪除重複
      if(arrBuilding.length > 0){
          var index = 0;
          for(var i=0;i<arrBuilding.length;i++){
              if(arrBuilding[index] != arrBuilding[i]){
                  index++;
                  arrBuilding[index] = arrBuilding[i];
              }
          }
          for(var j = arrBuilding.length; j > index;j--){
              delete arrBuilding[j];
          }
          for(var k=0;k <= index;k++){
                _option = $("<option />",{"text":arrBuilding[k],"value":arrBuilding[k]});
                objThis._filterBuilding.append(_option);
          }

      }
    },
    _setPositionList:function(strJson){
      var objThis = this;
      var _tr;
      var _td;
      var _input;
      objThis._area.empty();
      // console.log(strJson)
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
          //上鎖
          if(v.lock == "no"){
            _input = $("<span />",{"class":"label label-default btn-embossed","text":"未上鎖","style":"font-size:90%"});
          }else{
            _input = $("<span />",{"class":"label label-danger btn-embossed","text":"已上鎖","style":"font-size:90%"});
          }
          _td = $("<td />");
          _td.append(_input)
          _tr.append(_td)
          //操作
          _td = $("<td />");
  				_input = $("<span />",{"class":"label label-success btn-embossed","text":"編輯","style":"margin-right:10px;font-size:100%;"});
  				_input.bind("click",function(){
					       bootbox.alert("編輯" + v.location);
          })
          _td.append(_input);
          _tr.append(_td);

          _input = $("<span />",{"class":"label label-danger btn-embossed","text":"刪除","style":"margin-right:10px;font-size:100%;"});
          _input.bind("click",function(){
            bootbox.alert("刪除" + v.location);
          });
          _td.append(_input);
          _tr.append(_td);

          if (v.lock == 'no')
          {
            _input = $("<span />",{"class":"label label-success btn-embossed","text":"鎖定場地","id":"lock" + i,"style":"margin-right:10px;:10px;font-size:100%;"});
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
            _input = $("<span />",{"class":"label label-danger btn-embossed","text":"解鎖場地","id":"unlock" + i,"style":"margin-right:10px;font-size:100%;"});
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
  setTimeout('layout._resize_tab();',100)    /* 調整背景 */
});
