$(function() {
	
});

/**
 * 判断用户登录状态
 */
function getUserLoginState() {
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : ajaxurl + 'user/getUserLoginState',
		success : function(data) {
			if (data.code == 200) {
				personalCenter();
				submitOrder(0);
			}
		},
		error : function(data) {
			alert("状态码：" + data.code + "  " + data.msg);
		}
	});
}

/**
 * 获取我的保单
 */
function submitOrder(proStatus) {
	$.ajax({
				type : 'post',
				dataType : 'json',
				url : ajaxurl + 'orders/getOrderByStatus',
				data : {
					status : proStatus,
					page : 1,
					rows : 10
				},
				success : function(data) {
					var dalength = data.rows;
					var _html = "";
					if (proStatus == 0) {
						for (var i = 0; i < dalength.length; i++) {
							_html += '<table>'
									+ '<thead>'
									+ '<tr>'
									+ '<th class="text_left" title="保险名称">保险名称</th>'
									+ '<th title="订单号">订单号</th>'
									+ '<th title="生成时间">生成时间</th>'
									+ '<th class="text_right" title="金额">金额</th>'
									+ '</tr>'
									+ '</thead>'
									+ '<tbody>'
									+ '<tr>'
									+ '<td class="text_left policyName" title="'+dalength[i].proName+'">'+dalength[i].proName+'</td>'
									+ '<td class="orderNo">'+dalength[i].id+'</td>'
									+ '<td class="orderDate">'+dalength[i].createTime+'</td>'
									+ '<td class="text_right orderTotal">'+dalength[i].paymentAmount+'</td>'
									+ '</tr>'
									+ '</tbody>'
									+ '<tfoot>'
									+ '<tr>'
									+ '<td class="text_left orderDetails"><a href="javascript:void(0);">查看详情&gt;&gt;</a></td>'
									+ '<td colspan="3">'
									+ '<a class="toPay" href="javascript:void(0);">立即付款</a>'
									+ '<a class="time" href="javascript:void(0);">6:00:00</a>'
									+ '</td>' + '</tr>' + '</tfoot>'
									+ '</table>';
						}
						$('.payBox_1').html(_html);
					}
					
					if(proStatus==5){
						var dalength = data.rows;
						var _html = "";
						for(var i=0;i<dalength.length;i++){
							_html+='<table>'
								+'<thead><tr>'
								+'<th class="text_left">保险名称</th>'
								+'<th>订单号</th>'
								+'<th>生成时间</th>'
								+'<th class="text_right">金额</th>'
								+'</tr></thead>'
								+'<tbody><tr>'
								+'<td class="text_left policyName">'+dalength[i].proName+'</td>'
								+'<td class="orderNo">'+dalength[i].id+'</td>'
								+'<td class="orderDate">'+dalength[i].createTime+'</td>'
								+'<td class="text_right orderTotal">'+dalength[i].paymentAmount+'</td>'
								+'</tr></tbody>'
								+'<tfoot><tr>'
								+'<td colspan="2" class="text_left orderNo">保单号&nbsp;<span>'+dalength[i].policyNo+'</span></td>'
								+'<td colspan="2" class="orderDetails">'
								+'<a href="javascript:void(0);">查看保单</a>'
								+'</td>'
								+'</tr></tfoot>'
								+'</table>';
						}
						$('.payBox_2').html(_html);
					}
				},
				error : function(data) {
					alert("状态码：" + data.code + "  " + data.msg);
				}
			});
}
