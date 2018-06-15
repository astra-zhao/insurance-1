var telNumCode;// 短信验证码

$(function() {
	//点击注册按钮验证注册信息
	$('#registBtn').on('click', function() {
		if ($(this).hasClass("active")) {
			return false;
		}
		var userName = $('#userName').val().replace(/\s+/g, ""); // 用户登录名
		var telNo = $('#telNo').val().replace(/\s+/g, ""); // 手机号码
		var password = $('#password').val().replace(/\s+/g, ""); // 密码
		var confirmPassword = $('#confirmPassword').val().replace(/\s+/g, ""); // 确认密码
		var code = $('#code').val().replace(/\s+/g, ""); // 短信验证码
		registFun(userName, telNo, password, confirmPassword, code);
	});

	//点击验证码按钮获取验证码
	$("#getCodeBtn").on('click', function() {
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
			telNumCode = getCode();
		}else{
			return false;
		}
	});
	//点击同意阅读NEED保注册协议
	$("#agreed").on('click', function() {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$("#registBtn").removeClass('active');
		} else {
			$(this).removeClass('active');
			$("#registBtn").addClass('active');
			tipShow('', 1);
		}
	});
});


/**
 * 注册验证方法
 * @param userName：用户登录名
 * @param telNo：手机号码
 * @param password：登录密码
 * @param confirmPassword：确认登录密码
 * @param code：短信验证码
 * @returns {Boolean}
 */
function registFun(userName, telNo, password, confirmPassword, code) {
	// 验证用户登录名
	if (userName == "") {
		tipShow("请输入6-16位用户登录名", 0);
		$("#userName").focus().select();
		return false;
	} else if (userName != "") {
		if (!(/^(?![0-9]+$)[a-zA-Z0-9_]{6,16}$/.test(userName))) {
			tipShow("用户登录名格式不正确", 0);
			$("#userName").focus().select();
			return false;
		} else {
			tipShow('', 1);
		}
	}
	// 验证手机号码
	if (telNo == "") {
		tipShow('请输入手机号码', 0);
		$("#telNo").focus().select();
		return false;
	} else if (telNo != "") {
		if (!(/^1[3|4|5|7|8]\d{9}$/.test(telNo))) {
			tipShow('手机号码格式不正确', 0);
			$("#telNo").focus().select();
			return false;
		} else {
			var ism = isMobile(telNo);
			if (ism == 1005) {
				tipShow('', 1);
			} else if (ism == 1008) {
				tipShow('手机号已绑定', 0);
				$("#telNo").focus().select();
				return false;
			}

		}

	}

	// 验证设置密码
	if (password == "") {
		tipShow('请设置6-16位登录密码', 0);
		$("#password").focus().select();
		return false;
	} else if (password != "") {
		if (!(/^[0-9A-Za-z]{6,16}$/.test(password))) {
			tipShow('密码格式不正确,请设置6-16位登录密码', 0);
			$("#password").focus().select();
			return false;
		} else {
			tipShow('', 1);
		}
	}

	// 验证重复密码
	if (confirmPassword == "") {
		tipShow('请确认密码', 0);
		$("#confirmPassword").focus().select();
		return false;
	} else if (confirmPassword != password) {
		tipShow('两次密码不一致', 0);
		$("#confirmPassword").focus().select();
		return false;
	} else {
		tipShow('', 1);
	}

	// 验证短信验证码
	if (code == "") {
		tipShow("请输入6位短信验证码", 0);
		$("#code").focus().select();
		return false;
	} else if (code != "") {
		if (!(/^\d{6}$/.test(code))) {
			tipShow('验证码格式不正确', 0);
			$("#code").focus().select();
			return false;
		} else {
			if (code != telNumCode) {
				tipShow('手机验证码错误', 0);
				$("#code").focus().select();
				return false;
			} else {
				tipShow('', 1);
			}

		}
	}

	// 调用请求注册
	registAjaxFun(userName, telNo, password, code);

}

/**
 * 验证手机号码是否已绑定
 * 
 * @param telNo：手机号码
 * @returns 返回状态，1005为未绑定，1008为已绑定
 */
function isMobile(telNo) {
	var isMobileNum;
	$.ajax({
		type : 'post',
		dataType : 'json',
		async : false,
		data : {
			mobileNumber : telNo
		},
		url : ajaxurl + 'user/isMobileNumExist',
		success : function(data) {
			isMobileNum = data.code;
		},
		error : function(data) {
		}
	});
	return isMobileNum;

}

/**
 * 获取手机验证码
 * 
 * @returns 返回手机验证码
 */
function getCode() {
	var telNo = $('#telNo').val().replace(/\s+/g, ""); // 手机号码
	if (telNo == "") {
		tipShow('请输入手机号码', 0);
		$("#telNo").focus().select();
		return false;
	} else if (telNo != "") {
		if (!(/^1[3|4|5|7|8]\d{9}$/.test(telNo))) {
			tipShow('手机号码格式不正确', 0);
			$("#telNo").focus().select();
			return false;
		} else {
			var ism = isMobile(telNo);
			if (ism == 1005) {
				tipShow('', 1);
			} else if (ism == 1008) {
				tipShow('手机号已绑定', 0);
				$("#telNo").focus().select();
				return false;
			}

		}

	}
	var codeobj;
	$.ajax({
		type : 'post',
		dataType : 'json',
		async : false,
		data : {
			key : telNo
		},
		url : ajaxurl + 'user/getValidateCode',
		success : function(data) {
			codeobj = data.obj;
			var time = 60;
			var codeTime = setInterval(function() {
				time = time - 1;
				$('#getCodeBtn').text(time + 's');
				if (time == 0) {
					window.clearInterval(codeTime);
					$('#getCodeBtn').text('验证码');
					$('#getCodeBtn').removeClass('active')
				}
			}, 1000);
		},
		error : function(data) {
		}
	});
	return codeobj;
}

/**
 * 请求注册接口
 * 
 * @param userName：用户登录名
 * @param telNo：手机号码
 * @param password：登录密码
 * @param code：短信验证码
 */
function registAjaxFun(userName, telNo, password, code) {
	$.ajax({
		type : 'post',
		dataType : 'json',
		async : false,
		data : {
			loginName : userName,
			password : password,
			mobileNumber : telNo,
			vailCode : code,
			enterType : 0
		},
		url : ajaxurl + 'user/register',
		success : function(data) {
			tipShow(data.msg, 0);
		},
		error : function(data) {
		}
	});
}

/**
 * 公用提示方法
 * 
 * @param str：提示内容
 * @param tag：显示方式状态，0为显示，1为隐藏
 */
function tipShow(str, tag) {
	if (tag == 0) {
		$('.lrTip').text(str)
		$('.lrTip').stop(true).slideDown();
	} else if (tag == 1) {
		$('.lrTip').text(str)
		$('.lrTip').stop(true).slideUp(0);
	}
}