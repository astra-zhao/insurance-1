<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="../../static/jQuery/jquery-1.8.0.js"
	charset="utf-8"></script>
<script type="text/javascript">
	/* var prepayId;
	var appid;
	var nonce_str;
	var paySign; */
	function submitOrder(){
		$.ajax({
			type : "post",
			async: false,
			url : "/wechat/test/pay",
			data : {
				
			},
			dataType : "json",
			success : function(data) {
				var props=bianli(data);
				$("#display").val(props);
				if (data.code == 200) {
					var appid = data.obj.appid;
					var nonce_str = data.obj.nonce_str;
					var prepayId = data.obj.prepay_id;
					var timeStamp=(Date.parse(new Date())/1000)+"";
					//获取签名
					var paySign = createSign(appid,nonce_str,prepayId,timeStamp);
					if(paySign!=""){
						//调取JSSDK支付接口
						pay(appid,timeStamp,nonce_str,prepayId,paySign);
					}else{
						alert("获取签名有误");
					}
					
				}
			}
		}); 
	}
	
	function createSign(appid,nonce_str,prepayId,timeStamp){
		var a;
		$.ajax({
			type : "post",
			url : "/wechat/test/createSign",
			async: false,
			data : {
				appid:appid,
				nonceStr:nonce_str,
				prepayId:prepayId,
				timeStamp:timeStamp
			},
			dataType : "json",
			success : function(data) {
				a=data.obj;
			
			}
		}); 
		return a;
	}
</script>
</head>
<body>
	<div>此页用于测试微信支付喵~</div>
	<a href="weixin://test.lingmoney.cn/wechat/test/payPage">跳到微信浏览器</a>
	<input type="button" id="submitOrder" onclick="submitOrder()" style="width:120px" value="下单"></input>
	<textarea  rows="100" cols="800" id="display"></textarea> 
	
	<script type="text/javascript">
		
		/* $(document).ready(function() {
			//POST 获取预订单码
			$.ajax({
				type : "post",
				url : "/wechat/pay",
				data : {
					
				},
				dataType : "json",
				success : function(data) {
					if (data.code == 200) {
						appid = data.obj.appid;
						nonce_str = data.obj.nonce_str;
						prepayId = data.obj.prepay_id;
						paySign = data.obj.sign;
						//调取JSSDK支付接口
						pay();
					}
				}
			});

		}); */

		
		function pay(appid,timeStamp,nonce_str,prepayId,paySign){
			
			//判断是否为微信浏览器
			//如果是
			if(is_weixin()){
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', onBridgeReady,
								false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
						document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					}
				} else {
					onBridgeReady(appid,timeStamp,nonce_str,prepayId,paySign);
				} 
			}else{
				alert("请在微信中打开此链接");
				
				
			}
			
			
			
		}
		
		
		function is_weixin(){
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i)=="micromessenger") {
				return true;
		 	} else {
				return false;
			}
		}
		
		function onBridgeReady(appid,timeStamp,nonce_str,prepayId,paySign) {
			//生成签名
			
			WeixinJSBridge.invoke('getBrandWCPayRequest', {
				"appId" : appid, //公众号名称，由商户传入     
				"timeStamp" : timeStamp, //时间戳，自1970年以来的秒数     
				"nonceStr" : nonce_str, //随机串     
				"package" : "prepay_id%3D"+prepayId,
				"signType" : "MD5", //微信签名方式：     
				"paySign" : paySign //微信签名 
			}, function(res) {
				console.log(res);
				if (res.err_msg == "get_brand_wcpay_request:ok") {
				} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			});
			
			
		}
	</script>
	
	<script type="text/javascript">
	function bianli(obj){
		var props="";
		// 开始遍历
  	  for(var p in obj){ // 方法
      	  if (typeof (obj[p]) == "object"&&obj[p]!=null){ 
      		 props +=p+"="+ bianli(obj[p]) +" \n ";
      	  } else { 
      		 if(obj[p]!=null){
      			props +=p+"="+ obj[p] +" \n "
      		 }
      	  }
  	  }
  	  return props;
	}
	</script>
	<script type="text/javascript">
	//签名生成算法
	
	</script>
</body>
</html>