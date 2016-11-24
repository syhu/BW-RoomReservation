var sign = (function(){
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
			
			this._start();	//開始網頁執行function
		},
		_start:function(){
			var objThis = this;
			this._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素
			
			
			
			
			
		},
		_initialAll:function(){
			var objThis = this;
			
			//標題 回首頁
			objThis._index.on("click",$.proxy(function(event){	
				location.href="master.html?identity=visitor";
			},this))
			
			//驗證碼初始化
			objThis._check1.append("<img src='img/num/00.png'>")
			objThis._check2.append("<img src='img/num/00.png'>")
			objThis._check3.append("<img src='img/num/00.png'>")
			objThis._check4.append("<img src='img/num/00.png'>")
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
				objThis._check_img.append("<img src='img/num/0" + rand + ".png'>")
				$(".check" + (i+1)).empty();
				$(".check" + (i+1)).append("<img src='img/num/00.png'>");
				objThis._correctNum += rand;
			}
		},
		_getNumAdd:function(num){
			var objThis = this;
			var tmp = "";
			objThis._checkNum[num-1]++;
			if(objThis._checkNum[num-1]>9) objThis._checkNum[num-1]=0;
			$(".check" + num).empty();
			$(".check" + num).append("<img src='img/num/0" + objThis._checkNum[num-1] + ".png'>");
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
		}
		
	}
	return _const;
}());	
var sign
$(function(){
	sign = new sign();
})																								


