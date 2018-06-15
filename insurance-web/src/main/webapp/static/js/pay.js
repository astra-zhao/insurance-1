$(function(){
    back();
   //showFooter	
	if(footerHtml==null && footerImgs==""){
		getFooter();
		showFooter(1); 
	}
	var getCardListFlag=true;	
	//生成银行卡列表
	getCardList();
   $(".bankcard").on("click",function(){
       showDialog("dialog.pay");
   });
   $(".btn").on("click",function(){
	   showDialog("check-shenfen");
	   $(".getRegistCode").unbind();
	   $(".getRegistCode").on("click",function(){
		 if(parseInt($(".icon.icon-yes").prev("span").attr("data-code"))){
			 if($(".getRegistCode").hasClass("click")){
				 return 
			 }else{
				 setTime(".getRegistCode");
				 $.ajax({
					   url:commonUrl+"/trading/quickPaySign",
					   type:"post",
					   async:"false",
					   dataType:"json",
					   data:{
						   orders_id:orderId,
						   payment_amount:1,//parseInt($("#moneys").html()),
						   userBankId:parseInt($(".icon.icon-yes").prev("span").attr("data-code"))
					   },
					   success:function(data){
						   if(data.code==200){
							   var reg=/^\d{6}$/g;
							   $("#getCode").on("keyup",function(){
								   if(reg.test($("#getCode").val())){
									   $(".btn_ok").removeClass("btn-gray");
								   }else{
									   $(".btn_ok").addClass("btn-gray");
								   }
							   })
						   }else{
							   showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
						   }
					   },
					   error:function(data){
						   showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
					   }
				   })
			 }
			 
		 }else{
			 showPop('<p style="text-align: center;padding:.1rem 0">您还没有绑卡</p>');
		 }
		   
	   })
   });

   //获取验证码之后点确认
   $(".btn_ok").on("click",function(){
	   if($(this).hasClass("btn-gray")){
		   return
	   }else{
		    $(this).addClass("btn-gray");
		    $(".check-shenfen").hide();
		    $(".bgDialog").hide();
		   $.ajax({
			   url:commonUrl+"/trading/quickPayRequest",
			   dataType:"json",
			   type:"post",
			   data:{
				   orders_id:orderId,
				   payment_amount:parseInt($("#moneys").html()),
				   userBankId:parseInt($(".icon.icon-yes").prev("span").attr("data-code")),
				   vailCode:$("#getCode").val()
			   },
			   success:function(data){
				   if(data.code==200){
					   showPop('<p style="text-align: center;padding:.1rem 0">交易成功</p>');
					   window.location.href=commonUrl+"/html5/products/order.html";
				   }else{
					   showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
				   }
			   },
			   error:function(data){
				   showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
			   }
		   })
		  
	   }
	   
   })
 //获取银行卡列表
function getCardList(){
   if(getCardListFlag){
	   $.ajax({
	   		url:commonUrl+"/user/bankcard",
	        type:"post",
	        dataType:"json",
	        async:false,
	        success:function(data){
				if(data.code==200){
					var html="";
					for(var i=0;i<data.rows.length;i++){
						var cur = data.rows[i];
						 if(cur.isdefault == 1){
							 html+='<li class="cardslist" data-check="check">';
							 $("#shortName").html(cur.bankName);
							 $("#weihao").html("(尾号"+cur.bankNumber.substr(cur.bankNumber.length-4,4)+")");
							 $("#weihao").attr("data-code",cur.ubId);
						 }else{
							 html+='<li class="cardslist" data-check="">';
						 }
						   html+='<span class="shortName">'+cur.bankName+'</span><span class="weihao" data-code="'+cur.ubId+'">(尾号'+cur.bankNumber.substr(cur.bankNumber.length-4,4)+')</span>';
						   if(cur.isdefault == 1){
							   html+='<i class="icon icon-yes"></i>';
						   }
						   html+='<i class=""></i>';
						html+='</li>';
					}
					 getCardListFlag=false;
					 $("#bankCardsList").prepend(html);
					 var newHeight=$(".dialog.orderConfirm.pay").height()+($(".cardslist").height()+1)*(data.rows.length);
					 $(".dialog.orderConfirm.pay").css({
						 "height":newHeight,
						 "margin-top":-newHeight/2	 
					 })
					 $("#bankCardsList li.cardslist").unbind();
					 $("#bankCardsList li.cardslist").on("click",function(){
						 if($(this).attr("data-check")=="check"){
							 return
						 }else{
							 $("#bankCardsList li.cardslist").attr("data-check","");
							 $("#bankCardsList li.cardslist").find("i").removeClass("icon icon-yes");
							 $(this).attr("data-check","check");
							 $(this).find("i").addClass("icon icon-yes");
							 $("#shortName").html($(this).find(".shortName").html());
							 $("#weihao").html($(this).find(".weihao").html());
							 $("#weihao").attr("data-code",$(this).find(".weihao").attr("data-code"))
						 }
					 })
				}else if(data.code==1010){
					showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录，请先登录</p>');
					$(".pop span").on("click",function(){
				        window.location.href=commonUrl+"/html5/login.html?a="+encodeURIComponent("/html5/products/buy/pay.html?orderId="+GetQueryString("orderId")); 
			          })
			   }else if(data.code==1003){
					showPop('<p style="text-align: center;padding:.1rem 0">您还没绑定银行卡，请添加</p>');
					 $(".pop span").unbind();
					 $(".pop span").on("click",function(){
						    $(".bgPop").hide();
					        $(".pop").hide();
						    window.location.href=commonUrl+"/html5/members/members-addBankCard.html"
					   })
		   		}
	   		},
	   		error:function(){}
	   	})
   }else{
	   return;
   }
  
}       


});
