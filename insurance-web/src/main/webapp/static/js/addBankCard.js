$(function(){
	userLoginState();
	getCardLists();
	$('#bId').mobiscroll().select({
        mode: 'scroller',
        animate: 'slideup',
        theme: 'default', 
        display: 'bottom'
    });
    back();
	getFooter();
	showFooter(3);
	
	//判断用户是否绑过卡
	$.ajax({
 		url:commonUrl+"/user/personalCenter",
 		type:"post",
 		dataType:"json",
 		success:function(data){
 			if(data.code==200){
 				if(data.obj.realName==1){
 					$("#userName").val(data.obj.uname);
 					$("#userName").attr("readonly","readonly");
 					$("#idCard").val(data.obj.certCode);
 					$("#idCard").attr("readonly","readonly");
 					$("#userName").unbind();
 					$("#idCard").unbind();
 				}
 			}else if(data.code==1010){
 				showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录</p>');
 				$(".pop span").on("click",function(){
	    	        $(".bg").hide();
	    	        $(".pop").hide();
	    	        window.location.href="../login.html"
	    	    })
 			}
 		},
 		error:function(data){
 			showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
 		}
 	})
	
    $("#bankNumber").on("keyup",function(){
    	var reg=/^\d+$/g;
    	if($(this).val().length==6 && reg.test($("#bankNumber").val())){
    		$.ajax({
	           	url:commonUrl+"/user/getBankBySixInfo",
	           	type:"post",
	           	dataType:"json",
	           	data:{
	           		sixInfo:parseInt($("#bankNumber").val().substr(0,6))
	           	},
	            success:function(data){
               	   if(data.code==200){
               		  $("#bId_dummy").val(data.rows[0].bName);
               		  $("#bankShortName").val(data.rows[0].shortName);
               		  $("#bId").val(data.rows[0].bId);
               		  //$("#bId").hide();
               		 // $("#bId").attr("disabled",true);
               		 //$('#bId').mobiscroll('clear'); 
               	   }
	            },
	            error:function(data){
	     			showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
	     		}
	        })
    	}
    })
    
    
	$("#bankNumber").on("blur",function(){
		if(luhmCheck("#bankNumber")){
			$.ajax({
	           	url:commonUrl+"/user/getBankBySixInfo",
	           	type:"post",
	           	dataType:"json",
	           	data:{
	           		sixInfo:parseInt($("#bankNumber").val().substr(0,6))
	           	},
	            success:function(data){
	           	   if(data.code==200){
	           		  $("#bId_dummy").val(data.rows[0].bName);
	           		  $("#bankShortName").val(data.rows[0].shortName);
	           		  $("#bId").val(data.rows[0].bId);
	           	   }
	            },
	            error:function(data){
	     			showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
	     		}
	        })
		}
	});
    
    $("#bId").on("change",function(){
		if(luhmCheck("#bankNumber")){
			$("#bId_dummy").val($(this).find("option:selected").text());
    		$("#bankShortName").val($(this).find("option:selected").attr("shortname")); //Jquery获取select选中项 自定义属性的值
    	}else{
    		$("#bId_dummy").val("请输入所属银行");
    		showPop('<p style="text-align: center;padding:.1rem 0">请输入正确的银行卡号</p>');
    	}
    	
    })
	
    $("#userName").on("blur",function(){
		regName("#userName")
	});
	$("#idCard").on("blur",function(){
		regID("#idCard");
	});
	$("#userPhone").on("blur",function(){
		regPhone("#userPhone");
	});
	
	//getVaildCode
	$(".getRegistCode").on("click",function(){
		if($(this).hasClass("click")){
			return false
		}else{
			if($("#userName").attr("readonly")=="readonly" && $("#idCard").attr("readonly")=="readonly"){
				if(luhmCheck("#bankNumber") && $("#bankShortName").val()!="" && regPhone("#userPhone")){
					$("#addCardForm").ajaxSubmit({
		                url:commonUrl+"/user/getValiBankCode",
		                type:"post",
		                dataType:"json",
		                success:function(data){
		                    if(data.code==200){
		                    	setTime(".getRegistCode");
		                    }else{
		                    	showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
		                    }
		                },
		                error:function(data){
		                    showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
		                    return false
		                }
		            })
				 }
			}else{
				if(luhmCheck("#bankNumber") && $("#bankShortName").val()!="" && regName("#userName") && regID("#idCard") && regPhone("#userPhone")){
					$("#addCardForm").ajaxSubmit({
		                url:commonUrl+"/user/getValiBankCode",
		                type:"post",
		                dataType:"json",
		                success:function(data){
		                    if(data.code==200){
		                    	setTime(".getRegistCode");
		                    }else{
		                    	showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
		                    }
		                },
		                error:function(){
		                    showPop('<p style="text-align: center;padding:.1rem 0">验证码获取失败</p>');
		                    return false
		                }
		            })
				 }
			}
			
		}
	});
	
	//submit
	$("button.block").on("click",function(){
		if($("#userName").attr("readonly")=="readonly" && $("#idCard").attr("readonly")=="readonly"){
			if(luhmCheck("#bankNumber") && $("#bankShortName").val()!="" && regPhone("#userPhone")){
				if($("#vailCode")!=""){
					$("#addCardForm").ajaxSubmit({
						url:commonUrl+"/user/bindBankcard",
						type:"post",
						dataType:"json",
						success:function(data){
							if(data.code==200){
								showPop('<p style="text-align: center;padding:.1rem 0">绑卡成功</p>');
								$(".pop span").on("click",function(){
					    	        $(".bg").hide();
					    	        $(".pop").hide();
					    	        window.history.go(-1);
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
			    	showPop('<p style="text-align: center;padding:.1rem 0">请输入获取的验证码</p>');
			    }
			 }
		   }else{
				if(luhmCheck("#bankNumber") && $("#bankShortName").val()!="" && regName("#userName") && regID("#idCard") && regPhone("#userPhone")){
					if($("#vailCode")!=""){
						$("#addCardForm").ajaxSubmit({
							url:commonUrl+"/user/bindBankcard",
							type:"post",
							dataType:"json",
							success:function(data){
								if(data.code==200){
									showPop('<p style="text-align: center;padding:.1rem 0">绑卡成功</p>');
									$(".pop span").on("click",function(){
						    	        $(".bg").hide();
						    	        $(".pop").hide();
						    	        window.history.go(-1);
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
				}
		  }
	})
})

function getCardLists(){
	 $.ajax({
	   	url:commonUrl+"/user/bankList",
	   	type:"post",
	   	async:"false",
	   	dataType:"json",
	   	data:{
	   		dtype:'0,2'
	   	},
	    success:function(data){
	       	if(data.code==200){
	       		for(var i=0;i<data.rows.length;i++){
	       			var cur=data.rows[i];
	       			$("<option></option>").val(cur.id).text(cur.bname).appendTo($("#bId")).attr("shortName", cur.shortName);
	       		} 
	       	}
	    },
	    error:function(data){
	    	showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
	    }
   })
} 
