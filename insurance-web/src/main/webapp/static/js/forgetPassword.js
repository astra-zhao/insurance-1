$(function(){
	 back();
 	
    $("#newPassword").on("blur",function(){
    	regPassword("#newPassword");
    });
   
    $("#newPassword2").on("blur",function(){
    	regPassword2("#newPassword2","#newPassword")
    });
    
    $("#userPhone").on("blur",function(){
    	if(regPhone("#userPhone")){
    		var phone=$("#userPhone").val();
        	$.ajax({
            	url:commonUrl+"/user/isMobileNumExist",
            	type:"post",
                dataType:"json",
                data:{
                	mobileNumber:phone
                },
                success:function(data){
                	if(data.code==1008){
                        return
                	}else{
                		showPop('<p style="text-align: center;padding:.1rem 0">手机号未注册，请先注册</p>');
                		$(".pop span").on("click",function(){
	    	    	        $(".bg").hide();
	    	    	        $(".pop").hide();
	    	    	        window.location.href="login.html";
	    	    	    })
                	}
                }
             });
    	}else{
    		showPop('<p style="text-align: center;padding:.1rem 0">手机号有误</p>');
    	}
    })
    
    var getCodeRegist=null;
    $(".getRegistCode").on("click",function(){
    	if($(this).hasClass("click")){
            return false
        }else{
        	if(regPhone("#userPhone")){
        		var phone=$("#userPhone").val();
        		$.ajax({
                    url:commonUrl+"/user/getValidateCode",
                    type:"post",
                    dataType:"json",
                    data:{
                        key:phone
                    },
                    success:function(data){
                        if(data.code==200){
                        	setTime(".getRegistCode");
                            getCodeRegist=data.obj;
                        }else if(data.code!=200){
                        	 showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
                        }
                    },
                    error:function(data){
                        showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
                        return false
                    }
                })
        	}else{
        		showPop('<p style="text-align: center;padding:.1rem 0">手机号有误</p>');
        	}  	
       }
    });
    
    $("button.block").on("click",function(){
      if(regPhone("#userPhone") && regPassword("#newPassword") && regPassword2("#newPassword2","#newPassword")){
    	if($("#rePassValidCode").val()===getCodeRegist){
    		$.ajax({
    			url:commonUrl+"/user/forgetPWD",
    			type:"post",
    			dataType:"json",
    			data:{
    				newPwd:$("#newPassword").val(),
    				mobileNumber:$("#userPhone").val(),
    				vailCode:$("#rePassValidCode").val(),
    			},
    			success:function(data){
    				if(data.code==200){
    					showPop('<p style="text-align: center;padding:.1rem 0">密码设置成功</p>');
	    	    		$(".pop span").on("click",function(){
	    	    	        $(".bg").hide();
	    	    	        $(".pop").hide();
	    	    	        window.location.href="login.html";
	    	    	    })
    				}else{
    					showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
    				}
    			},
    			error:function(data){
                    showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
                }
    		})
    	}else{
    		showPop('<p style="text-align: center;padding:.1rem 0">验证码有误</p>');
    	}
      }
    })
})