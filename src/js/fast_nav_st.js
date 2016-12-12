// JavaScript Document
var strBarHref = window.location.href;
var $ = jQuery;

$(document).ready(function () {
    var barHtml = '<div class="fast_nav">';
    $("body").append(barHtml);
    var VideoHtml = '<div id="popVideoDivWrap" style="display:none;">';
    VideoHtml += '<div class="f_close"><div class="closeclass"></div></div>';
    VideoHtml += '<div id="popVideoDiv" style="width:782px;height:441px;background-color:#000;"></div>';
    VideoHtml += '</div>';
    $("body").append(VideoHtml);
});

// 点击调用方法。 openUrl=打开链接参数  openType=打开方式(1代表flash,2代表新窗口)
function fastShowDialog(openUrl, openType, option) {
    option=$.extend(option,{preview:"",movieId:""});
    if (openType == 1) {
        $("#popVideoDivWrap").css("width", "823px");
        $("#popVideoDiv").css("width", "782px");
        $("#popVideoDiv").css("height", "441px");
        $("#popVideoDiv").css("float", "left");
        $(".f_close").css("float", "right");

        popupedObj = popup('#popVideoDivWrap', $('#fast_nav_vide'));
        var so = new SWFObject('video_new/pl.swf', 'popVideoDiv', '782', '441', '9', '#000');
        so.addParam('allowfullscreen', 'true');
        so.addParam('allowscriptaccess', 'always');
        so.addVariable('file', openUrl);//'a77_416x235.flv'
        so.addVariable('image', 'video_new/' + option.preview);//preview.jpg
        so.addVariable('movieId', 'video_new/' + option.movieId);//movieId
        so.addVariable('skin', 'video_new/skin/sony.zip');
        so.addVariable('autostart', 'true');
        //    if (autoClose) {
        so.addVariable('completeHandle', 'closeDialogOnVideoComplete');
        // }

        so.write('popVideoDiv');

    }
    else if (openType == 2) {
        window.open(openUrl);
    }
    else if (openType == 3) {
		$("#popVideoDiv").html("");
        $("#popVideoDivWrap").css("width", "1011px");
        $("#popVideoDiv").css("width", "970px");
        $("#popVideoDiv").css("height", "580px");
        $("#popVideoDiv").css("float", "left");
        $(".f_close").css("float", "right");
        popupedObj = popup('#popVideoDivWrap', undefined);
		//alert(openUrl);
        var strIfm = '<iframe src="' + openUrl + '" frameborder="0" scrolling="none" width="100%" height="100%" style="background-color:#fff;" ></iframe>';
        $("#popVideoDiv").html(strIfm);
    }
}
var console;
if (console == undefined) {
    console = {log:function () {
    }};
}

function popup(id, from) {
    var _this = this;
    var _from = from;
    // alert(_from);
    var $window = $(window);
    var $body = $('body');
    var $popupContainer = $(id);
    var broVer = $.browser.version;
	var $popupMask = $("<div class='eaMask'></div>").appendTo($body);
	
    function open() {
        $('.fast_nav').css({"z-index":"9999"});
        //css
        $body.css({ position:'relative', 'z-index':'888' });
        $popupMask.stop().css({
            position:'absolute',
            'z-index':'99990',
            /* cursor:'wait',*/
            left:'0',
            top:'0',
            width:'100%',

            display:'none',
            background:'#202020',

            filter:'alpha(opacity=75)',
            '-moz-opacity':'0.75',
            opacity:'0.75'
        });
        //
        $popupContainer.stop().css({
            display:'none',
            position:'absolute',
            'z-index':'99999'
        });
        //
        //event
        $window.resize(resize);
        $window.bind('scroll', resize);
        resize();
        //show;
        $popupMask.fadeIn(200);
        $popupContainer.fadeIn(200);
        //close/
        $(".popClose").click(close);
        $popupMask.click(close);
    }

    var hasClose = false;

    function close() {
        if (hasClose) return;
        hasClose = true;
        //alert(_from);
        $(window).unbind("resize");
        $window.unbind('scroll', resize);
        //
        $(".popClose").unbind('click');
        $popupMask.unbind('click');
        //
        //动画
        if (_from != undefined && _from.size() > 0) {
            var top = ( _from.offset().top + _from.height() / 2);
            var left = (_from.offset().left + _from.width() / 2);
            //console.log(top);
            //console.log(left);
            $popupContainer.css('overflow', 'hidden')
                .animate({width:'0px', height:'0px',
                    top:top + 'px',
                    left:left + 'px'
                },
                {duration:1000, complete:function () {
                    $(this).css({width:'auto', height:'auto'});
                    $(this).css('display', 'none');
                    $("#popVideoDiv").empty();
                }});
        } else {
            $popupContainer.hide();
        }
        //end动画

        $('.eaMask').fadeOut(200, function () {
            $(this).remove();
            $('select').css({visibility:'visible'})
        });
    }


    function resize() {
        //
        var bodyHeight = $body.height();
        var browserHeight = $window.height();
        if (browserHeight > bodyHeight) {
            var maskHeight = browserHeight;
        } else {
            maskHeight = bodyHeight;
        }
        $popupMask.css({ height:maskHeight + 'px' });
        //
        /*console.log('----');
         console.log($popupContainer.width());
         console.log($window.width());*/
        setToFixPosition($popupContainer,
            ($window.width() - $popupContainer.width()) / 2,
            ($window.height() - $popupContainer.height()) / 2
        )
    }

    ///

    function setToFixPosition($div, left, top) {
        top = top + $window.scrollTop();
        left = left + $window.scrollLeft();
        $div.css({top:top + 'px', left:left + 'px'})
    }
	
    open();
	
	displayImg();
	function displayImg(){
		if(document.body.scrollWidth<960){
			$(".eaMask").css("display","none");
		}else{
			$(".eaMask").css("display","block");
		}
	}
    return {
        close:close
    }
}
function LayerHide(){
   $(".eaMask").click();
}