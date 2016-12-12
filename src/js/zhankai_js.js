$(function(){
   var lirow=1;
   var liheight=$("#question1Q1a ul li").height();
   var liwidth=$("#question1Q1a ul li").width();
   var lilen=$("#question1Q1a ul li").length;
   var startheight=liheight*2;
   $("#question1Q1a ul").css("height",startheight+"px");
   
   var winw=$(window).width();
   var linum=parseInt(winw/liwidth);
   var rows=lilen/linum;
   var sumheight=liheight*rows;  
   $("#question1Q1Icon1").click(function(){
	   var ulheight=$("#question1Q1a ul").height();
	   var addheight=lirow*liheight;
	   var newheight=ulheight+addheight;
	   if(ulheight<sumheight){
	     $("#question1Q1a ul").animate({height:newheight+"px"},300);
	   }
   });
});


	
	
