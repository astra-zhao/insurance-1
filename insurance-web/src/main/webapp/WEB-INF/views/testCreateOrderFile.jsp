<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="../../static/jQuery/jquery-1.8.0.js" charset="utf-8"></script>
<script type="text/javascript" src="../../static/js/jquery.form.js" charset="utf-8"></script>
<title>Insert title here</title>
<script type="text/javascript">
function upload(){
	/* console.log("aaaa");
	$("#fileUpload").ajaxSubmit({
	    type : 'POST',
	    url : 'http://localhost:8080/fileUpload/saveFile',
	    async:false,
	    dataType : 'json',
	    success : function(data) {
	        $("#url").val(data.msg);
	    },
	    error : function() {
	        alert("上传失败，请检查网络后重试");
	    }
	}); */
}

</script>
</head>
<body>

	<form name="fileUpload" action="/fileUpload/saveFile" method="post" enctype="multipart/form-data">
	文件：<input id="file" type="file" name="file"></input><br/>
		<!-- <a class="easyui-linkbutton" href="#" onclick="upload()">上传文件</a><br/> -->
		<input type="submit" value="上传"></input>
	</form>  
	<input id="url" type="text" name="url"></input><br/>
</body>
</html>