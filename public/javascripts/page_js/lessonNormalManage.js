var lessonNormalManage = (function(){
	var _const;
	_const = function(){

		this._lessonNum = 1;
		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			//this._new = $("#new");
			this._new = $(".new");
			this._lesson = $("#lesson");
			this._todayTime = $("#todayTime");
			this._bounce_lesson = $("#bounce_lesson");
			this._bounce_edit = $("#bounce_edit");
			this._bounce_detail = $("#bounce_datail");
			this._btnSubmit = $("#btnSubmit");
			this._btnCancel = $("#btnCancel");
			this._btnClose = $("#btnClose");
			//課程新增欄位
			this._lessonName = $("#lessonName");
			this._lessonCount = $("#lessonCount");
			this._lessonBuilding = $("#lessonBuilding");
			this._lessonFloor = $("#lessonFloor");
			this._lessonClass = $("#lessonClass");
			this._lessonTime = $("#lessonTime");
			this._lessonPeriod = $("#lessonPeriod");
			this._lessonPeople = $("#lessonPeople");
			this._lessonNote = $("#lessonNote");
			//form
			this._form_name = $(".form_name");
			this._form_count = $(".form_count");
			this._form_class = $(".form_class");
			this._form_time = $(".form_time");
			this._form_period = $(".form_period");
			this._form_people = $(".form_people");
			this._form_note = $(".form_note");
			this._form = $(".form");
			//detail
			this._lessonDetail = $("#lessonDetail");
			this._detailContract = $("#detailContract");
			this._detailPhone = $("#detailPhone");
			this._detailData = $("#detailData");
			//查詢
			this._btnFilter = $("#btnFilter");
			this._cancelFilter = $("#cancelFilter");
			this._filterBuilding = $("#filterBuilding");
			this._filterFloor = $("#filterFloor");
			this._filterClass = $("#filterClass");
			this._filterTimeZone = $("#filterTimeZone");
			//編輯課程
			this._EditlessonName = $("#EditlessonName");
			this._EditlessonTimes = $("#EditlessonTimes");
			this._EditlessonClass = $("#EditlessonClass");
			this._EditlessonClassTime = $("#EditlessonClassTime");
			this._EditlessonPeriod = $("#EditlessonPeriod");
			this._EditlessonPeople = $("#EditlessonPeople");
			this._EditlessonNote = $("#EditlessonNote");

			this._btnEditCancel = $("#btnEditCancel");
			this._btnEditSubmit = $("#btnEditSubmit");

			this._hiddenPositionData = $("#hiddenPositionData");		/* 存放地點資訊 */
			this.checkPeople = 0;

			this._start();
		},
		_start:function(){
			var objThis = this;
			objThis._initialAll();
			objThis._getPositionList();
			objThis._getlessonIDList();
		},
		_initialAll:function(){

			//顯示當天時間
			var now = new Date();
			this._todayTime.append
        (   now.getFullYear() + '/' + (now.getMonth()+1) + '/'
          + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":"
          + now.getSeconds());

			//新增課程
			this._new.on("click",$.proxy(function(){
				this._lessonName.val("");
				this._lessonCount.val("");
				this._lessonTime.val("");
				this._lessonBuilding.val("請選擇");
				this._lessonPeriod.val("請選擇");
				// this._lessonFloor.attr('disabled','');
				this._lessonFloor.empty().append("<option value='請選擇'>請選擇</option>");
				// this._lessonClass.attr('disabled','');
				this._lessonClass.empty().append("<option value='請選擇'>請選擇</option>");
				this._detailContract.val("");
				this._detailPhone.val("");
				this._lessonPeople.val("");
				this._lessonNote.val("");
				this._form.removeClass("has-error");
				//新增課程 視窗
				this._bounce_lesson.modal('show');
			},this));



			//關閉課程明細
			this._btnClose.on("click",$.proxy(function(){
				this._bounce_detail.modal("hide");
			},this));

			//確認新增課程
			this._btnSubmit.on("click",$.proxy(function(){
				var objThis = this;
				if(this._checkSubmit())
				{
					bootbox.confirm({
            message:"<br/><b style='font-size:20px;'>確定申請 <font style='color:red;'>" + objThis._lessonName.val() + "</font> 課程嗎?</b><br/>" +
            "<br/><br/><b>地點：</b>" + objThis._lessonClass.val() +
            "<br/><br/><b>時間：</b>" + objThis._lessonTime.val() +
						"<br/><br/><b>聯絡人：</b>" + objThis._detailContract.val() +
						"<br/><br/><b>聯絡電話：</b>" + objThis._detailPhone.val() +
						"<br/><br/><b>課程堂數：</b>" + objThis._lessonCount.val() +
            "<br/><br/><b>時段：</b>" + objThis._lessonPeriod.val() +
            "<br/><br/><b>上課人數：</b>" + objThis._lessonPeople.val() +
            "<br/><br/><b>申請事由：</b>" + objThis._lessonNote.val(),
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
						callback:function(e){
								if(e){
											var lessonData =
											{
												lessonName : objThis._lessonName.val(),
												lessonCount : objThis._lessonCount.val(),
												lessonBuilding : objThis._lessonBuilding.val(),
												lessonFloor : objThis._lessonFloor.val(),
												lessonClass : objThis._lessonClass.val(),
												lessonTime : objThis._lessonTime.val(),
												lessonPeriod : objThis._lessonPeriod.val(),
												lessonPeople : objThis._lessonPeople.val(),
												lessonNote : objThis._lessonNote.val(),
												contract: objThis._detailContract.val(),
												contractPhone: objThis._detailPhone.val()
											};
											$.ajax({
												type: "post",
												url: "/lessonNormalManage",
												data: lessonData ,
												dataType: "json",
												success: function(message){
													if(message.success == 'yes')
													{
														layer.msg('<b>新增課程成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
													}
												},
												error: function (xhr)
												{
													bootbox.alert('error: ' + xhr);console.log(xhr);
													layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
												}
											});
											// this._getlessonIDList(data);	/* 插入課程 */
											objThis._bounce_lesson.modal("hide");

								}else{
									layer.msg('<b>取消了申請課程</b>', {time: 1500, icon:2,shade:[0.5,'black']});
								}
							}
						});
					}
			},this));
			//取消編輯課程
			this._btnEditCancel.on("click",$.proxy(function(){
				this._bounce_edit.modal("hide");
			},this));
			//取消新增課程
			this._btnCancel.on("click",$.proxy(function(){
				this._bounce_lesson.modal("hide");
			},this));
			//filter 大樓 change
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
			//filter 樓層 change
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
			//大樓change
			this._lessonBuilding.on("change",$.proxy(function(e){
				var objThis = this;
        var check = true;
        if($(e.currentTarget).val() != "請選擇"){
            objThis._lessonFloor.empty().append("<option value='請選擇'>請選擇</option>")
            objThis._lessonClass.empty().append("<option value='請選擇'>請選擇</option>")
            var data = JSON.parse(this._hiddenPositionData.val());
            $.each(data,function(i,v){
                check = true;
                if($(e.currentTarget).val() == v.building){
                  $("#lessonFloor option").each(function(index,element){
                    if($(element).val() == v.floor )  check = false;
                  });
                  if(check){
                    objThis._lessonFloor.append("<option value='" + v.floor + "'>" + v.floor + "</option>");
                  }
                }
            })
        }
			},this))
			// 樓層change
			this._lessonFloor.on("change",$.proxy(function(e){
				var objThis = this;
        if($(e.currentTarget).val() != "請選擇"){
          objThis._lessonClass.empty().append("<option value='請選擇'>請選擇</option>");
          var data = JSON.parse(this._hiddenPositionData.val());
          $.each(data,function(i,v){
              if($(e.currentTarget).val() == v.floor && objThis._lessonBuilding.val() == v.building){
                  objThis._lessonClass.append("<option value='" + v.classroom + "'>" + v.classroom + "  (最大容納人數：" + v.people + "人)</option>");
              }
          })
        }
			},this));
			// 教室change 儲存人數
			this._lessonClass.on("change",$.proxy(function(e){
				var objThis = this;
					if($(e.currentTarget).val() != "請選擇"){
						var data = JSON.parse(this._hiddenPositionData.val());
						$.each(data,function(i,v){
								if($(e.currentTarget).val() == v.classroom && objThis._lessonBuilding.val() == v.building && objThis._lessonFloor.val() == v.floor){
										objThis.checkPeople  = v.people;
								}
						})
					}
			},this));
			//清除查詢
			this._cancelFilter.on("click",$.proxy(function(){
				this._filterBuilding.val('請選擇');
				this._filterFloor.empty().append("<option value='請選擇'>請選擇</option>");
				this._filterClass.empty().append("<option value='請選擇'>請選擇</option>");
				this._filterTimeZone.val('請選擇');
			},this));
			//查詢
			this._btnFilter.on("click",$.proxy(function(){

			},this))
		},

		_checkSubmit:function(){  // 確認新增課程欄位判斷
			var returnCheck = true;
			//課程名稱
			if(this._lessonName.val() == "")
			{
				returnCheck = false;
				this._form_name.addClass("has-error");
				layer.msg('<b>請輸入課程名稱</b>', {time: 1500, icon:2,shade:[0.5,'black']});
			}else
			{
				this._form_name.removeClass("has-error");
			}
			//課程時數
			var positiveInteger = /^[0-9]*[1-9][0-9]*$/ ;
			if(isNaN(this._lessonCount.val()) || this._lessonCount.val() < 1 || !positiveInteger.test(this._lessonCount.val()))
			{
				returnCheck = false;
				this._form_count.addClass("has-error");
				layer.msg('<b>請輸入阿拉伯數字(大於1)</b>', {time: 1500, icon:2,shade:[0.5,'black']});
			}else
			{
				this._form_count.removeClass("has-error");
			}
			//使用教室
			if(this._lessonClass.val() == '請選擇' || this._lessonFloor.val() == '請選擇' || this._lessonBuilding.val() == '請選擇')
			{
				returnCheck = false;
				this._form_class.addClass("has-error");
				layer.msg('<b>請選擇使用教室</b>', {time: 1500, icon:2,shade:[0.5,'black']});
			}else
			{
				this._form_class.removeClass("has-error");
			}
			//開始上課時間
			var correctTimeFormat = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/ ;
			if(this._lessonTime.val() == "" || !correctTimeFormat.test(this._lessonTime.val()))
			{
				returnCheck = false;
				this._form_time.addClass("has-error");
				layer.msg('<b>請輸入正確的時間格式</b>', {time: 1500, icon:2,shade:[0.5,'black']});
			}else
			{
				var date = new Date;
				var todayTime = new Date(date.getFullYear(), date.getMonth()+1, date.getDate()).getTime();
				var useDate = this._lessonTime.val().split('/');
				var useTime = new Date(useDate[0], useDate[1], useDate[2]).getTime();
				if (todayTime >= useTime)
				{
					returnCheck = false;
					this._form_time.addClass("has-error");
					layer.msg('<b>請選擇明天以後的上課時間</b>', {time: 1500, icon:2,shade:[0.5,'black']});
				}
				else
				{
					this._form_time.removeClass("has-error");
				}
			}
			//上課時段
			if(this._lessonPeriod.val() == '請選擇')
			{
				returnCheck = false;
				this._form_period.addClass("has-error");
				layer.msg('<b>請選擇上課時段</b>', {time: 1500, icon:2,shade:[0.5,'black']});
			}
			else
			{
				this._form_period.removeClass("has-error");
			}

			//上課人數
			if(this._lessonPeople.val() == "" || this._lessonPeople.val() <1 || !positiveInteger.test(this._lessonPeople.val()))
			{
				returnCheck = false;
				this._form_people.addClass("has-error");
				layer.msg('<b>請輸入正確的上課人數格式</b>', {time: 1500, icon:2,shade:[0.5,'black']});
			}
			else
			{
				if (this._lessonClass.val() == undefined)
				{
					this._form_people.addClass("has-error");
					this._lessonPeople.val("");
					layer.msg('<b>請選擇教室再輸入人數</b>', {time: 1500, icon:2,shade:[0.5,'black']});
				}
				else
				{
					if (this.checkPeople < this._lessonPeople.val())
					{
						returnCheck = false;
						this._form_people.addClass("has-error");
						layer.msg('<b>輸入人數超出教室容量</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					}
					else
					{
						this._form_people.removeClass("has-error");
					}
				}
			}
			return returnCheck;
		},
		_getPositionList:function(){		/* 取得地點資訊 */
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
		_getlessonIDList:function(){	/* 插入課程 */
			var objThis = this;
			$.ajax({
				type: "post",
				url: "/getAllPassLesson",
				dataType: "json",
				success: function(datas){
						if(datas.success == 'yes'){
							objThis._setlessonIDList(datas.howLesson);
						}
				},
				error: function (xhr)
				{
					bootbox.alert('error: ' + xhr);console.log(xhr);
					layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
				}
			});
		},
		_setPositionOption:function(strJson){
      var objThis = this;
			objThis._filterBuilding.empty().append("<option value='請選擇'>請選擇</option>");
			objThis._filterFloor.empty().append("<option value='請選擇'>請選擇</option>");
			objThis._filterClass.empty().append("<option value='請選擇'>請選擇</option>");
      objThis._lessonBuilding.empty().append("<option value='請選擇'>請選擇</option>");
      objThis._lessonFloor.empty().append("<option value='請選擇'>請選擇</option>");
      objThis._lessonClass.empty().append("<option value='請選擇'>請選擇</option>");

      var arrBuilding = new Array();
      var jsonData = '[';
      $.each(strJson,function(i,v){

          arrBuilding.push(v.building);

          jsonData += '{"building":"' + v.building + '",';
          jsonData += '"floor":"' + v.floor + '",';
					jsonData += '"classroom":"' + v.classroom + '",';
          jsonData += '"people":"' + v.people + '"},'


      });
      jsonData = jsonData.substring(0,jsonData.length - 1);
      jsonData += ']'
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
                objThis._lessonBuilding.append(_option);
								objThis._filterBuilding.append(_option);
          }

      }
    },
		_setlessonIDList:function(data){
			var objThis = this;
			var _td;
			var _tr;
			$.each(data,function(i,v){
				switch(i%3){
					case 0:
					css = "danger";
					break;
					case 1:
					css = "active";
					break;
					case 2:
					css = "warning";
					break;
				}

				_tr = $("<tr />",{"class":css});

				//#
				_td = $("<td />",{"text":(i+1)});
				_tr.append(_td);

				//課程名稱
				_td = $("<td />",{"text":v.name});
				_tr.append(_td);
				//使用教室
				_td = $("<td />",{"text":v.lessonClass});
				_tr.append(_td);
				//時間-時段
				_td = $("<td />",{"text":v.time + "-" + v.period});
				_tr.append(_td)

				objThis._lesson.append(_tr);
			})
		}
	}
	return _const;
}());

var lessonNormalManage;
$(function(){
	lessonNormalManage = new lessonNormalManage();
})
