$(function(){
    back();
	getFooter();
	showFooter(1); 
	var peopleCount=-1;//被保人数变量
	//生成页面信息
	var proId="",proName="",proTerm="",proCount=1;
	if(GetQueryString("proId") != "" && GetQueryString("proId") != null){
		proId=GetQueryString("proId");//产品ID
	}
	if(GetQueryString("proName") != "" && GetQueryString("proName") != null){
		proName=GetQueryString("proName");
		$("#pro-name").val(proName);//产品名称
	}
	var curDate=new Date();
	$("#pro-stratTime").val(curDate.Format("yyyy-MM-dd"));//开始时间
	
	if(GetQueryString("term") != "" && GetQueryString("term") != null){
		proTerm=GetQueryString("term");
		var startDate= new Date(Date.parse($("#pro-stratTime").val().replace(/-/g,"/"))); //转换成Data();
		var a=DateAdd( "d ", parseInt(proTerm), startDate); 
		var endDate=a.Format("yyyy-MM-dd");
		$("#pro-endTime").val(endDate);//截止日期
	}
    //money
	var proPrice="";
	if(GetQueryString("price") != "" && GetQueryString("price") != null){
		proPrice=parseFloat(GetQueryString("price"));//产品ID
	}
	
	//投保人姓名
	$.ajax({
 		url:commonUrl+"/user/personalCenter",
 		type:"post",
 		dataType:"json",
 		success:function(data){
 			if(data.code==200){
 				var obj=data.obj;
 				$("#baoren-name").val(obj.uname);
 				$("#credentials-type").val(obj.cname);
 				$("#credentials").val(obj.certCode);
 				$("#phone").val(obj.mobileNumber);
 				if(obj.birthDate!=null){
 					$("#birthday").val(obj.birthDate)
 				}
 				if(obj.sex!=null){
 					if(obj.sex==0){
 						$("input[name='sex0']").eq(0).checked=true
 					}else{
 						$("input[name='sex0']").eq(1).checked=true
 					}
 					
 				}
 			}else if(data.code==1010){
 				showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录</p>');
 				$(".pop span").on("click",function(){
	    	        $(".bgPop").hide();
	    	        $(".pop").hide();
	    	        window.location.href="../../login.html?a="+encodeURIComponent("/html5/products/buy/buyConfirm.html?proId="+proId+"&proName="+proName+"&term="+proTerm+"&price="+proPrice);
	    	    })
 			}
 		},
 		error:function(){}
 	})
	
	var height=$(window).height()-$('.header').outerHeight(true)-$('.footer').outerHeight(true)-$("a.block").outerHeight(true);
    $(".buyConfirm-contener").css({"height":height,"overflow":"auto"});
    
    //获取证件类型
    var idList=["#bar-credentials-type0"];
    getCredentialsType(idList);
    
    //mobileScroll
    myMobiscroll("#bar-credentials-type0");
    myMobiscroll("#bar-relationship0");
    var now = new Date(),
    minDate = new Date(now.getFullYear() - 100, 0, 1),
    maxDate = new Date(now.getFullYear(), 11, 31);
    $('#birthday').mobiscroll().date({
    	mode: 'scroller',
        animate: 'slideup',
        theme: 'default', 
        display: 'bottom',
        max:maxDate,
        min:minDate,
        labels: ['年', '月', '日'],  
        showLabel:true,//是否显示labels 
        onBeforeShow:function(inst){
        	//if(inst.settings.wheels[2].indexOf("2018")){alert(0)}
        }
    });
    
    //表单验证
    init_reg()
    
    /*添加被保人*/
    $(".add-bar").on("click",function(){
    	if($(".addBbr-box").children("ul").length>0){
    		if(regPrev()){
        		addBbr();
        	}
    	}else{
    		addBbr();
    	}
    	$(".addBbr>div i").unbind();
    	$(".addBbr>div i").on("click",function(){
    		downOrUp($(this))
    	})
    	/*删除被保人*/
        $(".remove-bar").on("click",function(){
        	removeBar($(this))
        })
    });
    
    
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
        	if(regAll(peopleCount)){
        		var insuredList=[];/*list*/
        		if(peopleCount>=0){
        			for(var i=0;i<=peopleCount;i++){
        				insuredList.push({
            	    		uname:$("#bar-name"+i).val(),
            	    		relationship:$("#bar-relationship"+i).val(),
            	    		relationshipName:$("#bar-relationship"+i+"_dummy").val(),
            	    		certId:parseInt($("#bar-credentials-type"+i).val()),
            	    		certName:$("#bar-credentials-type"+i+"_dummy").val(),
            	    		certCode:$("#bar-credentials-number"+i).val(),
            	    		mobilenumber:$("#bar-phone"+i).val(),
            	    		legalBeneficiary:'法定受益人',
            	    		birthDate:$("#bar-birthday"+i).val(),
            	    		sex:parseInt($("input[name='bar-sex"+i+"']:checked").val()),
            	    		sexName:$("input[name='bar-sex"+i+"']:checked").attr("data-con")
            	    	})
        			}
        		}
        		var insuredObject={
        			"pId":proId,
        			"proName":proName,
        			"proStartDate":$("#pro-stratTime").val(),//more
        			"proEndDate":$("#pro-endTime").val(),//more
        			"insuranceNumber":parseInt(proCount),
        			"paymentAmount":$("#moneys").html(),
    				"guaranteePeriod":proTerm,
    				"sex":parseInt($("input[name='sex']:checked").val()),
    				"sexName":$("input[name='sex']:checked").attr("data-con"),
    				"birthday":$("#birthday").val(),
    				"email":$("#email").val(),
    				"provinceCode":$("#select-province").val(),
    				"provinceName":$("#select-province_dummy").val(),
    				"cityCode":$("#select-city").val(),
    				"cityName":$("#select-city_dummy").val(),
    				"area":$("#select-area").val(),//more
    				"areaName":$("#select-area_dummy").val(),//more
    				"fullAddress":$("#area").val(),
        		};
        		$(this).attr("href","orderConfirm.html?insuredObject="+JSON.stringify(insuredObject)+"&insuredList="+JSON.stringify(insuredList))
        	}
        }
    })

//获取证件类型方法
function getCredentialsType(idList){
	$.ajax({
    	url:commonUrl+"/user/getCertTypeList",
    	dataType:"json",
    	type:"get",
    	async:false,
    	success:function(data){
    		if(data.code==200){
    			for(var i=0;i<data.rows.length;i++){
    				var cur=data.rows[i];
    				for(var i=0;i<idList.length;i++){
    					$(idList[i]).append("<option value='"+cur.id+"'>"+cur.cname+"</option>");
    				}
    			}
    		}
    	},
    	error:function(){}
    })
}
//Mobiscroll方法
function myMobiscroll(id){
	$(id).mobiscroll().select({
        mode: 'scroller',
        animate: 'slideup',
        theme: 'default', 
        display: 'bottom'
    })
}
//Js计算指定日期加上多少天、加多少月、加多少年后的日期方法
function DateAdd(interval, number, date) {
    switch (interval) {
      case "y ": {  //年
          date.setFullYear(date.getFullYear() + number);
          return date;
          break;
      }
      case "q ": {  //季度
          date.setMonth(date.getMonth() + number * 3);
          return date;
          break;
      }
      case "m ": {  //月
          date.setMonth(date.getMonth() + number);
          return date;
          break;
      }
      case "w ": {  //星期
          date.setDate(date.getDate() + number * 7);
          return date;
          break;
      }
      case "d ": {  //天
          date.setDate(date.getDate() + number);
          return date;
          break;
      }
      case "h ": {  //小时
          date.setHours(date.getHours() + number);
          return date;
          break;
      }
      case "m ": {  //分
          date.setMinutes(date.getMinutes() + number);
          return date;
          break;
      }
      case "s ": {  //秒
          date.setSeconds(date.getSeconds() + number);
          return date;
          break;
      }
      default: {   //默认是天
          date.setDate(d.getDate() + number);
          return date;
          break;
      }
    }
}


var peopleCount=-1;
//添加被保人方法
function addBbr(){
	peopleCount++;
    var html='<ul class="section addBbr">';
        html+='<div class="clearfix">' +
              '<span class="left">添加被保人</span>' +
              '<span class="right"><i class="icon-down"></i></span>' +
              '</div>';
        html+='<li class="clearfix">' +
              '<div class="left">被保人姓名：</div>' +
              '<div class="right">' +
              '<input type="text" name="bar-name'+peopleCount+'" id="bar-name'+peopleCount+'" required placeholder="请输入真实姓名" />' +
              '</div>' +
              '</li>';
        html+='<li class="clearfix">' +
              '<div class="left">与投保人关系：</div>' +
              '<div class="right">' +
              '<select name="bar-relationship'+peopleCount+'" id="bar-relationship'+peopleCount+'">'+
	              '<option value="请选择与被保人关系" disabled selected>请选择与投保人关系</option>'+
				    '<option value="1">父母</option>'+
				    '<option value="2">子女</option>'+
				    '<option value="3">叔伯</option>'+
				    '<option value="4">祖父母</option>'+
				    '<option value="5">孙子女</option>'+
				    '<option value="6">本人</option>'+
				    '<option value="7">其他</option>'+
				'</select>'+
              '<i class="icon-down"></i>' +
              '</div>' +
              '</li>';
        html+='<li class="clearfix">' +
             '<div class="left">证件类型：</div>' +
             '<div class="right">' +
             '<select name="bar-credentials-type'+peopleCount+'" id="bar-credentials-type'+peopleCount+'">' +
             '<option value="请选择证件类型" disabled selected>请选择证件类型</option></select>'+
             '<i class="icon-down"></i>' +
             '</div>' +
             '</li>';
        html+='<li class="clearfix">' +
              '<div class="left">证件号码：</div>' +
              '<div class="right">' +
              '<input type="text" name="bar-credentials-number'+peopleCount+'" id="bar-credentials-number'+peopleCount+'" required placeholder="请输入证件号码"/>' +
              '</div>' +
              '</li>';
        html+='<li class="clearfix">' +
		       '<div class="left">性别：</div>' +
		       '<div class="right" style="padding-top:.1rem">' +
		       '<input type="radio" name="bar-sex'+peopleCount+'" value="0" class="input-sex" data-con="女"/>&nbsp;女'+
               '<input type="radio" name="bar-sex'+peopleCount+'" value="1" class="input-sex" style="margin-left:.2rem" data-con="男"/>&nbsp;男' +
		       '</div>' +
		       '</li>';
        html+='<li class="clearfix">' +
	          '<div class="left">出生日期：</div>' +
	          '<div class="right">' +
	          '<input type="text" name="bar-birthday'+peopleCount+'" id="bar-birthday'+peopleCount+'" required placeholder="请输入出生日期"/>' +
	          '</div>' +
	          '</li>';
        html+='<li class="clearfix">' +
             '<div class="left">手机号码：</div>' +
             '<div class="right">' +
             '<input type="text" name="bar-phone'+peopleCount+'" id="bar-phone'+peopleCount+'" required placeholder="请输入手机号码"/>' +
            '</div>' +
            '</li>';
        html+='<li class="clearfix">' +
            '<div class="left">受益人：</div>' +
            '<div class="right">' +
            '<input type="text" name="bar'+peopleCount+'" id="bar'+peopleCount+'" value="法定受益人" readonly/>' +
            '</div>' +
            '</li>';
        html+='<li><p class="remove-bar">' +
            '<i>-</i>' +
            '<span>删除被保人</span>' +
            '</p></li>';
        html+='</ul>';
    $(".addBbr-box .addBbr li").slideUp();
    $(".addBbr-box .addBbr>div i").removeClass("icon-down").addClass("icon-up");
    $(html).appendTo(".addBbr-box");
    myMobiscroll("#bar-relationship"+peopleCount);
    getCredentialsType(["#bar-credentials-type"+peopleCount]);
    myMobiscroll("#bar-credentials-type"+peopleCount);
    $('#bar-birthday'+peopleCount).mobiscroll().date({
    	mode: 'scroller',
        animate: 'slideup',
        theme: 'default', 
        display: 'bottom'
    });
    //reg
    $("#bar-name"+peopleCount).on("blur",function(){regName("#bar-name"+peopleCount)})
    $("#bar-credentials-number"+peopleCount).on("blur",function(){regIDRepeat("#bar-credentials-number"+peopleCount)})
    $("#bar-phone"+peopleCount).on("blur",function(){regPhoneRepeat("#bar-phone"+peopleCount)})
    //金额
    $("ul.money span.left").eq(1).html(proPrice+proPrice*peopleCount)
}
//验证证件号码不能重复
function regIDRepeat(id){
	if(regID(id)){
		if(peopleCount>0){
			for(var i=0;i<peopleCount;i++){
				if($(id).val()!=$("#bar-credentials-number"+i).val()){
					return true
				}else{
					showPop('<p style="text-align: center;padding:.2rem 0">证件号码不能重复</p>');
					return false
				}
			}
		}else{
			return true
		}
	}
}

//验证手机号码不能重复
function regPhoneRepeat(id){
	if(regPhone(id)){
		if(peopleCount>0){
			for(var i=0;i<peopleCount;i++){
				if($(id).val()!=$("#bar-phone"+i).val()){
					return true
				}else{
					showPop('<p style="text-align: center;padding:.2rem 0">手机号码不能重复</p>');
					return false
				}
			}
		}else{
			return true
		}
	}
}

/*显示或隐藏添加被保人*/
function downOrUp(e){
    if(e.attr("class")=="icon-down"){
    	e.removeClass("icon-down").addClass("icon-up");
    	e.parent().parent().siblings().stop().slideUp();
    }else if(e.attr("class")=="icon-up"){
    	$(".addBbr>div i").removeClass("icon-down").addClass("icon-up");
        e.removeClass("icon-up").addClass("icon-down");
        $(".addBbr-box .addBbr li").stop().slideUp();
        e.parent().parent().siblings().stop().slideDown();
    }
}

//删除被保人
function removeBar(e){
	showDialog("dialog-remove");
	$(".btns span:last").unbind();
    $(".btns span:last").on("click",function(){
    	$(".bgDialog").hide();
        $(".dialog-remove").hide();
    	peopleCount--;
        e.parent().parent("ul.section.addBbr").remove()
        //金额
        var moneys=parseFloat($("ul.money span.left").eq(1).html());
        if(moneys-proPrice<=0){
        	 $("ul.money span.left").eq(1).html("")
        }else{
        	$("ul.money span.left").eq(1).html(moneys-proPrice)
        }
    });
}

//初始化验证
function init_reg(){
    $("#email").on("blur",function(){
    	regEmail("#email")
    })
    $("#area").on("blur",function(){
    	regNull("#area","具体地址")
    })
    $("input[name='sex']").on("change",function(){
    	regSex($("input[name='sex']:checked").val())
    })
    
    $("#birthday").on("change",function(){
    	regBirth($(this).val())
    })
}

//验证验证上一个添加的被保人信息
function regPrev(){
	if(regName("#bar-name"+peopleCount) && regIDRepeat("#bar-credentials-number"+peopleCount) && regPhoneRepeat("#bar-phone"+peopleCount) ){
		if($("#bar-relationship"+peopleCount+"_dummy").val()!="请选择与投保人关系" && $("#bar-credentials-type"+peopleCount+"_dummy").val()!="请选择证件类型"){
			if(!regNull("input[name='bar-sex"+peopleCount+"']:checked","性别") || !regNull("#bar-birthday"+peopleCount,"出生日期")){
				return false
			}else{
				return true
			}
		}else{
			if($("#bar-relationship"+peopleCount+"_dummy").val()=="请选择与投保人关系"){
				showPop('<p style="text-align: center;padding:.2rem 0">请选择与投保人关系</p>');
				return false;
			}
			if($("#bar-credentials-type"+peopleCount+"_dummy").val()=="请选择证件类型"){
				showPop('<p style="text-align: center;padding:.2rem 0">请选择证件类型</p>');
				return false;
			}
		}
	}else{
		return false;
	}
}


//全体验证
function regAll(peopleCount){
	if(regNull("input[name='sex']:checked","性别") && regNull("#birthday","出生日期") && regEmail("#email") && regNull("#area","具体地址")){
		if($("#select-province_dummy").val()=="请选择"){
			showPop('<p style="text-align: center;padding:.2rem 0">请选择省份</p>');
			return false
		}else{
			if($("#select-city_dummy").val()=="请选择" || $("#select-city_dummy").val()==undefined){
				showPop('<p style="text-align: center;padding:.2rem 0">请选择城市</p>');
				return false
			}else{
				if($("#select-area_dummy").val()=="县" || $("#select-area_dummy").val()=="市辖区" || $("#select-area_dummy").val()=="" || $("#select-area_dummy").val()==undefined){
					showPop('<p style="text-align: center;padding:.2rem 0">请选择区域</p>');
					return false
				}else{
					if(peopleCount<0){
						showPop('<p style="text-align: center;padding:.2rem 0">请添加被保人</p>');
						return false;
					}else{
						if(regPrev()){
							return true
						}
					}
				}
			}
		}
	}
}

//验证性别
function regSex(sex){
	if(sex=="" || sex==null){
		showPop('<p style="text-align: center;padding:.2rem 0">请选择性别</p>');
		return false
	}else{
		return true
	}
	
}
//验证出生日期
function regBirth(birth){
	if(birth=="" || birth==null){
		showPop('<p style="text-align: center;padding:.2rem 0">请输入出生日期</p>');
		return false
	}
	var birthDate = new Date(birth.replace(/\-/g, "\/")); 
	var now = new Date(new Date().toLocaleDateString().replace(/\-/g, "\/"));  
	var ago=new Date('1900-01-01'.replace(/\-/g, "\/"));
	if(birthDate>now||birthDate<ago){
		showPop('<p style="text-align: center;padding:.2rem 0">请输入正确的出生日期</p>');
		return false
	}
	else{
		return true
	}
}



});