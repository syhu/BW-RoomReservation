var layout = (function(){
	var _const;
	_const = function(){

		this._construct();
	}
  _const.prototype = {
    _construct:function(){


      this._top = $("#top");
      this._hiddenIdentity = $("#hiddenIdentity");
      this._user = $("#user");


      this._start();
    },
		_start:function(){
			var objThis = this;
			objThis._initialAll();
			objThis._setiCheck();		/* 初始化icheck */
			objThis._initialAllfirebase();		/* 初始化firebase */

			// objThis._hiddenIdentity.val() != "" ?	objThis._saveMonitorData() : "";        /* 儲存監控資料 */
			setTimeout('$(window).resize()',100)
		},
		_initialAll:function(){
      var objThis = this;

			$(window).on("resize",$.proxy(function(){
				objThis._resize_tab();

			},this))
      //往上
      this._top.on("click",$.proxy(function(e){
        $("html,body").animate({scrollTop:0},'slow');
      },this));


      if(this._hiddenIdentity.val() == 'Admin') {
          this._user.attr({"class":"label label-success btn-embossed","style":"font-size:100%;"})
          this._user.bind("mouseover",function(){
            layer.tips('最高管理員', $("#user") ,{tips:3,time:1000});
          })
      }else if($("#hiddenIdentity").val() == 'Hyper'){
        this._user.attr({"class":"label label-info btn-embossed","style":"font-size:100%;"})
        this._user.bind("mouseover",function(){
          layer.tips('超級管理員', $("#user") ,{tips:3,time:1000});
        });
      }else if($("#hiddenIdentity").val() == 'Owner'){
        this._user.attr({"class":"label label-warning btn-embossed","style":"font-size:100%;"})
        this._user.bind("mouseover",function(){
          layer.tips('管理員', $("#user") ,{tips:3,time:1000});
        });
      }
      else{
        this._user.attr({"class":"label label-primary btn-embossed","style":"font-size:100%;"})
        this._user.bind("mouseover",function(){
          layer.tips('使用者', $("#user") ,{tips:3,time:1000});
        });
      }
    },
		_initialAllfirebase:function(){
			// Initialize Firebase
			var config = {
				apiKey: "AIzaSyBKOUVKQ4UvaUQahYzU2oC_9cdqLodEHsY",
				authDomain: "fuzhi-65a33.firebaseapp.com",
				databaseURL: "https://fuzhi-65a33.firebaseio.com",
				projectId: "fuzhi-65a33",
				storageBucket: "fuzhi-65a33.appspot.com",
				messagingSenderId: "49991221265"
			};
			firebase.initializeApp(config);

		},
		_saveMonitorData:function(){
			var Path = this._getPath();
      //取得現在時間
      var today = new Date();
      var nowTime = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var ConverTime = new Date(nowTime).getTime();


      var postData = {
          user: this._hiddenIdentity.val(),
          loginTime: ConverTime,
      };

      var updates = {};
      updates[Path] = postData;

      firebase.database().ref().update(updates);

      setTimeout("layout._saveMonitorData()", 5000);         /* 設定監控間隔時間 */
		},
		//取得路徑
    _getPath: function () {
        this.Path = "monitorUser" + "/" ;
        return this.Path;
    },
		_setiCheck:function(){
			//icheck
			$("input").iCheck({
				checkboxClass:"icheckbox_flat-blue",
				radioClass:"iradio_flat-blue"
			});
		},
    //調整首頁
    _resize_tab:function(){
        var viewportWidth = $(window).innerWidth();
        var viewportHeight = $(window).innerHeight();

				// console.log(viewportWidth + "   "  + viewportHeight)

        var width = $('#bg-img').width();
        var height = $('#bg-img').height();

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
				$('#bg-img').show();
    },
    //時間補0
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
    }
		//分頁
		//總頁數 當前頁數 跳轉頁數 第一頁和最後一頁之間顯示的頁碼數量
		// _pageBar:function(tp,cp,url,pn){
		// 	var str = '<div class="paginationWrap pagesCenter"><nav><ul id="pageList" class="pagination">'
		//
		// 	if(tp>1 && cp>1){
		//
		// 	}
		// }
    },
		 _showTime:function(){
		  var nowTime = new Date();

		  var year = nowTime.getFullYear();
		  var month = nowTime.getMonth() + 1;
		  var day = nowTime.getDate();
			return year + "/" + this._padLeft(month) + '/' + this._padLeft(day);
		}
  }
return _const;
}());


var layout;
$(function(){
	layout = new layout();

	setTimeout('layout._resize_tab();',100)    /* 調整背景 */
  _showTime();      /* 顯示時間 */
})


function _showTime(){
  var nowTime = new Date();

  var year = nowTime.getFullYear();
  var month = nowTime.getMonth() + 1;
  var day = nowTime.getDate();
  var h = layout._padLeft(nowTime.getHours());
  var m = layout._padLeft(nowTime.getMinutes());
  var s = layout._padLeft(nowTime.getSeconds());
  $('#time').empty().append( "現在時間：" + year + '/' + month + '/' + day + '&nbsp;&nbsp;&nbsp;' + h + ':' + m + ':' + s).addClass("btn-embossed")
  setTimeout('_showTime()',1000);
}
