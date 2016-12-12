function stopDefault(e) {// 禁止浏览器默认行为
	var e= e || event;
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		window.event.returnValue = false;
	}

	return false;
}

//模拟滚动条
function ImitateScrollY(scrollBox, scrollObj, scrollBar, scrollBtn)
{//scrollBox被滚动对象外框，scrollObj被滚动对象，scrollBar滚动条块，滚动条按钮
	this.init(scrollBox, scrollObj, scrollBar, scrollBtn);
}

ImitateScrollY.prototype = {
	scale:function() {//被滚动对象与被滚动对象外框的高度比例计算
		return (this.scrollObj.scrollWidth/this.scrollBox.clientWidth);
	},
	scrollBtnMouseDown:function(ev) {//滚动按钮按下
		var _this = this;
		var disY = ev.clientX - this.scrollBtn.offsetLeft;//鼠标Y坐标距离滚动按钮头部的距离
		var maxTop =  this.scrollBar.clientWidth - this.scrollBtn.offsetWidth;

		document.onmousemove = function(ev) {
			if (document.all) {//ie 禁止选择
				document.body.onselectstart = new Function("return false");
			} else {// chrome, ff
				document.body.className = "chromeOnselectstart";
			}

			var oEvent = ev || event;
			var t = oEvent.clientX - disY;
			t = t>maxTop ? maxTop : t;
			t = t<0 ? 0 : t;

			 _this.scrollBtn.style.left = t + "px";
			 //_this.scrollObj.style.left = -t / _this.scrollBar.clientWidth * _this.scrollObj.scrollWidth + "px";
			  _this.scrollObj.style.left = -t / (_this.scrollBar.clientWidth-_this.scrollBtn.offsetWidth) * (_this.scrollObj.scrollWidth-_this.scrollBox.clientWidth) + "px";
		};
		document.onmouseup = function() {
			if (document.all) {//ie 解除禁止选择
				document.body.onselectstart = new Function("return true");
			} else {// chrome, ff
				document.body.className = "";
			}

			document.onmousemove = document.onmouseup = null;//清除move和up事件
		};
	},
	// scrollBoxMousewheel:function(ev) {//鼠标滚轮滚动
	// 	var direct = 0;
	// 	var topCur = this.scrollBtn.offsetLeft;
	// 	var maxTop =  this.scrollBar.clientWidth - this.scrollBtn.offsetWidth;
	// 	//滚轮每次滚动，滚动按钮该走的距离，测试chrome滚8次差不多一屏
	// 	var directTop = this.scrollBox.clientWidth / 8 / this.scrollObj.scrollWidth * this.scrollBar.clientWidth;
	// 	directTop = directTop>0 ? Math.ceil(directTop) : Math.floor(directTop);

	// 	stopDefault(ev);//禁止浏览器自身的滚动条滚动效果
	// 	if (ev.wheelDelta)  {//IE/Opera/Chrome 
	// 		direct = ev.wheelDelta;
	// 	} else if (ev.detail) {//Firefox 
	// 		direct = ev.detail * (-1);
	// 	}

	// 	if(parseFloat(direct) > 0) {
	// 		var topEnd = topCur - directTop;
	// 		if (topEnd < 0) {topEnd = 0;}
	// 	} else {
	// 		var topEnd = topCur + directTop;
	// 		topEnd = topEnd>maxTop ? maxTop : topEnd;
	// 	}

	// 	this.scrollBtn.style.left = topEnd + "px";
	// 	//this.scrollObj.style.left = -topEnd / this.scrollBar.clientWidth * this.scrollObj.scrollWidth + "px";
	// 	this.scrollObj.style.left = -topEnd / (this.scrollBar.clientWidth-this.scrollBtn.offsetWidth) * (this.scrollObj.scrollWidth-this.scrollBox.clientWidth) + "px";
	// },
	init:function(scrollBox, scrollObj, scrollBar, scrollBtn) {//初始化
		this.scrollBox = typeof scrollBox == "string" ? document.getElementById(scrollBox) : scrollBox;
		this.scrollObj = typeof scrollObj == "string" ? document.getElementById(scrollObj) : scrollObj;
		this.scrollBar = typeof scrollBar == "string" ? document.getElementById(scrollBar) : scrollBar;
		this.scrollBtn = typeof scrollBtn == "string" ? document.getElementById(scrollBtn) : scrollBtn;
		var scale = this.scale();////被滚动对象与被滚动对象外框的高度比例

		if (scale <= 1) {//判断是否达到产生滚动条的条件
			this.scrollBar.style.display = "none";
			this.scrollObj.style.width   = "100%";
			return;
		} else {
			this.scrollBar.style.display = "block";
		}

		// if(_this.scrollObj.scrollWidth+_this.scrollObj.offsetLeft < _this.scrollBox.clientWidth)
		// {//判断被滚动对象是否滚过头了
		// 	 _this.scrollObj.style.left = _this.scrollBox.clientWidth-_this.scrollObj.scrollWidth+"px";
		// }

		//初始化滚动按钮的高度和top值
		//this.scrollBtn.style.Width = 20 + "px"; //设定滚动按钮的高度
		//this.scrollBtn.style.left = -this.scrollObj.offsetLeft/this.scrollObj.scrollWidth*this.scrollBar.clientWidth + "px";

		var _this = this;
		this.scrollBtn.onmousedown = function(e) {//滚动按钮拖拽事件
			var e = e || event;
			_this.scrollBtnMouseDown(e);
		};

		//绑定滚轮事件
		// if (this.scrollBox.addEventListener) {//ff3.5以下
		// 	this.scrollBox.addEventListener("DOMMouseScroll", function(e) {
		// 		var e = e || event;
		// 		_this.scrollBoxMousewheel(e)
		// 	}, false);
		// }
		//W3C
		this.scrollBox.onmousewheel = function(e) {
			var e = e || event;
			_this.scrollBoxMousewheel(e)
		}; //IE/Opera/Chrome
	}
}


