var registered = (function(){
	var _const;
	_const = function(){
		this._index = null;
		this._check1 = null;
		this._check2 = null;
		this._check3 = null;
		this._check4 = null;
		this._reload = null;
		this._check_img = null;
		this._currentNum = null;
		this._chk = null;
		this._sign = null;
		this._checkTip = null;
		this._bounce_registered = null;
		this._close = null;
		this._check_registered = null;
		this._next = null;
		//input欄位
		this._name = null;
		this._account = null;
		this._psd = null;
		this._mail = null;
		this._phone = null;
		this._sex = null;
		this._id = null;
		this._birthday = null;
		this._address = null;

		//icon 勾勾 叉叉
		this._icon_name = null;
		this._icon_account = null;
		this._icon_psd = null;
		this._icon_mail = null;
		this._icon_phone = null;
		this._icon_sex = null;
		this._icon_id = null;
		this._icon_birthday = null;
		this._icon_address = null;
		this._icon_all = null;

		this._agree = "";	//註冊同意
		this._checked_button = "";	//判斷性別radio
		this._check_psd = "";	//確認密碼

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
			this._name = $("#name");
			this._account = $("#account");
			this._psd = $("#psd");
			this._mail = $("#mail");
			this._phone = $("#phone");
			this._sex = $(".sex");
			this._id = $("#id");
			this._birthday = $("#birthday");
			this._address = $("#address");

			//icon 勾勾 叉叉
			this._icon_name = $("#icon_name");
			this._icon_account = $("#icon_account");
			this._icon_psd = $("#icon_psd");
			this._icon_mail = $("#icon_mail");
			this._icon_phone = $("#icon_phone");
			this._icon_sex = $("#icon_sex");
			this._icon_id = $("#icon_id");
			this._icon_birthday = $("#icon_birthday");
			this._icon_address = $("#icon_address");
			this._icon_all = $(".icon_all");

			this._start();	//開始網頁執行function
		},
		_start:function(){
			var objThis = this;
			this._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素
			//this._resetForm();
			//objThis._delCookie(objThis._account.val())
			setTimeout("$('#account').val('')",500);
			setTimeout("$('#psd').val('')",500);
		},
		_initialAll:function(){
			var objThis = this;

			//$(".reset").click();

			//姓名 blur
			objThis._name.on("blur",$.proxy(function(event){
				if(objThis._name.val() != ""){
					objThis._icon_name.empty();
					objThis._icon_name.append("<img src='images/success.png' />");
					}else{
					objThis._icon_name.empty();
					objThis._icon_name.append("<img src='images/fail.png' />");
				}
			},this));

			//帳號 blur
			objThis._account.on("blur",$.proxy(function(event){


				if(objThis._account.val() != ""){
					objThis._icon_account.empty();
					objThis._icon_account.append("<img src='images/success.png' />");
					}else{
					objThis._icon_account.empty();
					objThis._icon_account.append("<img src='images/fail.png' />");
				}
			},this));

			//密碼 blur
			objThis._psd.on("blur",$.proxy(function(event){
				if(objThis._psd.val() != ""){
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
							objThis._icon_psd.empty();
							objThis._icon_psd.append("<img src='images/fail.png' />");
						}
						},function(value,index,elem){
						if(objThis._psd.val() != value) {
							//objThis._psd.focus();
							layer.msg('確認密碼錯誤');
							objThis._check_psd = "";
							objThis._icon_psd.empty();
							objThis._icon_psd.append("<img src='images/fail.png' />");
							}else{
							layer.msg('確認密碼正確');
							objThis._check_psd = "true";
							objThis._icon_psd.empty();
							objThis._icon_psd.append("<img src='images/success.png' />");
						}

						layer.close(index)
					})
				}

			},this));

			//E-mail  blur
			objThis._mail.on("blur",$.proxy(function(event){
				if(objThis._mail.val() != ""){
					objThis._icon_mail.empty();
					objThis._icon_mail.append("<img src='images/success.png' />");
					}else{
					objThis._icon_mail.empty();
					objThis._icon_mail.append("<img src='images/fail.png' />");
				}
			},this));

			//電話 blur
			objThis._phone.on("blur",$.proxy(function(event){
				if(objThis._phone.val() != ""){
					objThis._icon_phone.empty();
					objThis._icon_phone.append("<img src='images/success.png' />");
					}else{
					objThis._icon_phone.empty();
					objThis._icon_phone.append("<img src='images/fail.png' />");
				}
			},this));

			//性別 click
			objThis._sex.on("blur",$.proxy(function(event){

				objThis._icon_sex.empty();
				objThis._icon_sex.append("<img src='images/success.png' />");
			},this));

			objThis._sex.on("mouseover",$.proxy(function(event){
				if($(".check_sex").is(":checked") && objThis._checked_button == ""){
					objThis._checked_button	= "check";
					objThis._icon_sex.empty();
					objThis._icon_sex.append("<img src='images/success.png' />");
				}
			},this));

			//身分證 blur
			objThis._id.on("blur",$.proxy(function(event){
				if(objThis._id.val() != ""){
					objThis._icon_id.empty();
					objThis._icon_id.append("<img src='images/success.png' />");
					}else{
					objThis._icon_id.empty();
					objThis._icon_id.append("<img src='images/fail.png' />");
				}
			},this));

			//生日 blur
			objThis._birthday.on("blur",$.proxy(function(event){
				if(objThis._birthday.val() != ""){
					objThis._icon_birthday.empty();
					objThis._icon_birthday.append("<img src='images/success.png' />");
					}else{
					objThis._icon_birthday.empty();
					objThis._icon_birthday.append("<img src='images/fail.png' />");
				}
			},this));

			//地址 blur
			objThis._address.on("blur",$.proxy(function(event){
				if(objThis._address.val() != ""){
					objThis._icon_address.empty();
					objThis._icon_address.append("<img src='images/success.png' />");
					}else{
					objThis._icon_address.empty();
					objThis._icon_address.append("<img src='images/fail.png' />");
				}
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
					setTimeout("location.href = '/login'",1500);
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
			//
			objThis._getRandom();


			//檢驗驗證碼

			objThis._chk.on("mousedown",$.proxy(function(event){
				if(objThis._correctNum != objThis._currentNum.val()){

					layer.msg('驗證碼錯誤');
					objThis._getRandom();
					objThis._chk.attr("type","button")
					}else{
					objThis._chk.attr("type","submit")
				}
			},this));
			//註冊提示
			objThis._checkTip.on("mouseenter",$.proxy(function(event){
				objThis._mouseoverNum++;
				if(objThis._mouseoverNum<3){
					layer.tips('透過點擊數字增加，與右邊驗證碼相同即可', objThis._checkTip,{tips:4});
				}
			},this))

			//reload
			objThis._reload.on("click",$.proxy(function(event){
				objThis._getRandom();
			},this))
			//
			objThis._check1.on("click",$.proxy(function(event){
				objThis._getNumAdd(1);
			},this))
			//
			objThis._check2.on("click",$.proxy(function(event){
				objThis._getNumAdd(2);
			},this))
			//
			objThis._check3.on("click",$.proxy(function(event){
				objThis._getNumAdd(3);
			},this))
			//
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
		}
	}
	return _const;
}());
var registered
$(function(){
	registered = new registered();
	//listCookie();
})


function resetForm(){
	var form = $(".registerForm");
	event.preventDefault();	//停用原本reset功能
	//radio 取消樣式
	$(".sex .iradio_flat-blue").removeClass("checked");
	registered._icon_all.empty();
	registered._getRandom();
	registered._checked_button = "";
	$(':input',form).not(':button,:submit,:reset,:hidden').val("").removeAttr("checked").removeAttr("selected");
	form.find('input:text,input:password,input:file,select,textarea').val("");
	form.find('input:radio,input:checkbox').removeAttr('checked').removeAttr('selected');
}


function listCookie() {
	document.writeln("<table>");
	document.writeln("<tr><th>Name<th>Value");
	cookieArray = document.cookie.split(";");
	for (var i = 0; i < cookieArray.length; i++) {
		thisCookie = cookieArray[i].split("=");
		cName = unescape(thisCookie[0]);
		cValue = unescape(thisCookie[1]);
		document.writeln("<tr><td>" + cName + "</td><td>" + cValue + "</td>");
	}
	document.writeln("</table>");
}

function clear (el,message)
{
	var obj = el;
	if(typeof(el) == "string")
	obj = document.getElementByIdx_x("account");
	if(obj.value == message)
	{
		obj.value = "";
	}
	obj.onblur = function()
	{
		if(obj.value == "")
		{
			obj.value = message;
		}
	}
}
