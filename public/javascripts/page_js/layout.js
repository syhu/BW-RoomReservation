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
      objThis._resize_tab();
		},
		_initialAll:function(){
      var objThis = this;

      $(window).resize(function () {
            //  setTimeout("resize_tab()",100);
             objThis._resize_tab();
      }).resize();
      //往上
      this._top.on("click",$.proxy(function(e){
        $("html,body").animate({scrollTop:0},'slow');
      },this));


      if(this._hiddenIdentity.val() == 'Admin') {
          this._user.attr({"class":"label label-success","style":"font-size:100%;"})
          this._user.bind("mouseover",function(){
            layer.tips('最高管理員', $("#user") ,{tips:3,time:1000});
          })
      }else if($("#hiddenIdentity").val() == 'Hyper'){
        this._user.attr({"class":"label label-info","style":"font-size:100%;"})
        this._user.bind("mouseover",function(){
          layer.tips('超級管理員', $("#user") ,{tips:3,time:1000});
        });
      }else if($("#hiddenIdentity").val() == 'Owner'){
        this._user.attr({"class":"label label-warning","style":"font-size:100%;"})
        this._user.bind("mouseover",function(){
          layer.tips('管理員', $("#user") ,{tips:3,time:1000});
        });
      }
      else{
        this._user.attr({"class":"label label-primary","style":"font-size:100%;"})
        this._user.bind("mouseover",function(){
          layer.tips('使用者', $("#user") ,{tips:3,time:1000});
        });
      }
    },
    //調整首頁
    _resize_tab:function(){
        var viewportWidth = $(window).innerWidth();
        var viewportHeight = $(window).innerHeight();

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
  }
return _const;
}());


var layout;
$(function(){
	layout = new layout();

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
  $('#time').empty().append( "現在時間：" + year + '/' + month + '/' + day + '&nbsp;&nbsp;&nbsp;' + h + ':' + m + ':' + s)
  setTimeout('_showTime()',1000);
}
