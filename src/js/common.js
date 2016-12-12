
var isIE6 = !-[1,] && !window.XMLHttpRequest,
	isIE = !!window.ActiveXObject,
	isIE7 = isIE && navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE7.0";

/******************************************
***										***
***			 寄生组合式继承 	 		***
***										***
******************************************/
function inheritPrototype(subType, superType) {
    function F(){};
    F.prototype = superType.prototype;

    var prototype = new F();

    prototype.constructor = subType;	//增强对象
    subType.prototype = prototype;		//指定对象
}





// 禁止浏览器默认行为
function stopDefault(e) {
	var e= e || event;
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		window.event.returnValue = false;
	}

	return false;
}

/******************************************
***										***
***				模拟滚动条				***
***										***
******************************************/
function ImitateScroll(scrollBox, scrollObj, scrollBar, scrollBtn) {//scrollBox被滚动对象外框，scrollObj被滚动对象，scrollBar滚动条块，滚动条按钮
	this.init(scrollBox, scrollObj, scrollBar, scrollBtn);
}

ImitateScroll.prototype = {
	scale:function() {//被滚动对象与被滚动对象外框的高度比例计算
		return (this.scrollObj.scrollHeight/this.scrollBox.clientHeight);
	},
	scrollBtnMouseDown:function(ev) {//滚动按钮按下
		var _this = this;
		var disY = ev.clientY - this.scrollBtn.offsetTop;//鼠标Y坐标距离滚动按钮头部的距离
		var maxTop =  this.scrollBar.clientHeight - this.scrollBtn.offsetHeight;

		document.onmousemove = function(ev) {
			if (document.all) {//ie 禁止选择
				document.body.onselectstart = new Function("return false");
			} else {// chrome, ff
				$("body").addClass("chromeOnselectstart")
			}

			var oEvent = ev || event;
			var t = oEvent.clientY - disY;
			t = t>maxTop ? maxTop : t;
			t = t<0 ? 0 : t;

			 _this.scrollBtn.style.top = t + "px";
			 _this.scrollObj.style.top = -t / _this.scrollBar.clientHeight * _this.scrollObj.scrollHeight + "px";
		};
		document.onmouseup = function() {
			if (document.all) {//ie 解除禁止选择
				document.body.onselectstart = new Function("return true");
			} else {// chrome, ff
				$("body").removeClass("chromeOnselectstart")
			}

			document.onmousemove = document.onmouseup = null;//清除move和up事件
		};
	},
	scrollBoxMousewheel:function(ev) {//鼠标滚轮滚动
		var direct = 0;
		var topCur = this.scrollBtn.offsetTop;
		var maxTop =  this.scrollBar.clientHeight - this.scrollBtn.offsetHeight;
		//滚轮每次滚动，滚动按钮该走的距离，测试chrome滚8次差不多一屏
		var directTop = this.scrollBox.clientHeight / 8 / this.scrollObj.scrollHeight * this.scrollBar.clientHeight;
		directTop = directTop>0 ? Math.ceil(directTop) : Math.floor(directTop);

		stopDefault(ev);//禁止浏览器自身的滚动条滚动效果
		if (ev.wheelDelta)  {//IE/Opera/Chrome 
			direct = ev.wheelDelta;
		} else if (ev.detail) {//Firefox 
			direct = ev.detail * (-1);
		}

		if(parseFloat(direct) > 0) {
			var topEnd = topCur - directTop;
			if (topEnd < 0) {topEnd = 0;}
		} else {
			var topEnd = topCur + directTop;
			topEnd = topEnd>maxTop ? maxTop : topEnd;
		}

		this.scrollBtn.style.top = topEnd + "px";
		this.scrollObj.style.top = -topEnd / this.scrollBar.clientHeight * this.scrollObj.scrollHeight + "px";
	},
	init:function(scrollBox, scrollObj, scrollBar, scrollBtn) {//初始化
		this.scrollBox = typeof scrollBox == "string" ? document.getElementById(scrollBox) : scrollBox;
		this.scrollObj = typeof scrollObj == "string" ? document.getElementById(scrollObj) : scrollObj;
		this.scrollBar = typeof scrollBar == "string" ? document.getElementById(scrollBar) : scrollBar;
		this.scrollBtn = typeof scrollBtn == "string" ? document.getElementById(scrollBtn) : scrollBtn;
		var scale = this.scale();////被滚动对象与被滚动对象外框的高度比例

		if (scale <= 1) {//判断是否达到产生滚动条的条件
			this.scrollBar.style.display = "none";
			return;
		} else {
			this.scrollBar.style.display = "block";
		}

		// if(_this.scrollObj.scrollHeight+_this.scrollObj.offsetTop < _this.scrollBox.clientHeight)
		// {//判断被滚动对象是否滚过头了
		// 	 _this.scrollObj.style.top = _this.scrollBox.clientHeight-_this.scrollObj.scrollHeight+"px";
		// }

		//初始化滚动按钮的高度和top值
		this.scrollBtn.style.height = this.scrollBar.clientHeight / scale + "px";//设定滚动按钮的高度
		//this.scrollBtn.style.top = -this.scrollObj.offsetTop/this.scrollObj.scrollHeight*this.scrollBar.clientHeight + "px";

		var _this = this;
		this.scrollBtn.onmousedown = function(e) {//滚动按钮拖拽事件
			var e = e || event;
			_this.scrollBtnMouseDown(e);
		};

		//绑定滚轮事件
		if (this.scrollBox.addEventListener) {//ff3.5以下
			this.scrollBox.addEventListener("DOMMouseScroll", function(e) {
				var e = e || event;
				_this.scrollBoxMousewheel(e)
			}, false);
		}
		//W3C
		this.scrollBox.onmousewheel = function(e) {
			var e = e || event;
			_this.scrollBoxMousewheel(e)
		}; //IE/Opera/Chrome
	}
}

/******************************************
***										***
***				移动上去上移10px		***
***										***
******************************************/
function topMove(el, topTarget) {
	topTarget = topTarget || 5;

	$(el).css("position", "relative").hover(function() {

		$(this).stop().animate({top: -topTarget}, 300);
	}, function() {

		$(this).stop().animate({top: 0}, 300);
	});
};


/******************************************
***										***
***				滚动到位置				***
***										***
******************************************/
function scrollTo(target, time) {
	var $html = $("html, body")
		time = time || 1000;

	// 判断传入的是一个数字还是一个对象
	switch (typeof target) {

		case "number": 
			break;

		default:
			target = $(target).offset().top;
	}

	// 滚动过程中手动触发了滚轮事件，则停止滚动
	$html.on("mousewheel.scrollTo", function() {
		$("html, body").stop();
		$html.off("mousewheel.scrollTo");
	});

	// 开始滚动
	$("html, body").animate({scrollTop: target}, time, "easeInOutCubic", function() {
		
		$html.off("mousewheel.scrollTo");
	});
}


/******************************************
***										***
***				图片占满				***
***										***
******************************************/
function imgFull(imgParent) {
	/***** 图片尺寸自适应父级容器，不变形
	* 不固定尺寸图片，确保在父级撑满
	* 如：图片高度比例小，则高度撑满，宽度超出截取
	* imgParent: 需要自适应的图片的父容器，也可为一组图片的祖先容器
	* 图片只撑满父级，非祖先级别
	*/

	// 获取图片，如未传入参数，则获取data-img=full的图片
	var $imgArr = imgParent ? $(imgParent).find("img") : $("[data-img=full]"),
		len = $imgArr.length,
		i = 0;

	// 图片压缩(拉伸)裁剪
	function init() {
		var width = $(this).width(),
			height = $(this).height(),
			$parent = $(this).parent(),
			parentWidth = $parent.width(),
			parentHeight = $parent.height();

		// 判断长宽比例
		if (width/parentWidth < height/parentHeight) {

			$(this).width(parentWidth);
			$(this).height("auto");
			//alert(this.src);
			$(this).css({"position": "absolute", "left": "0", "top": -($(this).height() - parentHeight)/2});
		} else {

			$(this).width("auto");
			$(this).height(parentHeight);
			$(this).css({"position": "absolute", "top": "0", "left": -($(this).width()- parentWidth)/2});
		}

		// 判断是否加载完，隐藏loading图标
		if (++i == len) {
			removeLoading();
		}

		//$(this).stop().animate({opacity: 1}, 500);	
	}

	$imgArr.each(function() {
		var $parent = $(this).parent(),
			img = new Image(),
			$self = $(this);

		// 初始化父级超出隐藏
		$parent.css({"overflow": "hidden"});

		if ($parent.css("position") != "absolute") {

			$parent.css({"position": "relative"});
		}
		init.call($self[0]);
		// 图片加载完成执行压缩
		img.onload = img.onComplete = function() {

			init.call($self[0]);
			this.onload = this.onerror = null;
			img = null;
		};

		img.onerror = function() {

			img.onload = img.onerror = null;
			img = null;
		}

		img.src = $(this).attr("src");
	});
}
/******************************************
***										***
***				loading移除				***
***										***
******************************************/
function removeLoading() {
	$("body").css("overflow", "visible");
	$("#loading").fadeOut();
};

$(function() {
	if ($("#loading")[0]) {
		$("body").css("overflow", "hidden");
	}
});

/******************************************
***										***
***				导航区域自动收缩		***
***										***
******************************************/
var packupHeader,
	expansionHeader;

$(function() {

	/***** header ******************/ 
	(function() {
		var $header = $(".header"),
			$logo = $header.find(".logo a"),
			
			isExpansion = true;

		packupHeader = function() {

			
			//$header.stop().animate({height:63}, 800, "easeInOutCubic");
			//$logo.stop().animate({height: 45}, 800, "easeInOutCubic");
			isExpansion = false;
		};
		expansionHeader = function() {

			if (isIE6) {return;}
			//$header.stop().animate({height: 63}, 400, "easeInOutCubic");
			//$logo.stop().animate({height: 70}, 400, "easeInOutCubic");
			
			isExpansion = true;
		};
		$(window).on("scroll", function() {
			var scrollTop = $(this).scrollTop();

			if (scrollTop >= 400 && isExpansion) {

				packupHeader();
			} else if (scrollTop < 400 && isExpansion == false) {

				expansionHeader();
			}
		});
	})();
});

// Header
$(function(){

	// Header
	(function() {
		var $navLi = $(".nav li"),
			$proseMenu = $(".prosemenu"),
			$ulWrap = $(".prosemenuUl"),
			$ul = $ulWrap.find("ul"),
			isExpansion = false,
			expansionType = 0,
			$proseTopA = $(".prosemenuTop dd a"),
			$proseBottomA = $(".prosemenuBot dd a");

		// Header Other
		$navLi.hover(function(){
			var _height = $(this).find(".semenu").find(".semenuMid a").size()*36 + 17;

			$(this).find(".semenu").stop().animate({"height":_height},200);	
		}, function(){
			$(this).find(".semenu").stop().animate({"height":"0"},200);
		});

		$(".semenu a").on("click", function() {
			$(".semenu").stop().animate({"height":"0"},200);
		});

		// Header VEHICLES
		$navLi.eq(2).on("mouseleave", function() {

			$proseMenu.stop().animate({height: 0}, 200).hide();
		}).find(".nav-tl").on("mouseenter", function () {

			$proseMenu.stop().show().animate({height: 295}, 200);
		});

		// 初始化ul的宽度
		$ul.each(function() {

			$(this).width(function() {
				var $li = $(this).find("li");

				return $li.outerWidth()*$li.length;
			});
		});

		var timer;

		// 隐藏$ulWrap
		function hideUlWrap() {
			timer = window.setTimeout(function() {
				$proseTopA.removeClass("cur");
				$proseBottomA.removeClass("cur");
				$ulWrap.stop().animate({height: 0}, 500, function() {
					$proseMenu.height(295);
					isExpansion = false;
					expansionType = 0;
				});
			}, 10);
		};

		$proseTopA.hover(function() {
			var index = $(this).index();

			clearTimeout(timer);
			$proseMenu.height(522);
			$proseTopA.removeClass("cur");
			$proseBottomA.removeClass("cur");
			$(this).addClass("cur");

			// 判断显示的是哪屏 
			if (expansionType != 1) {
				
				$ulWrap.find("ul").eq(0).css({left: -950*index});
				$ulWrap.find("ul").eq(1).stop();
			} else {

				$ulWrap.find("ul").eq(0).stop().animate({left: -950*index}, 500, "easeInOutCubic");
			}

			// 判断默认是否展开
			if (isExpansion) {
				$ulWrap.stop().animate({scrollTop: 0, height: 227}, 500);
			} else {
				$ulWrap.scrollTop(0);		
				$ulWrap.stop().animate({height: 227}, 500);
				isExpansion = true;
			}
			expansionType = 1;
		}, function() {

			hideUlWrap();
		});

		$proseBottomA.hover(function() {
			var index = $(this).index();

			clearTimeout(timer);
			$proseMenu.height(522);
			$proseTopA.removeClass("cur");
			$proseBottomA.removeClass("cur");
			$(this).addClass("cur");

			// 判断显示的是哪屏 
			if (expansionType != 2) {

				$ulWrap.find("ul").eq(0).stop();
				$ulWrap.find("ul").eq(1).css({left: -950*index});
			} else {

				$ulWrap.find("ul").eq(1).stop().animate({left: -950*index}, 500, "easeInOutCubic");
			}
			// 判断默认是否展开
			if (isExpansion) {
				$ulWrap.stop().animate({scrollTop: 227, height: 227}, 500);
			} else {
				$ulWrap.scrollTop(227);
				$ulWrap.stop().animate({height: 227}, 500);
				isExpansion = true;
			}
			expansionType = 2;

		}, function() {

			hideUlWrap();
		});

		$ulWrap.hover(function() {
			clearTimeout(timer);
		}, function() {
			hideUlWrap();
		});
	})();

	
});
