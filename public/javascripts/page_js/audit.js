var aduit = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){
      this._btnCancel = $('#btnCancel');
      this._btnSubmit = $('#btnSubmit');
      this._todayTime = $("#todayTime");
      this._bounce_check = $("#bounce_check");
      this._checkText = $("#checkText");
      this._lessonID = $(".lessonID");
      this._start();
    },

    _start:function(){
      var objThis = this;
      objThis._initialAll();
    },

    _initialAll:function(){
      //初始化彈跳視窗位置
      this._bounce_check.css('position','absolute');
      this._bounce_check.css('top', '30%');

      //顯示當天時間
      var now = new Date();
			this._todayTime.append(
            now.getFullYear() + '/' + (now.getMonth()+1) + '/'
          + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":"
          + now.getSeconds());

      //點擊表單
      $('tr').click(function(){
      clickID = $(this).attr('id');
      clickName = $(this).attr('name');
      });

      $('tr').on('click',$.proxy(function()
      {
        // clickID = $('tr').attr('id');
        // alert(clickID);
        if (clickID != undefined)
        {
          this._checkText.empty();
          this._checkText.append("你選擇的是編號" + clickName + '，是否同意這份申請？');
          this._bounce_check.modal('show');
        }
      },this));

// <<<<<<< HEAD
//       this._btnSubmit.on('click',$.proxy(function()
//       {
//         var lesson = { lessonID: clickID };
//         $.ajax({
//           type: "post",
//           url: "/auditpass",
//           data: JSON.stringify(lesson) ,
//           contentType: "application/json",
//           dataType: "json",
//           success: function(message){
//             if(message.success == 'yes')
//             {
//               layer.msg('<b>新增成功！</b>', {time: 1500, icon:1,shade:[0.5,'black']});
//             }
//             else if(message.success == 'no')
//             {
//               layer.msg('<b>後續的課程有重複資料，不得審核通過</b>', {time: 3000, icon:2,shade:[0.5,'black']});
// =======
      this._btnSubmit.on('click',$.proxy(function(){
        var objThis = this;
        bootbox.confirm({
          message:"確定申請課程嗎?",
          button:{
            confirm:{
                label:'確定申請',
                className:'btn-success'
            },
            cancel:{
                label:'取消',
                className:'btn-default'
            }
          },
            callback:function(e){
                if(e){

                  var lesson = { lessonID: clickID };
                  $.ajax({
                    type: "post",
                    url: "/auditpass",
                    data: JSON.stringify(lesson) ,
                    contentType: "application/json",
                    dataType: "json",
                    success: function(message){
                      if(message.success == 'yes')
                      {
                        layer.msg('<b>審核成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
                      }
                      else if(message.success == 'no')
                      {
                        layer.msg('<b>後續的課程有重複資料，不得審核通過</b>', {time: 1500, icon:2,shade:[0.5,'black']});
                      }
                    },
                    error: function (xhr)
                    {
                      alert('error: ' + xhr);console.log(xhr);
                      layer.msg('<b>好像出現了意外錯誤</b>', {time: 1500, icon:2,shade:[0.5,'black']});
                    }
                  });

                  objThis._bounce_check.modal("hide");
                }else{
                  bootbox.alert("取消了申請課程")
                }
            }


        })

      }, this));

      this._btnCancel.on('click',$.proxy(function()
      {
        this._bounce_check.modal("hide");
      }, this));
    },
    _check(){
    }
  }
  return _const;
}());

var aduit;
$(function(){
  aduit = new aduit();
})
