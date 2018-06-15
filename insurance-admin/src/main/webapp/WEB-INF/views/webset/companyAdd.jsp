<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/commons/global.jsp"%>
<script src="/static/ckeditor/ckeditor.js"></script>
<script type="text/javascript">
	
	$('#compType').combobox({
		url:'/company/queryCompanyType',
		valueField:'id',
		textField:'tname',
        panelHeight : 'auto'
	});
	
	$('#companyAddForm').form({
        url : '${path }/company/add',
        onSubmit : function() {
            progressLoad();
            var isValid = $(this).form('validate');
            if (!isValid) {
                progressClose();
            }
            return isValid;
        },
        success : function(result) {
        	console.log(result + 'AAAAB');
            progressClose();
            result = $.parseJSON(result);
            if (result.success) {
                parent.$.modalDialog.openner_dataGrid.companyDataList('reload');//之所以能在这里调用到parent.$.modalDialog.openner_dataGrid这个对象，是因为user.jsp页面预定义好了
                parent.$.modalDialog.handler.dialog('close');
            } else {
                parent.$.messager.alert('提示', result.msg, 'warning');
            }
        }
    });
	
</script>
<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title=""
		style="overflow: hidden; padding: 3px;">
		<form id="companyAddForm" method="post">
			<table class="grid">
				<tr>
					<td>类型</td>
					<td>
						<select id="compType" style="width:150px"></select>
					</td>
				</tr>
				<tr>
					<td>名称</td>
					<td><input name="cname" type="text" placeholder="请输入公司名称"
						class="easyui-textbox" value=""></td>
				</tr>
				<tr>
					<td>LOGO上传</td>
					<td>
						<input id="file" type="file" name="myfiles"/>   
                    	<input type="button" value="确定" onclick="uploadPic()" style="margin-top: 10px">
                    </td>
				</tr>
				<tr>
					<td>简介</td>
				</tr>
			</table>
			<textarea name="editor1" id="editor1" rows="10" cols="80" class="ckeditor">
                This is my textarea to be replaced with CKEditor.
            </textarea>
            <script>
                CKEDITOR.replace('editor1', {
                	 width : 590,
                	 height : 200,
                     toolbar :
                     [
                        //加粗     斜体，     下划线      穿过线      下标字        上标字      字体    字体大小
                        ['Bold','Italic','Underline','Strike','Subscript','Superscript','Font','FontSize'],
                     	//文本颜色     背景颜色
                        ['TextColor','BGColor'],
                        // 数字列表          实体列表            减小缩进    增大缩进
                        ['NumberedList','BulletedList','-','Outdent','Indent'],
                        //左对 齐             居中对齐          右对齐          两端对齐
                        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                        //超链接  取消超链接 锚点
                        ['Link','Unlink','Anchor'],
                        //图片      表格       水平线                 特殊字符        
                        ['Image','Table','HorizontalRule','SpecialChar'],
                        // 样式       格式      
                        ['Styles','Format']
                     ]
                });
            </script>
		</form>
	</div>
</div>