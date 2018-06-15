<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/commons/global.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/commons/basejs.jsp"%>
<meta http-equiv="X-UA-Compatible" content="edge" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="/static/js/company.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="/static/style/css/company.css" />
</head>
<body class="easyui-layout" data-options="fit:true,border:false">
	<div id="testTab" class="easyui-tabs">
		<div title="产品管理" style="padding:10px;height: 500px;">
			
		</div>
		
		<div title="公司管理" style="padding:10px">
			<table id="bg" class="easyui-datagrid" data-options="border:false">
			</table>
		</div>
	</div>
	
	<div id="toolbar" style="display: none;">
           <shiro:hasPermission name="/company/add">
               <a onclick="addFun();" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">添加</a>
           </shiro:hasPermission>
    </div>
</body>
</html>