var lessonManage = (function(){
	var _const;
	_const = function(){

		this._lessonNum = 1;
		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			this._new = $("#new");
			// this._new = $(".new");
			this._lesson = $("#lesson");
			this._lessonloadingList = $("#lessonloadingList");
			this._lessonnobodyList = $("#lessonnobodyList");
			this._lessonIDloadingList = $("#lessonIDloadingList");
			this._lessonIDnobodyList = $("#lessonIDnobodyList");
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
			this._detailName = $("#detailName");
			this._detailData = $("#detailData");
			//查詢
			this._btnFilter = $("#btnFilter");
			this._cancelFilter = $("#cancelFilter");
			this._filterTimeZone = $("#filterTimeZone");
			this._filterClass = $("#filterClass");
			this._filterLocal = $("#filterLocal");
			//編輯課程
			this._EditlessonName = $("#EditlessonName");
			this._EditlessonTimes = $("#EditlessonTimes");
			this._EditlessonClass = $("#EditlessonClass");
			this._EditlessonClassTime = $("#EditlessonClassTime");
			this._EditlessonPeriod = $("#EditlessonPeriod");
			this._EditlessonPeople = $("#EditlessonPeople");
			this._EditlessonNote = $("#EditlessonNote");


			//tab
			this._tab1 = $("#tab1");
			this._tab2 = $("#tab2");
			//lessonIDManage
			//新增課程ID
			this._bounce_new = $("#bounce_new");
			this._lessonIDName = $("#lessonIDName");
			this._lessonIDAbbreviation =$("#lessonIDAbbreviation");
			this._lessonIDContractName =$("#lessonIDContractName");
			this._lessonIDContractPhone =$("#lessonIDContractPhone");
			this._btnSubmitID = $("#btnSubmitID");
			this._btnCancelID = $("#btnCancelID");

			this._form_lessonName = $(".form_lessonName");
			this._form_contractName = $(".form_contractName");
			this._form_telephone = $(".form_telephone");
			//編輯課程ID
      this._EditlessonIDName = $("#EditlessonIDName");
      this._EditlessonIDabbreviation = $("#EditlessonIDabbreviation")
      this._EditContractName = $("#EditContractName");
      this._EditContractPhone = $("#EditContractPhone");
      this._btnEditCancel = $("#btnEditCancel");
      this._btnEditSubmit = $("#btnEditSubmit");
			// this._editSelectId = $("#editSelectId")
			this._form_editName = $(".form_editName");
			this._form_editPhone = $(".form_editPhone");
      this.EditlessonID = '';
			this._lessonID = $("#lessonID")

			this._start();
		},
		_start:function(){
			var objThis = this;
			objThis._initialAll();
			this._lessonnobodyList.hide();
			this._lessonloadingList.hide();
			this._lessonIDnobodyList.hide();
			this._lessonIDloadingList.hide();
			this._getAllPassLesson();		//取得課程聯絡列表
		},
		_initialAll:function(){
			//tab1 課程聯絡
			this._tab1.on("click",$.proxy(function(){
				this._getAllPassLesson();		//取得課程聯絡列表
			},this));
			//tab2 課程細節
			this._tab2.on("click",$.proxy(function(){
				this._getlessonIDList();		//取得課程細節列表
			},this));
			//新增課程ID
			this._new.on("click",$.proxy(function(){
				//先清空欄位
				this._lessonIDName.val('');
				this._lessonIDAbbreviation.val('');
				this._lessonIDContractName.val('');
				this._lessonIDContractPhone.val('');
				//新增課程ID 視窗
				this._bounce_new.modal('show');
			},this));
			//提交 新增課程ID
			this._btnSubmitID.on("click",$.proxy(function(){
				var objThis = this;
				var check = true;

				//判斷課程名稱
				if(objThis._lessonIDName.val() != '' ){
						objThis._form_lessonName.removeClass("has-error");
				}else{
						check = false;
						objThis._form_lessonName.addClass("has-error");
						objThis._lessonIDName.focus();
				}
				//判斷聯絡人姓名
				if(objThis._lessonIDContractName.val() != ''){
					objThis._form_contractName.removeClass('has-error');
				}else{
					check = false;
					objThis._form_contractName.addClass('has-error');
					objThis._lessonIDContractName.focus();
				}
				//判斷聯絡人電話
				var frontNum = objThis._lessonIDContractPhone.val().substr(0,2);
				objThis._lessonIDContractPhone.val(objThis._lessonIDContractPhone.val().replace(/[^0-9]/g,''))
				if(frontNum == "09" && objThis._lessonIDContractPhone.val().length >= 9 && objThis._lessonIDContractPhone.val().length <= 10 &&
				objThis._lessonIDContractPhone.val().match(/\d$/))
				{
					objThis._form_telephone.removeClass("has-error");
				}else{
					check = false;
					objThis._form_telephone.addClass("has-error");
					objThis._lessonIDContractPhone.focus();
				}


				if(check){
					objThis._insertLessonID();
				}
			},this));
			//關閉新增課程ID
			this._btnCancelID.on("click",$.proxy(function(){
				this._bounce_new.modal("hide");
			},this));
			//清除查詢
			this._cancelFilter.on("click",$.proxy(function(){
				this._filterTimeZone.val('請選擇');
				this._filterClass.val('請選擇');
				this._filterLocal.val('請選擇');
			},this));
			//查詢
			this._btnFilter.on("click",$.proxy(function(){

			},this))

			//關閉課程明細
			this._btnClose.on("click",$.proxy(function(){
				this._bounce_detail.modal("hide");
			},this));
			//關閉編輯課程聯絡
			this._btnEditCancel.on("click",$.proxy(function(){
				this._bounce_edit.modal("hide");
			},this));
			//提交 編輯課程ID
			this._btnEditSubmit.on("click",$.proxy(function(){
				var objThis = this;
				var check = true;

				//判斷聯絡人姓名
				if(objThis._EditContractName.val() != ''){
					objThis._form_editName.removeClass('has-error');
				}else{
					check = false;
					objThis._form_editName.addClass('has-error');
					objThis._EditContractName.focus();
				}
				//判斷聯絡人電話
				var frontNum = objThis._EditContractPhone.val().substr(0,2);
				objThis._EditContractPhone.val(objThis._EditContractPhone.val().replace(/[^0-9]/g,''))
				if(frontNum == "09" && objThis._EditContractPhone.val().length >= 9 && objThis._EditContractPhone.val().length <= 10 &&
				objThis._EditContractPhone.val().match(/\d$/))
				{
					objThis._form_editPhone.removeClass("has-error");
				}else{
					check = false;
					objThis._form_editPhone.addClass("has-error");
					objThis._EditContractPhone.focus();
				}

				if(check){
					objThis._updateLessonID(this.EditlessonID);
				}

			},this))
			//隨地點自動更新
			this._lessonBuilding.on("change",$.proxy(function(){
				this._lessonClass.attr('disabled','');
				this._lessonClass.empty();
				switch (this._lessonBuilding.val()) {
					case '請選擇':
						this._lessonFloor.attr('disabled','');
						this._lessonFloor.empty();
						this._lessonClass.attr('disabled','');
						this._lessonClass.empty();
						break;
					case '環球':
						this._lessonFloor.removeAttr('disabled');
						this._lessonFloor.empty();
						this._lessonFloor.append("<option value='請選擇'>請選擇</option>");
						this._lessonFloor.append("<option value='環球3f'>3樓</option>");
						this._lessonFloor.append("<option value='環球12f'>12樓</option>");
						break;
					case '里仁':
						this._lessonFloor.removeAttr('disabled');
						this._lessonFloor.empty();
						this._lessonFloor.append("<option value='請選擇'>請選擇</option>");
						this._lessonFloor.append("<option value='里仁2f'>2樓</option>");
						break;
					case '學苑':
						this._lessonFloor.removeAttr('disabled');
						this._lessonFloor.empty();
						this._lessonFloor.append("<option value='請選擇'>請選擇</option>");
						this._lessonFloor.append("<option value='學苑7f'>7樓</option>");
						this._lessonFloor.append("<option value='學苑12f'>12樓</option>");
						this._lessonFloor.append("<option value='學苑13f'>13樓</option>");
						break;
				}
			},this))

			this._lessonFloor.on("change",$.proxy(function(){
				switch (this._lessonFloor.val()) {
					case '請選擇':
						this._lessonClass.attr('disabled','');
						this._lessonClass.empty();
						break;
					case '環球3f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='環球3-1'>3-1 (70人)</option>");
						this._lessonClass.append("<option value='環球3-2'>3-2 (60人)</option>");
						break;
					case '環球12f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='環球12-1'>12-1 (35人)</option>");
						this._lessonClass.append("<option value='環球12-2'>12-2 (35人)</option>");
						this._lessonClass.append("<option value='環球12-3'>12-3 (45人)</option>");
						break;
					case '里仁2f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='里仁2-1'>2-1 (80人)</option>");
						this._lessonClass.append("<option value='里仁2-2'>2-2 (20人會議室)</option>");
						break;
					case '學苑7f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='學苑7-4'>7-4 (40人)</option>");
						this._lessonClass.append("<option value='學苑7-5'>7-5 (40人)</option>");
						this._lessonClass.append("<option value='學苑7-6'>7-6 (45人)</option>");
						break;
					case '學苑12f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='學苑12-1'>12-1 (120人)</option>");
						break;
					case '學苑13f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='學苑13-3'>13-3 (20人)</option>");
						break;
				}
			},this))
		},
		_getlessonIDList:function(){
      var objThis = this;

      $.ajax({
        type:'post',
        url:'/getupdateLessonID',
        success:function(datas){
						// console.log(datas);
            var data = datas.success
						if(data.length > 0){
							objThis._lessonIDloadingList.hide();
							objThis._setlessonIDList(data);
						}else{
							objThis._lessonIDnobodyList.show();
						}
        },
				beforeSend:function(){
					objThis._lessonIDloadingList.show();
				}
      });

    },
    _setlessonIDList:function(strJson){
      var objThis = this;
      var _tr;
      var _td;
      var _input;
      // console.log(strJson)
      objThis._lessonID.empty();
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
          //上傳者
          _td = $("<td />",{"style":"text-align:left","text":v.userName});
          _tr.append(_td);
          //課程名稱
          _td = $("<td />",{"style":"text-align:left","text":v.name});
          _tr.append(_td);
          //課程簡稱
          _td = $("<td />",{"text":v.abbreviation});
          _tr.append(_td);
          //新增時間
          _td = $("<td />",{"nowrap":"nowrap","text":v.createTime});
          _tr.append(_td);
          //修改時間
          _td = $("<td />",{"nowrap":"nowrap","text":v.modifyTime});
          _tr.append(_td);
          //詳細資料
          _input = $("<span />",{"class":"label label-success btn-embossed","text":"編輯","style":"font-size:100%;"});
          _input.bind("click",function(){
              objThis.EditlessonID = v.id;
              objThis._EditlessonIDName.html(v.name)
              objThis._EditlessonIDabbreviation.val(v.abbreviation)
              objThis._EditContractName.val(v.contract);
              objThis._EditContractPhone.val(v.contractPhone);

              objThis._bounce_edit.modal('show');
          })

          _td = $("<td />");
          _td.append(_input)
          _input = $("<span />",{"class":"label label-default btn-embossed","text":"聯絡人資訊","style":"margin-left:10px;font-size:100%;"});
          _input.bind("click",function(){
              bootbox.alert("<b>聯絡人資訊</b>" +
                    "<br/><br/>上傳者：" + v.userName +
                    "<br/><br/>課程名稱：" + v.name +
                    "<br/><br/>課程簡稱：" + v.abbreviation +
                    "<br/><br/>新增時間：" + v.createTime +
                    "<br/><br/>修改時間：" + v.modifyTime+
                    "<br/><br/>聯絡人姓名：" + v.contract+
                    "<br/><br/>聯絡人電話：" + v.contractPhone
              )
          })
          _td.append(_input)

          _tr.append(_td);

          objThis._lessonID.append(_tr)
      });
		},
		_getAllPassLesson:function(){	/* 插入課程 */
			var objThis = this;
			$.ajax({
				type: "post",
				url: "/getAllPassLesson",
				dataType: "json",
				success: function(datas){
						var data = datas.howLesson;
						// console.log(data.length)
						if(data.length > 0){
							objThis._lessonloadingList.hide();
							objThis._setAllPassLesson(data);
						}else{
							objThis._lessonnobodyList.show();
						}
				},
				beforeSend:function(){
						objThis._lessonloadingList.show();
				},complete:function(){
						objThis._getPositionList();
				},
				error: function (xhr)
				{
					bootbox.alert('error: ' + xhr);console.log(xhr);
					layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
				}
			});
		},
		_setAllPassLesson:function(data){
			var objThis = this;
			var _td;
			var _tr;
			objThis._lesson.empty();
			// console.log(data)
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
				//上課人數
				_td = $("<td />",{"text":v.people});
				_tr.append(_td);
				//時間-時段
				_td = $("<td />",{"text":v.time + "-" + v.period});
				_tr.append(_td)
				//聯絡人
				_td = $("<td />",{"text":v.contract});
				_tr.append(_td)
				//聯絡人電話
				_td = $("<td />",{"text":v.contractPhone});
				_tr.append(_td)
				//編輯 刪除
				_td = $("<td />");
				_input = $("<span />",{"class":"label label-success btn-embossed","text":"編輯","style":"font-size:100%;"});
				_input.bind("click",function(){
						// bootbox.alert("編輯" + v.lessonID)
						objThis._EditlessonName.html("<font style='color:blue;'>" + v.name + "</font>  ");
						var arrTimes = v.lessonID.split('-');
						objThis._EditlessonTimes.html("第 <b style='color:red;'>" + arrTimes[2] + "</b> 次上課")
						objThis._EditlessonClass.val('');
						objThis._EditlessonClassTime.val(v.time);
						objThis._EditlessonPeriod.val(v.period);
						objThis._EditlessonPeople.val(v.people);
						objThis._EditlessonNote.val(v.note);


						objThis._bounce_edit.modal("show");
				})
				_td.append(_input);
				_input = $("<span />",{"class":"label label-danger btn-embossed","text":"刪除","style":"margin-left:10px;font-size:100%;"});
				_input.bind("click",function(){
						var arrTimes = v.lessonID.split('-');

							bootbox.prompt({
								title:"<b style='font-size:20px;'>您確定要刪除 <font style='color:red;'>" + v.name + "</font> 課程嗎?</b>" +
								"<br/><br/>第 <font style='color:red;'>" + arrTimes[2] + "</font> 次上課" +
								"<br/><br/>使用教室：" +
								"<br/><br/>上課時間：" + v.time +
								"<br/><br/>上課時段：" + v.period +
								"<br/><br/>上課人數：" + v.people +
								"<br/><br/>備註：" + v.note +
								"<br/><br/><br/><br/><b style='font-size:20px;color:red;'>請輸入密碼</b>",

								inputType:'password',
								buttons:{
									confirm:{
											label:'確定刪除',
											className:'btn-success btn-embossed'
									},
									cancel:{
											label:'取消',
											className:'btn-default btn-embossed'
									}

								},
								callback:function(result){
									if(result != ""){
										console.log(result)
										console.log(v.lessonID)
									}

								}
							})

							setTimeout("$('.bootbox-input').val('')",500)
				})
				_td.append(_input);
				_tr.append(_td);
				objThis._lesson.append(_tr);
			})
		},
		//新增課程ID
		_insertLessonID:function(){
			var objThis = this;


			$.ajax({
				type: "post",
				url: "/lessonManage",
				data:{
					lessonName:objThis._lessonIDName.val() ,
					lessonAbbreviation:objThis._lessonIDAbbreviation.val(),
					contract:objThis._lessonIDContractName.val(),
					contractPhone:objThis._lessonIDContractPhone.val()
				},
				success: function(datas){
					var data = datas.success;
					if(data == "no repeat"){
						objThis._bounce_new.modal('hide');
						objThis._getlessonIDList();
						layer.msg('<b>新增課程ID成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});

					}else{
						layer.msg('<b>課程ID重複</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					}
				},
				error: function (xhr)
				{
					bootbox.alert('error: ' + xhr);console.log(xhr);
					layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
				}
			});

		},
		//更新課程ID
		_updateLessonID:function(id){
			var objThis = this;
			var arr = new Array();
			var obj = new Object;
			obj.id = id;
			obj.abbreviation = objThis._EditlessonIDabbreviation.val();
			obj.contract = objThis._EditContractName.val();
			obj.contractPhone = objThis._EditContractPhone.val();
			arr = arr.concat(obj)
			$.ajax({
				type:'post',
				url:'/updateLessonAbbreviation',
				data:{strJson:JSON.stringify(arr)},
				success:function(datas){
					if(datas.success == 'yes'){
						layer.msg('<b>編輯課程ID成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
						objThis._bounce_edit.modal('hide');
						objThis._getlessonIDList();
					}else{
						layer.msg('<b>編輯課程ID失敗</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					}

				}
			})
		},
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
      objThis._filterLocal.empty().append("<option value='請選擇'>請選擇</option>");

      console.log(strJson)
			$.each(strJson,function(i,v){
				if(v.lock == "no"){
					objThis._filterLocal.append("<option value='" + v.location + "'>" + v.location + "</option>");					
				}
			})
    },
	}
	return _const;
}());

var lessonManage;
$(function(){
	lessonManage = new lessonManage();
	setTimeout('layout._resize_tab();',100)    /* 調整背景 */
})
