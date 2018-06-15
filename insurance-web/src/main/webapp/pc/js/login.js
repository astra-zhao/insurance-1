$(function() {
	$('#btnLogin_1').on('click', function() {
		var userName = $("#userName").val();// 用户登录名
		var userPass = $("#userPass").val();// 用户登录密码
		if (userName == "" || userName == null) {
			alert("请输入用户名");
			return false;
		} else if (userName != "" && userName != null) {
			if (!(/^(?![0-9]+$)[a-zA-Z0-9_]{6,16}$/.test(userName))) {
				alert('登录名格式不正确');
				return false;
			}
		}
		if (userPass == "" || userPass == null) {
			alert("请输入密码");
			return false;
		} else if (userPass != "" && userPass != null) {
			if (!(/^[0-9A-Za-z]{6,16}$/.test(userPass))) {
				alert('密码格式不正确');
				return false;
			}
		}
		getLogin(0,userName,userPass);
	});
});

/*******************************************************************************
 * 请求登录接口
 */
function getLogin(logType, userName, userPass) {
	$.ajax({
	    type : 'post',
	    dataType : 'json',
	    data : {
	    	loginName : userName,
			password : userPass,
			loginType : logType
	    },
	    url : ajaxurl + 'user/login',
	    success : function(data){
	    	personalCenter();
	        console.log(data);      
	        alert(data.msg);
	    },
	    error : function(data){
	        alert(data.msg);
	    }
	});
}
