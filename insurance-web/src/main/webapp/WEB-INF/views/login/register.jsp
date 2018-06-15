<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>注册</title>
<script type="text/javascript" src="../../static/jQuery/jquery-1.8.0.js"charset="utf-8"></script>
</head>
<body>
	<form id="form">
		用户名：<input type="text" id="user" name="loginName"></input><br/>
		密码：<input type="text" name="password"></input><br/>
		电话:<input type="text" id="mobileNumber" name="mobileNumber"></input><br/>
		验证码：<input type="text" id="vailcode" name="vailCode"></input><br/>
		<input id="code"type="button" value="获取验证码"></input><br/>
		<input id="btn"type="button" value="注册"></input><br/><br/>
		----openId:<input id="openId"type="text" name="openId"></input><br/>-----
	</form>
	<script type="text/javascript">
	$(document).ready(function(){
		var openId = "<%=request.getAttribute("openId")%>";
		//判断aaa是否为空  如果不为空 判断其是否登录过
		if(openId!=""){
			$("#openId").val(openId);
		}
	})
	
	
	$("#btn").click(function(){
		 $.ajax({
             type: "post",
             url: "/user/register",
             data: $("#form").serializeArray(),
             dataType: "json",
             success: function(data){
                         console.log(data);
                      }
         });
	})
	$("#code").click(function(){
		 $.ajax({
             type: "post",
             url: "/user/getValidateCode",
             data: {key:$("#mobileNumber").val()},
             dataType: "json",
             success: function(data){
            	 $("#vailcode").val(data.msg);
                      }
         });
	})
	</script>
</body>
</html>