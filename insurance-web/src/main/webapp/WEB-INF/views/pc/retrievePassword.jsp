<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/pc/common/top.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<jsp:include page="/pc/common/head.jsp"></jsp:include>
<script type="text/javascript" src="/resource/js/main.js"></script>
</head>
<body style="background:#ea560e;">
	<!-- 头部开始 -->
	<jsp:include page="/pc/common/welcome.jsp"></jsp:include>
	<!-- 头部结束 -->
	<div class="wrap clearfix">
		<div class="loginMain clearfix">
			<div class="loginBox registbox retrieve">
				<div class="loginTab clearfix">
					
				</div>
				<div class="tabBox">
					<div class="login_1">
						<p style="text-align: right; margin-bottom: 20px;margin-top: 35px;" >&nbsp;</p>
						<div class="username clearfix">
							<span>&nbsp;</span>
							<input type="text" placeholder="手机号"/>							
						</div>
						<div class="pass clearfix">
							<span>&nbsp;</span>
							<input class="code" type="text" placeholder="验证码"/>
							<a class="getCode" href="javascript:void(0);">验证码</a>
						</div>
						<div class="pass clearfix">
							<span>&nbsp;</span>
							<input type="password" placeholder="新密码密码"/>
						</div>
						<div class="pass clearfix">
							<span>&nbsp;</span>
							<input type="password" placeholder="确认密码"/>
						</div>
						<a class="loginButton" href="javascript:void(0);">提交</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 底部开始 -->
	<jsp:include page="/pc/common/bottom.jsp"></jsp:include>
	<!-- 底部结束 -->
</body>
</html>