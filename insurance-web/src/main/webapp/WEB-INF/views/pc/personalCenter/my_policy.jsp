<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/pc/common/top.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<jsp:include page="/pc/common/head.jsp"></jsp:include>
<script type="text/javascript" src="/pc/js/main.js"></script>
<script type="text/javascript" src="/pc/js/myPolicy.js"></script> 
<script type="text/javascript">
	$(function() {
		$("#personal_1").addClass("active");
	});
</script>
</head>
<body>
	<!-- 头部开始 -->
	<jsp:include page="/pc/common/welcome.jsp"></jsp:include>
	<!-- 头部结束 -->
	<div class="wrap clearfix">
		<jsp:include page="/pc/common/navLeft_personalCenter.jsp"></jsp:include>
		<div class="center">
			<div class="myPolicy">
				<div class="title">
					<h3>我的保单</h3>
				</div>
				<div class="policyTab clearfix">
					<a href="javascript:void(0);" onclick="submitOrder(0);" class="active">未支付</a>
					<a href="javascript:void(0);" onclick="submitOrder(5);" >已承保</a>
				</div>
				<div class="policyBox">
					<div class="payBox_1">
						<!--<table>
							<thead>
								<tr>
									<th class="text_left">保险名称</th>
									<th>订单号</th>
									<th>生成时间</th>
									<th class="text_right">金额</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="text_left policyName">不记名驾乘意外险</td>
									<td class="orderNo">W12515256415235625</td>
									<td class="orderDate">2016-12-01 12:00:00</td>
									<td class="text_right orderTotal">260元</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td colspan="2" class="text_left orderDetails"><a href="javascript:void(0);">查看详情&gt;&gt;</a></td>
									<td colspan="2">
										<a class="time" href="javascript:void(0);">6:00:00</a>
										<a class="toPay" href="javascript:void(0);">立即付款</a>
									</td>
								</tr>
							</tfoot>
						</table> -->
					</div>
					<div class="payBox_2" style="display:none;">
						<!-- <table>
							<thead>
								<tr>
									<th class="text_left">保险名称</th>
									<th>订单号</th>
									<th>生成时间</th>
									<th class="text_right">金额</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="text_left policyName">不记名驾乘意外险</td>
									<td class="orderNo">W12515256415235625</td>
									<td class="orderDate">2016-12-01 12:00:00</td>
									<td class="text_right orderTotal">260元</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td colspan="2" class="text_left orderNo">保单号&nbsp;<span>152455615262452566125</span></td>
									<td colspan="2" class="orderDetails">
										<a href="javascript:void(0);">查看保单</a>
									</td>
								</tr>
							</tfoot>
						</table>
						 -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 底部开始 -->
	<jsp:include page="/pc/common/bottom.jsp"></jsp:include>
	<!-- 底部结束 -->
</body>
</html>