$(function(){
	var img=null,nickname=null;
	back();
	getFooter();//showFooter
	showFooter(3);
	init_height();//init_height
	getInfo();
	init_check();//验证	
	
	$("#birthdate").on("change",function(){
		$(this).val($(this).val().replace(/\//g,"-"));
	});
	
	$("window").on("dbclick",function(){
		return
	});
	
	//mobiscroll
	
	//图片上传
	var upload=document.getElementById('image_input');
	upload.addEventListener('change', function() {
	  var file = upload.files[0];
	  $(".revisePhoto").hide();
	  $(".preview-photo").show();
	  var objUrl = getObjectURL(file);
	  if (objUrl) {
	        $(".big-photo img").attr("src",objUrl);
	    }
	  $(".cancel").on("click",function(){
		  $(".preview-photo").hide();
		  $(".revisePhoto").show();
	 })
	  $(".select").on("click",function(){
		  if($(this).hasClass("click")){
			  return
		  }else{
			  $(".bgDialog").show();
      		  $("#loading").show();
			  $(this).addClass("click");
			  imgUpload("revisePhoto", "image_input", "picUrl"); 
		  }
	 })
	}, false);

	//确认修改按钮
	$("button.block").on("click",function(){
		if(regNick("#nickName") && regBithday("#birthdate") && regEmail("#email") && regIncome("#income") && regAddress("#address")){
			photoSubmit()
		}
	})
})
//scroll	
function init_height(){
	$(".preview-photo").css("height",$(window).height()); 
	var height=$(window).height()-$(".header").outerHeight(true)-$(".footer").outerHeight(true);
	$(".revisePhoto-contener").css({"height":height,"overflow":"auto"});
	//myScroll(".revisePhoto-contener");  //iScroll对mobiscroll有影响
} 
//获取用户头像和呢称
function getInfo(){
	$.ajax({
 		url:commonUrl+"/user/personalCenter",
 		type:"post",
 		dataType:"json",
 		async:false,
 		success:function(data){
 			if(data.code==200){
 				var obj=data.obj;
 				if(obj.avatar){
 					img=obj.avatar;
 					$(".img-photo").attr("src",img);
 					$("#reviseNickname #image_input").val(img)
 				}else{
 					$(".img-photo").attr("src",'/static/images/photo.png');
 				};
                if(obj.nickName){
 					$("#nickName").val(obj.nickName);
 				}
                if(obj.sex==0 || obj.sex==1){
 					if(obj.sex==0){
 						$("input[name='sex']").eq(0).attr("checked",true)
 					}else if(obj.sex==1){
 						$("input[name='sex']").eq(1).attr("checked",true)
 					}
 				}
                if(obj.birthDate!=null){
                	$("#birthdate").val(obj.birthDate.substring(0,10)).attr("readonly",true);
                }else{
 					birthdayScroll("#birthdate")
 				}
                if(obj.mobileNumber){
 					$("#mobileNumber").val(obj.mobileNumber).attr("readonly",true);
 				}
                if(obj.email){
 					$("#email").val(obj.email);
 				}
                getProfessionList("#jobNameSelect","#job-li01","#jobNameLevel2","#job-li02","#jobId");
                if(obj.jobName){
 					$("#jobNameSelect_dummy").val(obj.jobName);
 					$("#job-li01").hide();
 					$("#job-li02").hide();
                }
                if(obj.income){
 					$("#income").val(obj.income);
 				}
                getCityList('#province',"#cityLi",'#city',"#countyLi",'#county');
                if(obj.provinceName!="请选择" && obj.provinceName!=null){
                	$("#cityLi,#countyLi").hide();
                	$("#province_dummy").val(obj.provinceName);
                }
                if(obj.cityName!="请选择" && obj.cityName!=null){
                	$("#province_dummy").val($("#province_dummy").val()+" "+obj.cityName);
	 			}
                if(obj.countyName!="请选择" && obj.countyName!=null){
                	$("#province_dummy").val($("#province_dummy").val()+" "+obj.countyName);
	 			}
                
                if(obj.address){
                	$("#address").val(obj.address);
 				}
 			}else if(data.code==1010){
 				showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录</p>');
 				$(".pop span").on("click",function(){
	    	        $(".bgPop").hide();
	    	        $(".pop").hide();
	    	        window.location.href="../login.html"
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

//初始化验证
function init_check(){
	$("#nickName").on("blur",function(){
		regNick("#nickName")
	});
	$("#birthdate").on("change",function(){
		regBithday("#birthdate")
	});
	$("#email").on("blur",function(){
		regEmail("#email")
	});
	$("#income").on("blur",function(){
		regIncome("#income")
	});
	$("#address").on("blur",function(){
		regAddress("#address")
	});
}

//photoSubmit  用户基本信息修改
function photoSubmit(){
	if(regNick("#nickName") && regBithday("#birthdate") && regEmail("#email") && regIncome("#income") && regAddress("#address")){
		if(($("#jobNameSelect_dummy").val()=="请选择职业" && $("#jobNameLevel2_dummy").val()=="请选择" && $("#jobId_dummy").val()=="请选择") || ($("#jobNameSelect_dummy").val()!="请选择职业" && $("#jobNameLevel2_dummy").val()!="请选择" && $("#jobId_dummy").val()!="请选择")){
			if(($("#province_dummy").val()=="请选择" && $("#city_dummy").val()=="请选择" && $("#county_dummy").val()=="请选择") || ($("#province_dummy").val()!="请选择" && $("#city_dummy").val()!="请选择" && $("#county_dummy").val()!="请选择")){
				$("#reviseNickname").ajaxSubmit({
			        type: "post",
			        url:commonUrl+"/user/changeAvatar",
			        dataType:"json",
			        success: function(data) {
			            if(data.code==200){
			            	showPop('<p style="text-align: center;padding:.1rem 0">恭喜您修改成功</p>');
			 				$(".pop span").on("click",function(){
				    	        $(".bgPop").hide();
				    	        $(".pop").hide();
				    	        getInfo();
				    	        window.history.go(-1)
				    	    })
			            }else if(data.code==400){
			            	showPop('<p style="text-align: center;padding:.1rem 0">您上传的不是图片</p>');
			            }else if(data.code==1001){
			            	showPop('<p style="text-align: center;padding:.1rem 0">图片缺失</p>');
			            }else if(data.code==1010){
			 				showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录</p>');
			 				$(".pop span").on("click",function(){
				    	        $(".bgPop").hide();
				    	        $(".pop").hide();
				    	        window.location.href="../login.html"
				    	    })
			 			}
			        },
			        error: function(data) {
			        	showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
			        }
			    })
			}else{
				showPop('<p style="text-align: center;padding:.1rem 0">请按级选择完整地址</p>');
			}
		}else{
			showPop('<p style="text-align: center;padding:.1rem 0">请按级选择职业</p>');
		}	
  }
}


//上传图片
function imgUpload(fromName, image_input, value_input) {
    var imagePath = $("#" + image_input).val();
    if (imagePath == "") {
        showPop('<p style="text-align: center;padding:.1rem 0">请上传图片文件</p>');
        return false;
    }
    var strExtension = imagePath.substr(imagePath.lastIndexOf('.') + 1);
    if (strExtension != 'jpg' && strExtension != 'gif'
            && strExtension != 'png' && strExtension != 'bmp' 
            	&& strExtension != 'jpeg') {
        showPop('<p style="text-align: center;padding:.1rem 0">请上传图片文件</p>');
        return false;
    }
    $("#" + fromName).ajaxSubmit({
        type : 'POST',
        url : commonUrl+'/fileUpload/saveImage',
        dataType : 'json',
        success : function(data) {
        	if(data.success){
        		$(".bgDialog").hide();
        		$("#loading").hide();
        		$("#reviseNickname #image_input").val(data.msg);
        		$(".img-photo").attr("src",data.msg);
            	showPop('<p style="text-align: center;padding:.1rem 0">上传成功</p>');
            	$(".pop span").on("click",function(){
               	    $(".preview-photo").hide();
        	        $(".pop").hide();
        	  	    $(".revisePhoto").show();
        	  	    $(".select").removeClass("click");
        	    })
        	}
        },
        error : function() {
            showPop('<p style="text-align: center;padding:.1rem 0">上传失败，请检查网络后重试</p>');
        }
    });
}

//获取选取图片的路径
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

//验证出生日期
function regBithday(id){
	var date=new Date();
	var month=date.getMonth()+1;
	var curDate=date.getDate();
	var birth=$(id).val();
	if(birth){
		 if(parseInt(birth.substring(0,5))==2017){
			if(parseInt(birth.substring(5,7))>month || parseInt(birth.substring(8,10))>curDate){
				showPop('<p style="text-align: center;padding:.2rem 0">出生日期不能大于今天</p>');
				return false
			}else{
				return true
			}
		}else{
			return true
		}
  }else{
	  return true
  }
}
//验证邮箱
function regEmail(id){
	var email=$(id).val();
	var regEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //email目前不区分大小写
	if(email){
		if(!regEmail.test(email)){
			showPop('<p style="text-align: center;padding:.2rem 0">邮箱有误</p>');
			return false;
		}else{
			return true;
		}
	}else{
		return true
	}
}
//验证收入
function regIncome(id){
	var income=$(id).val();
	var regIncome=/^\d+$/; 
	if(income){
		if(income.length>8 || income<0){
			showPop('<p style="text-align: center;padding:.2rem 0">收入无效</p>');
			return false;
		}else if(!regIncome.test(income)){
			showPop('<p style="text-align: center;padding:.2rem 0">收入有误</p>');
			return false;
		}else{
			return true;
		}
	}else{
		return true
	}
}

