// JavaScript Documen

//点击小图变大图的js
$(document).ready(function(){
		$(".small_pe div ul:first").addClass("small_peon");
		$(".img_box ul:not(:first)").hide();
		$(".small_pe div ul").click(function(){//小图片点击
			var smid=$(this).attr("id");
			var smnum=$(this).index();						
			if( !$(".small_pe div").is(":animated") ){						
				$(".small_pe div").animate({left:-84*smnum},function(){
					$(".small_pe div ul:lt("+smnum+")").appendTo(".small_pe div");
					$(".small_pe div ").css("left","0px");	
					$(".small_pe div ul:first").addClass("small_peon").siblings().removeClass("small_peon");
					$("#s"+smid).fadeIn().siblings().hide();						
				});									
			}												
		});
		
		$(".jtl").click(function(){//左箭头事件					
			if( !$(".small_pe div").is(":animated") ){
				$(".small_pe div").find("ul:last").prependTo(".small_pe div");
				$(".small_pe div").css("left","-84px");	
				$(".small_pe div").animate({left:"0px"});	
				$(".small_pe div ul:first").addClass("small_peon").siblings().removeClass("small_peon");
				var sid_t=$(".small_pe div ul:first").attr("id");
				$("#s"+sid_t).fadeIn().siblings().hide();													
			 }
		});	
		
		t = setInterval("auto_xc()", 3000);	//自动执行
		$(".small_box").hover(function(){clearInterval(t)}, function(){t = setInterval("auto_xc()", 3000);});//鼠标放上去取消自动执行，移开重新开始自动执行				
		$(".jtr").bind("click",auto_xc);//右箭头绑定anto_tc()函数	
							
	});
	function auto_xc(){	//自动执行事件函数									
		if( !$(".small_pe div").is(":animated") ){
			$(".small_pe div").animate({left:"-84px"},function(){
			$(".small_pe div").find("ul:first").appendTo(".small_pe div");
			$(".small_pe div").css("left","0px");	
				$(".small_pe div ul:first").addClass("small_peon").siblings().removeClass("small_peon");
				var sid_td=$(".small_pe div ul:first").attr("id");
				$("#s"+sid_td).fadeIn().siblings().hide();																
			});								
		}					
	};	
	
