<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/pc/common/top.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<jsp:include page="/pc/common/head.jsp"></jsp:include>
<script type="text/javascript" src="/pc/js/main.js"></script> 
<script type="text/javascript" src="/pc/js/login.js"></script>
</head>
<body style="background:#ea560e;">
	<!-- 头部开始 -->
	<jsp:include page="/pc/common/welcome.jsp"></jsp:include>
	<!-- 头部结束 -->
	<div class="wrap clearfix">
		<div class="loginMain clearfix">
			<div class="loginBox">
				<div class="loginTab clearfix">
					<a class="account active" href="javascript:void(0);">账号登录</a>
					<a class="tel" href="javascript:void(0);">验证码登录</a>
				</div>
				<div class="tabBox">
					<div class="login_1"  id="log_1" >
						<div class="username clearfix">
							<span></span>
							<input id="userName" type="text" placeholder="用户名/手机号/微信号"/>							
						</div>
						<div class="pass clearfix">
							<span></span>
							<input id="userPass" type="password" placeholder="密码"/>
						</div>
						<div class="clearfix rm">
							<a class="remember active" href="javascript:void(0);">记住账号</a>
							<a class="forget" href="retrievePassword">忘记密码？</a>
						</div>
						<a class="loginButton" id="btnLogin_1" loginType="0" href="javascript:void(0);">登录</a>
						<p>没有账号？<a href="regist">立即注册</a></p>
					</div>
					<div class="login_1" id="log_2" style="display: none;">
						<div class="telNo clearfix">
							<span>&nbsp;</span>
							<input type="text" placeholder="请输入手机号"/>							
						</div>
						<div class="pass clearfix">
							<span>&nbsp;</span>
							<input class="code" type="text" placeholder="请输入验证码"/>
							<a class="getCode" href="javascript:void(0);">获取验证码</a>
						</div>
						<div class="clearfix rm">
							<a class="remember active" href="javascript:void(0);">记住账号</a>
						</div>
						<a class="loginButton" id="btnLogin_2" loginType="1" href="javascript:void(0);">登录</a>
						<p>没有账号？<a href="regist">立即注册</a></p>
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