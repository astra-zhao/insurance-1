$(function(){
    back();
    var orderId=GetQueryString("orderId"),
        money= GetQueryString("money").substring(0,GetQueryString("money").length-1),
        count=GetQueryString("count");
    if(orderId != "" && orderId != null){
    	var orderId=decodeURIComponent(orderId);
    	$("#orderNum").html(orderId);
    }
    if(money != "" && money != null){
    	var money=decodeURIComponent(money);
    	$("#moneys").html(money);
    }
    if(count != "" && count != null){
    	var count=decodeURIComponent(count);
    	$("#procunt").html(count);
    }

    $(".btn").on("click",function(){
    	if($(this).hasClass("btn-gray")){
    		return
    	}else{
    		$(this).addClass("btn-gray")
    		submitOrder()
    	}
    })
    
    
    
	function submitOrder(){
		var orderInfo={
			"body":"无人驾驶飞行器责任保险",
			"out_trade_no":orderId,
			"total_fee":money*100.00   //parseInt($("#moneys").html()).toFixed(0)*100  //分为单位 整形  
		};
		
		$.ajax({
			type : "post",
			async: false,
			data:{orderInfo:JSON.stringify(orderInfo)},
			url : "/wechat/test/pay",
			dataType : "json",
			success : function(data) {
				if (data.code == 200) {
					var appid = data.obj.appid;
					var nonceStr = data.obj.nonce_str;
					var packages = data.obj.packages;
					var timeStamp=data.obj.timeStamp;
					var paySign=data.obj.paySign;
					//调取JSSDK支付接口
					pay(appid,nonceStr,packages,timeStamp,paySign);
					
				}else{
					showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
				}
			}
		}); 
	}    
	//微信支付
	function pay(appid,nonceStr,packages,timeStamp,paySign){
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
				onBridgeReady(appid,nonceStr,packages,timeStamp,paySign);
			} 
		}else{
			showPop('<p style="text-align: center;padding:.2rem 0">请在微信浏览器中打开此链接</p>');
		}
	}
	
	function onBridgeReady(appid,nonceStr,packages,timeStamp,paySign) {
		WeixinJSBridge.invoke('getBrandWCPayRequest', {
			"appId" : appid, //公众号名称，由商户传入     
			"timeStamp" : timeStamp, //时间戳，自1970年以来的秒数     
			"nonceStr" : nonceStr, //随机串     
			"package" : packages,
			"signType" : "MD5", //微信签名方式：     
			"paySign" : paySign //签名 
		}, function(res) {
			if (res.err_msg == "get_brand_wcpay_request:ok") {
				 window.location.href="/html5/products/list/detail-dajiang.html";
			}else if(res.err_msg == "get_brand_wcpay_request:false"){
				
			} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
		});
	}
	
	//判断当前浏览器是否为微信浏览器
	function is_weixin(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
			} else {
			return false;
		}
	}
	

});
