<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/pc/common/top.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<jsp:include page="/pc/common/head.jsp"></jsp:include>
<STYLE>
* {
	PADDING-RIGHT: 0 px;
	PADDING-LEFT: 0 px;
	PADDING-BOTTOM: 0 px;
	MARGIN: 0 px;
	PADDING-TOP: 0 px
}

BODY {
	BACKGROUND: #dad9d7;
	FONT-FAMILY: "微软雅黑"
}

IMG {
	BORDER-TOP-STYLE: none;
	BORDER-RIGHT-STYLE: none;
	BORDER-LEFT-STYLE: none;
	BORDER-BOTTOM-STYLE: none
}

A {
	CURSOR: pointer
}

A {
	TEXT-DECORATION: none;
	outline: none
}

A:hover {
	TEXT-DECORATION: underline
}

.cf:unknown {
	CLEAR: both;
	DISPLAY: block;
	FONT-SIZE: 0px;
	VISIBILITY: hidden;
	HEIGHT: 0px;
	content: "."
}

.cf {
	CLEAR: both;
	ZOOM: 1
}

.bg {
	BACKGROUND: url(/resource/images/01bg.jpg) #dad9d7 no-repeat center top;
	LEFT: 0px;
	OVERFLOW: hidden;
	WIDTH: 100%;
	POSITION: absolute;
	TOP: 0px;
	HEIGHT: 600px
}

.cont {
	MARGIN: 0px auto;
	WIDTH: 500px;
	LINE-HEIGHT: 20px
}

.c1 {
	HEIGHT: 360px;
	TEXT-ALIGN: center
}

.c1 .img1 {
	MARGIN-TOP: 180px
}

.c1 .img2 {
	MARGIN-TOP: 165px
}

.cont H2 {
	FONT-SIZE: 80px;
	COLOR: #2d78e7;
	TEXT-ALIGN: center;
	font-weight: bold;
	margin: 50px auto;
}

.c2 {
	HEIGHT: 35px;
	TEXT-ALIGN: center
}

.c2 A {
	DISPLAY: inline-block;
	FONT-SIZE: 14px;
	MARGIN: 0px 4px;
	COLOR: #626262;
	PADDING-TOP: 1px;
	HEIGHT: 23px;
	TEXT-ALIGN: left;
	TEXT-DECORATION: none
}

.c2 A:hover {
	COLOR: #626262;
	TEXT-DECORATION: none
}

.c2 A.home {
	PADDING-LEFT: 30px;
	BACKGROUND: url(/resource/images/01home.png);
	WIDTH: 66px
}

.c2 A.home:hover {
	BACKGROUND: url(/resource/images/01home.png) 0px -24px
}

.c2 A.home:active {
	BACKGROUND: url(/resource/images/01home.png) 0px -48px
}

.c3 {
	FONT-SIZE: 12px;
	COLOR: #2d78e7;
	HEIGHT: 180px;
	TEXT-ALIGN: center
}

#bf {
	LEFT: 0px;
	WIDTH: 100%;
	POSITION: absolute;
	TOP: 269px
}

.bf1 {
	PADDING-LEFT: 32px;
	MARGIN: 0px auto;
	WIDTH: 99px
}

.bd {
	OVERFLOW: hidden;
	HEIGHT: 600px
}

#box {
	LEFT: 0px;
	WIDTH: 100%;
	POSITION: absolute;
	TOP: 165px;
	TEXT-ALIGN: center
}
</STYLE>
</head>
<body>
	<DIV class=bg>
		<DIV class=cont>
			<DIV class=c1>
				<IMG class=img1 src="/resource/images/01face.png">
			</DIV>
			<H2>500</H2>
			<DIV class=c2>
				<A class=home href="/index.html">网站首页</A>
			</DIV>
			<DIV class=c3>服务器可能挂掉了，请联系客服</DIV>
		</DIV>
	</DIV>
</body>

</html>