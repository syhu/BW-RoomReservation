var registered = (function(){
	var _const;
	_const = function(){

		this._agree = "";	//註冊同意
		this._checked_button = "";	//判斷性別radio
		this._check_psd = "";	//確認密碼
		//驗證
		this._checkAccount = false;
		this._mouseoverNum = 0;
		this._correctNum = "";
		this._checkNum = new Array();
		this._nowAccount == "";
		for(i=0;i<4;i++){
			this._checkNum[i] = 0;
		}
		//最後驗證
		this._checkField = new Array();
		for(i=0;i<11;i++){
			this._checkField[i] = 0;
		}
		this._checkField[4] = 1;
		//驗證身分
		this._identity = this._getPara("identity");


		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			this._index = $("#index");
			this._bounce_registered = $("#bounce_registered");
			this._close = $("#close");
			this._check_registered = $('.check_registered');
			this._next = $("#next");
			//欄位標籤
			this._name = $("#name");
			this._account = $("#account");
			this._password = $("#password");
			this._email = $("#email");
			this._telephone = $("#telephone");
			this._gender = $(".gender");
			this._identity = $("#identity");
			this._birthday1 = $("#birthday1");
			this._birthday2 = $("#birthday2");
			this._birthday3 = $("#birthday3");
			this._address = $("#address");
			//form error
			this._form_name = $(".form_name");
			this._form_account = $(".form_account");
			this._form_password = $(".form_password");
			this._form_email = $(".form_email");
			this._form_telephone = $(".form_telephone");
			this._form_sex = $(".form_sex");
			this._form_identity = $(".form_identity");
			this._form_birthday = $(".form_birthday");
			this._form_address = $(".form_address");
			this._verification = $("#verification");
			this._form_check = $(".form_check");
			//
			this._selectPhone = $("#selectPhone");
			this._promptText = $("#promptText");
			this._psdReset = $(".psdReset");	//密碼重新輸入
			this._chk = $("#chk");
			this._modal_body = $("#modal_body");	//載入圈叉
			this._btnSubmit = $("#btnSubmit");
			this._searchAccount = $("#searchAccount"); //搜尋帳號重複
			//驗證
			this._reload = $(".reload");
			this._check_img = $(".check_img");
			this._registerCheck = $("#registerCheck"); 	//驗證欄位

			this._start();	//開始網頁執行function
		},
		_start:function(){
			var objThis = this;
			this._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素
			//this._resetForm();
			//objThis._delCookie(objThis._account.val())
			setTimeout("$('#account').val('')",500);
			setTimeout("$('#password').val('')",500);

		},
		_initialAll:function(){
			var objThis = this;

			//驗證
			objThis._getRandom();
			//查詢帳號是否重複
			this._searchAccount.on("click", $.proxy(function(){
				$.ajax({
					type: "post",
					url: "/searchAccount",
					data: {account: this._account.val()},
					dataType: "json",
					success: function(message){
						if(message.success == "no")
						{
							objThis._form_account.removeClass("has-error");
							objThis._form_account.addClass("has-success");
							layer.msg('<b>此帳號無人使用</b>', {time: 1500, icon:1,shade:[0.5,'black']});
							objThis._checkField[1] = 1;
						}
						else if(message.success == "yes")
						{
							objThis._form_account.removeClass("has-success");
							objThis._form_account.addClass("has-error");
							layer.msg('<b>此帳號已被使用</b>', {time: 1500, icon:2,shade:[0.5,'black']});
							objThis._checkField[1] = 0;
						}
					},
					error: function (xhr) {alert('error: ' + xhr);console.log(xhr);}
				})
				this._nowAccount = this._account.val();
			}, this))

			$("input").iCheck({
				checkboxClass:"icheckbox_flat-blue",
				radioClass:"iradio_flat-blue"
			});
			//bitthday
			//年


			var date = new Date();
			var day = "";
			for(var i=2017 ; i >= 1912 ; i--){
				objThis._birthday1.append("<option value='" + i + "'>" + i + "</option>")
			}
			//月
			for(var i=1;i<=12;i++){
				if(i<10){
						objThis._birthday2.append("<option value='0" + i + "'>0" + i + "</option>")
				}else{
						objThis._birthday2.append("<option value='" + i + "'>" + i + "</option>")
				}
			}
			//日
			for(var i=1;i<=31;i++){
				if(i<10){
						objThis._birthday3.append("<option value='0" + i + "'>0" + i + "</option>");
				}else{
						objThis._birthday3.append("<option value='" + i + "'>" + i + "</option>");
				}
			}

			//姓名 blur
			objThis._name.on("blur",$.proxy(function(event){
				objThis._name.val(objThis._name.val().replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,''))
				//判斷姓名長度是否大於1，小於30  不能輸入特殊字元
				if(objThis._name.val().length >= 2 && objThis._name.val().length <= 30 &&
				!objThis._getSpeStr(objThis._name.val()))
				{
					objThis._form_name.removeClass("has-error");
					objThis._form_name.addClass("has-success");
					objThis._checkField[0] = 1;
				}
				else if(objThis._name.val() == ""){
					objThis._form_name.removeClass("has-error");
					objThis._form_name.removeClass("has-success");
					objThis._checkField[0] = 0;
				}
				else{
					objThis._form_name.addClass("has-error");
					objThis._form_name.removeClass("has-success");
					objThis._checkField[0] = 0;
					layer.tips('請查看小提示', objThis._name ,{tips:2});
				}
			},this));
			//姓名 keyup
			// objThis._name.on("keypress",$.proxy(function(event){
			// 	objThis._name.val(objThis._name.val().replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,''))
			// },this))
			//姓名 focue
			objThis._name.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:姓名請輸入兩個字以上，三十個字以下，只能輸入中文、英文、數字。");
			},this));
			//姓名 限制長度輸入
			objThis._name.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length>30){
					o.val(v.slice(0,30));
					evt.preventDefault();
				}
			});
			//帳號 blur
			objThis._account.on("blur",$.proxy(function(event){
				objThis._account.val(objThis._account.val().replace(/[^\a-\z\A-\Z0-9]/g,''))
				//判斷帳號長度是否大於6，小於20  密碼包含英文字母(不分大小寫) 特殊字元只能支援底線
				if(objThis._account.val().length >= 6 && objThis._account.val().length <= 20
				&& objThis._account.val().match(/[a-z]/i) &&
				!objThis._getSpeStr2(objThis._account.val()))
				{
					if (this._nowAccount != this._account.val())
					{
						//檢查帳號是否重複
						layer.tips('需檢查帳號是否重複', objThis._searchAccount ,{tips:1});
						objThis._form_account.addClass("has-error");
						objThis._form_account.removeClass("has-success");
						objThis._checkAccount = false;
						objThis._checkField[1] = 0;
					}
				}
				else if(objThis._account.val() == ""){
					objThis._form_account.removeClass("has-error");
					objThis._form_account.removeClass("has-success");
					objThis._checkField[1] = 0;
					objThis._checkAccount = false;
				}
				else{
					objThis._form_account.addClass("has-error");
					objThis._form_account.removeClass("has-success");
					objThis._checkField[1] = 0;
					objThis._checkAccount = false;
					layer.tips('請查看小提示', objThis._account ,{tips:2});
				}
			},this));

			//帳號 focus
			objThis._account.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:帳號請輸入六個字以上，二十個字以下");
			},this));
			//帳號 限制長度輸入
			objThis._account.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length>20){
					o.val(v.slice(0,20));
					evt.preventDefault();
				}
			});
			//密碼 blur
			objThis._password.on("blur",$.proxy(function(event){
				objThis._password.val(objThis._password.val().replace(/[^\a-\z\A-\Z0-9]/g,''))
				//判斷密碼長度是否大於8，小於100  密碼包含數字  密碼包含英文字母(不分大小寫) 接受所有特殊字元
				if(objThis._password.val().length >= 8 && objThis._password.val().length <= 100 &&
				objThis._password.val().match(/\d/) && objThis._password.val().match(/[a-z]/i) )
				{
					objThis._form_password.removeClass("has-error");
					layer.prompt({
						closeBtn:0,
						formType:1,
						value:"",
						title:"確認密碼",
						btn:["確定","取消"]
						,btn2:function(value,index,elem){
							//objThis._psd.focus();
							//layer.msg('確認密碼錯誤');
							objThis._check_psd = "";
							objThis._form_password.removeClass("has-success");
							objThis._form_password.addClass("has-error");
							objThis._checkField[2] = 0;
						}
						},function(value,index,elem){
						if(objThis._password.val() != value) {
							//objThis._psd.focus();
							layer.msg('確認密碼錯誤');
							objThis._form_password.removeClass("has-success");
							objThis._form_password.addClass("has-error");
							objThis._check_psd = "";
							objThis._checkField[2] = 0;
						}
						else{
							layer.msg('確認密碼正確');
							objThis._check_psd = "true";
							objThis._form_password.addClass("has-success");
							objThis._password.attr("disabled","true")
							objThis._checkField[2] = 1;
						}

						layer.close(index)
					})
				}
				else if(objThis._password.val() == ""){
					objThis._form_password.removeClass("has-error");
					objThis._form_password.removeClass("has-success");
					objThis._checkField[2] = 0;
				}
				else{
					objThis._form_password.addClass("has-error");
					objThis._form_password.removeClass("has-success");
					objThis._checkField[2] = 0;
				}
			},this));
			//密碼 focus
			objThis._password.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:密碼請輸入八個字以上，一百個字以下，須包含英文數字。");
			},this));
			//密碼 限制長度輸入
			objThis._password.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length>100){
					o.val(v.slice(0,100));
					evt.preventDefault();
				}
			});
			//密碼 重新輸入
			objThis._psdReset.on("click",$.proxy(function(event){
				objThis._password.val("")
				objThis._form_password.removeClass("has-error");
				objThis._form_password.removeClass("has-success");
				objThis._password.removeAttr("disabled");
				objThis._checkField[2] = 0;
			},this));
			//E-mail  blur
			objThis._email.on("blur",$.proxy(function(event){
				var email = objThis._email.val();
				var email_font = email.substr(0,email.indexOf("@"))
				var email_format = email.substr(email.indexOf("@")+1)
				//判斷是否為空  檢驗email格式 前面字串 + @ + domain .com
				if(
				(email_font != "" && email_font.match(/\d/) && email_font.match(/[a-z]/i) && !objThis._getSpeStr2(email_font)) &&
				(email_format != "" && email_format.search(/[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1))
				{
					objThis._form_email.removeClass("has-error");
					objThis._form_email.addClass("has-success");
					objThis._checkField[3] = 1;
				}
				else if(objThis._email.val() == ""){
					objThis._form_email.removeClass("has-error");
					objThis._form_email.removeClass("has-success");
					objThis._checkField[3] = 0;
				}
				else{
					objThis._form_email.addClass("has-error");
					objThis._form_email.removeClass("has-success");
					objThis._checkField[3] = 0;
				}
			},this));
			//信箱 focus
			objThis._email.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:Email請輸入信箱正確格式，EX:a123456789 + @ + domain .com。");
			},this));
			//信箱 限制長度輸入
			objThis._name.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length>50){
					o.val(v.slice(0,50));
					o.val(v.slice(0,50));
					evt.preventDefault();
				}
			});
			//性別 click
			objThis._gender.on("click",$.proxy(function(event){
				objThis._checkField[4] = 1;
			},this));
			//電話選單 change
			objThis._selectPhone.on("change",$.proxy(function(event){
				objThis._telephone.val(objThis._selectPhone.val());
				objThis._telephone.focus();
				objThis._form_telephone.removeClass("has-error");
				objThis._form_telephone.removeClass("has-success");
			},this))
			//電話 blur
			objThis._telephone.on("blur",$.proxy(function(event){
				objThis._telephone.val(objThis._telephone.val().replace(/[^0-9]/g,''))
				if(objThis._telephone.val().length >= 9 && objThis._telephone.val().length <= 10 &&
				objThis._telephone.val().match(/\d$/))
				{
					objThis._form_telephone.removeClass("has-error");
					objThis._form_telephone.addClass("has-success");
					objThis._checkField[5] = 1;
				}

				else if(objThis._telephone.val() == ""){
					objThis._form_telephone.removeClass("has-error");
					objThis._form_telephone.removeClass("has-success");
					objThis._checkField[5] = 0;
					objThis._telephone.val(objThis._selectPhone.val());
				}
				else{
					objThis._form_telephone.addClass("has-error");
					objThis._form_telephone.removeClass("has-success");
					objThis._checkField[5] = 0;
				}
			},this));
			objThis._telephone.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("");
			},this));
			//電話 限制長度輸入
			objThis._telephone.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length > 10){
					o.val(v.slice(0,10));
					evt.preventDefault();
				}
			});
			//電話 focus
			objThis._telephone.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:電話須再十二個數字以下，只能輸入數字。");
			},this));
			//身分證 blur
			objThis._identity.on("blur",$.proxy(function(event){
				objThis._identity.val(objThis._identity.val().replace(/[^\a-\z\A-\Z0-9]/g,''))
				if(objThis._getCheckIdentity(objThis._identity.val())){
					objThis._form_identity.removeClass("has-error");
					objThis._form_identity.addClass("has-success");
					objThis._checkField[6] = 1;
				}
				else if(objThis._identity.val() == ""){
					objThis._form_identity.removeClass("has-error");
					objThis._form_identity.removeClass("has-success");
					objThis._checkField[6] = 0;
				}
				else{
					objThis._form_identity.addClass("has-error");
					objThis._form_identity.removeClass("has-success");
					objThis._checkField[6] = 0;
				}
			},this));
			//身分證 focus
			objThis._identity.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:身分證須符合正確格式，十個字以下，只能輸入英文與數字。");
			},this));
			//身分證 限制長度輸入
			objThis._identity.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length>10){
					o.val(v.slice(0,10));
					evt.preventDefault();
				}
			});
			//生日1 blur
			objThis._birthday1.on("blur",$.proxy(function(event){
				if(objThis._birthday1.val() != "請選擇" && objThis._birthday2.val() != "請選擇" && objThis._birthday3.val() != "請選擇"
						&& objThis._getCheckDate(objThis._birthday1.val(),objThis._birthday2.val(),objThis._birthday3.val())){
					objThis._form_birthday.removeClass("has-error");
					objThis._form_birthday.addClass("has-success");
					objThis._checkField[7] = 1;
					objThis._checkField[8] = 1;
					objThis._checkField[9] = 1;
				}
				else{
					objThis._form_birthday.removeClass("has-success");
					objThis._form_birthday.addClass("has-error");
					objThis._checkField[7] = 0;
				}
			},this));
			//生日2 blur
			objThis._birthday2.on("blur",$.proxy(function(event){
				if(objThis._birthday1.val() != "請選擇" && objThis._birthday2.val() != "請選擇" && objThis._birthday3.val() != "請選擇"
					&& objThis._getCheckDate(objThis._birthday1.val(),objThis._birthday2.val(),objThis._birthday3.val())){
					objThis._form_birthday.removeClass("has-error");
					objThis._form_birthday.addClass("has-success");
					objThis._checkField[7] = 1;
					objThis._checkField[8] = 1;
					objThis._checkField[9] = 1;
				}
				else{
					objThis._form_birthday.removeClass("has-success");
					objThis._form_birthday.addClass("has-error");
					objThis._checkField[8] = 0;
				}
			},this));
			//生日3 blur
			objThis._birthday3.on("blur",$.proxy(function(event){
				if(objThis._birthday1.val() != "請選擇" && objThis._birthday2.val() != "請選擇" && objThis._birthday3.val() != "請選擇"
					&& objThis._getCheckDate(objThis._birthday1.val(),objThis._birthday2.val(),objThis._birthday3.val())){
					objThis._form_birthday.removeClass("has-error");
					objThis._form_birthday.addClass("has-success");
					objThis._checkField[7] = 1;
					objThis._checkField[8] = 1;
					objThis._checkField[9] = 1;
				}
				else{
					objThis._form_birthday.removeClass("has-success");
					objThis._form_birthday.addClass("has-error");
					objThis._checkField[9] = 0;
				}
			},this));

			//地址 blur
			objThis._address.on("blur",$.proxy(function(event){
				objThis._address.val(objThis._address.val().replace(/[(\$)(\()(\))(\@)(\_)(\')(\")(\?)(\#)]/g,''))
				if(objThis._address.val().length >= 6 && !objThis._getSpeStr2(objThis._address.val())){
					objThis._form_address.removeClass("has-error");
					objThis._form_address.addClass("has-success");
					objThis._checkField[10] = 1;
				}
				else if(objThis._address.val() == ""){
					objThis._form_address.removeClass("has-error");
					objThis._form_address.removeClass("has-success");
					objThis._checkField[10] = 0;
				}
				else{
					objThis._form_address.addClass("has-error");
					objThis._form_address.removeClass("has-success");
					objThis._checkField[10] = 0;
				}
			},this));
			//地址 限制長度輸入
			objThis._address.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length>100){
					o.val(v.slice(0,100));
					evt.preventDefault();
				}
			});
			//地址 focus
			objThis._address.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:地址須留下現居地址，一百個字以下。");
			},this));
			//地址 防止特殊符號
			objThis._address.on("keyup",$.proxy(function(event){
					objThis._address.val(objThis._address.val().replace(/[(\$)(\()(\))(\@)(\_)(\')(\")(\?)(\#)]/g,''))
			},this));
			//地址 防止特殊符號 貼上
			objThis._address.on("paste",$.proxy(function(event){
					objThis._address.val(objThis._address.val().replace(/[(\$)(\()(\))(\@)(\_)(\')(\")(\?)(\#)]/g,''))
			},this));

			objThis._address.on("contextmenu",$.proxy(function(event){
					objThis._address.val(objThis._address.val().replace(/[(\$)(\()(\))(\@)(\_)(\')(\")(\?)(\#)]/g,''))
			},this));
			//註冊同意 視窗
			objThis._bounce_registered.modal('show');

			$("body").on("click",$.proxy(function(event){
				if(objThis._agree == "" && objThis._bounce_registered.attr("aria-hidden") == "true"){
					layer.msg('<b>不接受合約條款</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					setTimeout("location.href = '/'",1500);
				}
			},this));
			//註冊同意 X
			objThis._close.on("click",$.proxy(function(event){
				if(objThis._bounce_registered.attr("aria-hidden") == "true"){
					layer.msg('<b>不接受合約條款</b>', {time: 1500, icon:2,shade:[0.5,'black']});
					setTimeout("location.href = '/'",1500);
				}
			},this));

			//註冊同意  下一步
			objThis._next.on("click",$.proxy(function(event){
				if($('#check_registered').is(":checked")){
					objThis._agree = "true";
					objThis._bounce_registered.modal("hide");
					layer.msg('<b>您可以開始註冊</b>', {time: 1500, icon:1,shade:[0.5,'black']});
				}else
				{
					objThis._check_registered.attr("style","color:red;");
					objThis._check_registered.focus();
				}
			},this))

			//標題 回首頁
			objThis._index.on("click",$.proxy(function(event){
				location.href="/?identity=visitor";
			},this));

			//驗證碼視窗
			objThis._chk.on("click",$.proxy(function(event){
				// 驗證各個欄位
				var check = true;
				for(i=0;i<11;i++){
					if(objThis._checkField[i] != 1) {
						check = false;
					}
				};
				if(check){
					objThis._verification.modal("show")
					objThis._registerCheck.val("");
					objThis._getRandom();
				}else{
					layer.msg('<b>資料尚未填寫完整或錯誤</b>', {time: 1500, icon:3,shade:[0.5,'black']});
				};

			},this))

			//reload
			objThis._reload.on("click",$.proxy(function(event){
				objThis._getRandom();
			},this));

			//移除錯誤框
			objThis._registerCheck.on("click",$.proxy(function(event){
				objThis._form_check.removeClass("has-error");
			},this));

			//檢驗驗證碼
			objThis._btnSubmit.on("click",$.proxy(function(event){
				objThis._btnSubmit.attr('disabled', true);
				// 1.先驗證驗證碼
				if(objThis._correctNum != objThis._registerCheck.val()){
					objThis._form_check.addClass("has-error");
					objThis._registerCheck.val("");
					objThis._getRandom();
					setTimeout(function(){objThis._btnSubmit.removeAttr('disabled');}, 200);
					return false;
				}

				// 2.驗證各個欄位
				var check = true;
				for(i=0;i<11;i++){
					if(objThis._checkField[i] != 1) {
						check = false;
						objThis._btnSubmit.removeAttr('disabled');
					}
				}

			 	var registerData =
				{
					name : this._name.val(),
					account : this._account.val(),
					password : this._password.val(),
					email : this._email.val(),
					telephone : this._telephone.val(),
					gender : $('input[name=gender]:checked').val(),
					identity : this._identity.val(),
					birthday1 : this._birthday1.val(),
					birthday2 : this._birthday2.val(),
					birthday3 : this._birthday3.val(),
					address : this._address.val(),
				};

				if(check==true){
					$.ajax({
						type: "post",
						url: "/register",
						data: registerData ,
						dataType: "json",
						success: function(message){
							if(message.success == "no")
							{
								layer.msg('<b>註冊成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
								setTimeout("location.href = '/'",1500);
							}
							else if(message.success == "yes")
							{
								layer.msg('<b>註冊失敗</b>', {time: 1500, icon:2,shade:[0.5,'black']});
								objThis._btnSubmit.removeAttr('disabled');
							}
						},
						error: function (xhr) {alert('error: ' + xhr);console.log(xhr);}
					})
				}
			},this));
		},
		_getRandom:function(){
			var objThis = this;
			objThis._correctNum="";

			objThis._check_img.empty();
			//驗證碼
			for(i=0;i<4;i++){
				objThis._checkNum[i] = 0;
				var rand = Math.floor(Math.random() * 10);
				objThis._check_img.append("<img src='images/num/0" + rand + ".png' style='margin:5px;'>");
				objThis._correctNum += rand;
			}
		},
		//取得GET參數
		_getPara:function(para){
			var strUrl = location.search;
			var getPara,ParaVal;
			var aryPara = [];

			if(strUrl.indexOf("?") != -1){
				var getSearch = strUrl.split("?");
				getPara = getSearch[1].split("&");
				for(i=0;i<getPara.length;i++){
					ParaVal = getPara[i].split("=");
					aryPara.push(ParaVal[0]);
					aryPara[ParaVal[0]] = ParaVal[1];
				}
			}
			return aryPara[para];
		},

		//判斷特殊字元  (有底線)
		_getSpeStr:function(str){
			var reg = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
			return (reg.test(str))
		},
		//判斷特殊字元  (無 _ - )
		_getSpeStr2:function(str2){
			var reg2 = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
			return (reg2.test(str2))
		},
		//判斷身分證格式
		_getCheckIdentity:function(id){
			var city = new Array(1,10,19,28,37,46,55,64,39,73,
			82,2,11,20,48,29,38,47,56,65,74,83,21,3,12,30)
			id = id.toUpperCase();
			if(id.search(/^[A-Z](1|2)\d{8}$/i) == -1){
				return false;
			}else
			{
				id = id.split('');
				var total = city[id[0].charCodeAt(0)-65];
				for(var i=1;i<=8;i++){
					total+= eval(id[i] * (9-i));
				}
				total+=eval(id[9]);
				return (total%10 == 0);
			}
		},
		//身分證產生
		_getTwID:function(){
			//建立字母分數陣列(A~Z)
			var city = new Array(1,10,19,28,37,46,55,64,39,73,82, 2,11,
			20,48,29,38,47,56,65,74,83,21, 3,12,30)
			//建立隨機身份證碼
			var id = new Array();
			id[0] = String.fromCharCode(Math.floor(Math.random() * (26)) + 65);
			id[1] = Math.floor(Math.random() * (2)) + 1;
			for(var i=2; i<9; i++){
				id[i] = Math.floor(Math.random() * (9)) + 0;
			}
			//計算總分
			var total = city[id[0].charCodeAt(0)-65];
			for(var i=1; i<=8; i++){
				total += eval(id[i]) * (9 - i);
			}
			//計算最尾碼
			var total_arr = (total+'').split('');
			var lastChar = eval(10-total_arr[total_arr.length-1]);
			var lastChar_arr = (lastChar+'').split('');
			//補上最後檢查碼
			id[id.length++] = lastChar_arr[lastChar_arr.length-1];
			//回傳結果
			return id.join('');
		},
		_getCheckDate:function(d1,d2,d3){
				var date = d1 + '/' + d2 + '/' + d3;
				date = Date.parse(date).valueOf();
				CurrentDate = Date.parse(new Date().toDateString());
				if(date > CurrentDate){
						return false;
				}else{
						return true;
				}

		}


	}
	return _const;
}());
var registered
$(function(){
	registered = new registered();
})
