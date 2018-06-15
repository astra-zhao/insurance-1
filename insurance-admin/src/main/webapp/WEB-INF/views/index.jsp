<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/commons/global.jsp" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/commons/basejs.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>主页</title>
<link id="easyuiTheme" rel="stylesheet" type="text/css" href="/static/style/css/index.css" />
<script type="text/javascript" src="/static/js/index.js"></script>
</head>
<body>
    <div id="loading" style="position: fixed;top: -50%;left: -50%;width: 200%;height: 200%;background: #fff;z-index: 100;overflow: hidden;">
        <img src="${staticPath }/static/style/images/ajax-loader.gif" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;"/>
    </div>
    <div id="index_layout">
        <div data-options="region:'north',border:false" style=" overflow: hidden; height: 100px; ">
            <div>
                <span style="float: right; padding-right: 20px; margin-top: 40px; color: #333">欢迎 <b><shiro:principal></shiro:principal></b>&nbsp;&nbsp; <shiro:hasPermission name="/user/editPwdPage"><a href="javascript:void(0)" onclick="editUserPwd()" class="easyui-linkbutton" plain="true" icon="icon-edit" >修改密码</a></shiro:hasPermission>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="logout()" class="easyui-linkbutton" plain="true" icon="icon-clear">安全退出</a></span>
                <span class="header"></span>
            </div>
        </div>
        <div data-options="region:'west',split:false" title="菜单" style="width: 200px; overflow: hidden;overflow-y:auto; padding:0px">
            <div id='nav' class="easyui-accordion  i_accordion_menu" fit="true" border="false">
            
            </div>

        </div>
        <div data-options="region:'center'" style="overflow: hidden;">
            <div id="index_tabs" style="overflow: hidden;">
                <div title="首页" data-options="border:false" style="overflow: hidden;">
                	<div class='indexdg'>
	                	<img alt="首页背景图片" src="/static/style/images/201502021.jpeg">
                	</div>
                </div>
            </div>
        </div>
        <div data-options="region:'south',border:false" style="height: 50px;line-height:50px; overflow: hidden;text-align: center;background-color: #eee" >Copyright © 2015 power by <a href="#" target="_blank"></a></div>
    </div>

    <!--[if lte IE 7]>
    <div id="ie6-warning"><p>您正在使用 低版本浏览器，在本页面可能会导致部分功能无法使用。建议您升级到 <a href="http://www.microsoft.com/china/windows/internet-explorer/" target="_blank">Internet Explorer 8</a> 或以下浏览器：
    <a href="http://www.mozillaonline.com/" target="_blank">Firefox</a> / <a href="http://www.google.com/chrome/?hl=zh-CN" target="_blank">Chrome</a> / <a href="http://www.apple.com.cn/safari/" target="_blank">Safari</a> / <a href="http://www.operachina.com/" target="_blank">Opera</a></p></div>
    <![endif]-->

    <style>
        /*ie6提示*/
        #ie6-warning{width:100%;position:absolute;top:0;left:0;background:#fae692;padding:5px 0;font-size:12px}
        #ie6-warning p{width:960px;margin:0 auto;}
    </style>
</body>
</html>