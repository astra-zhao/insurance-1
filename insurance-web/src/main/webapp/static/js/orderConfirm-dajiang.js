$(function(){
	back();
	$(".header .go").on("click",function(){
		window.history.go(1)
	})
	function addScrollBar(){
		var height=$(window).height() - $('.header').outerHeight(true)-$('.footer').outerHeight(true)-$("a.block").outerHeight(true);
	    $(".orderConfirm-contener").css({"height":height,"overflow":"hidden"});
	    myScroll(".orderConfirm-contener")
	}
    
    //生成页面信息
    var strvalObj=JSON.parse(GetQueryString("insuredObject"));
    $("#proName").html(strvalObj.proName);
    $("#proCount").html(strvalObj.insuranceNumber+"份");
    var snCodeArr=strvalObj.SNCode.split(',');
    var snContent="";
    for(var i=0;i<snCodeArr.length;i++){
    	snContent+='<li class="clearfix"><span class="left">序列号'+Number(i+1)+'：</span><span class="left">'+snCodeArr[i]+'</span></li>';
    }
    $("#priceLi").before(snContent);
    $("#price").html(strvalObj.premium+"元");
    $("#proStartDate").html(strvalObj.startDate);
    $("#proEndDate").html(strvalObj.closingDate);
    if(strvalObj != "" && strvalObj != null){
    	if(strvalObj.customType=="0"){
    		var html='<li class="clearfix"><span  class="left">投保人姓名：</span>'+
    		         '<span  class="left" id="baoren-name">'+strvalObj.applicantName+'</span></li>'+
    		         '<li class="clearfix"><span  class="left">证件类型：</span>'+
    		         '<span  class="left" id="baoren-certName">'+strvalObj.applicantCertTypeName+'</span></li>'+
    		         '<li class="clearfix"><span  class="left">证件号码：</span>'+
    		         '<span  class="left" id="baoren-certCode">'+strvalObj.applicantCertNo+'</span></li>'+
    		         '<li class="clearfix"><span  class="left">企业联系人：</span>'+
    		         '<span  class="left" id="baoren-contactsName">'+strvalObj.contactsName+'</span></li>'+
    		         '<li class="clearfix"><span  class="left">手机号码：</span>'+
    		         '<span  class="left" id="baoren-phone">'+strvalObj.contactsMoblieNum+'</span></li>'+
    		         '<li class="clearfix"><span  class="left">地址：</span>'+
    		         '<span  class="left" id="baoren-adddress">'+strvalObj.insuredAdress+'</span></li>';
    		$("#baorenBox").append(html);
    	}else if(strvalObj.customType=="1"){
    		 var html='<li class="clearfix"><span  class="left">投保人姓名：</span>'+
	              '<span  class="left" id="baoren-name">'+strvalObj.applicantName+'</span></li>'+
	              '<li class="clearfix"><span  class="left">证件类型：</span>'+
 		          '<span  class="left" id="baoren-certName">身份证</span></li>'+
 		          '<li class="clearfix"><span  class="left">身份证号：</span>'+
		          '<span  class="left" id="baoren-certCode">'+strvalObj.applicantCertNo+'</span></li>'+
		          '<li class="clearfix"><span  class="left">投保人手机号：</span>'+
		          '<span  class="left" id="baoren-phone">'+strvalObj.applicantMobile+'</span></li>';
		     var html2='<ol><i></i><li class="clearfix"><span  class="left">被保人姓名：</span>'+
		          '<span  class="left" id="beibaoren-name">'+strvalObj.insuredName+'</span></li>'+
		          '<li class="clearfix"><span  class="left">身份证号：</span>'+
		          '<span  class="left" id="beibaoren-certCode">'+strvalObj.insuredCertNo+'</span></li>'+
		          '<li class="clearfix"><span  class="left">手机号码：</span>'+
		          '<span  class="left" id="beibaoren-phone">'+strvalObj.insuredMobile+'</span></li>'+
		          '<li class="clearfix"><span  class="left">地址：</span>'+
		          '<span  class="left" id="beibaoren-address">'+strvalObj.insuredAdress+'</span></li>'+
		          '</ol><div class="img-shadow"></div>';	
		     $("#baorenBox").append(html);
		     $(".beibaoren").html(html2);
		     $("#beiTitleOrderConfirm").show();
    	}
    }
    //主体内容的高度
	var height=$(window).height()-$('.header').outerHeight(true)-$("a.block").outerHeight(true);
    $(".orderConfirm-contener").css({"height":height,"overflow":"auto"});
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
        		$(".pop div:last").hide();
            	showPop('<p style="text-align: center;padding:.2rem 0">订单正在提交，请稍后...</p>');
                $("a.block").removeClass("btn-noconfirm");
                 delete strvalObj.applicantCertTypeName;
                 delete strvalObj.closingDate;
            	  $.ajax({
            		url:commonUrl+"/orders/submitOrderForDaJiang",
            		type: "post",
            		dataType:"json",
            		data:{
            			orderInfo:JSON.stringify(strvalObj)
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
        		    	        window.location.href="pay-dajiang.html?orderId="+encodeURIComponent(data.obj)+"&money="+$("#price").html()+"&count="+$("#proCount").html();
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
        }
    })
})
