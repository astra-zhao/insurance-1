﻿<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/pc/common/top.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<jsp:include page="/pc/common/head.jsp"></jsp:include>
<script type="text/javascript" src="/pc/resource/js/main.js"></script> 
<script type="text/javascript">
	$(function() {
		$("#personal").addClass("active");
		$("#personal_3").addClass("active");
	});
</script>
<style type="text/css">
.perNavLeft .navList ul li div{
	display: block;	
}
</style>
</head>
<body>
	<!-- 头部开始 -->
	<jsp:include page="/pc/common/welcome.jsp"></jsp:include>
	<!-- 头部结束 -->
	<div class="wrap clearfix">
		<jsp:include page="/pc/common/navLeft_personalCenter.jsp"></jsp:include>
		<div class="center">
		</div>
	</div>
	<!-- 底部开始 -->
	<jsp:include page="/pc/common/bottom.jsp"></jsp:include>
	<!-- 底部结束 -->
</body>
</html>