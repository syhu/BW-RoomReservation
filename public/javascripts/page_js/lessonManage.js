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
			this._bounce_editlesson = $("#bounce_editlesson");
			this._bounce_edit = $("#bounce_edit");
			// this._bounce_detail = $("#bounce_datail");
			this._btnSubmit = $("#btnSubmit");
			this._btnCancel = $("#btnCancel");
			this._btnClose = $("#btnClose");
			//編輯課程細節 欄位
			this._lessonName = $("#lessonName");
			this._form_class = $(".form_class");
			this._lessonBuilding = $("#lessonBuilding");
			this._lessonFloor = $("#lessonFloor");
			this._lessonClass = $("#lessonClass");
			this._form_time = $(".form_time");
			this._lessonTime = $("#lessonTime");
			this._form_period = $(".form_period")
			this._lessonPeriod = $("#lessonPeriod");
			this._form_lessondetailName = $(".form_lessondetailName")
			this._lessondetailName = $("#lessondetailName");
			this._form_lessondetailPhone = $(".form_lessondetailPhone");
			this._lessondetailPhone = $("#lessondetailPhone");
			this._form_people = $(".form_people");
			this._lessonPeople = $("#lessonPeople");
			this._lessonNote = $("#lessonNote");
			this._btnEditSubmitlesson = $("#btnEditSubmitlesson");
			this._btnEditCancellesson = $("#btnEditCancellesson");
			this._lockTip = $("#lockTip");



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
			this.Editlesson = '';
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

			//hidden
			this._hiddenPositionData = $("#hiddenPositionData");
			this.checkPeople = 0;

			this._start();
		},
		_start:function(){
			var objThis = this;
			objThis._initialAll();
			this._lessonnobodyList.hide();
			this._lessonIDnobodyList.hide();
			// this._getAllPassLesson();		//取得課程聯絡列表
			this._getPositionList();

		},
		_initialAll:function(){
			//大樓change
			this._lessonBuilding.on("change",$.proxy(function(e){
				var objThis = this;
				var check = true;
				objThis._lessonFloor.empty().append("<option value='請選擇'>請選擇</option>")
				objThis._lessonClass.empty().append("<option value='請選擇'>請選擇</option>")
				if($(e.currentTarget).val() != "請選擇"){
						var data = JSON.parse(this._hiddenPositionData.val());
						$.each(data,function(i,v){
								check = true;
								if($(e.currentTarget).val() == v.building){
									$("#filterFloor option").each(function(index,element){
										if($(element).val() == v.floor )  check = false;
									});
									if(check){
										objThis._lessonFloor.append("<option value='" + v.floor + "'>" + v.floor + "</option>");
									}
								}
						})
				}

			},this));
			//樓層change
			this._lessonFloor.on("change",$.proxy(function(e){
				var objThis = this;
				if($(e.currentTarget).val() != "請選擇"){
					objThis._lessonClass.empty().append("<option value='請選擇'>請選擇</option>");
					var data = JSON.parse(this._hiddenPositionData.val());
					$.each(data,function(i,v){
							if($(e.currentTarget).val() == v.floor && objThis._lessonBuilding.val() == v.building){
									objThis._lessonClass.append("<option value='" + v.classroom + "'>" + v.classroom + "(最大容納人數：" + v.people + "人)</option>");
							}
					})
				}
			},this));
			// 教室change 儲存人數
			this._lessonClass.on("change",$.proxy(function(e){
				var objThis = this;
				objThis._lessonPeople.attr("disabled","disabled").val('')

					if($(e.currentTarget).val() != "請選擇"){
						var data = JSON.parse(this._hiddenPositionData.val());
						$.each(data,function(i,v){
								if($(e.currentTarget).val() == v.classroom && objThis._lessonBuilding.val() == v.building && objThis._lessonFloor.val() == v.floor){
										objThis.checkPeople  = parseInt(v.people);
										// console.log(objThis.checkPeople)
								}
						})
						objThis._lessonPeople.removeAttr("disabled")
					}else{
						objThis.checkPeople = 0;
					}
			},this));

			//tab1 課程聯絡
			this._tab1.on("click",$.proxy(function(){
				this._getAllPassLesson();		//取得課程聯絡列表
			},this));
			//tab2 課程細節
			this._tab2.on("click",$.proxy(function(){
				this._getlessonIDList();		//取得課程細節列表
			},this));

			//關閉 編輯課程細節
			this._btnEditCancellesson.on("click",$.proxy(function(e){
				this._bounce_editlesson.modal("hide");
			},this));
			//提交 編輯課程細節
			this._btnEditSubmitlesson.on("click",$.proxy(function(e){
				var objThis = this;
				var check = true;
				var errorText = '';
				//判斷使用教室
				//使用教室
				if(objThis._lessonClass.val() == '請選擇' || objThis._lessonFloor.val() == '請選擇' || objThis._lessonBuilding.val() == '請選擇')
				{
					check = false;
					objThis._form_class.addClass("has-error");
					errorText += '<b>請選擇使用教室</b><br/>';
					if(objThis._lessonPeople.val() == "")		objThis._form_people.addClass("has-error");

				}else
				{
					objThis._form_class.removeClass("has-error");

					//在判斷人數格式
					var positiveInteger = /^[0-9]*[1-9][0-9]*$/ ;
					if(objThis._lessonPeople.val() == "" || objThis._lessonPeople.val() <1 || !positiveInteger.test(objThis._lessonPeople.val()))
					{
						check = false;
						objThis._form_people.addClass("has-error");
						errorText += '<b>請輸入正確的上課人數格式</b><br/>';
					}
					else
					{
						objThis._form_people.removeClass("has-error");
						//在判斷容納人數
						if (objThis.checkPeople < objThis._lessonPeople.val())
						{
							check = false;
							objThis._form_people.addClass("has-error");
							errorText += '<b>輸入人數超出教室容量</b><br/>';
						}
						else
						{
							objThis._form_people.removeClass("has-error");
						}
					}


				}
				//判斷上課時間
				if(objThis._lessonTime.val() != '' ){
						objThis._form_time.removeClass("has-error");
				}else{
						check = false;
						objThis._form_time.addClass("has-error");
						errorText += '<b>請選擇上課時間</b><br/>';
						objThis._lessonTime.focus();
				}
				//判斷上課時段
				if(objThis._lessonPeriod.val() != '請選擇' ){
						objThis._form_period.removeClass("has-error");
				}else{
						check = false;
						objThis._form_period.addClass("has-error");
						errorText += '<b>請選擇上課時段</b><br/>';
						objThis._lessonPeriod.focus();
				}


				if(errorText != ''){
							layer.msg(errorText, {time: 3000, icon:2,shade:[0.5,'black']});
				}else{
					objThis._updateLesson(objThis.Editlesson);
				}


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
						  objThis._form_editName.removeClass('has-error')
							objThis._form_editPhone.removeClass('has-error')

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
              bootbox.alert("<b style='font-size:20px;'>聯絡人資訊</b><hr/>" +
                    "上傳者：" + v.userName +
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
						// console.log(data)
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
						// objThis._getPositionList();
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
				_td = $("<td />",{"text":v.building + " " +  v.lessonClass});
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
				//編輯 刪除 詳細資料
				_td = $("<td />");
				_input = $("<span />",{"class":"label label-success btn-embossed","text":"編輯","style":"font-size:100%;"});
				_input.bind("click",function(){
						objThis.Editlesson = v.lessonID;

						//移除error
						objThis._form_class.removeClass('has-error');
						objThis._form_time.removeClass('has-error');
						objThis._form_period.removeClass('has-error');
						objThis._form_lessondetailName.removeClass('has-error');
						objThis._form_lessondetailPhone.removeClass('has-error');
						objThis._form_people.removeClass('has-error');
						//
						var data = JSON.parse(objThis._hiddenPositionData.val());
						console.log(data )

						var check = false;
						$.each(data,function(n,m){
								if(m.building == v.building && m.floor == v.floor && m.classroom == v.lessonClass)	{
									check = true;
								}
						})
						//
						if(!check)	{
							objThis._lockTip.html("<br/><b style='font-size:8px;'>(<span style='color:red;'>*</span>此教室已上鎖，請更換教室)</b>");
							objThis._lessonBuilding.val('請選擇');
							objThis._lessonFloor.empty();
							objThis._lessonClass.empty();
							objThis._lessonPeople.val('')
						}
						else {
							objThis._lockTip.html('');
							objThis._lessonBuilding.val(v.building);
							objThis._lessonFloor.empty().append("<option value='" + v.floor + "'>" + v.floor + "</option>").val(v.floor);
							objThis._lessonClass.empty().append("<option value='" + v.lessonClass + "'>" + v.lessonClass + "</option>").val(v.lessonClass)
							objThis._lessonPeople.val(v.people)
						}

						objThis._lessonName.html(v.name);
						// objThis._lessonBuilding.empty().append("<option value='" + v.building + "'>" + v.building + "</option>").val(v.building);
						objThis._lessonTime.val(v.time);
						objThis._lessonPeriod.val(v.period);
						objThis._lessondetailName.val(v.contract)
						objThis._lessondetailPhone.val(v.contractPhone)
						objThis._lessonNote.val(v.note);
						//人數
						var data = JSON.parse(objThis._hiddenPositionData.val());
						$.each(data,function(a,b){
								if(objThis._lessonClass.val() == b.classroom && objThis._lessonBuilding.val() == b.building && objThis._lessonFloor.val() == b.floor){
										objThis.checkPeople  = parseInt(b.people);
										console.log(objThis.checkPeople)
								}
						})

						objThis._bounce_editlesson.modal("show");

				})
				_td.append(_input);
				//刪除
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
				//課程詳細
				_input = $("<span />",{"class":"label label-default btn-embossed","text":"課程細節","style":"margin-left:10px;font-size:100%;"});
				_input.bind("click",function(){
					bootbox.alert("<b style='font-size:20px;'>課程細節</b><hr/>" +
								"課程名稱：" + v.name +
								"<br/><br/>使用教室：" + v.building + " " +  v.lessonClass +
								"<br/><br/>上課人數：" + v.people +
								"<br/><br/>時間 - 時段：" + v.time + "-" + v.period +
								"<br/><br/>聯絡人姓名：" + v.contract +
								"<br/><br/>聯絡人電話：" + v.contractPhone +
								"<br/><br/>使用目標：" + v.aim	+
								"<br/><br/>備註：" + v.note
					)
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

					}else if(data == "repeat"){
						layer.msg('<b>課程名稱重複</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					}else if(data == "abbrRepeat"){
						layer.msg('<b>課程縮寫重複</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					}
				},
				error: function (xhr)
				{
					bootbox.alert('error: ' + xhr);console.log(xhr);
					layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
				}
			});

		},
		//更新課程
		_updateLesson:function(id){
			var objThis = this;
			var arr = new Array();
			var obj = new Object;
			obj.id = id;
			obj.building = objThis._lessonBuilding.val();
			obj.floor = objThis._lessonFloor.val();
			obj.lessonClass = objThis._lessonClass.val();
			obj.time = objThis._lessonTime.val();
			obj.period = objThis._lessonPeriod.val();
			obj.people = objThis._lessonPeople.val();
			obj.note = objThis._lessonNote.val();

			arr = arr.concat(obj)
			$.ajax({
				type:'post',
				url:'/',
				data:{strJson:JSON.stringify(arr)},
				success:function(datas){
					console.log(datas)
					if(datas.success == 'yes'){
						layer.msg('<b>編輯課程聯絡資料成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
						objThis._bounce_edit.modal('hide');
						objThis._getlessonIDList();
					}else if(datas == 'no'){
						layer.msg('<b>已有相同的課程名稱及聯絡人</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					}else {
						layer.msg('<b>已有相同的課程縮寫</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					}
				}
			})
		},
		//更新課程ID
		_updateLessonID:function(id){
			var objThis = this;
			var arr = new Array();
			var obj = new Object;

			obj.id = id;
			obj.name = objThis._EditlessonIDName.html();
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
						layer.msg('<b>編輯課程聯絡資料成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
						objThis._bounce_edit.modal('hide');
						objThis._getlessonIDList();
					}else if(datas == 'no'){
						layer.msg('<b>已有相同的課程名稱及聯絡人</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					}else {
						layer.msg('<b>已有相同的課程縮寫</b>', {time: 1500, icon:2,shade:[0.5,'black']});
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
        },
				complete:function(){
					objThis._getAllPassLesson();
				}
      });

    },
		_setPositionOption:function(strJson){
      var objThis = this;
      objThis._filterLocal.empty().append("<option value='請選擇'>請選擇</option>");
			objThis._lessonBuilding.empty().append("<option value='請選擇'>請選擇</option>");
			objThis._lessonFloor.empty().append("<option value='請選擇'>請選擇</option>");
			objThis._lessonClass.empty().append("<option value='請選擇'>請選擇</option>");
      // console.log(strJson)
			var arrBuilding = new Array();
      var arrFloor = new Array();
      var arrClass = new Array();
      var jsonData = '[';
			$.each(strJson,function(i,v){
				if(v.lock == "no"){
					objThis._filterLocal.append("<option value='" + v.location + "'>" + v.location + "</option>");
					arrBuilding.push(v.building);
					jsonData += '{"building":"' + v.building + '",';
					jsonData += '"floor":"' + v.floor + '",';
					jsonData += '"classroom":"' + v.classroom + '",';
					jsonData += '"people":"' + v.people + '"},'
				}
			})
			jsonData = jsonData.substring(0,jsonData.length - 1);
      jsonData += ']';
			objThis._hiddenPositionData.val(jsonData);
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
                // _option = $("<option />",{"text":arrBuilding[k],"value":arrBuilding[k]});
								// objThis._lessonBuilding.append(_option);
                objThis._lessonBuilding.append("<option value='" + arrBuilding[k] + "'>" + arrBuilding[k] + "</option>");
          }

      }
    },
	}
	return _const;
}());

var lessonManage;
$(function(){
	lessonManage = new lessonManage();
	setTimeout('layout._resize_tab();',100)    /* 調整背景 */
})
