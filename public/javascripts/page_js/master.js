var master = (function(){
	var _const;
	_const = function(){
		this._condition = 0;
		//驗證身分
		this._identity =this._getPara("identity");
		this._loginTimes = this._getPara("a");


		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			this._page = $("#page");
			this._header = $("#header");
			this._option = $("#option");
			this._title = $("#title");
			this._message = $("#message");
			this._index = $("#index");
			this._welcome = $("#welcome");
			this._top = $("#top");


			//今日課表查詢
			this._filterTime = $("#filterTime");
			this._filterBuilding = $("#filterBuilding");
			this._filterFloor = $("#filterFloor");
			this._cancelFilter = $("#cancelFilter");
			this._btnFilter = $("#btnFilter");
			this._todayLessonList = $("#todayLessonList");

			this._start();	//開始網頁執行function




		},
		_start:function(){
			var objThis = this;
			this._setOwl();
			this._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素
			this._setLessonList();		//載入今天課程

			//歡迎視窗
			if(objThis._identity != "visitor"){
				if(objThis._loginTimes == 0){
					layer.open({
						type: 1,
						title:"<b>登入成功</b>",
						skin: 'layui-layer-lan',
						shade: false,
						area: ['400px', '200px'], //宽高
						content: objThis._welcome.val(),
						time:3000,

						cancel: function(){
							layer.msg('您可以進行課程查詢或教室調動', {time: 3000, icon:1});
						}
					})
				};
				}else{
				layer.open({
					type: 1,
					title:"<b>尚未登入</b>",
					skin: 'demo-class',
					shade: false,
					area: ['400px', '200px'], //宽高
					content: "<div style='margin:15px;'><span class='fui-user'></span>訪客，歡迎進入福智基金會網站。<br/><br/><br/>您可以選擇<a href='/login'>登入</a>或<a href='/register'>註冊</a></span>。<br/><br/></div>",

					cancel: function(){
						layer.msg('您可以進行課程查詢', {time: 3000, icon:4});
					}
				});
			}

		},
		//設定輪播
		_setOwl:function(){
			$(".owl-carousel").owlCarousel({
				items: 3, // 一次輪播幾個項目
				loop: true, // 循環輪播
				margin: 10, // 與右邊圖片的距離
				nav: true, // 導航文字
				autoplay: true, // 自動輪播
				autoplayTimeout: 2000, // 切換時間
				autoplayHoverPause: true, // 滑鼠經過時暫停
				responsive:{
					600:{
						items:3
					}
				}
			});

		},
		_setLessonList:function(){
				var objThis = this;
				var _tr;
				var _td;

				for(var i = 0 ; i < 10;i++){
						_tr = $("<tr />");
						for(var j = 0; j < 4 ; j++){
							_td = $("<td />",{"text":i+1});
							_tr.append(_td);
						}
						objThis._todayLessonList.append(_tr);
				}

		},
		_initialAll:function(){
			var objThis = this;

			//隱藏選單
			objThis._option.hide();

			//固定div
			objThis._header.addClass("freeze").css("width",objThis._page.width() + 'px');
			//時間



			//標題 回首頁
			objThis._index.on("click",$.proxy(function(event){
				location.href="/";
			},this))


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
var myMaster
$(function(){
	myMaster = new master();
})
