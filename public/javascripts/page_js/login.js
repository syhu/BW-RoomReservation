var login = (function(){
	var _const;
	_const = function(){


		this._mouseoverNum = 0;
		this._correctNum = "";
		this._checkNum = new Array();
		for(i=0;i<4;i++){
			this._checkNum[i] = 0;
		}



		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			this._check1 = $(".check1");
			this._check2 = $(".check2");
			this._check3 = $(".check3");
			this._check4 = $(".check4");
			this._reload = $(".reload");
			this._check_img = $(".check_img");
			this._chk = $(".chk");
			this._forgotPsd = $("#forgotPsd");
			this._registered = $(".registered");
			this._registered1 = $("#registered1");
			this._index = $("#index");
			this._currentNum = $(".currentNum");
			this._account = $("#account");
			this._pwd = $("#pwd");


			this._start();	//開始網頁執行function
		},
		_start:function(){
			var objThis = this;
			this._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素

			setTimeout("$('#account').val('')",200);
			setTimeout("$('#psd').val('')",200);


		},
		_initialAll:function(){
			var objThis = this;

			//標題 回首頁
			objThis._index.on("click",$.proxy(function(event){
				location.href="/?identity=visitor";
			},this))

			objThis._getRandom();
			//檢驗驗證碼

			//忘記密碼
			objThis._forgotPsd.on("click",$.proxy(function(event){
					location.href = '/forgetPassword'
			},this))
			//登入
			objThis._chk.on("mousedown",$.proxy(function(event){
				if(objThis._correctNum != objThis._currentNum.val()){
					layer.msg('驗證碼錯誤');
					objThis._currentNum.val("");
					objThis._getRandom();
					return false;
				}else{
					objThis._login();

				}
			},this));
			//註冊提示  學員
			objThis._registered1.on("mouseover",$.proxy(function(event){
				objThis._mouseoverNum++;
				if(objThis._mouseoverNum<3){
					setTimeout("",1000)
					layer.tips('可以透過註冊帳號來登入', objThis._registered1 ,{tips:1});
				}
			},this))

			//註冊
			objThis._registered.on("click",$.proxy(function(event){
				location.href = "/register";
			},this))

			//reload
			objThis._reload.on("click",$.proxy(function(event){
				objThis._getRandom();
			},this));
			//判斷enter直接登入bug
			objThis._pwd.on("keydown",$.proxy(function(event){
				if(event.which == 13){
					if(objThis._correctNum != objThis._currentNum.val()){
						layer.msg('驗證碼錯誤');
						objThis._currentNum.val("");
						objThis._getRandom();
						return false;
					}else{
						objThis._login();
					}
				}
			},this));
			//驗證碼enter
			objThis._currentNum.on("keydown",$.proxy(function(event){
				if(event.which == 13){
					if(objThis._correctNum != objThis._currentNum.val()){
						layer.msg('驗證碼錯誤');
						objThis._currentNum.val("");
						objThis._getRandom();
						return false;
					}else{
							objThis._login();
					}
				}
			},this))

		},
		_login:function(){
			var objThis = this;
			var obj = new Object;
			var arr = new Array();

			obj.account = objThis._account.val();
			obj.password = objThis._pwd.val();
			arr = arr.concat(obj);

			$.ajax({
				type: "post",
				url: "/login",
				data: {strJson:JSON.stringify(arr)} ,
				success: function(message){
					if(message.success == 'loginFinish')
					{
						layer.msg('<b>登入成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
						setTimeout("location.href = '/blank';",1500);
					}
					else if(message.success == 'passwordError')
					{
						layer.msg('<b>密碼錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
						objThis._pwd.val('');
						objThis._currentNum.val("");
						objThis._getRandom();

					}
					else if(message.success == 'userNotFound')
					{
						layer.msg('<b>無此使用者</b>', {time: 1500, icon:2,shade:[0.5,'black']});
						objThis._account.val('');
						objThis._pwd.val('');
						objThis._currentNum.val("");
						objThis._getRandom();

					}
				},
				error: function (xhr)
				{
					alert('error: ' + xhr);console.log(xhr);
					layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
				}
			});
		},
		_getRandom:function(){
			var objThis = this;
			objThis._correctNum="";

			objThis._check_img.empty();
			//驗證碼
			for(i=0;i<4;i++){
				objThis._checkNum[i] = 0;
				var rand = Math.floor(Math.random() * 10);
				objThis._check_img.append("<img src='images/num/0" + rand + ".png'>");
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
		}

	}
	return _const;
}());
var login
$(function(){
	login = new login();
})
