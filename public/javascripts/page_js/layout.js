$(function(){
  $("#top").click(function(){
    $("html,body").animate({scrollTop:0},'slow');
  })

  if($("#hiddenIdentity").val() == '管理員') {
      $("#user").attr({"class":"label label-success","style":"font-size:100%;"})
      $("#user").bind("mouseover",function(){
        layer.tips('最高管理者', $("#user") ,{tips:3,time:1000});
      })
  }else{
    $("#user").attr({"class":"label label-info","style":"font-size:100%;"})
    $("#user").bind("mouseover",function(){
      layer.tips('使用者', $("#user") ,{tips:3,time:1000});
    })
  }

  showTime();
});
//取得時間
function showTime(){
  var nowTime = new Date();

  var year = nowTime.getFullYear();
  var month = nowTime.getMonth() + 1;
  var day = nowTime.getDate();
  var h = padLeft(nowTime.getHours());
  var m = padLeft(nowTime.getMinutes());
  var s = padLeft(nowTime.getSeconds());
  $('#time').empty().append( "現在時間：" + year + '/' + month + '/' + day + '&nbsp;&nbsp;&nbsp;' + h + ':' + m + ':' + s)
  setTimeout('showTime()',1000);

}
//時間補0
function padLeft(num){
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
