<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/pc/common/top.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<jsp:include page="/pc/common/head.jsp"></jsp:include>
<script type="text/javascript" src="/pc/js/main.js"></script>
<script type="text/javascript" src="/pc/js/regist.js"></script>
</head>
<body style="background:#ea560e;">
	<!-- 头部开始 -->
	<jsp:include page="/pc/common/welcome.jsp"></jsp:include>
	<!-- 头部结束 -->
	<div class="wrap clearfix">
		<div class="loginMain clearfix">
			<div class="loginBox registbox">
				<div class="lrTip">请输入手机号码</div>
				<div class="loginTab clearfix">
					
				</div>
				<div class="tabBox">
					<div class="login_1">
						<p style="text-align: right; margin-bottom: 20px;margin-top: 35px;" >已有账号？<a href="login">立即登录</a></p>
						<div class="username clearfix">
							<span>&nbsp;</span>
							<input type="text" id="userName" placeholder="用户名"/>							
						</div>
						<div class="telNo clearfix">
							<span>&nbsp;</span>
							<input type="text" id="telNo" placeholder="手机号"/>							
						</div>
						<div class="pass clearfix">
							<span>&nbsp;</span>
							<input type="password" id="password" placeholder="密码"/>
						</div>
						<div class="pass clearfix">
							<span>&nbsp;</span>
							<input type="password" id="confirmPassword" placeholder="确认密码"/>
						</div>
						<div class="pass clearfix">
							<span>&nbsp;</span>
							<input class="code" type="text" id="code" placeholder="验证码"/>
							<a class="getCode" id="getCodeBtn" href="javascript:void(0);">验证码</a>
						</div>
						<div class="clearfix rm">
							<a class="remember" id="agreed" style="width: 120px;" href="javascript:void(0);">我已同意并阅读了</a>
							<a class="xieyi" href="javascript:void(0);">《NEED保协议》</a>
						</div>
						<a class="loginButton active" id="registBtn" href="javascript:void(0);">注册</a>
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