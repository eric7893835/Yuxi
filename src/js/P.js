$(document).ready(function(e) {
	//
	$("body").prepend($("#MBox"));
	//
	$(".ny_banner").after($("#Sort"));
	
	//\\
	$(".MMenu_Btn,.MBg").click(function(){
		$(".MMenu_Drop").slideToggle();
		$(".MBg").toggleClass("MBg_");
	});
	//\\
	$(".MMenu_Item").click(function(){
		var index=$(".MMenu_Item").index(this);
		
		$(".MMenu2_Drop").slideToggle();
	});
});