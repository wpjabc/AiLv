/**
 * Created by Administrator on 2017/11/16.
 */

window.onload = function () {

  reset();

  function reset(){

    var autoRem = document.documentElement.clientWidth/20;

    document.getElementsByTagName('html')[0].style.fontSize = autoRem + 'px';

  }

  window.onresize = function (){

    reset();

  }


  // $('.footer-nav li').tap(function () {
  //   for(var i=0;i<$('.footer-nav li').length;i++){
  //     $('.footer-nav li').eq(i).css({'color':'#000'});
  //   }
  //   $(this).css({'color':'red'});
  // })




}
