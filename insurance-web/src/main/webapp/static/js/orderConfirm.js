$(function(){
	back();
	//showFooter	
	if(footerHtml==null && footerImgs==""){
		getFooter();
		showFooter(1); 
	}
	function addScrollBar(){
		var height=$(window).height() - $('.header').outerHeight(true)-$('.footer').outerHeight(true)-$("a.block").outerHeight(true);
	    $(".orderConfirm-contener").css({"height":height,"overflow":"hidden"});
	    myScroll(".orderConfirm-contener")
	}
    
    //生成页面信息
    var strList=JSON.parse(GetQueryString("insuredList"));
    var strvalObj=JSON.parse(GetQueryString("insuredObject"));
	if(strList != "" && strList != null){
		if(strList.length>0){
			var html='';
			for(var i=0;i<strList.length;i++){
				var obj=strList[i];
				html+='<ol><i></i>';
					html+='<li class="clearfix"><span  class="left">被保人姓名：</span>';
					html+='<span  class="left" id="bar-name'+i+'">'+obj.uname.substring(0,1)+'*</span></li>';
					html+='<li class="clearfix"><span  class="left">与投保人关系：</span>';
					html+='<span  class="left" id="bar-relationship'+i+'">'+obj.relationshipName+'</span></li>';
					html+='<li class="clearfix"><span  class="left">性别：</span>';
					html+='<span  class="left"  id="bar-sex'+i+'">'+obj.sexName+'</span></li>';
					html+='<li class="clearfix"><span  class="left">证件类型：</span>';
					html+='<span  class="left"  id="bar-certType'+i+'">'+obj.certName+'</span></li>';
					html+='<li class="clearfix"><span  class="left">证件号码：</span>';
					html+='<span  class="left"  id="bar-certCode'+i+'">'+obj.certCode.substr(0,10)+'****'+obj.certCode.substring(obj.certCode.length-4,obj.certCode.length)+'</span></li>';
					html+='<li class="clearfix"><span  class="left">出生日期：</span>';
					html+='<span  class="left"  id="bar-birthday'+i+'">'+obj.birthDate+'</span></li>';
					html+='<li class="clearfix"><span  class="left">手机号：</span>';
					html+='<span  class="left"  id="bar-phone'+i+'">'+obj.mobilenumber.substr(0,3)+'****'+obj.mobilenumber.substr(obj.mobilenumber.length-4,4)+'</span></li>';
					html+='<li class="clearfix"><span  class="left">通讯地址：</span>';
					html+='<span  class="left"  id="address'+i+'">'+obj.provinceName+' '+obj.cityName+' '+obj.areaName+' '+obj.address+'</span></li>';
					if(obj.jobName){
						html+='<li class="clearfix"><span  class="left">职业：</span>';
						html+='<span  class="left"  id="bar-phone'+i+'">'+obj.jobName+'</span></li>';
					}
					if(obj.income){
						html+='<li class="clearfix"><span  class="left">目前收入：</span>';
						html+='<span  class="left"  id="bar-phone'+i+'">'+obj.income+'</span></li>';
					}
				html+="</ol>";	
				html+='<div class="img-shadow"></div>';
			}
			$(".beibaoren").html(html);
		}
	}
	
	if(strvalObj != "" && strvalObj != null){
		$("#proName").html(strvalObj.proName);
		$("#proCount").html(strvalObj.insuranceNumber+"份");
		$("#price").html(strvalObj.paymentAmount+"元");
		$("#proStartDate").html(strvalObj.proStartDate);
		$("#proEndDate").html(strvalObj.proEndDate);
		$("#shouYiRen").html(obj.legalBeneficiary);
		$("#baoren-sex").html(strvalObj.sexName);
		$("#baoren-email").html(strvalObj.email);
		$("#baoren-address").html(strvalObj.provinceName+" "+strvalObj.cityName+" "+strvalObj.areaName+" "+strvalObj.fullAddress);
		if(strvalObj.jobName){
			html='<li class="clearfix"><span class="left">职业：</span>';
			html+='<span  class="left" id="#baoren-jobName">'+strvalObj.jobName+'</span></li>';
			$("#baorenBox").append(html)
		}
		if(strvalObj.income){
			html='<li class="clearfix"><span  class="left">目前收入：</span>';
			html+='<span  class="left" id="#baoren-income">'+strvalObj.income+'</span></li>';
			$("#baorenBox").append(html)
		}
		//投保人姓名
		$.ajax({
	 		url:commonUrl+"/user/personalCenter",
	 		type:"post",
	 		dataType:"json",
	 		async:false,
	 		success:function(data){
	 			if(data.code==200){
	 				var obj=data.obj;
	 				$("#baoren-name").html(obj.uname);
	 				$("#baoren-credentials-type").val(obj.cname);
	 				$("#baoren-credentials").html(obj.certCode);
	 				$("#baoren-phone").html(obj.mobileNumber);
	 				if(obj.birthDate!=null){
	 					$("#baoren-birthday").html(obj.birthDate.substr(0,10))
	 				}else{
	 					$("#baoren-birthday").html(strvalObj.birthday)
	 				}
	 			}else if(data.code==1010){
	 				showPop('<p style="text-align: center;padding:.2rem 0">您还没有登录</p>');
	 				$(".pop span").on("click",function(){
		    	        $(".bgPop").hide();
		    	        $(".pop").hide();
		    	        window.location.href="../../login.html?a="+encodeURIComponent("/html5/products/buy/orderConfirm.html?valObj="+GetQueryString("insuredObject")+"&list="+GetQueryString("insuredList"));
		    	    })
	 			}
	 		},
	 		error:function(){}
	 	})
	}
	//生成 scroll
	addScrollBar();

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
            showDialog("dialog");
            return;
        }else if($(".icon-check").attr("data-check")=="true"){
        	/*if($("a.block").attr("data-hasOrder")!="true"){*/
        		$(".pop div:last").hide();
            	showPop('<p style="text-align: center;padding:.2rem 0">订单正在提交，请稍后...</p>');
                $("a.block").removeClass("btn-noconfirm");
            	  delete strvalObj.proStartDate;
            	  delete strvalObj.proEndDate;
            	  delete strvalObj.area;
            	  delete strvalObj.areaName;
            	  $.ajax({
            		url:commonUrl+"/orders/submitOrder",
            		type: "post",
            		dataType:"json",
            		data:{
            			insuredList:JSON.stringify(strList),
            			insuredObject:JSON.stringify(strvalObj)
            		},
            		success:function(data){
            			if(data.code==200){
            				$(".bgPop").hide();
            				$(".pop").hide();
            				$(".pop div:last").show();
            				showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
        	 				$(".pop span").on("click",function(){
        		    	        $(".bgPop").hide();
        		    	        $(".pop").hide();
        		    	        window.location.href="pay.html?orderId="+encodeURIComponent(data.obj);
        		    	        //document.cookie="hasOrder=1";
        		    	        //$("a.block").attr("data-hasOrder","true");
        		    	    })
            			}else{
            				$(".pop div:last").show();
            				showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
            			}
            		},
            		error:function(data){
            			$(".pop div:last").show();
            			showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
            		}
            	})
        	/*}else{
        		showPop('<p style="text-align: center;padding:.2rem 0">您已提交过该订单，不得重复提交</p>');
        	}*/
        }
    })
})
