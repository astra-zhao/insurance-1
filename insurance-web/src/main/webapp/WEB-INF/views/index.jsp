<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>主页</title>
<script type="text/javascript">
	//平台、设备和操作系统
	var system = {
		win : false,
		mac : false,
		xll : false,
		ipad : false
	};
	//检测平台
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
	//跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
	if (system.win || system.mac || system.xll || system.ipad) {
		window.location.href = "html5/index.html";
	} else {
		window.location.href = "html5/index.html";
	}
</script>
</head>
<body>
	<!--[if lte IE 7]>
    <div id="ie6-warning"><p>您正在使用 低版本浏览器，在本页面可能会导致部分功能无法使用。建议您升级到 <a href="http://www.microsoft.com/china/windows/internet-explorer/" target="_blank">Internet Explorer 8</a> 或以下浏览器：
    <a href="http://www.mozillaonline.com/" target="_blank">Firefox</a> / <a href="http://www.google.com/chrome/?hl=zh-CN" target="_blank">Chrome</a> / <a href="http://www.apple.com.cn/safari/" target="_blank">Safari</a> / <a href="http://www.operachina.com/" target="_blank">Opera</a></p></div>
    <![endif]-->

	<style>
/*ie6提示*/
#ie6-warning {
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: #fae692;
	padding: 5px 0;
	font-size: 12px
}

#ie6-warning p {
	width: 960px;
	margin: 0 auto;
}
</style>
</body>
</html>