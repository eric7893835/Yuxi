// JavaScript Document
	
 //banner   js


	
 //应用案例滚动js
$(function(){
			$('#marquee').kxbdMarquee({
				direction:'left',
				controlBtn:{left:'#goL',right:'#goR'},
				newAmount:10,
				eventA:'mouseenter',
				eventB:'mouseleave'
			});
			
		});
		
		
		
		
 //媒体中心滚动j		
	$(document).ready(function(){
	$(".jt_L").click(function(){//左箭头点击					
		if( !$(".jt_main ul").is(":animated") ){//只有在没有其它移动的情况下才能执行如下事件，防止出现混乱现象
			$(".jt_main ul").find("li:last").prependTo(".jt_main ul");//先将最后一个移到第一个
			$(".jt_main ul").css("left","-230px");//将ul的left左移76px、即一个li的总宽度
			$(".jt_main ul").animate({left:"0px"});	//效果通过animate改变left,从-76px变成0px
		 }
	});
	$(".jt_R").bind("click",jt_auto);//右箭头绑定jt_auto函数事件
	jt_t = setInterval("jt_auto()", 3000);//自动执行jt_auto函数，这里命名是为了方便下面取消函数
	$(".jt_box").hover(function(){clearInterval(jt_t)}, //当鼠标在这一块的时候停止执行自动执行函数
	function(){jt_t = setInterval("jt_auto()", 3000);});//鼠标移开的时候继续执行自动执行函数
});
function jt_auto(){
	if( !$(".jt_main ul").is(":animated") ){
		$(".jt_main ul").animate({left:"-230px"},function(){//先animate左移
		$(".jt_main ul").find("li:first").appendTo(".jt_main ul");//再将第一个移到最后一个
		$(".jt_main ul").css("left","0px");//将其left还原为0
		});
	}			
}
window.onload=function(){for(var ii=0; ii<document.links.length; ii++)document.links[ii].onfocus=function(){this.blur()}}	