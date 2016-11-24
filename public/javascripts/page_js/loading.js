var loading = (function(){
	var _const;
	_const = function(){
		
		
		this._condition = this._getPara("condition");
		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			
			
			this._start();	//開始網頁執行function
		},
		_start:function(){
			var objThis = this;
			this._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素
			
			
		},
		_initialAll:function(){
			var objThis = this;
			if(objThis._condition == "login"){
				//三秒跳轉
				setTimeout("location.href='master.html?identity=admin'",3000);
			}else if(objThis._condition == "unlogin"){
				setTimeout("location.href='master.html?identity=visitor'",3000);
			}else{
				setTimeout("location.href='login.html'",2000);
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
var loading
$(function(){
loading = new loading();
})																								