$(function(){
  $("#top").click(function(){
    $("html,body").animate({scrollTop:0},'slow');
  })

  if($("#hiddenIdentity").val() == '管理員') {
      $("#user").attr({"class":"label label-success","style":"cursor:pointer;font-size:100%;"})
  }else{
    $("#user").attr({"class":"label label-info","style":"cursor:pointer;font-size:100%;"})
  }
  $("#user").on("mouseover",function(){
    layer.tips('最高管理者', $("#user") ,{tips:3,time:1000});
  })


  showTime();
});

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

  // $('#time').append('今天日期:' + nowTime.getFullYear() + '/' + (nowTime.getMonth()+1)
  // + '/' + nowTime.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':'
  // + now.getSeconds());
  // setTimeout('showTime()',1000)
}

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
