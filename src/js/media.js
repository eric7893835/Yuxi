//响应式nav
// JavaScript Document
function openmenu(){
	   var winw=$(window).width();
	   if(winw<=1024){
		   var isshow=$(".btn ul").css("display");
		   //alert(isshow);
		   if(isshow=="block"){
		      $(".btn ul").slideUp(300);
		   }
		   if(isshow=="none"){
		      $(".btn ul").slideDown(300);
		   }
	   }
}
$(function(){
   var winw=$(window).width();
   if(winw<=1024){
      $(".viewport").addClass("viewport_media");
	  $(".viewport").removeClass("viewport");
   }
});