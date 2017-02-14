var lessonManage = (function(){
	var _const;
	_const = function(){

		this._lessonNum = 1;
		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			this._new = $("#new");
			this._lesson = $("#lesson");
			this._bounce_lesson = $("#bounce_lesson");
			this._bounce_edit = $("#bounce_edit");
			this._btnSubmit = $("#btnSubmit");
			this._btnCancel = $("#btnCancel");
			//課程新增欄位
			this._lessonName = $("#lessonName");
			this._lessonCount = $("#lessonCount");
			this._lessonBuilding = $("#lessonBuilding");
			this._lessonFloor = $("#lessonFloor");
			this._lessonClass = $("#lessonClass");
			this._lessonWeek = $("#lessonWeek");
			this._lessonPeriod = $("#lessonPeriod");
			this._lessonPeople = $("#lessonPeople");
			this._lessonNote = $("#lessonNote");
			//form
			this._form_name = $(".form_name");
			this._form_count = $(".form_count");
			this._form_class = $(".form_class");
			this._form_week = $(".form_week");
			this._form_period = $(".form_period");
			this._form_people = $(".form_people");
			this._form_note = $(".form_note");
			this._form = $(".form");
			//detail
			this._lessonDetail = $("#lessonDetail");
			this._detailName = $("#detailName");
			this._detailData = $("#detailData");
			//select
			this._selectLocal = $("#selectLocal");
			this._selectClass = $("#selectClass");


			this._start();
		},
		_start:function(){
			var objThis = this;
			objThis._initialAll();


		},
		_initialAll:function(){

			//新增課程
			this._new.on("click",$.proxy(function(){
				this._lessonName.val("");
				this._lessonClass.val("請選擇");
				this._lessonWeek.val("請選擇");
				this._lessonPeriod.val("請選擇");
				this._lessonPeople.val("");
				this._lessonNote.val("");
				this._form.removeClass("has-error");
				//新增課程 視窗
				this._bounce_lesson.modal('show');
			},this));
			//確認新增課程
			this._btnSubmit.on("click",$.proxy(function(){
				if(this._checkSubmit())
				{
					/*
						$.ajax({
						type:"post",
						url:
					})*/
					this._insertClass();	/* 插入課程 */

					this._bounce_lesson.modal("hide");
				}

			},this));
			this._lessonBuilding.on("change",$.proxy(function(){
				switch (this._lessonBuilding.val()) {
					case 'tl4su3a8':
						this._lessonFloor.attr('disabled','');
						this._lessonFloor.empty();
						this._lessonClass.attr('disabled','');
						this._lessonClass.empty();
						break;
					case 'global':
						this._lessonFloor.removeAttr('disabled');
						this._lessonFloor.empty();
						this._lessonFloor.append("<option value='e04'>請選擇</option>");
						this._lessonFloor.append("<option value='global3f'>3樓</option>");
						this._lessonFloor.append("<option value='global12f'>12樓</option>");
						break;
					case 'liren':
						this._lessonFloor.removeAttr('disabled');
						this._lessonFloor.empty();
						this._lessonFloor.append("<option value='e04'>請選擇</option>");
						this._lessonFloor.append("<option value='liren2f'>2樓</option>");
						break;
					case 'location':
						this._lessonFloor.removeAttr('disabled');
						this._lessonFloor.empty();
						this._lessonFloor.append("<option value='e04'>請選擇</option>");
						this._lessonFloor.append("<option value='location7f'>7樓</option>");
						this._lessonFloor.append("<option value='location12f'>12樓</option>");
						this._lessonFloor.append("<option value='location13f'>13樓</option>");
						break;
				}
			},this))

			this._lessonFloor.on("change",$.proxy(function(){
				switch (this._lessonFloor.val()) {
					case 'e04':
						this._lessonClass.attr('disabled','');
						this._lessonClass.empty();
						break;
					case 'global3f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='3-1'>3-1 (70人)</option>");
						this._lessonClass.append("<option value='3-2'>3-2 (60人)</option>");
						break;
					case 'global12f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='12-1'>12-1 (35人)</option>");
						this._lessonClass.append("<option value='12-2'>12-2 (35人)</option>");
						this._lessonClass.append("<option value='12-3'>12-3 (45人)</option>");
						break;
					case 'liren2f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='2-1'>2-1 (80人)</option>");
						this._lessonClass.append("<option value='2-2'>2-2 (20人會議室)</option>");
						break;
					case 'location7f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='7-4'>7-4 (40人)</option>");
						this._lessonClass.append("<option value='7-5'>7-5 (40人)</option>");
						this._lessonClass.append("<option value='7-6'>7-6 (45人)</option>");
						break;
					case 'location12f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='12-1'>12-1 (120人)</option>");
						break;
					case 'location13f':
						this._lessonClass.removeAttr('disabled');
						this._lessonClass.empty();
						this._lessonClass.append("<option value='13-3'>13-3 (20人)</option>");
						break;
				}
			},this))
		},

		_checkSubmit:function(){  // 確認新增課程欄位判斷
			var returnCheck = true;
			//課程名稱
			if(this._lessonName.val() == "")
			{
				returnCheck = false;
				this._form_name.addClass("has-error");
			}else
			{
				this._form_name.removeClass("has-error");
			}
			//課程時數
			if(this._lessonCount.val() == "請選擇")
			{
				returnCheck = false;
				this._form_count.addClass("has-error");
			}else
			{
				this._form_count.removeClass("has-error");
			}
			//使用教室
			if(this._lessonClass.val() == "請選擇")
			{
				returnCheck = false;
				this._form_class.addClass("has-error");
			}else
			{
				this._form_class.removeClass("has-error");
			}
			//上課時段 星期
			if(this._lessonWeek.val() == "請選擇")
			{
				returnCheck = false;
				this._form_week.addClass("has-error");
			}else
			{
				this._form_week.removeClass("has-error");
			}
			//上課時段 時段
			if(this._lessonPeriod.val() == "請選擇")
			{
				returnCheck = false;
				this._form_period.addClass("has-error");
			}else
			{
				this._form_period.removeClass("has-error");
			}
			//上課人數
			if(this._lessonPeople.val() == "")
			{
				returnCheck = false;
				this._form_people.addClass("has-error");
			}else
			{
				this._form_people.removeClass("has-error");
			}
			//備註
			if(this._lessonNote.val() == "")
			{
				returnCheck = false;
				this._form_note.addClass("has-error");
			}else
			{
				this._form_note.removeClass("has-error");
			}
			return returnCheck;
		},
		_insertClass:function(){	/* 插入課程 */
			this._lessonNum++ ;
			var _td;
			var _tr;

			switch(this._lessonNum%3){
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
			_tr = $("<tr />");
			_tr.attr("class",css);
			//#
			_td = $("<td />");

			_td.append($("#lesson tr").size() + 1);
			_tr.append(_td);

			//課程名稱
			_td = $("<td />");
			_td.attr("style","text-align:left;border-left:1px #ddd solid");
			_td.append(this._lessonName.val());
			_tr.append(_td);
			//時間
			_td = $("<td />");
			_td.attr("style","text-align:center;border-left:1px #ddd solid");
			var today = new Date();
			_td.append(today.getFullYear()+ "-" + (today.getMonth()+1) + "-" + today.getDate());
			_tr.append(_td);
			//編輯 刪除
			_td = $("<td />");
			_td.attr("style","text-align:center;border-left:1px #ddd solid");
			_td.append("<ul><li class='dropdown'><a class='dropdown-toggle' data-toggle='dropdown'><i class='fa fa-bars'></i></a><ul class='dropdown-menu' ><li><a href='#' id='edit" + ($("#lesson tr").size() + 1) + "' style='font-size:15px;' class='dropdown-toggle' data-toggle='dropdown'>編輯</a></li><li><a href='#' id='delete" + ($("#lesson tr").size() + 1) + "' style='font-size:15px;' class='dropdown-toggle' data-toggle='dropdown'>刪除</a></li></ul></li></ul>");
			_tr.append(_td);
			//詳細資料
			//_td = $("<td />");
			//_td.append("<span style='font-size:18px;cursor:pointer;' id='lesson" + ($("#lesson tr").size() + 1) + "' class='label label-default'><i class='fa fa-info-circle'></i> 詳細資料</span>");
			//_tr.append(_td);
			//狀態
			//_td = $("<td />");
			//_td.append("<td><label class='label label-danger statusLabel'>審核失敗</label></td>");
			//label label-success statusLabel 已審核
			//label label-danger statusLabel  審核失敗
			//label label-default statusLabel  未審核
			//_tr.append(_td);

			this._lesson.append(_tr);
			//綁定 編輯
			$("#edit" + ($("#lesson tr").size())).bind("click",$.proxy(function(event){
			/*
				this._detailName.empty();
				this._detailData.empty();
				this._detailName.append(this._lessonName.val())
				_tr = $("<tr />");
				//#
				_td = $("<td />");
				_td.append($("#lesson tr").size())
				_tr.append(_td);
				//課程名稱
				_td = $("<td />");
				_td.append(this._lessonName.val())
				_tr.append(_td);
				//課程時數
				_td = $("<td />");
				_td.append(this._lessonHour.val())
				_tr.append(_td);
				//使用教室
				_td = $("<td />");
				_td.append(this._lessonClass.val())
				_tr.append(_td);
				//上課時段
				_td = $("<td />");
				_td.append(this._lessonWeek.val() + " | " + this._lessonPeriod.val())
				_tr.append(_td);
				//備註
				_td = $("<td />");
				_td.append(this._lessonNote.val())
				_tr.append(_td);

				this._detailData.append(_tr);

				this._lessonDetail.modal("show");*/
				this._bounce_edit.modal("show");
			},this))
			//綁定 刪除
			$("#delete" + ($("#lesson tr").size())).bind("click",$.proxy(function(event){
					alert("您確定要刪除嗎?")
			},this))
		}




	}
	return _const;
}());

var lessonManage;
$(function(){
	lessonManage = new lessonManage();
})
