var feedback = (function(){
  var _const;
  _const = function(){
    this._construct();
  }
  _const.prototype = {
    _construct:function(){


      this._addOpinion = $("#addOpinion");
      this._close = $(".close");
      this._feedback_box = $('#feedback_box');
      this._replyBtn = $("#replyBtn");
      this._responseBtn = $("#responseBtn");

      this._form_title = $(".form_title");
      this._form_text = $(".form_text");
      this._form_option = $(".form_option");
      this._opinionTitle = $("#opinionTitle");
      this._opinionText = $("#opinionText");
      this._opinionOption = $("#opinionOption");
      this._tablet = $('.tablet');  //標題id
      this._feedback = $("#feedback");
      this._feedbackNum = $("#feedbackNum");
      this.id = 1;

      this._opinionList = $("#opinionList");
      this._loadingList = $("#loadingList");
      this._nobodyList = $("#nobodyList");
      this._optionDetail = $("#optionDetail");
      this._start();
    },

    _start:function(){
      var objThis = this;

      this._loadingList.hide();
      this._nobodyList.hide();
      objThis._initialAll();

      objThis._setOpinionList();    //取得意見列表
    },

    _initialAll:function(){

      //管理員回覆意見
      this._responseBtn.on("click",$.proxy(function(e){
        var objThis = this;
        $(e.currentTarget).button("loading");
        var check = true;
        //判斷是否空值
        if(this._opinionText.val() ==  ""){
            this._form_text.addClass("has-error");
            $(e.currentTarget).button("reset");
            check = false;
        }else{
            this._form_text.removeClass("has-error");
        }
        if(check){
            var id = this._tablet.html();
            var response = this._opinionText.val();
            objThis._submitResponse(id,response);

        }else{
          layer.msg('<b>請回覆意見</b>', {time: 1500, icon:2,shade:[0.5,'black']});
        }
        $(e.currentTarget).button("reset");

      },this))
      //回覆意見
      this._feedback.on("mouseover",$.proxy(function(e){
        layer.tips('回覆意見', $("#feedback") ,{tips:3,time:1000});
      },this));
      //回覆意見
      // this._feedback.on("click",$.proxy(function(e){
      //   this._feedback_box.slideToggle();
      // },this));

      //填寫意見
      this._addOpinion.on("mouseover",$.proxy(function(e){
        layer.tips('填寫意見', $("#addOpinion") ,{tips:3,time:1000});
      },this));
      //填寫意見
      this._addOpinion.on("click",$.proxy(function(e){
        this._getOpinionID()
        this._opinionTitle.val('');
        this._opinionText.val('');
        this._opinionOption.val('請選擇');

        this._feedbackNum.html("0");
        this._form_title.removeClass("has-error");
        this._form_text.removeClass("has-error");
        this._form_option.removeClass("has-error");
        this._feedback_box.slideToggle();
      },this));

      //提交意見
      this._replyBtn.on("click",$.proxy(function(e){
        var objThis = this;
        $(e.currentTarget).button("loading");
        var check = true;
        //判斷是否空值
        if(this._opinionTitle.val() ==  ""){
            this._form_title.addClass("has-error");
            $(e.currentTarget).button("reset");
            check = false;
        }else{
            this._form_title.removeClass("has-error");
        }

        if(this._opinionText.val() == ""){
          this._form_text.addClass("has-error");
          $(e.currentTarget).button("reset");
          check = false;
        }else{
          this._form_text.removeClass("has-error");
        }

        if(this._opinionOption.val() == "請選擇"){
          this._form_option.addClass("has-error");
          $(e.currentTarget).button("reset");
          check = false;
        }else{
          this._form_option.removeClass("has-error");
        }
        if(check){
            var id = this._tablet.html();
            var title = this._opinionTitle.val();
            var text = this._opinionText.val();
            var option = this._opinionOption.val();
            objThis._submitOpinion(id,title,text,option);

        }else{
          layer.msg('<b>請輸入意見標題、內容、選擇選項</b>', {time: 1500, icon:2,shade:[0.5,'black']});
        }
        $(e.currentTarget).button("reset");
      },this));

      //
      this._opinionTitle.on("blur",$.proxy(function(e){
        if($(e.currentTarget).val() != ""){
          this._form_title.removeClass("has-error");
        }
      },this));
      //
      this._opinionText.on("blur",$.proxy(function(e){
        if($(e.currentTarget).val() != ""){
          this._form_text.removeClass("has-error");
        }
      },this));
      //
      this._opinionOption.on("change",$.proxy(function(e){
        if($(e.currentTarget).val() != "請選擇"){
          this._form_option.removeClass("has-error");
        }
      },this));
    },
    //取得ID
    _getOpinionID:function(){
      var Path = this._getPath();
      var maxid = 1;
      var objThis = this;

      firebase.database().ref(Path).once('value').then(function(snapshot){
        var data = snapshot.val();
        // console.log(data)
        $.each(data,function(i,v){
          if(v.id >= maxid){
            maxid = Number(v.id) + 1;
            // console.log(maxid)
            objThis.id = maxid;
          }
        });
        objThis._tablet.html(objThis.id);
      })

    },
    _submitOpinion:function(id,title,text,option){
        var Path = this._getPath();
         //取得現在時間
         var today = new Date();
         var nowTime = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
         var ConverTime = new Date(nowTime).getTime();


         var postData = {
             id:id,
             title: title,
             text:text,
             option:option,
             createTime: ConverTime,
             responseTime:'',
             responseAdmin:'',
             user: $("#user").html(),
             feedback:""
         };


         firebase.database().ref(Path).push(postData);
         layer.msg('<b>新增意見成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
         this._feedback_box.hide();
    },
    _submitResponse:function(id,response){
      var objThis = this;
      var Path = this._getPath();
      var key;
      //取得現在時間
      var today = new Date();
      var nowTime = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var ConverTime = new Date(nowTime).getTime();

      var postData = {
          id:id,
          responseTime:ConverTime,
          responseAdmin: $("#user").html(),
          feedback:response
      };


      firebase.database().ref(Path).once('value').then(function(e){
        var data = e.val();
        $.each(data,function(i,v){
          $.each(v,function(n,m){
            if(n == 'id' && m == id){
              key = i;
              firebase.database().ref(Path + '/' + key).update(postData);

              layer.msg('<b>回覆意見成功</b>', {time: 1500, icon:1,shade:[0.5,'black']});
              objThis._setOpinionList();
              objThis._feedback_box.hide();
            }
          })
        });
      })


    },
    _setOpinionList:function(){
      var Path = this._getPath();
      var objThis = this;
      var _tr;
      var _td;

      objThis._loadingList.show();
      objThis._nobodyList.hide();

      objThis._opinionList.empty();
      firebase.database().ref(Path).once('value').then(function(snapshot){
        var data = snapshot.val();
        // console.log(data)
        if(data == null){
          objThis._loadingList.hide();
          objThis._nobodyList.show();
        }
        $.each(data,function(i,v){
          _tr = $("<tr />");

          //編號
          _td = $("<td />",{"text":v.id});
          _tr.append(_td);
          //意見者
          _td = $("<td />",{"text":v.user})
          _tr.append(_td);

          //標題
          _td = $("<td />",{"text":v.title})
          _tr.append(_td);

          //選項
          _td = $("<td />",{"text":v.option})
          _tr.append(_td);

          //內容
          var content='';
          if(v.text.length > 10){
            content = v.text.substr(0,10) + "...";
          }else{
            content = v.text
          }
          _td = $("<td />",{"text":content})
          _tr.append(_td);

          //意見時間
          var cTime = new Date(v.createTime).toLocaleString();
          cTime = cTime.replace(/\-/g,'/')
          _td = $("<td />",{"text":cTime})
          _tr.append(_td);
          //狀態
          if(v.feedback == ''){
            _input = $("<span />",{"text":"未回覆","class":"label label-default btn-embossed","style":"font-size:100%;"})
          }else{
            _input = $("<span />",{"text":"已回覆","class":"label label-primary btn-embossed","style":"font-size:100%;"})
          }
          _td = $("<td />");
          _td.append(_input);
          _tr.append(_td);

          //詳細
          if(v.feedback == ''){
            _input =$("<span />",{"text":"回覆意見","class":"label label-info btn-embossed","style":"font-size:100%;"});
            _input.bind("click",function(){
                objThis._optionDetail
                    .empty()
                    .append("<font>意見編號:" + v.id+ "</font><br/><br/>" +
                            "<font>提供意見者:" + v.user+ "</font><br/><br/>" +
                            "<font>意見標題:" + v.title+ "</font><br/><br/>" +
                            "<font>意見選項:" + v.option+ "</font><br/><br/>" +
                            "<font>意見內容:" + v.text+ "</font><br/><br/>" +
                            "<font>意見時間:" + cTime+ "</font><br/>");
                objThis._form_text.removeClass("has-error");
                objThis._opinionText.val('');
                objThis._feedbackNum.html("0");
                objThis._tablet.html(v.id)
                objThis._responseBtn.show();
                objThis._replyBtn.hide();
                objThis._feedback_box.slideToggle();

            })
          }else{
            _input =$("<span />",{"text":"查看意見","class":"label label-default btn-embossed","style":"font-size:100%;"});
            _input.bind("click",function(){
                bootbox.alert("<b style='font-size:20px;'>查看意見 #" + v.id + "</b><hr/>" +
                      "意見編號" + v.id +
                      "<br/><br/>提供意見者:" + v.user +
                      "<br/><br/>意見標題:" + v.title +
                      "<br/><br/>意見選項:" + v.option+
                      "<br/><br/>意見內容:" + v.text+
                      "<br/><br/>意見時間:" + cTime)
                    })
          }
          _td = $("<td />")
          _td.append(_input)
          _tr.append(_td);



          objThis._nobodyList.hide();

          objThis._opinionList.append(_tr);

        });
      })
      objThis._loadingList.hide();

      setTimeout("feedback._setOpinionList()",60000)     //取得意見列表1分鐘
    },
    //取得路徑
    _getPath: function () {
        this.Path = "/feedback";
        return this.Path;
    }
  }
  return _const;
}());

var feedback;
$(function(){
  feedback = new feedback();
})


function checkNum() {
    if ($('#opinionText').val().length > 255) {
        $('#opinionText').val($('#opinionText').val().substring(0, 255));
        bootbox.alert("字數不可超過255個");
    }
    $("#feedbackNum").html($('#opinionText').val().length);
}
