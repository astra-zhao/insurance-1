$(function(){
    back();
	getFooter();
	showFooter(1); 
	var birthday=null;//记录出生日期
	//生成页面信息
	var proId="";
	if(GetQueryString("proId") != "" && GetQueryString("proId") != null){
		proId=GetQueryString("proId");//产品ID
	}
	//用户信息
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
 					$("#birthday").val(obj.birthDate.substring(0,10)).attr("readonly","radonly");
 				}else{
 					birthdayScroll("#birthday")
 				}
 				if(obj.sex==0 || obj.sex==1){
 					if(obj.sex==0){
 						$("input[name='sex']").eq(0).attr("checked",true)
 					}else{
 						$("input[name='sex']").eq(1).attr("checked",true)
 					}
 				}
 				if(obj.email){
 					$("#email").val(obj.email)
 				}
 				if(obj.jobName){
 					$("#professionTree_dummy").val(obj.jobName)
 				}
 				if(obj.province!="" && obj.provinceName!=""){
 					$("#select-province_dummy").val(obj.provinceName);
 					$("#select-province").val(obj.province)
 				}
 				if(obj.city!="" && obj.cityName!=""){
 					$("#select-city-li").show();
 					addMobiscroll("#select-city");
 					$("#select-city_dummy").val(obj.cityName);
 					$("#select-city").val(obj.city)
 				}
 				if(obj.county!="" && obj.countyName!=""){
 					$("#select-area-li").show();
 					addMobiscroll("#select-area");
 					$("#select-area_dummy").val(obj.countyName);
 					$("#select-area").val(obj.county)
 				}
 				if(obj.address!="" && obj.address!=""){
 					$("#area").val(obj.address);
 				}
 			}else if(data.code==1010){
 				/*showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录</p>');
 				$(".pop span").on("click",function(){
	    	        $(".bgPop").hide();
	    	        $(".pop").hide();
	    	        window.location.href="../../login.html?a="+encodeURIComponent("/html5/products/buy/buyConfirm.html?proId="+proId);
	    	    })*/
 			}
 		},
 		error:function(){}
 	})
	
	var height=$(window).height()-$('.header').outerHeight(true)-$('.footer').outerHeight(true)-$("a.block").outerHeight(true);
    $(".buyConfirm-contener").css({"height":height,"overflow":"auto"});
    
    //获取证件类型
    getCredentialsType("#bar-credentials-type0");
    //mobileScroll
    var curDate=DateAdd("d ", 3, new Date());
	$("#pro-stratTime").val(curDate.Format("yyyy-MM-dd"));//开始时间
	birthdayScroll2("#pro-stratTime");
    addMobiscroll("#shouXian");
    //表单验证
    init_reg();  
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
        	if(regAll()){
        		var insuredList=[];/*list*/
        		var obj={
        	    		uname:$("#bar-name").val(),
        	    		relationship:$("#bar-relationship").val(),
        	    		relationshipName:$("#bar-relationship_dummy").val(),
        	    		certId:parseInt($("#bar-credentials-type").val()),
        	    		certName:$("#bar-credentials-type_dummy").val(),
        	    		certCode:$("#bar-credentials-number").val(),
        	    		mobilenumber:$("#bar-phone").val(),
        	    		legalBeneficiary:'法定受益人',
        	    		birthDate:$("#bar-birthday").val(),
        	    		sex:parseInt($("input[name='bar-sex']:checked").val()),
        	    		sexName:$("input[name='bar-sex']:checked").attr("data-con"),
        	    		province:$("#selectProvince").val(),
        				provinceName:$("#selectProvince_dummy").val(),
        				city:$("#selectCity").val(),
        				cityName:$("#selectCity_dummy").val(),
        				area:$("#selectCounty").val(),
        				areaName:$("#selectCounty_dummy").val(),
        				address:$("#bar-area").val()
        	    	};
				if($("#bar-relationship_dummy").val()=="本人"){
					obj.certName=$("#bar-credentials-typeInput").val()
				}
				insuredList.push(obj);
        		
				var insuredObject={
        			"pId":proId,
        			"proName":"睿祥派定寿及重疾保障计划",
        			"insuranceNumber":1,
        			"proStartDate":$("#pro-stratTime").val(),//more
        			"proEndDate":DateAdd( "d ", 364, new Date(Date.parse($("#pro-stratTime").val()))).Format("yyyy-MM-dd"),
        			"alternate1":$("#shouXian_dummy").val(),
        			"alternate2":$("#zhongJi_dummy").val(),
        			"guaranteePeriod":"365",
        			"paymentTerm":365,
        			"paymentAmount":$("#moneys").html(),
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

    
//birthdayMobiscrolle    
function birthdayScroll2(id){
	var curr = DateAdd("d ", 3, new Date()),
	    periodDate=DateAdd("d ", 200, new Date());
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
        minDate:new Date(curr),
        maxDate: new Date(periodDate)	
    };
    var optDateTime = $.extend(opt['datetime'], opt['defaults']);
    $(id).mobiscroll(optDateTime).date(optDateTime);
}    
//获取证件类型方法
function getCredentialsType(id){
	$.ajax({
    	url:commonUrl+"/user/getCertTypeList",
    	dataType:"json",
    	type:"get",
    	async:false,
    	success:function(data){
    		if(data.code==200){
    			$(id).find("option").remove();
    			$(id).append('<option value="请选择证件类型" disabled selected>请选择证件类型</option>');
    			for(var i=0;i<data.rows.length;i++){
    				var cur=data.rows[i];
    				$(id).append("<option value='"+cur.id+"'>"+cur.cname+"</option>");
    			}
    		}
    	},
    	error:function(data){
    		showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
    	}
    })
}

//验证出生日期
function displayBirthday(){
	var val=$("#bar-credentials-number").val(),
	    len=val.length;
	if(len==15){
		$("#bar-birthday").val("19"+val.substring(6,8)+"-"+val.substring(8,10)+"-"+val.substring(10,12)).attr("readonly","readonly");//780213
	}else if(len==18){
		//19900315
		$("#bar-birthday").val(val.substring(6,10)+"-"+val.substring(10,12)+"-"+val.substring(12,14)).attr("readonly","readonly");
	}
}

//验证出生日期
function regBithday(id){
	var date=new Date();
	var month=date.getMonth()+1;
	var curDate=date.getDate();
	var birth=$(id).val();
	if(birth=="" || birth==null){
		showPop('<p style="text-align: center;padding:.2rem 0">出生日期不能为空</p>');
		return false
	}else if(parseInt(birth.substring(0,5))==2017){
		if(parseInt(birth.substring(5,7))>month){
			showPop('<p style="text-align: center;padding:.2rem 0">出生日期不能大于今天</p>');
			return false
		}else if(parseInt(birth.substring(5,7))==month){
			if(parseInt(birth.substring(8,10))>curDate){
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

//初始化验证
function init_reg(){
	//验证投保人
    $("#email").on("blur",function(){
    	regEmail("#email")
    })
    $("#area").on("blur",function(){
    	regAddress("#area")
    })
    $("input[name='sex']").on("change",function(){
    	regSex($("input[name='sex']:checked").val())
    })
    $("#select-city").on("change",function(){
    	if($(this).val()=="请选择"){
    		showPop('<p style="text-align: center;padding:.2rem 0">请先选择省份</p>');
    	}
    })
    $("#select-area").on("change",function(){
    	if($(this).val()=="请选择"){
    		showPop('<p style="text-align: center;padding:.2rem 0">请先选择城市</p>');
    	}
    })
    
    //被保人
    addMobiscroll("#bar-relationship");
    getCredentialsType("#bar-credentials-type");
    addMobiscroll("#bar-credentials-type");
    getCityList("#selectProvince","#selectCityLi","#selectCity","#selectCountyLi","#selectCounty");
    addMobiscroll("#selectProvince"+",#selectCity"+",#selectCounty");
    //reg
    $("#bar-name").on("blur",function(){regName("#bar-name")});
    $("#bar-credentials-number").on("blur",function(){
    	if(regID("#bar-credentials-number")){
    		displayBirthday();
    		//非本人情况计算金额
        	if(showAge()=="0-17"){
    			$("#shouXian").show();
    			$("#shouXian").next("i").show();
    			$("#shouXian_dummy").show();
    			$("#shouXian").parent("div").addClass("right-position");
    			$("#shouXianInput").hide();
    			$("#shouXianInput").next("p").hide();
    		}else{
    			$("#shouXian").hide();
    			$("#shouXian").next("i").hide();
    			$("#shouXian_dummy").hide();
    			$("#shouXian").parent("div").removeClass("right-position");
    			$("#shouXianInput").show();
    			$("#shouXianInput").next("p").show();
    		}
    	};
    });
    $("#bar-phone").on("blur",function(){regPhone("#bar-phone")});
    $("#bar-area").on("blur",function(){regAddress("#bar-area")});
    $("#bar-relationship").on("change",function(){
    	if($(this).prev("input").val()=="本人"){
    		$("#bar-name").val($("#baoren-name").val()).attr("readonly","readonly");
    		$("#bar-credentials-type_dummy").val($("#credentials-type").val());
    		$("#bar-credentials-number").val($("#credentials").val()).attr("readonly","readonly");
    		$("#bar-credentials-typeInput").val($("#credentials-type").val()).show();
    		$("#bar-credentials-type-icon").hide();
    		$("#bar-credentials-type").scroller('destroy').hide();
    		var index=parseInt($("input[name='sex']:checked").attr("value"));
    		$("input[name='bar-sex"+"']").attr("checked",false);
    		$("input[name='bar-sex"+"']").eq(index).attr("checked",true);
    		$("#bar-birthday").scroller('destroy');
    		$("#bar-birthday").val($("#birthday").val()).attr("readonly","readonly");
    		$("#bar-phone").val($("#phone").val()).attr("readonly","readonly");
    		if($("#select-province_dummy").val()!="请选择"){
    			$("#selectProvince_dummy").val($("#select-province_dummy").val());
    		}
    		$("#selectCityLi").show();
    		$("#selectCountyLi").show();
    		if($("#select-city_dummy").val()!="请选择"){
    			$("#selectCity_dummy").val($("#select-city_dummy").val());
    		}else{
    			$("#selectCity_dummy").val("请选择");
    		}
    		if($("#select-area_dummy").val()!="请选择"){
    			$("#selectCounty_dummy").val($("#select-area_dummy").val());
    			$("#selectCityLi").show();
    		}else{
    			$("#selectCounty_dummy").val("请选择");
    		}
    		
    		$("#selectCity").on("change",function(){
    			if($(this).find("option:selected").text()=="请选择"){
    				showPop('<p style="text-align: center;padding:.2rem 0">请先选择省份</p>');
    				return;
    			}
    		})
    		$("#selectCounty").on("change",function(){
    			if($(this).find("option:selected").text()=="请选择"){
    				showPop('<p style="text-align: center;padding:.2rem 0">请先选择城市</p>');
    				return;
    			}
    		})
    		$("#bar-area").val($("#area").val());
    		$("#bar-name").unbind();
    		$("#bar-credentials-number").unbind();
    		$("#bar-phone").unbind();
    		$("#bar-birthday").unbind();
    		if(2017-parseInt(birthday)>=0 && 2017-parseInt(birthday)<=17){
    			$("#shouXian").show();
    			$("#shouXian").next("i").show();
    			$("#shouXian_dummy").show();
    			$("#shouXian").parent("div").addClass("right-position");
    			$("#shouXianInput").hide();
    			$("#shouXianInput").next("p").hide();
    			//显示钱数
    		}else{
    			$("#shouXian").hide();
    			$("#shouXian").next("i").hide();
    			$("#shouXian_dummy").hide();
    			$("#shouXian").parent("div").removeClass("right-position");
    			$("#shouXianInput").show();
    			$("#shouXianInput").next("p").show();
    			//显示钱数
    		}
    	}else{
    		$("#selectCityLi").hide();
    		$("#selectCountyLi").hide();
    		$("#bar-name").val("").removeAttr("readonly");
    		$("#bar-credentials-type_dummy").val("").removeAttr("readonly");
    		$("#bar-credentials-number").val("").removeAttr("readonly");
    		$("#bar-credentials-typeInput").hide();
    		$("#bar-credentials-type-icon").show();
    		$("#bar-credentials-type").show();
    		getCredentialsType("#bar-credentials-type");
    		addMobiscroll("#bar-credentials-type");
    		$("input[name='bar-sex"+"']").attr("checked",false);
    		$("#bar-birthday").val("").removeAttr("readonly");
    		birthdayScroll('#bar-birthday')
    		$("#bar-phone").val("").removeAttr("readonly");
    		$("#selectProvince_dummy").val("请选择");
    		$("#selectCity_dummy").val("请选择");
    		$("#selectCounty_dummy").val("请选择");
    		$("#bar-area").val("");
    		//reg
    		$("#bar-name").on("blur",function(){regName("#bar-name")});
    	    $("#bar-credentials-number").on("blur",function(){regID("#bar-credentials-number")});
    	    $("#bar-phone").on("blur",function(){regPhone("#bar-phone")});
    	}
    })
    
    //验证定期和重疾
    	$("#shouXian").on("change",function(){
    		if($("#bar-relationship_dummy").val()=="本人"){
    		    if($("#zhongJi").val()!=""){
    		    	if(regZJMoney("#zhongJi") && $(".bar-sex:checked").val()!=""){
                		calculateTotal();
                	}
    		    }
    		}else{
    			if($("#zhongJi").val()!=""){
    				if(regZJMoney("#zhongJi") && regID("#bar-credentials-number") && $(".bar-sex:checked").val()!=""){
                		calculateTotal();
                	}
    			}
    		}
    	})
    	$("#shouXianInput").on("blur",function(){
    		if($("#bar-relationship_dummy").val()=="本人"){
    			if($("#zhongJi").val()!=""){
    				if(regdqMoney("#shouXianInput") && regZJMoney("#zhongJi") && $(".bar-sex:checked").val()!=""){
            			calculateTotal();
            		}
    			}
    		}else{
    			if($("#zhongJi").val()!=""){
    				if(regdqMoney("#shouXianInput") && regZJMoney("#zhongJi") && regID("#bar-credentials-number") && $(".bar-sex:checked").val()!=""){
            			calculateTotal();
            		}
    			}
    		}
    	})
       $("#zhongJi").on("blur",function(){
    	   if($(".bar-sex:checked").val()!="" && regBirth("#bar-birthday") && regZJMoney("#zhongJi")){
    		   if($("#shouXian").css("display")=="block"){
    			   calculateTotal();
    		   }else{
    			   if(regdqMoney("#shouXianInput")){
    				   calculateTotal();
    			   }
    		   }
    	   }
	  })
}

//reg-dqMoney定期寿险	
function regdqMoney(id){
	var money=$(id).val();
	if(money=="" || money==null){
		showPop('<p style="text-align: center;padding:.1rem 0">请输入定期寿险的保额</p>');
		return false;
	}else{
		if(money % 5 != 0){
			showPop('<p style="text-align: center;padding:.1rem 0">定期寿险保额必须以5万元递增</p>');
			return false;
		}else if(money<10 || money>100){
			showPop('<p style="text-align: center;padding:.1rem 0">成年人定期寿险保额最高100万，最低10万</p>');
			return false;
		}else{
			return true;
		}
	}
}
	
//reg-zjMoney重疾	
function regZJMoney(id){
	var money=$(id).val();
	var age=2017-parseInt($("#bar-birthday").val().substring(0,4));
	var isAdult=age>=0 && age<=17?true:false;
	if(money=="" || money==null){
		showPop('<p style="text-align: center;padding:.2rem 0">请输入重大疾病保额</p>');
		return false;
	}else{
		if(isAdult){
			if(money % 1 != 0){
				showPop('<p style="text-align: center;padding:.2rem 0">重大疾病保额保额必须是正整数</p>');
				return false;
			}else if(money<1 || money>10){
				showPop('<p style="text-align: center;padding:.2rem 0">未成年人重大疾病保额最高10万，最低1万</p>');
				return false;
			}else{
				return true;
			}
		}else{
			if(money % 1 != 0){
				showPop('<p style="text-align: center;padding:.2rem 0">重大疾病保额必须是正整数</p>');
				return false;
			}else if(money<10 || money>60){
				showPop('<p style="text-align: center;padding:.2rem 0">成年人重大疾病保额最高60万，最低10万</p>');
				return false;
			}else{
				return true;
			}
		}
	}
}

//根据身份证号码判断年龄
function showAge(){
	var age=$("#bar-birthday").val().substring(0,4);
	var age1=2017-parseInt(age);
	if(age1>=0 && age1<=17){
		return "0-17"
	}
	if(age1>=18 && age1<=25){
		return "18-25"
	}
	if(age1>=26 && age1<=30){
		return "26-30"
	}
	if(age1>=31 && age1<=35){
		return "31-35"
	}
	if(age1>=36 && age1<=40){
		return "36-40"
	}
	if(age1>=41 && age1<=45){
		return "41-45"
	}
	if(age1>=46 && age1<=50){
		return "46-50"
	}
	if(age1>=51 && age1<=55){
		return "51-55"
	}
	if(age1>=56 && age1<=60){
		return "56-60"
	}
}

//计算合计	
function calculateTotal(){
  var age=showAge(),
      sex=$(".input-sex:checked").val(),//0-女  1-男
      dqMoney=null,
      zjMoney=parseInt($("#zhongJi").val())*10000,
      total=null;
  if(age=="0-17"){
	  dqMoney=parseInt($("#shouXian").val().substring(0,$("#shouXian").val().length-2))*10000;
  }else{
	  dqMoney=parseInt($("#shouXianInput").val())*10000; 
  }
  switch (age) {
	case "0-17":
		if(sex==0){
			total=dqMoney/1000*0.72+zjMoney/1000*1.5;
		}else{
			total=dqMoney/1000*0.79+zjMoney/1000*1.19;
		}
		break;
	case "18-25":
		if(sex==0){
			total=dqMoney/1000*0.76+zjMoney/1000*1.32;
		}else{
			total=dqMoney/1000*0.45+zjMoney/1000*1.16;
		}
		break;
	case "26-30":
		if(sex==0){
			total=dqMoney/1000*0.45+zjMoney/1000*2.46;
		}else{
			total=dqMoney/1000*0.89+zjMoney/1000*1.99;
		}
		break;
	case "31-35":
		if(sex==0){
			total=dqMoney/1000*0.54+zjMoney/1000*4.48;
		}else{
			total=dqMoney/1000*1.15+zjMoney/1000*3.05;
		}
		break;
	case "36-40":
		if(sex==0){
			total=dqMoney/1000*0.76+zjMoney/1000*7.16;
		}else{
			total=dqMoney/1000*1.61+zjMoney/1000*5.36;
		}
		break;
	case "41-45":
		if(sex==0){
			total=dqMoney/1000*1.13+zjMoney/1000*7.16;
		}else{
			total=dqMoney/1000*2.31+zjMoney/1000*5.36;
		}
		break;	
	case "46-50":
		if(sex==0){
			total=dqMoney/1000*1.67+zjMoney/1000*13.67;
		}else{
			total=dqMoney/1000*3.32+zjMoney/1000*19.24;
		}
		break;
	case "51-55":
		if(sex==0){
			total=dqMoney/1000*2.78+zjMoney/1000*17.71;
		}else{
			total=dqMoney/1000*4.84+zjMoney/1000*31.6;
		}
		break;
	case "56-60":
		if(sex==0){
			total=dqMoney/1000*4.97+zjMoney/1000*24.54;
		}else{
			total=dqMoney/1000*7.39+zjMoney/1000*48.12;
		}
		break;	
	default:
		if(sex==0){
			total=dqMoney/1000*8.84+zjMoney/1000*35.1;
		}else{
			total=dqMoney/1000*14.29+zjMoney/1000*66.89;
		}
	  break;
	}
  $("#moneys").html(total);
  
}	

//验证验证被保人信息
function regBbr(){
	if($("#bar-name").attr("readonly")=="readonly"){
		if($("#selectProvince_dummy").val()!="请选择" && $("#selectCity_dummy").val()!="请选择" && $("#selectCounty_dummy").val()!="请选择"){
			if(regAddress("#bar-area")){
				return true
			}
		}else{
			showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的通讯地址</p>');
			return false;
		}
	}else if(regName("#bar-name") && regID("#bar-credentials-number") && regPhone("#bar-phone") ){
		if($("#bar-relationship_dummy").val()!="请选择与投保人关系" && $("#bar-credentials-type_dummy").val()!="请选择证件类型"){
			if(!(regNull("input[name='bar-sex']:checked","性别") && regNull("#bar-birthday","出生日期"))){
				return false
			}else{
				if($("#selectProvince_dummy").val()!="请选择" && $("#selectCity_dummy").val()!="请选择" && $("#selectCounty_dummy").val()!="请选择"){
					if(regAddress("#bar-area")){
						return true
					}
				}else{
					showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的通讯地址</p>');
					return false;
				}
			}
		}else{
			showPop('<p style="text-align: center;padding:.2rem 0">请选择与投保人关系或证件类型</p>');
			return false;
		}
	}else{
		return false;
	}
}

//全体验证
function regAll(){
	if(regNull("input[name='sex']:checked","性别") && regBithday("#birthday") && regEmail("#email") && regAddress("#area")){
		if($("#select-province_dummy").val()=="请选择"){
			showPop('<p style="text-align: center;padding:.2rem 0">请选择省份</p>');
			return false
		}else{
			if($("#select-city_dummy").val()=="请选择"){
				showPop('<p style="text-align: center;padding:.2rem 0">请选择城市</p>');
				return false
			}else{
				if($("#select-area_dummy").val()=="县" || $("#select-area_dummy").val()=="市辖区" || $("#select-area_dummy").val()=="请选择"){
					showPop('<p style="text-align: center;padding:.2rem 0">请选择区域</p>');
					return false
				}else{
					if(regBbr()){
						if($("#shouXian").css("display")=="block"){
							if(regZJMoney("#zhongJi")){
								if($("#moneys").html()==""){
									showPop('<p style="text-align: center;padding:.2rem 0">请计算出金额</p>');
									return false
								}else{
									return true
								}
							}
						}else{
							if(regdqMoney("#shouXianInput") && regZJMoney("#zhongJi")){
								if($("#moneys").html()==""){
									showPop('<p style="text-align: center;padding:.2rem 0">请计算出金额</p>');
									return false
								}else{
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
	}else{
		return true
	}
}

//条款规则
$("#tiaokuan").on("click",function(){
	showText(0)
})
$("#guize").on("click",function(){
	showText(1);
	$("#biao").unbind();
	$("#biao").unbind();
	$("#biao").on("click",function(){
		$(".dialogText2").show();
		$(".btn_dialogText").on("click",function(){
		  $(".dialogText2").hide();
	    })
	})
	$("#fulu").on("click",function(){
		$(".dialogText3").show();
		$(".btn_dialogText").on("click",function(){
		  $(".dialogText3").hide();
	    })
	})
})

$(".dialogText0>div a").on("click",function(){
	var _this=$(this);
	$(".dialogText0>div div").hide();
	if($(this).next("div").hasClass("exceeding")){
		$(".bgDialogExceeding").show();
		$(".dialog-exceeding").show();
		$(".dialog-exceeding .btns span").unbind();
		$(".dialog-exceeding .btns span:eq(0)").on("click",function(){
			$(".bgDialogExceeding").hide();
			$(".dialog-exceeding").hide();
	    });
		$(".btns span.continue").on("click",function(){
			$(".bgDialogExceeding").hide();
			$(".dialog-exceeding").hide();
			_this.next("div").stop().slideDown()
	    });
		
	}else{
		$(this).next("div").stop().slideDown()
	}
})

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

});  


