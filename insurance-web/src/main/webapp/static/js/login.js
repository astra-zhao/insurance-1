var timeinter=null;
$(function(){
	//微信端
	var strFlag=GetQueryString("flag");
	if(strFlag !="" && strFlag != null){
		showDialog("dialog");
	}
	//判断用户是否登录
	$.ajax({
		url:commonUrl+"/user/getUserLoginState",
		dataType:"json",
		type:"get",
		success:function(data){
			if(data.code==200){
				$.ajax({
					 url:commonUrl+"/user/logout",
					 dataType:"json", //不写默认为字符串类型
					 success:function(data){
			             if(data.code==200){
							return
			             } 
					 },
					 error:function(data){
		                showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
		             }
				 })
			}
		},
		error:function(data){
            showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
       }
	})
	
    back();
    $(".loginbox .btns li").on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index=$(this).index();
        $(".loginbox .logincon>div").eq(index).addClass("active").siblings().removeClass("active");
    });

 $(".logincon-bottom span").on("click",function(){
	 var x = $(".dialog input");
	 $(x).each(function(){
		 $(this).val('');
	 });
     showDialog("dialog");
 });
 $(".dialog .head span").on("click",function(){
     $(".bgDialog").hide();
     $(".dialog").hide();
 });

var getCodeLogin=0; //获取的登录验证码
var getCodeRegist=0; //获取的注册验证码
var pageUrl= decodeURIComponent(GetQueryString("a")) ? decodeURIComponent(GetQueryString("a")) : "";
//alert(pageUrl)
    //普通登录
    $("#login-btn-nocode").on("click",function(){
    	defaultLogin(pageUrl)
    });
    
function defaultLogin(pageUrl){
	$.ajax({
		url:commonUrl+"/user/getUserLoginState",
		dataType:"json",
		type:"get",
		async:true,
		success:function(data){
			if(data.code==200){
				showPop('<p style="text-align: center;padding:.2rem 0">用户已登录</p>');
				$(".pop span").on("click",function(){
	    	        $(".bgPop").hide();
	    	        $(".pop").hide();
	    	        window.history.go(-1);
	    	    })
			}else{
				var userName=$("#login-username").val();
	            var pass=$("#login-pass").val();
	            $.ajax({
	                url:commonUrl+"/user/login",
	                type:"post",
	                async:true,
	                dataType:"json",
	                data:{
	                    loginName:userName,
	                    password:pass,
	                    loginType:0
	                },
	                success:function(data){
	                    if(data.code!=200){
	                        showPop('<p style="text-align: center;padding:.2rem 0">账户或密码错误</p>')
	                    }else{
	                    	if(pageUrl=="" || pageUrl==null || pageUrl=="null"){
	                    		window.location.href=commonUrl+"/html5/index.html"
	                    	}else{
	                    		window.location.href=commonUrl+pageUrl;
	                    	}
	                    }
	                },
	                error:function(){
	                    showPop('<p style="text-align: center;padding:.2rem 0">登录失败</p>')
	                }
	            });
			}
		}
		
	})	
}
    
   //验证码登录
    $("#getLoginCode").on("click",function(){
        if($(this).hasClass('click')){
            return false
        }else{
            var phone2=$("#login-username2").val();
            $.ajax({
            	url:commonUrl+"/user/isMobileNumExist",
            	type:"post",
                dataType:"json",
                data:{
                	mobileNumber:phone2
                },
                success:function(data){
                	if(data.code==1008){
                		$.ajax({
                            url:commonUrl+"/user/getValidateCode",
                            type:"post",
                            dataType:"json",
                            data:{
                                key:phone2
                            },
                            success:function(data){
                                if(data.code!==200){
                                    showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
                                }else{
                                    setTime("#getLoginCode");
                                    getCodeLogin=data.obj;
                                }
                            },
                            error:function(data){
                            	showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
                            }
                        })
                	}else{
                		showPop('<p style="text-align: center;padding:.2rem 0">手机号未绑定</p>');
                	}
                },
                error:function(data){
                	showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
                }
            })
        }
    });

    $("#login-btn").on("click",function(){
    	$.ajax({
    		url:commonUrl+"/user/getUserLoginState",
    		dataType:"json",
    		type:"get",
    		async:true,
    		success:function(data){
    			if(data.code==200){
    				showPop('<p style="text-align: center;padding:.2rem 0">用户已登录</p>');
    				$(".pop span").on("click",function(){
    	    	        $(".bgPop").hide();
    	    	        $(".pop").hide();
    	    	        window.history.go(-1);
    	    	    })
    			}else{
    				//判断验证码
    	            var code=$("#loginCode").val();
    	            if(code==getCodeLogin){
    	                $.ajax({
    	                    url:commonUrl+"/user/login",
    	                    type:"post",
    	                    async:true,
    	                    dataType:"json",
    	                    data:{
    	                    	loginName:$("#login-username2").val(),
    	                    	password:"",
    	                        loginType:1,
    	                        vailCode:code
    	                    },
    	                    success:function(data){
    	                        if(data.code!==200){
    	                            showPop('<p style="text-align: center;padding:.2rem 0">账户或密码错误</p>')
    	                        }else{
    	                        	window.location.href=commonUrl+pageUrl;
    	                        }
    	                    },
    	                    error:function(data){
    	                        showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>')
    	                    }
    	                });
    	                return true
    	            }else{
    	                showPop('<p style="text-align: center;padding:.2rem 0">验证码有误</p>');
    	                return false
    	            } 
    			}
    		}
    	})
    });

    //注册
    $("#regist-username").on("blur",function(){
        regUserName()
    });
    $("#regist-pass").on("blur",function(){
        regPassword();
    });
    $("#regist-pass2").on("blur",function(){
    	regPassword2()
    });
    $("#regist-phone").on("blur",function(){
        regPhone()
    });
    $("#getRegistCode").on("click",function(){
        if($(this).hasClass("click")){
            return false
        }else{
            if(regPhone()){
            	var phone=$("#regist-phone").val();
                $.ajax({
                    url:commonUrl+"/user/getValidateCode",
                    type:"post",
                    dataType:"json",
                    data:{
                        key:phone
                    },
                    success:function(data){
                        if(data.code!==200){
                            showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
                        }else if(data.code==200){
                            setTime("#getRegistCode");
                        }
                    },
                    error:function(data){
                        showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
                        return false
                    }
                })
            }else{
                showPop('<p style="text-align: center;padding:.2rem 0">手机号有误</p>');
                return false
            }

        }
    });
    
    $(".dialog.regist button").on("click",function(){
    	var openId = "";
    	var registname=$("#regist-username").val();
    	var registpass=$("#regist-pass").val();
    	var registphone=$("#regist-phone").val();
          //判断验证码
        if(regUserName() && regPhone() && regPassword() && regPassword2()){
            var vailCode = $(".registCode").val();
        	var enterType = getCookie(document.cookie,"enterType");
        	if(typeof(enterType) == 'undefined'){
        		enterType = 1;
        	}
        	if(enterType != "" && enterType != null){
        		if(enterType!=0){
        			$.ajax({
                        url:commonUrl+"/user/register",
                        type:"post",
                        dataType:"json",
                        data:{
                        	loginName:registname,
                        	password:registpass,
                        	mobileNumber:registphone,
                        	vailCode:vailCode,
                        	enterType:enterType,  //pc or phone
                        },
                        success:function(data){
                        	if(data.code == 200){
                            	showPop('<p style="text-align: center;padding:.2rem 0">恭喜您，已注册成功</p>');
                            	$(".pop span").on("click",function(){
                            		$(".bgPop").hide();
                                	$(".dialog").hide();
                                	$(".bgDialog").hide();
                                })
                                return true
                            }else{
                            	showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
                            	$(".pop span").on("click",function(){
                            		$(".bgPop").hide();
                                	$(".pop").hide();
                                	$('#getRegistCode').text("重新获取");
                                    $('#getRegistCode').removeClass("click");
                                    clearInterval(timeinter);
                                })
                                return false  
                            }
                        },
                        error:function(data){
                            showPop('<p style="text-align: center;padding:.2rem 0">验证码获取失败</p>');
                            return false
                        }
                    })
        		}else{
        			$.ajax({
                        url:commonUrl+"/user/register",
                        type:"post",
                        dataType:"json",
                        data:{
                        	loginName:registname,
                        	password:registpass,
                        	mobileNumber:registphone,
                        	vailCode:vailCode,
                        	enterType:enterType  //pc or phone
                        },
                        success:function(data){
                            if(data.code == 200){
                            	showPop('<p style="text-align: center;padding:.2rem 0">恭喜您，已注册成功</p>');
                            	$(".pop span").on("click",function(){
                            		$(".bgPop").hide();
                                	$(".dialog").hide();
                                	$(".bgDialog").hide();
                                })
                                return true
                            }else{
                            	showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
                            	$(".pop span").on("click",function(){
                            		$(".bgPop").hide();
                                	$(".pop").hide();
                                	$('#getRegistCode').text("重新获取");
                                    $('#getRegistCode').removeClass("click");
                                    clearInterval(timeinter);
                                })
                                return false  
                            }
                        },
                        error:function(data){
                            showPop('<p style="text-align: center;padding:.2rem 0">验证码获取失败</p>');
                            return false
                        }
                    })
        		}
        		
        	}
        }else{
            return false
        }
    })

});

function regUserName(){
    var username=$("#regist-username").val();
    var regUerName=/^(?![0-9]+$)[a-zA-Z0-9_]+$/;
    if(username.length < 6 || username.length > 16){
        showPop('<p style="text-align: center;padding:.2rem 0">请输入6-16位用户名</p>');
	    return false;
    }else if(!regUerName.test(username)){
        showPop('<p style="text-align: center;padding:.2rem 0">字母、数字及下划线组成</p>');
        return false;
    }else{
        return true;
    }
}
function regPhone(){
    var phone=$("#regist-phone").val();
    var regPhone=/^[1][34578][0-9]{9}$/;/*phone*/
    if(phone==""){
        showPop('<p style="text-align: center;padding:.2rem 0">手机号不能为空</p>');
        return false;
    }else if(!regPhone.test(phone)){
        showPop('<p style="text-align: center;padding:.2rem 0">手机号有误</p>');
        return false;
    }else{
        return true
    }
}

function regPassword(){
    var pass=$("#regist-pass").val();
    var regPass=/^[a-zA-Z0-9_!@#$%^&]+$/;
    if(pass.length < 6 || pass.length > 16){
        showPop('<p style="text-align: center;padding:.2rem 0">请输入6-16位密码</p>');
        return false;
    }else if(!regPass.test(pass)){
        showPop('<p style="text-align: center;padding:.2rem 0">字母、数字、下划线或特殊符号组成</p>');
        return false;
    }else{
        return true
    }
}

function regPassword2(){
    var pass=$("#regist-pass").val();
    var pass2=$("#regist-pass2").val();
    if( pass2== "" || pass2 == null){
		showPop('<p style="text-align: center;padding:.2rem 0">请输入确认密码</p>');
		return false;
	}else if(pass2 != pass){
		showPop('<p style="text-align: center;padding:.2rem 0">确认密码有误</p>');
		return false;
	}else{
		return true;
	}
}


function setTime(id){
	clearInterval(timeinter);
    var time=60;
    $(id).addClass('click');
    $(id).text(time+"S");
    timeinter=setInterval(function(){
        time=time-1;
        $(id).text(time+"s");
        if(time==0){
            $(id).text("重新获取");
            $(id).removeClass("click");
            clearInterval(timeinter);
        }
    },1000);
}


