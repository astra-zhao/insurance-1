$(function(){
back();

//get urlPara
var string=GetQueryString("proid");
var proId=null;
if(string!="" && string!=null){
   proId=string
}
 
//获取积分
   $.ajax({
 		url:commonUrl+"/user/personalCenter",
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.code==200){
				if(data.obj.integral!=null && data.obj.integral!=""){
		        	$("#integral").html(data.obj.integral);
				}
			}else if(data.code==1010){
				showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录</p>');
				$(".pop span").on("click",function(){
			        $(".bgPop").hide();
			        $(".pop").hide();
			        window.location.href="../login.html"
		    	    })
				}
			},
			error:function(){}
	});
  
    
  //动态生成界面  
   $.ajax({
 		url:commonUrl+"/user/getIntegralProByPK",
		type:"post",
		dataType:"json",
		data:{
			proId:proId
		},
		success:function(data){
			if(data.code==200){
				var cur=data.obj;
				$(".header h2").html(cur.shortName);
				$(".duihuancard em").html(cur.integral);
				$(".duihuancard strong").html(cur.name);
				$("#detail").html(cur.details);
				$("#bigbg").attr("src",cur.bgUrl);
				$("#time").html(integralTime(new Date().getFullYear(),cur.expiryDate));
				$("#scope").html(cur.scope);
			}else{
				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
			}
		},
		error:function(){}
   });

    //兑换
	$(".btn-duihuan").on("click",function(){
		$("#goodName").html($(".duihuancard strong").html());
		$("#removeintegral").html($(".duihuancard em").html());
		var sheng=$("#integral").text()-$(".duihuancard em").text();
		if(sheng<0){
			$("#shengintegral").html(0);
		}else{
			$("#shengintegral").html(sheng);
		}
	    showDialog("duihuan");
	    $(".duihuan button").on("click",function(){
	    	$.ajax({
	     		url:commonUrl+"/user/exchange",
	     		type:"post",
	     		dataType:"json",
	     		data:{
	     			proId:proId
	     		}, 
	     		success:function(data){
	     			if(data.code==200){
	     				$(".duihuan").hide();
	     				showPop('<p style="text-align:center;padding:.1rem 0">兑换成功</p><p style="text-align:left;font-size:.14rem;color:#0099cb;margin:.1rem 0">*兑换成功后的电子券可在我的兑换中查看</p>');
	     				$(".pop span").on("click",function(){
	     					$(".bgPop").hide();
	     					window.history.go(-1)
	     				})
	     			}else{
	     				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
	     			}
	     		},
	     		error:function(){}
	     	});
	        
	    })
	
	})
})