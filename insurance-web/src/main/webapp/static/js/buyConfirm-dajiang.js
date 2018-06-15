$(function(){
    back();
    //mobileScroll
    addMobiscroll("#customType");
    addMobiscroll("#certificateType");
    addMobiscroll("#insuranceNumber");
    getCityList('#select-province',"#select-city-li",'#select-city',"#select-area-li",'#select-area');
    //页面回填
    pageFillIn();
    var code=GetQueryString("code");
	if(code != "" && code != null){
    	$.ajax({
    		url:"/wechat/dealWechatCode",
    		type:"post",
    		dataType:"json",
    		async:true,
    		data:{
    			code:code
    		},
    		success:function(data){},
    		error:function(data){}
    	})
    }
	var airplaneCount=1;//默认无人机数量
	$("#moneys").html(300);
 	//主体内容的高度
	var height=$(window).height()-$('.header').outerHeight(true)-$("a.block").outerHeight(true);
    $(".buyConfirm-contener").css({"height":height,"overflow":"auto"});
    //起保日期
    startDateScroll("#startDate");
    $("#startDate").on("change",function(){
    	var startDate= new Date(Date.parse($(this).val()));
    	var a=DateAdd( "d ", 364, startDate); 
		var endDate=a.Format("yyyy-MM-dd");
		$("#closingDate").val(endDate);
    })
    
    $("#customType").on("change",function(){
    	if($("#customType").val()==0){
    		$("#companyBox").show();
    		$("#personBox").hide();
    		$("#companyName").val("");
    		getCityList('#select-province',"#select-city-li",'#select-city',"#select-area-li",'#select-area');
    		$("#area").val("");
    		$("#phone").unbind();
            $("#phone").on("blur",function(){
    		  if(sessionStorage.getItem("contactsMoblieNum")==$("#phone").val()){
    			  $("#companyCodeLi").hide();
    		   }else{
    			   isMobileNumExist("#phone","#getRegistCodeCompany","#companyCodeLi","#companyBtn","#codeCompany")
    		   }
            })
    	}else{
    		$("#companyBox").hide();
    		$("#personBox").show();
    		$("#companyName").val("");
    		getCityList('#select-province',"#select-city-li",'#select-city',"#select-area-li",'#select-area');
    		$("#area").val("");
    		$("#phonePerson").unbind();
    		$("#phonePerson").on("blur",function(){
    		  if(sessionStorage.getItem("applicantMobile")==$("#phonePerson").val()){
    			  $("#personCodeLi").hide();
    		   }else{
    			   isMobileNumExist("#phonePerson","#getRegistCodePerson","#personCodeLi","#personBtn","#codePerson")
    		   }
    		  if(regPhone("#phonePerson")){
    	    		if($("input[name='isBenren']:checked").val()=="yes"){
    	    			 $("#beibaoPhone").val($("#phonePerson").val());
    	    		}else{
    	    			$("#beibaoPhone").val("");
    	    		}
    	    	}
            })
    	}
    })
    
    //表单验证
    init_reg();
    $("#insuranceNumber").on("change",function(){
    	$("#moneys").html(300*parseInt($(this).val())*airplaneCount);
    })
    
    //是否为本人
    $("input[name='isBenren']").on("click",function(){
    	if($("input[name='isBenren']:checked").val()=="yes"){
    	  $("#beibaoName").val($("#companyName").val());
    	  $("#beibaoCertCode").val($("#certCode").val());
    	  $("#beibaoPhone").val($("#phonePerson").val());
    	}else{
    		$("#beibaoName").val("");
      	    $("#beibaoCertCode").val("");
      	    $("#beibaoPhone").val("");
    	}
    })
   
    //判断手机号是否注册过
    $("#phone").on("blur",function(){
    	isMobileNumExist("#phone","#getRegistCodeCompany","#companyCodeLi","#companyBtn","#codeCompany")
    })
    $("#phonePerson").on("blur",function(){
    	if(regPhone("#phonePerson")){
    		if($("input[name='isBenren']:checked").val()=="yes"){
    			 $("#beibaoPhone").val($("#phonePerson").val());
    		}else{
    			$("#beibaoPhone").val("");
    		}
    	}
    	isMobileNumExist("#phonePerson","#getRegistCodePerson","#personCodeLi","#personBtn","#codePerson");
    })
 
    //添加删除无人机
    $(".icon-add").on("click",function(){
    	addSN()
    })
    
    $("#iconMinusFirst").on("click",function(){
	   if($(".icon-minus").length==1){
		   showPop('<p style="text-align: center;padding:.1rem 0">必须要保留一个序列号，此条记录不能删除</p>');
		   return;
	   }else{
		    airplaneCount--;
	    	var minusIndex=$(this).index(".icon-minus");
	    	$(".inputSN").each(function(index,ele){
	    		if(index>minusIndex){//SNCode1
	    			var num=parseInt($(this).attr("id").substring(6,$(this).attr("id").length));
		    		num-=1;
		    		$(this).attr({"id":"SNCode"+num,"name":"SNCode"+num});
	    		}
	    	})
	    	$(this).parent().parent("li").remove();
	    	$("#moneys").html(300*parseInt($("#insuranceNumber").val())*airplaneCount); 
	   }
	})
    
    /*是否同意条款*/
    $(".icon-check").on("click",function(){
        if($(this).attr("data-check")=="false"){
            $(this).attr("data-check","true").addClass("icon-check-blue");
            $("a.block").removeClass('btn-noconfirm');
        }else if($(this).attr("data-check")=="true"){
            $(this).attr("data-check","false").removeClass("icon-check-blue");
            $("a.block").addClass('btn-noconfirm');
        }
    });
    
    $("a.block").on("click",function(){
        if($(".icon-check").attr("data-check")=="false"){
            $("a.block").addClass("btn-noconfirm");
            showDialog("dialog-tip");
            return
        }else if($(".icon-check").attr("data-check")=="true"){
        	if(regAll(airplaneCount)){
        		var snCode="";
        		var inputSNCount=$(".inputSN").length;
        		if(airplaneCount>1){
        			$(".inputSN").each(function(index,ele){
        				if(index==airplaneCount-1){
        					snCode+=$(this).val();
        				}else{
        					snCode+=$(this).val()+",";
        				}
        			})
        		}else{
        			snCode+=$("#SNCode1").val();
        		}
        		var insuranceNumber=parseInt($("#insuranceNumber").val());
        		var insuredObject={
        			"proName":"无人驾驶飞行器责任保险",
        			"startDate":$("#startDate").val(),//more
        			"closingDate":$("#closingDate").val(),//more
        			"customType":parseInt($("#customType").val()),
        			"applicantName":$("#companyName").val(),
        			"insuredAdress":$("#select-province_dummy").val()+" "+$("#select-city_dummy").val()+" "+$("#select-area_dummy").val()+" "+$("#area").val(),
        			"insuranceNumber":insuranceNumber,
        			"premium":parseFloat($("#moneys").html()).toFixed(2),
        			"SNCode":snCode,
        			"aggLimitInd":30*insuranceNumber+"万",
        			"eachAccLimitInd":30*insuranceNumber+"万",
        			"eachAccPerInjuryLimitInd":20*insuranceNumber+"万",
        			"eachAccMedicalLimitInd":3*insuranceNumber+"万"
        		};
        		if($("#customType").val()==0){
        			insuredObject.applicantCertType=parseInt($("#certificateType").val());
        			insuredObject.applicantCertTypeName=$("#certificateType_dummy").val();
        			insuredObject.applicantCertNo=$("#credentials").val();
        			insuredObject.contactsName=$("#linkman").val();
        			insuredObject.contactsMoblieNum=$("#phone").val();
        			sessionStorage.setItem("certificateTypeName", $("#certificateType_dummy").val());
        			sessionStorage.setItem("applicantCertNo", $("#credentials").val());
        			sessionStorage.setItem("contactsName", $("#linkman").val());
        			sessionStorage.setItem("contactsMoblieNum", $("#phone").val());
        			
        			if($("#companyCodeLi").css("display")=="block"){
        				insuredObject.vailCode=$("#codeCompany").val();
        			}else{
        				insuredObject.vailCode=""
        			}
        			
        		}else if($("#customType").val()==1){
        			insuredObject.applicantCertType=0;
        			insuredObject.applicantCertNo=$("#certCode").val();	
        			insuredObject.applicantMobile=$("#phonePerson").val();
        			insuredObject.insuredName=$("#beibaoName").val();
        			insuredObject.insuredCertNo=$("#beibaoCertCode").val();
        			insuredObject.insuredMobile=$("#beibaoPhone").val();
        			sessionStorage.setItem("applicantCertNo", $("#certCode").val());
        			sessionStorage.setItem("applicantMobile", $("#phonePerson").val());
        			sessionStorage.setItem("insuredName", $("#beibaoName").val());
        			sessionStorage.setItem("insuredCertNo", $("#beibaoCertCode").val());
        			sessionStorage.setItem("insuredMobile", $("#beibaoPhone").val());
        			if($("#personCodeLi").css("display")=="block"){
        				insuredObject.vailCode=$("#codePerson").val();
        			}else{
        				insuredObject.vailCode=""
        			}
        		}
        		sessionStorage.setItem("startDate", $("#startDate").val());
        		sessionStorage.setItem("closingDate", $("#closingDate").val());
        		sessionStorage.setItem("customType", $("#customType").find("option:selected").text());
        		sessionStorage.setItem("applicantName", $("#companyName").val());
        		sessionStorage.setItem("province", $("#select-province_dummy").val());
        		sessionStorage.setItem("city", $("#select-city_dummy").val());
        		sessionStorage.setItem("county", $("#select-area_dummy").val());
        		sessionStorage.setItem("area", $("#area").val());
        		if($("#personCodeLi").css("display")=="block"){
        			if($("#personBtn").hasClass("click")){
        				$(this).attr("href","orderConfirm-dajiang.html?insuredObject="+JSON.stringify(insuredObject))
        			}else{
        				showPop('<p style="text-align: center;padding:.2rem 0">未验证手机</p>');
        			}
        		}else if($("#companyCodeLi").css("display")=="block"){
                  if($("#companyBtn").hasClass("click")){
                	  $(this).attr("href","orderConfirm-dajiang.html?insuredObject="+JSON.stringify(insuredObject))
        			}else{
        				showPop('<p style="text-align: center;padding:.2rem 0">未验证手机</p>');
        			}
        		}else{
        			 $(this).attr("href","orderConfirm-dajiang.html?insuredObject="+JSON.stringify(insuredObject))
        		}
        		
        	}
        }
    })
    
//页面回填    
function pageFillIn(){
	var startDate=sessionStorage.getItem("startDate");
	if(startDate){
		$("#startDate").val(startDate)
	}
	var closingDate=sessionStorage.getItem("closingDate");
	if(closingDate){
		$("#closingDate").val(closingDate)
	}
	var customType=sessionStorage.getItem("customType");
	if(customType){
		$("#customType_dummy").val(customType);
	}
	var applicantName=sessionStorage.getItem("applicantName");
	if(applicantName){
		$("#companyName").val(applicantName)
	}
	if(customType=="企业用户"){
		$("#companyBox").show();
		$("#personBox").hide();
		$("#customType").val(0);
    	var applicantCertType=sessionStorage.getItem("applicantCertType");
    	if(applicantCertType){
    		$("#applicantCertType_dummy").val(applicantCertType);
    		if(applicantCertType=="营业执照"){
    			$("#certificateType").val(1)
    		}else if(applicantCertType=="税务登记证"){
    			$("#certificateType").val(2)
    		}else if(applicantCertType=="组织机构代码证"){
    			$("#certificateType").val(3)
    		}else if(applicantCertType=="社会统一信用代码"){
    			$("#certificateType").val(4)
    		}
    	}
    	var applicantCertNo=sessionStorage.getItem("applicantCertNo");
    	if(applicantCertNo){
    		$("#credentials").val(applicantCertNo);
    	}
    	var contactsName=sessionStorage.getItem("contactsName");
    	if(contactsName){
    		$("#linkman").val(contactsName);
    	}
    	var contactsMoblieNum=sessionStorage.getItem("contactsMoblieNum");
    	if(contactsMoblieNum){
    		$("#phone").val(contactsMoblieNum);
    	}
		$("#phone").unbind();
        $("#phone").on("blur",function(){
		  if(sessionStorage.getItem("contactsMoblieNum")==$("#phone").val()){
			  $("#companyCodeLi").hide();
		   }else{
			   isMobileNumExist("#phone","#getRegistCodeCompany","#companyCodeLi","#companyBtn","#codeCompany")
		   }
        })
	}else if(customType=="个人用户"){
		$("#companyBox").hide();
		$("#personBox").show();
		$("#customType").val(1);
		var applicantCertNo=sessionStorage.getItem("applicantCertNo");
    	if(applicantCertNo){
    		$("#certCode").val(applicantCertNo);
    	}
    	var applicantMobile=sessionStorage.getItem("applicantMobile");
    	if(applicantMobile){
    		$("#phonePerson").val(applicantMobile);
    	}
    	var insuredName=sessionStorage.getItem("insuredName");
    	if(insuredName){
    		$("#beibaoName").val(insuredName);
    	}
    	var insuredCertNo=sessionStorage.getItem("insuredCertNo");
    	if(insuredCertNo){
    		$("#beibaoCertCode").val(insuredCertNo);
    	}
    	var insuredMobile=sessionStorage.getItem("insuredMobile");
    	if(insuredMobile){
    		$("#beibaoPhone").val(insuredMobile);
    	}
    	$("#phonePerson").unbind();
		$("#phonePerson").on("blur",function(){
		  if(sessionStorage.getItem("applicantMobile")==$("#phonePerson").val()){
			  $("#personCodeLi").hide();
		   }else{
			   isMobileNumExist("#phonePerson","#getRegistCodePerson","#personCodeLi","#personBtn","#codePerson")
		   }
		   if(regPhone("#phonePerson")){
	    		if($("input[name='isBenren']:checked").val()=="yes"){
	    			 $("#beibaoPhone").val($("#phonePerson").val());
	    		}else{
	    			$("#beibaoPhone").val("");
	    		}
	    	}
		  
        })
	  }
	var province=sessionStorage.getItem("province");
	if(province){
		$("#select-province_dummy").val(province);
	}
	var city=sessionStorage.getItem("city");
	if(city){
		$("#select-city-li").show();
		addMobiscroll("#select-city");
		$("#select-city").unbind();
		$("#select-city").on("change",function(){
			showPop('<p style="text-align: center;padding:.2rem 0">请先选择省份</p>');
		})
		$("#select-city_dummy").val(city);
	}
	var county=sessionStorage.getItem("county");
	if(county){
		$("#select-area-li").show();
		addMobiscroll("#select-area");
		$("#select-area").unbind();
		$("#select-area").on("change",function(){
			showPop('<p style="text-align: center;padding:.2rem 0">请先选择城市</p>');
		})
		$("#select-area_dummy").val(county);
	}
	var area=sessionStorage.getItem("area");
	if(area){
		$("#area").val(area);
	}
}    
    
//起保日期    
function startDateScroll(id){
	var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.datetime = {
        preset: 'date'
    };
    opt.defaults = {
    	theme: 'default', //皮肤样式
        display: 'bottom', //显示方式 ：modal（正中央）  bottom（底部）
        mode: 'scroller', //日期选择模式
        labels: ['年', '月', '日'],
        dateFormat: 'yy-mm-dd',
        startYear: currYear, //开始年份currYear-5不起作用的原因是加了minDate: new Date()
        endYear: currYear, //结束年份
        startMonth: (new Date()).getMonth(),
        startDay:(new Date()).getDate()+3,
        //showNow: true //显示当前按钮
    };
    //$("#birthday").val('').scroller('destroy').scroller($.extend(opt['date'], opt['defaults']));
    var optDateTime = $.extend(opt['datetime'], opt['defaults']);
    $(id).mobiscroll(optDateTime).date(optDateTime);
}    

//初始化验证
function init_reg(){
    $("#companyName").on("blur",function(){
    	if(regName("#companyName")){
    		if($("input[name='isBenren']:checked").val()=="yes"){
    			$("#beibaoName").val($("#companyName").val());
    		}else{
    			$("#beibaoName").val("");
    		}
    	}
    })
    //企业
	$("#credentials").on("blur",function(){
		if($("#certificateType").val()==1){
			isValidBusCode("#credentials");
		}else if($("#certificateType").val()==2){
			isValidTaxation("#credentials");
		}else if($("#certificateType").val()==3){
			isValidOrgCode("#credentials");
		}else if($("#certificateType").val()==4){
			isValidCredit("#credentials");
		}
    })
    
    $("#linkman").on("blur",function(){
    	regName("#linkman")
    })
    $("#phone").on("blur",function(){
    	regPhone("#phone")
    })
    
    //个人
    $("#certCode").on("blur",function(){
    	if(regID("#certCode")){
    		if($("input[name='isBenren']:checked").val()=="yes"){
    			$("#beibaoCertCode").val($("#certCode").val());
    		}else{
    			$("#beibaoCertCode").val("");
    		}
    	}
    	//regIDRepeat("#certCode","#beibaoCertCode")
    })
    $("#phonePerson").on("blur",function(){
    	regPhone("#phonePerson")
    	//regPhoneRepeat("#phonePerson","#beibaoPhone")
    })
    $("#beibaoName").on("blur",function(){
    	regName("#beibaoName")
    })
    $("#beibaoCertCode").on("blur",function(){
    	regID("#beibaoCertCode")
    })
    $("#beibaoPhone").on("blur",function(){
    	regPhone("#beibaoPhone")
    })
    $("#area").on("blur",function(){
    	regAddress("#area")
    })
    $(".inputSN").on("blur",function(){
    	regSN(".inputSN",$(this).index(".inputSN")+1)
    })
    
}

//验证营业执照
function isValidBusCode(id){
	var busCode=$(id).val();
    var ret=false;
    if(busCode.length==15){
        var sum=0;
        var s=[];
        var p=[];
        var a=[];
        var m=10;
        p[0]=m;
        for(var i=0;i<busCode.length;i++){
           a[i]=parseInt(busCode.substring(i,i+1),m);
           s[i]=(p[i]%(m+1))+a[i];
           if(0==s[i]%m){
             p[i+1]=10*2;
           }else{
             p[i+1]=(s[i]%m)*2;
            }    
        }                                       
        if(1==(s[14]%m)){
           //营业执照编号正确!
            ret=true;
        }else{
           //营业执照编号错误!
        	ret=false;
            showPop('<p style="text-align: center;padding:.2rem 0">营业执照编号错误</p>');
         }
    }//如果营业执照为空
    else if(""==busCode){
    	ret=false;
        showPop('<p style="text-align: center;padding:.2rem 0">营业执照编号不能为空</p>');
    }else{
        ret=false;
        showPop('<p style="text-align: center;padding:.2rem 0">营业执照格式不对，必须是15位数</p>');
    }
    return ret;
}
//验证税务登记号
function isValidTaxation(id){
	var taxation=$(id).val();
	var reg=/\d{15}/g;
	if(taxation==""){
		showPop('<p style="text-align: center;padding:.2rem 0">税务登记号不能为空</p>');
		return false;
	}else if(!reg.test(taxation)){
		showPop('<p style="text-align: center;padding:.2rem 0">税务登记号不正确，税务登记号必须由15位数字组成</p>');
		return false
	}else{
		return true
	}
}

//验证组织机构代码
function isValidOrgCode(id){
   var orgCode=$(id).val();
   var reg=/^[\d|A-Z]{8}-[\d|A-Z]$/;
   if(orgCode=="" || orgCode==null){
	   showPop('<p style="text-align: center;padding:.2rem 0">组织机构代码证不能为空</p>');
		return false;
   }else if(!reg.test(orgCode)){
	   showPop('<p style="text-align: center;padding:.2rem 0">组织机构代码格式不正确，组织机构代码由8位数字或拉丁字母+“-”+1位校验码(或拉丁字母)，并且字母必须大写</p>');
		return false;
   }else{
	   return true; 
   }
}
	
//验证社会统一信用代码
function isValidCredit(id){
	var credit=$(id).val();
	var reg=/^[A-Z0-9]{18}$/g;
	if(credit==""){
		showPop('<p style="text-align: center;padding:.2rem 0">社会统一信用代码不能为空</p>');
		return false;
	}else if(!reg.test(credit)){
		showPop('<p style="text-align: center;padding:.2rem 0">社会统一信用代码不正确，社会统一信用代码必须由18位数字或大写字母组成</p>');
		return false
	}else{
		return true
	}
}

//验证手机号码不能重复
function regPhoneRepeat(id1,id2){
	var phone1=$(id1).val();
	var phone2=$(id2).val();
	if(phone1!="" && phone2!=""){
		if(regPhone(id1) && regPhone(id2)){
			if(phone1==phone2){
				showPop('<p style="text-align: center;padding:.2rem 0">投保人手机号与被保人手机号不能重复</p>');
				return false
			}else{
				return true
			}
		}
	}else{
		return false
	}
}
function regIDRepeat(id1,id2){
	var ID1=$(id1).val();
	var ID2=$(id2).val();
	if(ID1!="" && ID2!=""){
		if(regID(id1) && regID(id2)){
			if(ID1==ID2){
				showPop('<p style="text-align: center;padding:.2rem 0">投保人身份证号与被保人身份证号不能重复</p>');
				return false
			}else{
				return true
			}
		}
	}else{
		return false
	}
	
}

//验证通讯地址(省市区+具体地址)
function regLocation(){
	if($("#select-province_dummy").val()!="请选择"){
		if($("#select-city_dummy").val()!="请选择"){
			if($("#select-area_dummy").val()!="请选择"){
				if(regAddress("#area")){
					return true;
				}
			}else{
				showPop('<p style="text-align: center;padding:.2rem 0">请选择区县</p>');
				return false
			}
		}else{
			showPop('<p style="text-align: center;padding:.2rem 0">请选择城市</p>');
			return false
		}
	}else{
		showPop('<p style="text-align: center;padding:.2rem 0">请选择省份</p>');
		return false
	}
}

//判断手机是否注册过    
function isMobileNumExist(id,RegistCodeId,liId,btnId,codeId){  
	if($(id).val().length==11){
	  $.ajax({
    	url:commonUrl+"/user/isMobileNumExist",
    	type:"post",
        dataType:"json",
        data:{
        	mobileNumber:$(id).val()
        },
        success:function(data){
        	if(data.code==1005){
        		$(liId).show();
        		//获取验证码
        	    $(RegistCodeId).on("click",function(){
        	    	if($(this).hasClass("click")){
        	    		return
        	    	}else{
        	    		$.ajax({
        	                url:commonUrl+"/user/getValidateCode",
        	                type:"post",
        	                dataType:"json",
        	                data:{
        	                    key:$(id).val()
        	                },
        	                success:function(data){
        	                    if(data.code!==200){
        	                        showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
        	                    }else if(data.code==200){
        	                        setTime(RegistCodeId);
        	                    }
        	                },
        	                error:function(){
        	                    showPop('<p style="text-align: center;padding:.2rem 0">验证码获取失败</p>');
        	                }
        	            })
        	    	}
        	    });
        	   $(btnId).on("click",function(){
        		   $.ajax({
       	                url:commonUrl+"/orders/verifyMobile",
       	                type:"post",
       	                dataType:"json",
       	                data:{
       	                    mobileNumber:$(id).val(),
       	                    vailCode:$(codeId).val()
       	                },
       	                success:function(data){
       	                    if(data.code!==200){
       	                        showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
       	                    }else if(data.code==200){
       	                    	$(id).attr("readonly",true);
       	                    	$(btnId).addClass("click");
       	                    	showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
       	                    	$(".pop span").on("click",function(){
       	                    		$(liId).hide();
       	                    		$(id).unbind();
       	                       })
       	                    }
       	                },
       	                error:function(data){
       	                    showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
       	                }
       	            })
        	   })
        	}else{
        		$(liId).hide();
        	}
        },
        error:function(data){
        	showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
        }
   })
 }
}

//验证所有的序列号是否符合规则
function regAllSn(){
	var flag=true;
	for(var i=1;i<=airplaneCount;i++){
		if(!regSN("#SNCode"+i,i)){
			flag=false;
		}
	}
	return flag
}
//添加无人机方法
function addSN(){
	regSNRepeat(airplaneCount);
	if($(".icon-add").hasClass("repeat")){
		showPop('<p style="text-align: center;padding:.2rem 0">序列号不能重复</p>');
		return
	}else{
		if(regAllSn()){
			airplaneCount++;
			var html='<li class="clearfix">'+
			            '<div class="left">序列号'+airplaneCount+':</div>'+
			            '<div class="right">'+
			    	      '<input type="text" name="SNCode'+airplaneCount+'" id="SNCode'+airplaneCount+'" style="float:left" class="inputSN" onblur="blurEvt('+airplaneCount+')"/><i class="icon-minus"></i>'+
		                '</div>'+
			          '</li>';
		   $("#viewBarcodeLi").before(html);
		   $("#moneys").html(300*parseInt($("#insuranceNumber").val())*airplaneCount);
		   $(".icon-minus").unbind();
		   $(".icon-minus").on("click",function(){
			   if($(".icon-minus").length==1){
				   showPop('<p style="text-align: center;padding:.1rem 0">必须要保留一个序列号，此条记录不能删除</p>');
				   return;
			   }else{
				    airplaneCount--;
			    	var minusIndex=$(this).index(".icon-minus");
			    	$(".inputSN").each(function(index,ele){
			    		if(index>minusIndex){//SNCode1
			    			var num=parseInt($(this).attr("id").substring(6,$(this).attr("id").length));
				    		num-=1;
				    		$(this).attr({"id":"SNCode"+num,"name":"SNCode"+num,"onblur":"blurEvt("+num+")"});
				    		$(this).parent().prev().html("序列号"+num+":");
			    		}
			    	})
			    	$(this).parent().parent("li").remove();
			    	$("#moneys").html(300*parseInt($("#insuranceNumber").val())*airplaneCount); 
			   }
		    })
		}
	}
}

//TODO 对于多层if嵌套导致代码阅读性较差的情况，请参考  http://m.blog.csdn.net/article/details?id=51068148
function regAll(){
	if($("#startDate").val()!=""){
		if($("#closingDate").val()!=""){
			if($("#customType").val()==0){//企业用户
				if(regName("#companyName")){
					if($("#certificateType").val()==1){
						if(isValidBusCode("#credentials")){
							if(regName("#linkman") && regPhone("#phone")){
								if($("#companyCodeLi").css("display")=="block"){
									if(regNull("#codeCompany","验证码") && regLocation()){
										if(airplaneCount>1){
											if(regSNRepeat(airplaneCount)){
												//验证所有的序列号
												if(regAllSn()) return true;
											}
										}else if(airplaneCount==1){
											if(regSN("#SNCode1",1)){
												return true
											}
										}
									}
								}else{
									if(regLocation()){
										if(airplaneCount>1){
											if(regSNRepeat(airplaneCount)){
												if(regAllSn()) return true;
											}
										}else if(airplaneCount==1){
											if(regSN("#SNCode1",1)){
												return true
											}
										}
									}
								}
							}
						}
					}else if($("#certificateType").val()==2){
						if(isValidTaxation("#credentials")){
							if(regName("#linkman") && regPhone("#phone")){
								if(regName("#linkman") && regPhone("#phone")){
									if($("#companyCodeLi").css("display")=="block"){
										if(regNull("#codeCompany","验证码") && regLocation()){
											if(airplaneCount>1){
												if(regSNRepeat(airplaneCount)){
													if(regAllSn()) return true;
												}
											}else if(airplaneCount==1){
												if(regSN("#SNCode1",1)){
													return true
												}
											}
										}
									}else{
										if(regLocation()){
											if(airplaneCount>1){
												if(regSNRepeat(airplaneCount)){
													if(regAllSn()) return true;
												}
											}else if(airplaneCount==1){
												if(regSN("#SNCode1",1)){
													return true
												}
											}
										}
									}
								}
							}
						}
					}else if($("#certificateType").val()==3){
						if(isValidOrgCode("#credentials")){
							if(regName("#linkman") && regPhone("#phone")){
								if(regName("#linkman") && regPhone("#phone")){
									if($("#companyCodeLi").css("display")=="block"){
										if(regNull("#codeCompany","验证码") && regLocation()){
											if(airplaneCount>1){
												if(regSNRepeat(airplaneCount)){
													if(regAllSn()) return true;
												}
											}else if(airplaneCount==1){
												if(regSN("#SNCode1",1)){
													return true
												}
											}
										}
									}else{
										if(regLocation()){
											if(airplaneCount>1){
												if(regSNRepeat(airplaneCount)){
													if(regAllSn()) return true;
												}
											}else if(airplaneCount==1){
												if(regSN("#SNCode1",1)){
													return true
												}
											}
										}
									}
								}
							}
						}
					}else if($("#certificateType").val()==4){
						if(isValidCredit("#credentials")){
							if(regName("#linkman") && regPhone("#phone")){
								if(regName("#linkman") && regPhone("#phone")){
									if($("#companyCodeLi").css("display")=="block"){
										if(regNull("#codeCompany","验证码") && regLocation()){
											if(airplaneCount>1){
												if(regSNRepeat(airplaneCount)){
													if(regAllSn()) return true;
												}
											}else if(airplaneCount==1){
												if(regSN("#SNCode1",1)){
													return true
												}
											}
										}
									}else{
										if(regLocation()){
											if(airplaneCount>1){
												if(regSNRepeat(airplaneCount)){
													if(regAllSn()) return true;
												}
											}else if(airplaneCount==1){
												if(regSN("#SNCode1",1)){
													return true
												}
											}
										}
									}
								}
							}
						}
					}
					
				}
			}else{//个人用户
				if(regName("#companyName") && regID("#certCode") && regPhone("#phonePerson")){
					if($("#personCodeLi").css("display")=="block"){
						if(regNull("#codePerson","验证码") && regName("#beibaoName") && regID("#beibaoCertCode") && regPhone("#beibaoPhone") && regLocation()){
							if(airplaneCount>1){
								if(regSNRepeat(airplaneCount)){
									if(regAllSn()) return true;
								}
							}else if(airplaneCount==1){
								if(regSN("#SNCode1",1)){
									return true
								}
							}
						}
					}else{
						if(regName("#beibaoName") && regID("#beibaoCertCode")  && regPhone("#beibaoPhone") && regLocation()){
							if(airplaneCount>1){
								if(regSNRepeat(airplaneCount)){
									if(regAllSn()) return true;
								}
							}else if(airplaneCount==1){
								if(regSN("#SNCode1",1)){
									return true
								}
							}
						}
					}
				}
			}
		}else{
			showPop('<p style="text-align: center;padding:.2rem 0">截止日期为空</p>');
			return false
		}
	}else{
		showPop('<p style="text-align: center;padding:.2rem 0">请选择投保日期</p>');
		return false
	}
}

//显示文字提示框
function showText(num){
	$(".bgText").show();
	$(".dialogText"+num).show();
	$(".dialogText"+num).find(".btn_dialogText").unbind();
	$(".dialogText"+num).find(".btn_dialogText").on("click",function(){
		$(".bgText").hide();
		$(".dialogText"+num).hide();
	})
}

//条款规则
$("#tiaokuan").on("click",function(){
	showText(0)
})
$("#xuzhi").on("click",function(){
	showText(1)
})
$("#viewBarcode").on("click",function(){
	showText(2)
});

}); 

function blurEvt(airplaneCount){
	regSNRepeat(airplaneCount);
	regSN("#SNCode"+airplaneCount,airplaneCount);
}
//验证SN码
function regSN(id,airplaneCount){
	var sn=$(id).val();
	var reg=/^[a-zA-Z0-9]{14}$/g;
	if(sn!=""){
		if(!reg.test(sn)){
			showPop('<p style="text-align: center;padding:.2rem 0">序列号'+airplaneCount+'不符合规则，序列号由14位的字母或数字组成</p>');
			return false
		}else{
			return true
		}
	}else{
		showPop('<p style="text-align: center;padding:.2rem 0">序列号'+airplaneCount+'不能为空</p>');
		return false
	}
}
//验证SN码不能重复
function regSNRepeat(airplaneCount){
	var hash={},array=[];
	if(airplaneCount>1){
		for(var i=1;i<=airplaneCount;i++){
			array.push($("#SNCode"+i).val())
		}
		for(var j in array){
			if(hash[array[j]]){
				showPop('<p style="text-align: center;padding:.2rem 0">序列号'+airplaneCount+'不能重复</p>');
				$(".icon-add").addClass("repeat");
				return false;
			}else{
				$(".icon-add").removeClass("repeat");
				hash[array[j]]=true;
			}
		}
		return true
	}else{
		$(".icon-add").removeClass("repeat");
		return true
	}
}


