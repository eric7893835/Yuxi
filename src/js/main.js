var InsideN = 0;
$(function(){
	
	

	Hover($(".back-top"), "hover");
});

function Hover(obj, calssName) {
	obj.hover(function(){
		$(this).addClass(calssName);
	},function(){
		$(this).removeClass(calssName);
	})
}



