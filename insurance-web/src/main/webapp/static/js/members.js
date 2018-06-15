$(function(){ 
	 back();
	//showFooter	
 	getFooter();
 	showFooter(3);
 	
 	//获取用户信息
 	$.ajax({
 		url:commonUrl+"/user/personalCenter",
 		type:"post",
 		dataType:"json",
 		success:function(data){
 			if(data.code==200){
 				$("#userName").html(data.obj.loginName);
 				if(data.obj.avatar!==null && data.obj.avatar!==""){
 					$("#userAvatar").attr("src",data.obj.avatar)
 				}else{
 					$("#userAvatar").attr("src","/static/images/photo.png")
 				}
                if(data.obj.integral!==null && data.obj.avatar!==""){
 					$("#userIntegral").html(data.obj.integral);
 				}
 			}else if(data.code==1010){
 				showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录</p>');
 				$(".pop span").on("click",function(){
	    	        $(".bgPop").hide();
	    	        $(".pop").hide();
	    	        window.location.href="../login.html";
	    	        //window.history.go(-1);
	    	    })
 			}
 		},
 		error:function(){}
 	})
 	
	 $("#logout").on("click",function(){
		 showDialog("dialog");
		 $(".dialog .btns span:last").on("click",function(){
			 $(this).unbind();
			 $(".bgDialog").hide();
		     $(".dialog").hide();
		     $.ajax({
				 url:commonUrl+"/user/logout",
				 dataType:"json", //不写默认为字符串类型
				 success:function(data){
		             if(data.code==200){
						window.location.href="../index.html";
		             }
				 },
				 error:function(){
					 
				 }
			 })
		 })
		 
	 })
	 
 })