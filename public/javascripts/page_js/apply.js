var apply = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){
      //this._new = $("#new");
      this._new = $(".new");
      this._todayTime = $("#todayTime");
      this._btnSubmit = $("#btnSubmit");
      this._btnCancel = $("#btnCancel");
      //課程新增欄位
      this._lessonName = $("#lessonName");
      this._lessonBuilding = $("#lessonBuilding");
      this._lessonFloor = $("#lessonFloor");
      this._lessonClass = $("#lessonClass");
      this._lessonTime = $("#lessonTime");
      this._lessonPeriod = $("#lessonPeriod");
      this._lessonPeople = $("#lessonPeople");
      this._lessonNote = $("#lessonNote");
      this._lessonForm = $("#lessonForm");
      //form
      this._form_name = $(".form_name");
      this._form_class = $(".form_class");
      this._form_time = $(".form_time");
      this._form_period = $(".form_period");
      this._form_people = $(".form_people");
      this._form_note = $(".form_note");
      this._form = $(".form");
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
      //初始化彈跳視窗位置
      // this._bounce_new.css('position','absolute');
      // this._bounce_new.css('top', '20%');

      //顯示當天時間
      var now = new Date();
			this._todayTime.append(
            now.getFullYear() + '/' + (now.getMonth()+1) + '/'
          + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":"
          + now.getSeconds());

      //確認新增課程
			this._btnSubmit.on("click",$.proxy(function(){
        var objThis = this;


      	if(objThis._checkSubmit())
				{
          bootbox.confirm({
            message:"<br/><b style='font-size:20px;'>確定申請 <font style='color:red;'>" + objThis._lessonName.val() + "</font> 課程嗎?</b><br/>" +
            "<br/><br/><b>地點：</b>" + objThis._lessonClass.val() +
            "<br/><br/><b>時間：</b>" + objThis._lessonTime.val() +
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

                  bootbox.alert("申請了課程 " + objThis._lessonName.val(),function(){
                    var lessonData =
                    {
                      lessonName : objThis._lessonName.val(),
                      lessonBuilding : objThis._lessonBuilding.val(),
                      lessonFloor : objThis._lessonFloor.val(),
                      lessonClass : objThis._lessonClass.val(),
                      lessonTime : objThis._lessonTime.val(),
                      lessonPeriod : objThis._lessonPeriod.val(),
                      lessonPeople : objThis._lessonPeople.val(),
                      lessonAim : objThis._lessonNote.val()
                    };


                    $.ajax({
                      type: "post",
                      url: "/apply",
                      data: lessonData ,
                      dataType: "json",
                      success: function(message){
                        if(message.success == 'yes')
                        {
                          layer.msg('<b>新增課程成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                          objThis._getApplyList();
                        }
                      },
                      error: function (xhr)
                      {
                        bootbox.alert('error: ' + xhr);console.log(xhr);
                        layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
                      }
                    })

					$.ajax({
						type: "post",
						url: "/apply",
						data: lessonData ,
						dataType: "json",
						success: function(message){
							if(message.success == 'yes')
							{
								layer.msg('<b>新增課程成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                setTimeout("location.href = '/lesson'",1500);
							}
              else(message.success == 'no')
              {
                layer.msg('<b>申請失敗，原因：時間衝突</b>', {time: 1500, icon:2,shade:[0.5,'black']});
              }
						},
						error: function (xhr)
						{
							alert('error: ' + xhr);console.log(xhr);
							layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
						}
					})
                    // this._insertClass();	/* 插入課程 */
                    objThis._bounce_new.modal("hide");

                  });


                }else{
                  bootbox.alert("取消了申請課程");
                }
            }
          });
				}
			},this));

      //取消新增課程
      this._btnCancel.on('click', $.proxy(function()
      {
        this._bounce_new.modal('hide');
      }, this))

      //新英的彈跳視窗 隨地點自動更新
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
      //申請事由
      if(this._lessonNote.val() == "")
      {
        returnCheck = false;
        this._form_note.addClass("has-error");
        layer.msg('<b>請輸入申請事由</b>', {time: 1500, icon:2,shade:[0.5,'black']});
      }else
      {
        this._form_note.removeClass("has-error");
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
      var positiveInteger = /^[0-9]*[1-9][0-9]*$/ ;
			if(this._lessonPeople.val() == "" || this._lessonPeople.val() <1 || !positiveInteger.test(this._lessonPeople.val()))
			{
				returnCheck = false;
				this._form_people.addClass("has-error");
				layer.msg('<b>請輸入正確的上課人數格式</b>', {time: 1500, icon:2,shade:[0.5,'black']});
			}
      else if (this._lessonClass.val() == undefined)
      {
        this._form_people.addClass("has-error");
        this._lessonPeople.val("");
				layer.msg('<b>請選擇教室再輸入人數</b>', {time: 1500, icon:2,shade:[0.5,'black']});
      }
      else
			{
				var checkPeopleNum = 1;
				var peopleNum = this._lessonPeople.val();
				var useClass = this._lessonClass.val();
				switch (useClass)
				{
					case '環球3-1':
						if (peopleNum <= 70) {checkPeopleNum = 0;}
						break;
					case '環球3-2':
						if (peopleNum <= 60) {checkPeopleNum = 0;}
						break;
					case '環球12-1':
						if (peopleNum <= 35) {checkPeopleNum = 0;}
						break;
					case '環球12-2':
						if (peopleNum <= 35) {checkPeopleNum = 0;}
						break;
					case '環球12-3':
						if (peopleNum <= 45) {checkPeopleNum = 0;}
						break;
					case '里仁2-1':
						if (peopleNum <= 80) {checkPeopleNum = 0;}
						break;
					case '里仁2-2':
						if (peopleNum <= 20) {checkPeopleNum = 0;}
						break;
					case '學苑7-4':
						if (peopleNum <= 40) {checkPeopleNum = 0;}
						break;
					case '學苑7-5':
						if (peopleNum <= 40) {checkPeopleNum = 0;}
						break;
					case '學苑7-6':
						if (peopleNum <= 45) {checkPeopleNum = 0;}
						break;
					case '學苑12-1':
						if (peopleNum <= 120) {checkPeopleNum = 0;}
						break;
					case '學苑13-3':
						if (peopleNum <= 20) {checkPeopleNum = 0;}
						break;
				}
				if (checkPeopleNum == 1)
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
			return returnCheck;
		},
    _getApplyList:function(){


        $.ajax({
            type:'get',
            url:'/apply',

            success:function(datas){
                console.log(datas);
            },
            befordSend:function(){

            }
        })
    }
  }
  return _const;
}());

var apply;
$(function(){
  apply = new apply();
})
