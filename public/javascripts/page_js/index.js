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


			//今日課表查詢
			this._filterTime = $("#filterTime");
			this._filterLocation = $("#filterLocation");
			this._cancelFilter = $("#cancelFilter");
			this._btnFilter = $("#btnFilter");
			//列表
			this._todayLessonList = $("#todayLessonList");

			this._img = $("img");
			this._start();	//開始網頁執行function




		},
		_start:function(){
			var objThis = this;
			objThis._LessonDataTable();   /* 今日課程列表初始化 */
			objThis._setOwl();
			objThis._initialAll(); //初始化   載入頁面剛進入標籤、內容、元素
			objThis._resize_img();
			objThis._getPositionList();	  //取得地點資料


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


			//標題 回首頁
			objThis._index.on("click",$.proxy(function(event){
				location.href="/";
			},this))


		},
		_LessonDataTable:function(){
			var objThis = this;
			 var today = new Date();

			 var Table = this._todayLessonList.dataTable(
					 {
							 dom: 'lBfrtip',
							 buttons: [
							 ],
							 "oLanguage": {
									 "sSearch": "搜尋： ",
									 "sLengthMenu": "<span>顯示筆數:_MENU_</span> ",
									 "oPaginate": { "sFirst": "第一頁", "sLast": "最後一頁", "sNext": ">", "sPrevious": "<" },
									 "sInfo": "第 _START_ - _END_ 筆資料。總共 _TOTAL_ 筆",
									 "sProcessing": "資料讀取中...",
									 "sEmptyTable": "查無資料",
									 sSearchPlaceholder: "請輸入關鍵字..",
									 "sZeroRecords": "查無資料",
									 sInfoEmpty: ""
							 },
							 "serverSide": false,
							 "deferLoading": 57,
							 "iDisplayLength": 10,
							 "aLengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "全部"]]
					 });

					 objThis._todayLessonList.fnClearTable();

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
		_getPositionList:function(){
			var objThis = this;
			$.ajax({
				type:'post',
				url:'/getPositionData',
				success:function(datas){
						var data = datas.success
						// console.log(data)
						if(data != null){
							if(data.length > 0){
								objThis._setPositionOption(data);
							}
						}
				},complete:function(){

					//取得今天日期
					var nowTime = new Date();
				  var year = objThis._padLeft(nowTime.getFullYear());
				  var month = objThis._padLeft(nowTime.getMonth() + 1);
				  var day = objThis._padLeft(nowTime.getDate());
					var todayDate = year + '/' + month + '/' + day
					objThis._getTodayLessonList(todayDate,'');		//載入今天課程
				}
			})
		},
		_setPositionOption:function(strJson){
      var objThis = this;
			var _option;
      objThis._filterLocation.empty().append("<option value='請選擇'>請選擇</option>");
      $.each(strJson,function(i,v){
				if(v.lock == 'no'){
					_option = $("<option />",{"text":v.location,"value":v.location});
					objThis._filterLocation.append(_option);
				}
			})
    },
		//取得今日課表
		_getTodayLessonList:function(date , location){
			var objThis = this;

			var arr = new Array();
			var obj = new Object;
			obj.date = date;
			obj.location = location;
			arr = arr.concat(obj);

			$.ajax({
				type:'post',
				url:'/getLesson',
				data:{strJson:JSON.stringify(arr)},
				success:function(datas){
						var data = datas.success
						// console.log(datas)

						if(data != null){
							if(data.length > 0){
								objThis._setTodayLessonList(data);
							}
						}
				}
			})

		},
		_setTodayLessonList:function(strJson){
				var objThis = this;
				var _tr;
				var _td;

				objThis._todayLessonList.fnClearTable();
				// objThis._todayLessonList.empty();
				$.each(strJson,function(i,v){
					if(v.checkSituation == 'success'){
						_tr = $("<tr />");

						//#
						_td = $("<td />",{"text":(i+1)});
						_tr.append(_td);
						//課程名稱
						_td = $("<td />",{"text":v.name});
						_tr.append(_td);
						//使用教室
						_td = $("<td />",{"text": v.building+ v.lessonClass});
						_tr.append(_td);
						//時間
						_td = $("<td />",{"text": v.time + '-' + v.period});
						_tr.append(_td);
						//詳細資料
						_input = $("<span />",{"text":"詳細資料","style":"font-size:100%;","class":"label label-default btn-embossed"});
						_input.bind("click",function(){
							bootbox.alert("<b style='font-size:20px;'>課程資訊</b><hr/>" +
										"課程名稱 ： " + v.name +
										"<br/><br/>使用教室 ： " + v.building + v.lessonClass +
										"<br/><br/>新增時間 ： " + v.createTime +
										"<br/><br/>修改時間 ： " + v.modifyTime+
										"<br/><br/>時間 - 時段 ： " + v.time + '-' + v.period+
										"<br/><br/>上課人數 ： " + v.count +
										"<br/><br/>上課限制人數 ： " + v.people +
										"<br/><br/>聯絡人姓名 ： " + v.contract+
										"<br/><br/>聯絡人電話 ： " + v.contractPhone +
										"<br/><br/>簡易介紹 ： " + v.aim

							)
						})
						_td = $("<td />");
						_td.append(_input)
						_tr.append(_td);

						objThis._todayLessonList.fnAddData(_tr);
					}

				})


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
		//日期加0
		_padLeft:function(num){
		  num = '' + num;
		  if (num.length == 1)
		  {
		    return ('0' + num);
		  }
		  else
		  {
		    return num;
		  }
		},
		_resize_img:function(){
        var viewportWidth = $("marquee div").innerWidth();
        var viewportHeight = $("marquee div").innerHeight();

        var width = $('img').width();
        var height = $('img').height();

        if ((viewportWidth / viewportHeight) > (width / height)) {

            $('#bg-img').css({
                'width': '100%',
                'height': 'auto',
                'margin-left': 0 - width / 2,
                'margin-top': 0 - height / 2
            });

        } else {
            $('#bg-img').css({
                'width': 'auto',
                'height': '100%',
                'margin-left': 0 - width / 2,
                'margin-top': 0 - height / 2
            });

        }
    }


	}
	return _const;
}());
var myMaster
$(function(){
	setTimeout("layout._changeImageSize();",1000)
	myMaster = new master();
})

//上下輪播
function slideLine(box,stf,delay,speed,h)
{
  //取得id
  var slideBox = document.getElementById(box);
  //預設值 delay:幾毫秒滾動一次(1000毫秒=1秒)
  //       speed:數字越小越快，h:高度
  var delay = delay||1000,speed = speed||20,h = h||20;
  var tid = null,pause = false;
  //setInterval跟setTimeout的用法可以咕狗研究一下~
  var s = function(){tid=setInterval(slide, speed);}
  //主要動作的地方
  var slide = function(){
  //當滑鼠移到上面的時候就會暫停
    if(pause) return;
  //滾動條往下滾動 數字越大會越快但是看起來越不連貫，所以這邊用1
    slideBox.scrollTop += 1;
  //滾動到一個高度(h)的時候就停止
    if(slideBox.scrollTop%h == 0){
  //跟setInterval搭配使用的
      clearInterval(tid);
  //將剛剛滾動上去的前一項加回到整列的最後一項
      slideBox.appendChild(slideBox.getElementsByTagName(stf)[0]);
  //再重設滾動條到最上面
      slideBox.scrollTop = 0;
  //延遲多久再執行一次
      setTimeout(s, delay);
    }
  }
  //滑鼠移上去會暫停 移走會繼續動
  // slideBox.onmouseover=function(){pause=true;}
  // slideBox.onmouseout=function(){pause=false;}
  //起始的地方，沒有這個就不會動囉
  setTimeout(s, delay);
}
