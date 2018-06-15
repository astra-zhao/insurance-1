<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<script type="text/javascript">
	var loginState="<%=request.getAttribute("loginState") %>";
	var loginName="<%=request.getAttribute("loginName") %>";
	if(loginState=="1"){
		window.location.href="../../html5/members/members.html?loginName="+loginName;
	}else{
		window.location.href="../../html5/login.html"
	}
  
</script>
</body>
</html>