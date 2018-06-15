var ajaxurl="http://192.168.1.148:8080/";


$(function() {
	getUserLoginState();
	leftNav();// 个人中心左侧导航栏下拉
	myAccount();// 导航栏-我的账户菜单下拉
	listSwitch('.policyTab a', '.payBox_');// 我的保单“未支付”和“已承保”切换
	listSwitch('.loginTab a', '#log_');// 登录方式-账号密码登录/手机验证码登录
});
/**
 * 导航栏-我的账户菜单下拉
 */
function myAccount() {
	$(window.document).find('*').on('click', function() {// 页面中任意某个元素点击时
		if ($(this).attr('id') == 'myaccount') {// 判断页面单击任意一个元素的ID是不是下拉菜单的ID
			if ($(this).hasClass('active')) { // 如果菜单此时为展开时
				$('.ma_child').stop().slideUp(); // 闭合菜单
				$(this).removeClass('active');
			} else {// 如果菜单为闭合时
				$('.ma_child').stop().slideDown();// 展开菜单
				$(this).addClass('active');
			}
			return false;
		} else {// 页面单机任意一个元素的ID不等于下拉菜单的ID
			$('.ma_child').stop().slideUp(); // 闭合菜单
			$('#myaccount').removeClass('active');
		}
	});
}
/**
 * 个人中心左侧导航栏下拉
 */
function leftNav() {
	$(".parent a.par").on('click', function(event) {// 一级菜单项点击时
		if (!$(this).parent().hasClass("active")) {// 如果当前菜单为闭合时
			$(this).parent().find("div").stop().slideDown();// 展开当前菜单
			$(this).parent().addClass("active");
		} else {// 如果当前菜单为展开时
			$(this).parent().find("div").stop().slideUp();// 闭合当前菜单
			$(this).parent().removeClass("active");
		}
	});
}
/**
 * 列表切换功能-可传参重用
 */
function listSwitch(tabBtn, tabBox){ // tabBtn切换按钮，tabBox切换模块
	$(tabBtn).each(function() { // 遍历所有切换按钮
		$(this).on('click', function() {
			var tabIndex = ($(this).index()) + 1; // 获取当前按钮的索引
			$(this).addClass("active").siblings().removeClass("active");// 为当前按钮添加点击样式并删除其他按钮样式
			$(tabBox + tabIndex).show().siblings().hide(); // 显示与当前按钮索引相同的功能模块并隐藏其他同级模块
		});
	});
}


/**
 *	判断用户登录状态
 */
function getUserLoginState(){
	$.ajax({
	    type : 'get',
	    dataType : 'json',
	    url : ajaxurl + 'user/getUserLoginState',
	    success : function(data){
	       if(data.code==200){
	    	   personalCenter();
	       }
	    },
	    error : function(data){
	    	alert("状态码："+data.code+"  "+data.msg);
	    }
	});
}

/**
 *	获取用户个人信息
 */
function personalCenter(){
	$.ajax({
	    type : 'post',
	    dataType : 'json',
	    url : ajaxurl + 'user/personalCenter',
	    success : function(data){
	    	$('.tr_login').text(data.obj.uname);
	    	$('.tr_login').attr('href',"personalInformation")
	    },
	    error : function(data){
	    	
	    }
	});
}