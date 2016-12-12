var master = (function(){
	var _const;
	_const = function(){
		this._page = null;
		this._header = null;
		this._option = null;
		this._title = null;
		this._message = null;
		this._index = null;
		this._time = null;
		this._welcome = null;
		this._top = null;


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
			this._time = $("#time");
			this._welcome = $("#welcome");
			this._top = $("#top");
/*
			var $window = $(window),
			$top = $("#goTop").css('opacity',0).show(),
			_width = $top.width(),
			_height = $top.height(),
			_diffY = 20,_diffX = 20,
			_moveSpeed = 600;

			$top.css({
				top:$(document).height(),
				left:$window.width()-_width-_diffX,
				opacity:1,
			});
*/
			this._start();	//開始網頁執行function
			/*
			$window.bind("scroll resize",function(){
				var $this = $(this);
				$top.stop().animate({
					top:$this.scrollTop() + $this.height() - _height - _diffY,
					left:$this.scrollLeft() + $this.width() - _width - _diffX
				},_moveSpeed)
			}).scroll();*/
		},
		_start:function(){
			var objThis = this;
			this._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素

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
		_initialAll:function(){
			var objThis = this;

			//隱藏選單
			objThis._option.hide();

			//固定div
			objThis._header.addClass("freeze").css("width",objThis._page.width() + 'px');
			//時間

			var nowTime = new Date();
			objThis._time.append(" , 今天日期:" + nowTime.getFullYear() + "/" + (nowTime.getMonth()+1) + "/" + nowTime.getDate());

			//top
			objThis._top.on("click",$.proxy(function(event){

				$("html,body").animate({scrollTop:0},'slow');
			},this))

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
