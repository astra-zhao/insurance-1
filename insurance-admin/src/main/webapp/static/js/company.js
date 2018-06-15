var companyDataList;

$(function(){
	$('#testTab').tabs({  
        width: $("#testTab").parent().width(),   
      	height: $("#testTab").parent().height() - 10,
    });
	
    $(window).resize(function () {  
	    $('#testTab').tabs({  
	        width: $("#testTab").parent().width(),  
	        height: $("#testTab").parent().height() - 10 
	    });  
	})
	
	companyDataList = $('#bg').datagrid({
        url : '/company/dataList',
        fit : true,
        striped : true,
        rownumbers : true,
        pagination : true,
        singleSelect : true,
        idField : 'id',
        sortName : 'createdate',
        sortOrder : 'asc',
        pageSize : 20,
        pageList : [ 10, 20, 30, 40, 50],
        columns : [ [ {
            width : '80',
            title : '公司ID',
            field : 'id',
            sortable : true
        }, {
            width : '80',
            title : '公司名称',
            field : 'cname',
            sortable : true
        },{
            width : '80',
            title : '公司编码',
            field : 'compCode',
            hidden : true
        },{
            width : '80',
            title : '公司类型',
            field : 'typeId'
        },{
            width : '180',
            title : '公司简介',
            field : 'details',
            sortable : true
        },{
            width : '40',
            title : 'logo',
            field : 'logo',
            sortable : true
        }] ],
        toolbar : '#toolbar'
    });
})


/**
 * 加载添加页
 */
function addFun() {
    parent.$.modalDialog({
        title : '添加保险公司',
        width : 600,
        height : 500,
        href : '/company/addPage',
        buttons : [ {
            text : '添加',
            handler : function() {
                var f = parent.$.modalDialog.handler.find('#companyAddForm');
                f.submit();
            }
        } ]
    });
}
