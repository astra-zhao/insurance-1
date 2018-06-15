<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="../../static/jQuery/jquery-1.8.0.js" charset="utf-8"></script>
</head>
<body>
	
	<form id="loginForm">
		登录方式:<input type="text" name="loginType"></input>
		
		<br/>
		用户名/电话：<input type="text" id="user" name="loginName"></input><br/>
		密码：<input type="text" name="password"></input><br/>
		验证码：<input type="text" id="vailcode" name="vailCode"></input><br/>
		<input id="code"type="button" value="获取验证码"></input><br/>
		
		<input id="btn"type="button" value="登录"></input>    <input id="reg"type="button" value="注册"></input>
		<br/><br/>
		----openId:<input id="openId"type="text" name="openId"></input><br/>-----
	</form>
	<div id="info"></div>
	<script type="text/javascript">
	$(document).ready(function(){
		var openId = "<%=request.getAttribute("openId")%>";
		//判断aaa是否为空  如果不为空 判断其是否登录过
		if(openId!=""){
			$("#openId").val(openId);
			$.ajax({
	             type: "post",
	             url: "/user/getWxChatUserLoginState",
	             data: {openId:openId},
	             dataType: "json",
	             success: function(data){
	                         if(data.msg=='1'){
	                        	 //通过登录
	                        	 $("#info").html("微信用户！登录成功！！！")
	                         }else{
	                        	 //转到登录页面
	                         }
	                      }
	         });
		}
		
	})
	
	
	$("#btn").click(function(){
		 $.ajax({
             type: "post",
             url: "/user/login",
             data: $("#loginForm").serializeArray(),
             dataType: "json",
             success: function(data){
                         console.log(data);
                         $("#info").html(data)
                      }
         });
	})
	$("#reg").click(function(){
		window.location="/user/register?openId="+$("#openId").val();
		return;
		/* $.ajax({
            type: "get",
            url: "/register",
            data: {openId:$("#openId").val()},
            dataType: "json",
            success: function(data){
            			
                     }
        }); */
	})
	$("#code").click(function(){
		 $.ajax({
             type: "post",
             url: "/user/getValidateCode",
             data: {key:$("#user").val()},
             dataType: "json",
             success: function(data){
            	 $("#vailcode").val(data.msg);
            	 
             }
         });
	})
	</script>
</body>
</html>