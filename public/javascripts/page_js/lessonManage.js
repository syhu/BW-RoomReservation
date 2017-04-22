var lessonManage = (function(){
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
			// this._todayTime = $("#todayTime");
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

			this._btnEditCancel = $("#btnEditCancel");
			this._btnEditSubmit = $("#btnEditSubmit");

			this._start();
		},
		_start:function(){
			var objThis = this;
			objThis._initialAll();

			objThis._getlessonIDList();
		},
		_initialAll:function(){

			//新增課程
			this._new.on("click",$.proxy(function(){
				this._lessonName.val("");
				this._lessonCount.val("");
				this._lessonTime.val("");
				this._lessonBuilding.val("請選擇");
				this._lessonPeriod.val("請選擇");
				this._lessonFloor.attr('disabled','');
				this._lessonFloor.empty();
				this._lessonClass.attr('disabled','');
				this._lessonClass.empty();
				this._lessonPeople.val("");
				this._lessonNote.val("");
				this._form.removeClass("has-error");
				//新增課程 視窗
				this._bounce_lesson.modal('show');
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

			this._btnEditCancel.on("click",$.proxy(function(){
				this._bounce_edit.modal("hide");
			},this));

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
		_getlessonIDList:function(){	/* 插入課程 */
			var objThis = this;
			$.ajax({
				type: "post",
				url: "/getAllPassLesson",
				dataType: "json",
				success: function(datas){
						console.log(datas)
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
		_setlessonIDList:function(data){
			var objThis = this;
			var _td;
			var _tr;
			console.log(data)
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
				_input = $("<span />",{"class":"label label-success","text":"編輯","style":"font-size:100%;"});
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
				_input = $("<span />",{"class":"label label-danger","text":"刪除","style":"margin-left:10px;font-size:100%;"});
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
											className:'btn-success'
									},
									cancel:{
											label:'取消',
											className:'btn-default'
									}

								},
								callback:function(result){
										console.log(result)
										console.log(v.lessonID)
								}
							})

							setTimeout("$('.bootbox-input').val('')",500)
				})
				_td.append(_input);
				_tr.append(_td);
				objThis._lesson.append(_tr);
			})
		}
	}
	return _const;
}());

var lessonManage;
$(function(){
	lessonManage = new lessonManage();
})
