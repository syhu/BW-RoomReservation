var registered = (function(){
	var _const;
	_const = function(){
		this._agree = "";							//註冊同意
		this._checked_button = "";		//判斷性別radio
		this._check_psd = "";					//確認密碼
		this._mouseoverNum = 0;
		this._correctNum = "";
		this._checkNum = new Array();
		for(i=0;i<4;i++){
			this._checkNum[i] = 0;
		}

		//驗證身分
		this._identity =this._getPara["identity"];

		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			this._index = $("#index");
			this._check1 = $(".check1");
			this._check2 = $(".check2");
			this._check3 = $(".check3");
			this._check4 = $(".check4");
			this._reload = $(".reload");
			this._check_img = $(".check_img");
			this._currentNum = $("#currentNum");
			this._chk = $(".chk");
			this._sign = $(".sign");
			this._checkTip = $("#checkTip");
			this._bounce_registered = $("#bounce_registered");
			this._close = $(".close");
			this._check_registered = $('.check_registered');
			this._next = $("#next");
			//欄位標籤
			this._name = $("#name");
			this._account = $("#account");
			this._password = $("#password");
			this._email = $("#email");
			this._telephone = $("#telephone");
			this._sex = $(".sex");
			this._identity = $("#identity");
			this._birthday = $(".birthday");
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
			//
			this._selectPhone = $("#selectPhone");
			this._promptText = $("#promptText");
			this._psdReset = $(".psdReset");
			this._searchAccount = $("#searchAccount");

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
							layer.msg('<b>此帳號無人使用</b>', {time: 1500, icon:1,shade:[0.5,'black']});
							objThis._chk.removeAttr("disabled");
						}
						else if(message.success == "yes")
						{
							layer.msg('<b>此帳號已被使用</b>', {time: 1500, icon:2,shade:[0.5,'black']});
							objThis._chk.attr("disabled","disabled");
						}
					},
					error: function (xhr) {alert('error: ' + xhr);console.log(xhr);}
				})
			}, this))

			$("input").iCheck({
				checkboxClass:"icheckbox_flat-blue",
				radioClass:"iradio_flat-blue"
			});

			//bitthday
			//年
			var date = new Date();
			var day = "";
			for(var i=1916; i <= date.getFullYear();i++){
				objThis._birthday1.append("<option value='" + i + "'>" + i + "</option>")
			}

			//月
			for(var i=1;i<=12;i++){
					objThis._birthday2.append("<option value='" + i + "'>" + i + "</option>")
			}

			//日
			for(var i=1;i<=31;i++){
				objThis._birthday3.append("<option value='" + i + "'>" + i + "</option>");
			}


			//姓名 blur
			objThis._name.on("blur",$.proxy(function(event){
				//判斷姓名長度是否大於1，小於30  不能輸入特殊字元
				if(objThis._name.val().length > 1 && objThis._name.val().length < 30 &&
				!objThis._getSpeStr(objThis._name.val()))
				{
					objThis._form_name.removeClass("has-error");
					objThis._form_name.addClass("has-success");
				}
				else if(objThis._name.val() == ""){
					objThis._form_name.removeClass("has-error");
					objThis._form_name.removeClass("has-success");
				}
				else{
					objThis._form_name.addClass("has-error");
					objThis._form_name.removeClass("has-success");
				}
			},this));

			//姓名 focue
			objThis._name.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:姓名請輸入兩個字以上");
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
				//判斷帳號長度是否大於6，小於20  帳號包含數字  密碼包含英文字母(不分大小寫) 特殊字元只能支援底線
				if(objThis._account.val().length > 6 && objThis._account.val().length < 20 &&
				objThis._account.val().match(/\d/) && objThis._account.val().match(/[a-z]/i) &&
				!objThis._getSpeStr2(objThis._account.val()))
				{
					objThis._form_account.removeClass("has-error");
					objThis._form_account.addClass("has-success");
				}
				else if(objThis._account.val() == ""){
					objThis._form_account.removeClass("has-error");
					objThis._form_account.removeClass("has-success");
				}
				else{
					objThis._form_account.addClass("has-error");
					objThis._form_account.removeClass("has-success");
				}
			},this));

			//帳號 focus
			objThis._account.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:帳號請輸入六個字以上");
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
				//判斷密碼長度是否大於8，小於100  密碼包含數字  密碼包含英文字母(不分大小寫) 接受所有特殊字元
				if(objThis._password.val().length > 8 && objThis._password.val().length < 100 &&
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

						}
						},function(value,index,elem){
						if(objThis._password.val() != value) {
							//objThis._psd.focus();
							layer.msg('確認密碼錯誤');
							objThis._check_psd = "";

						}
						else{
							layer.msg('確認密碼正確');
							objThis._check_psd = "true";
							objThis._form_password.addClass("has-success");
							// objThis._password.attr("disabled","true")
						}

						layer.close(index)
					})
				}
				else if(objThis._password.val() == ""){
					objThis._form_password.removeClass("has-error");
					objThis._form_password.removeClass("has-success");
				}
				else{
					objThis._form_password.addClass("has-error");
					objThis._form_password.removeClass("has-success");
				}
			},this));

			//密碼 focus
			objThis._password.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:密碼請輸入八個字以上");
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
				}
				else if(objThis._email.val() == ""){
					objThis._form_email.removeClass("has-error");
					objThis._form_email.removeClass("has-success");
				}
				else{
					objThis._form_email.addClass("has-error");
					objThis._form_email.removeClass("has-success");
				}
			},this));

			//信箱 focus
			objThis._email.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:Email請輸入信箱正確格式，a123456789 + @ + domain .com");
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


			//電話選單 change
			objThis._selectPhone.on("change",$.proxy(function(event){
				objThis._telephone.val(objThis._selectPhone.val()) ;
				objThis._form_telephone.removeClass("has-error");
				objThis._form_telephone.removeClass("has-success");
			},this))

			//電話 blur
			objThis._telephone.on("blur",$.proxy(function(event){
				if(objThis._telephone.val().length > 8 && objThis._telephone.val().length < 12 &&
				objThis._telephone.val().match(/\d$/))
				{
					objThis._form_telephone.removeClass("has-error");
					objThis._form_telephone.addClass("has-success");
				}

				else if(objThis._telephone.val() == ""){
					objThis._form_telephone.removeClass("has-error");
					objThis._form_telephone.removeClass("has-success");
				}
				else{
					objThis._form_telephone.addClass("has-error");
					objThis._form_telephone.removeClass("has-success");
				}
			},this));
			objThis._telephone.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("");
			},this));

			//電話 限制長度輸入
			objThis._telephone.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length>12){
					o.val(v.slice(0,12));
					evt.preventDefault();
				}
			});


			//性別 mouseover
			objThis._sex.on("mouseover",$.proxy(function(event){
				if($(".check_sex").is(":checked") && objThis._checked_button == ""){
					objThis._checked_button	= "check";

				}
			},this));


			//身分證 blur
			objThis._identity.on("blur",$.proxy(function(event){
				if(objThis._getCheckIdentity(objThis._identity.val())){
					objThis._form_identity.removeClass("has-error");
					objThis._form_identity.addClass("has-success");
				}
				else if(objThis._identity.val() == ""){
					objThis._form_identity.removeClass("has-error");
					objThis._form_identity.removeClass("has-success");
				}
				else{
					objThis._form_identity.addClass("has-error");
					objThis._form_identity.removeClass("has-success");
				}
			},this));

			//身分證 focus
			objThis._identity.on("focus",$.proxy(function(event){
				objThis._promptText.empty();
				objThis._promptText.append("貼心小提示:身分證須符合正確格式。");
			},this));

			//身分證 限制長度輸入
			objThis._identity.bind("input",function(evt){
				var o = $(this),v=o.val();
				if(v.length>10){
					o.val(v.slice(0,10));
					evt.preventDefault();
				}
			});


			//生日 blur
			objThis._birthday.on("blur",$.proxy(function(event){
				if(objThis._birthday1.val() != "" && objThis._birthday2.val() != null && objThis._birthday3.val() != null){
					objThis._form_birthday.removeClass("has-error");
					objThis._form_birthday.addClass("has-success");
				}
				else if(objThis._birthday1.val() == ""){
					objThis._form_birthday.removeClass("has-error");
					objThis._form_birthday.removeClass("has-success");
				}
				else{
					objThis._form_birthday.addClass("has-error");
					objThis._form_birthday.removeClass("has-success");
				}
			},this));


			//地址 blur
			objThis._address.on("blur",$.proxy(function(event){
				if(objThis._address.val().length > 6 && !objThis._getSpeStr2(objThis._address.val())){
					objThis._form_address.removeClass("has-error");
					objThis._form_address.addClass("has-success");
				}
				else if(objThis._address.val() == ""){
					objThis._form_address.removeClass("has-error");
					objThis._form_address.removeClass("has-success");
				}
				else{
					objThis._form_address.addClass("has-error");
					objThis._form_address.removeClass("has-success");
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
					}else{
					objThis._check_registered.attr("style","color:red;");
					objThis._check_registered.focus();
				}

			},this))

			//標題 回首頁
			objThis._index.on("click",$.proxy(function(event){
				location.href="/?identity=visitor";
			},this))

			//驗證碼初始化
			objThis._check1.append("<img src='images/num/00.png'>")
			objThis._check2.append("<img src='images/num/00.png'>")
			objThis._check3.append("<img src='images/num/00.png'>")
			objThis._check4.append("<img src='images/num/00.png'>")
			objThis._getRandom();

			//檢驗驗證碼

			objThis._chk.on("mousedown",$.proxy(function(event){
				if(objThis._correctNum != objThis._currentNum.val()){

					layer.msg('驗證碼錯誤');
					objThis._getRandom();
					objThis._chk.attr("disabled","");
				}else{
					objThis._chk.removeAttr("disabled");
				}
			},this));

			//註冊提示
			objThis._checkTip.on("mouseenter",$.proxy(function(event){
				objThis._mouseoverNum++;
				if(objThis._mouseoverNum<3){
					layer.tips('透過點擊數字增加，與左方驗證碼相同即可', objThis._checkTip,{tips:4});
				}
			},this))


			//reload
			objThis._reload.on("click",$.proxy(function(event){
			objThis._getRandom();
			},this))

			// Number 1st
			objThis._check1.on("click",$.proxy(function(event){
				objThis._getNumAdd(1);
			},this))

			// Number 2ed
			objThis._check2.on("click",$.proxy(function(event){
				objThis._getNumAdd(2);
			},this))

			// Number 3th
			objThis._check3.on("click",$.proxy(function(event){
				objThis._getNumAdd(3);
			},this))

			// Number 4th
			objThis._check4.on("click",$.proxy(function(event){
				objThis._getNumAdd(4);
			},this))

		},
		_getRandom:function(){
			var objThis = this;
			objThis._correctNum="";
			objThis._currentNum.val("");

			objThis._check_img.empty();

			//驗證碼
			for(i=0;i<4;i++){
				objThis._checkNum[i] = 0;
				var rand = Math.floor(Math.random() * 10);
				objThis._check_img.append("<img src='images/num/0" + rand + ".png'>")
				$(".check" + (i+1)).empty();
				$(".check" + (i+1)).append("<img src='images/num/00.png'>");
				objThis._correctNum += rand;
			}
		},
		_getNumAdd:function(num){
			var objThis = this;
			var tmp = "";
			objThis._checkNum[num-1]++;
			if(objThis._checkNum[num-1]>9) objThis._checkNum[num-1]=0;
			$(".check" + num).empty();
			$(".check" + num).append("<img src='images/num/0" + objThis._checkNum[num-1] + ".png'>");
			for(i=0;i<4;i++){
				tmp += objThis._checkNum[i];
			}
			objThis._currentNum.attr("value",tmp);
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
		_getCookie:function(name){
			var cname = name + "=";
			var dc = document.cookie;
			if (dc.length != 0) {
				begin = dc.indexOf(cname);
				if (begin != -1) {
					begin += cname.length;
					end = dc.indexOf(";", begin);
					if (end == -1) end = dc.length;
					return unescape(dc.substring(begin, end));
				}
			}
			return null;
		},
		_setCookies:function(name,value,expires){
			document.cookie = name + "=" + escape(value) +
			((expires == null) ? "" : "; expires=" + expires.toGMTString()) +
			"; path=/";
		},
		_delCookie:function(){
			var expires = new Date();
			expires.setTime(expires.getTime()-1);
			document.cookie = name + "=;expires=" + expires.toGMTString();
			alert(document.cookie);
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
		}
	}
	return _const;
}());
var registered
$(function(){
	registered = new registered();
})

function resetForm(){
	var form = $(".registerForm");
	event.preventDefault();	//停用原本reset功能
	//radio 取消樣式
	$(".sex .iradio_flat-blue").removeClass("checked");
	$(".form-group").removeClass("has-success");
	$(".form-group").removeClass("has-error");
	registered._getRandom();
	registered._checked_button = "";
	$(':input',form).not(':button,:submit,:reset,:hidden').val("").removeAttr("checked").removeAttr("selected");
	form.find('input:text,input:password,input:file,select,textarea').val("");
	form.find('input:radio,input:checkbox').removeAttr('checked').removeAttr('selected');
}
