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
  				$("#userPhone").val(data.obj.mobileNumber);
  			}
  		},
  		error:function(){}
  	})
 	 
    $("#newPassword").on("blur",function(){
    	regPassword("#newPassword");
    });
   
    $("#newPassword2").on("blur",function(){
    	regPassword2("#newPassword2","#newPassword")
    });
    
    $(".getRegistCode").on("click",function(){
    	if($(this).hasClass("click")){
            return
        }else{
    		var phone=$("#userPhone").val();
    		$.ajax({
                url:commonUrl+"/user/getValidateCode",
                type:"post",
                dataType:"json",
                data:{
                    key:phone  //待改 手机号不能修改打星的
                },
                success:function(data){
                    if(data.code!==200){
                        showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
                    }else if(data.code==200){
                        setTime(".getRegistCode");
                    }
                },
                error:function(){
                    showPop('<p style="text-align: center;padding:.2rem 0">验证码获取失败</p>');
                    return false
                }
            })
       }
    });
    
    $("button.block").on("click",function(){
    	if(regPassword("#newPassword") && regPassword2("#newPassword2","#newPassword")){
    		if($("#rePassValidCode").val()===getCodeRegist){
        		$.ajax({
        			url:commonUrl+"/user/changePWD",
        			type:"post",
        			dataType:"json",
        			data:{
        				newPwd:$("#newPassword").val(),
        				mobileNumber:$("#userPhone").val(),
        				vailCode:$("#rePassValidCode").val()
        			},
        			success:function(data){
        				if(data.code==200){
        					showPop('<p style="text-align: center;padding:.2rem 0">密码修改成功</p>');
    	    	    		$(".pop span").on("click",function(){
    	    	    	        $(".bgPop").hide();
    	    	    	        $(".pop").hide();
    	    	    	        $.ajax({
    	    	    				 url:commonUrl+"/user/logout",
    	    	    				 dataType:"json", //不写默认为字符串类型
    	    	    				 success:function(data){
    	    	    		             if(data.code==200){
    	    	    						window.location.href="../login.html";
    	    	    		             }
    	    	    				 },
    	    	    				 error:function(){}
    	    	    			 })
    	    	    	    })
        				}else{
        					showPop('<p style="text-align: center;padding:.2rem 0">密码修改失败</p>');
        				}
        				
        			},
        			error:function(){}
        		})
        		
        	}else{
        		showPop('<p style="text-align: center;padding:.2rem 0">验证码有误</p>');
        	}
    	}
    })
})