<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/pc/common/top.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<jsp:include page="/pc/common/head.jsp"></jsp:include>
<script type="text/javascript" src="/pc/js/main.js"></script> 
<script type="text/javascript">
	$(function() {
		$("#personal").addClass("active");
		$("#personal_2").addClass("active");
	});
</script>
<script type="text/javascript" src="/pc/js/personal.js"></script>
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
			<div class="personalInfo">
				<div class="title">为了您的业务安全，请您认真填写以下信息</div>
				<div class="personalInfo_box">
					<div class="personalTabBox clearfix">
						<a href="javascript:void(0);">基本信息</a>
						<a href="javascript:void(0);">个人信息</a>
					</div>
					<div class="pibox_1">
						<table>
							<tr>
								<td class="label">头像信息</td>
								<td class="headImg inputbox"><img src="/pc/images/defaultHead.png"><a href="javascript:void(0);">修改</a></td>
								<td class="tip"></td>
							</tr>
							<tr>
								<td class="label">用户昵称</td>
								<td class="inputbox"><input type="text" /></td>
								<td class="tip">
									<img alt="" src="/pc/images/input_ok.png">
									<span>请输入用户昵称</span>
								</td>
							</tr>
							<tr>
								<td class="label">联系邮箱</td>
								<td class="inputbox"><input type="text" /></td>
								<td class="tip">
									<img alt="" src="/pc/images/input_ok.png">
									<span>请输入邮箱</span>
								</td>
							</tr>
							<tr>
								<td class="label">修改密码</td>
								<td class="inputbox"><input type="password" placeholder="请输入旧密码" /></td>
								<td class="tip">
									<img alt="" src="/pc/images/input_ok.png">
									<span>请输入旧密码</span>
								</td>
							</tr>
							<tr>
								<td class="label"></td>
								<td class="inputbox"><input type="password" placeholder="请输入新密码" /></td>
								<td class="tip">
									<img alt="" src="/pc/images/input_ok.png">
									<span>请输入新密码</span>
								</td>
							</tr>
							<tr>
								<td class="label">手机号码</td>
								<td class="inputbox"><input type="text" /></td>
								<td class="tip">
									<img alt="" src="/pc/images/input_ok.png">
									<span>请输入手机号码</span>
								</td>
							</tr>
							<tr>
								<td class="label"></td>
								<td class="code clearfix inputbox"><input type="text" placeholder="请输入验证码" /><a href="javascript:void(0);">验证</a></td>
								<td class="tip">
									<img alt="" src="/pc/images/input_ok.png">
									<span>请输入验证码</span>
								</td>
							</tr>
						</table>
						<a id="submit_1" href="javascript:void(0);">保存</a>
					</div>
					<div class="pibox_2">
						<table>
							<tr>
								<td class="label">姓名</td>
								<td>
									<input type="text" placeholder="请输入真实姓名"/>
								</td>
								<td></td>
							</tr>
							<tr>
								<td class="label">性别</td>
								<td>
									<ul>
										<li>男</li>
										<li>女</li>
									</ul>
								</td>
								<td></td>
							</tr>
							<tr>
								<td class="label">证件类型</td>
								<td>
									<ul>
										<li>身份证</li>
										<li>护照</li>
										<li>军人证</li>
									</ul>
								</td>
								<td></td>
							</tr>
							<tr>
								<td class="label">证件号码</td>
								<td>
									<input type="text" placeholder="请输入证件号码"/>
								</td>
								<td></td>
							</tr>
							<tr>
								<td class="label">联系地址</td>
								<td>
									<ul>
										<li>北京市</li>
										<li>南京市</li>
									</ul>
									<ul>
										<li>朝阳区</li>
										<li>东城区</li>
										<li>昌平区</li>
										<li>海淀区</li>
									</ul>
								</td>
								<td></td>
							</tr>
							<tr>
								<td class="label"></td>
								<td>
									<input type="text" placeholder="请输入详细地址"/>
								</td>
								<td></td>
							</tr>
						</table>
						<a id="submit_2" href="javascript:void(0);">保存</a>
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