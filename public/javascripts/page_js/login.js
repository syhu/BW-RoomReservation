var login = (function(){
	var _const;
	_const = function(){
		
		this._check1 = null;
		this._check2 = null;
		this._check3 = null;
		this._check4 = null;
		this._reload = null;
		this._check_img = null;
		this._chk = null;
		this._registered = null;
		this._registered1 = null;
		this._registered2 = null;
		this._index = null;
		this._currentNum = null;
		
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
			this._check1 = $(".check1");
			this._check2 = $(".check2");
			this._check3 = $(".check3");
			this._check4 = $(".check4");
			this._reload = $(".reload");
			this._check_img = $(".check_img");
			this._chk = $(".chk");
			this._registered = $(".registered");
			this._registered1 = $("#registered1");
			this._registered2 = $("#registered2");
			this._index = $("#index");
			this._currentNum = $(".currentNum");
			
			this._start();	//開始網頁執行function
		},
		_start:function(){
			var objThis = this;
			this._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素
			
			
			
			
			
		},
		_initialAll:function(){
			var objThis = this;
			
			//$(".windows8").show();
			//標題 回首頁
			objThis._index.on("click",$.proxy(function(event){	
				location.href="master.html?identity=visitor";
			},this))

			//
			objThis._getRandom();
			/*
			$('#myTab a:first').tab('show');// 學員 使用者切換
			
			$('#myTab a').click(function (e) { 
				e.preventDefault();		//讓超連結失效 
				$(this).tab('show');
			});
				*/
			//檢驗驗證碼
			
			objThis._chk.on("mousedown",$.proxy(function(event){
				if(objThis._correctNum != objThis._currentNum.val()){
					
					layer.msg('驗證碼錯誤');
					objThis._currentNum.val("");
					objThis._getRandom();
					objThis._chk.attr("type","button")
					}else{
					objThis._chk.attr("type","submit")
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
			
			//註冊提示  管理者
			objThis._registered2.on("mouseover",$.proxy(function(event){
				objThis._mouseoverNum++;
				if(objThis._mouseoverNum<3){
					layer.tips('可以透過註冊帳號來登入', objThis._registered2 ,{tips:1});
				}
			},this))
			//註冊
			objThis._registered.on("click",$.proxy(function(event){
				location.href = "registered.html";
			},this))
			
			//reload
			objThis._reload.on("click",$.proxy(function(event){
				objThis._getRandom();
			},this))
			
			
		},
		_getRandom:function(){
			var objThis = this;
			objThis._correctNum="";
			
			objThis._check_img.empty();
			//驗證碼
			for(i=0;i<4;i++){
				objThis._checkNum[i] = 0;
				var rand = Math.floor(Math.random() * 10);
				objThis._check_img.append("<img src='img/num/0" + rand + ".png'>");
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


