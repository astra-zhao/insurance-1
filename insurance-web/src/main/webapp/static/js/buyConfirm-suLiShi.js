$(function(){
    back();
	getFooter();
	showFooter(1); 
	var peopleCount=-1;//被保人数变量
	//生成页面信息
	var proId="",proName="",proTerm="",proCount=1,proPrice="";
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
	if(GetQueryString("price") != "" && GetQueryString("price") != null){
		proPrice=parseFloat(GetQueryString("price"));//产品ID
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
 				//$("#credentials-type").val(obj.cname);
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
    getCredentialsType("#bar-credentials-type0");
    
    //mobileScroll
    myMobiscroll("#bar-credentials-type0");
    myMobiscroll("#bar-relationship0");
    myMobiscroll("#professionTree");
    addMobiscroll("#select-province,#select-city,#select-area");
    //表单验证
    init_reg()
    
    /*添加被保人*/
    $(".add-bar").on("click",function(){
    	if($(".addBbr-box").children("ul").length>0){
    		if(regPrev()){
        		addBbr(proName,proPrice);
        	}
    	}else{
    		addBbr(proName,proPrice);
    	}
    	$(".addBbr>div i").unbind();
    	$(".addBbr>div i").on("click",function(){
    		downOrUp($(this))
    	})
    	/*删除被保人*/
    	$(".remove-bar").unbind();
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
        				var obj={
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
                	    		sexName:$("input[name='bar-sex"+i+"']:checked").attr("data-con"),
                	    		jobId:$("#bar-profession"+i).val(),
                	    		jobName:$("#bar-profession"+i+"_dummy").val(),
                	    		province:$("#selectProvince").val(),
                				provinceName:$("#selectProvince"+i+"_dummy").val(),
                				city:$("#selectCity").val(),
                				cityName:$("#selectCity"+i+"_dummy").val(),
                				area:$("#selectCounty").val(),
                				areaName:$("#selectCounty"+i+"_dummy").val(),
                				address:$("#area").val(),
                	    	};
        				if($("#bar-income"+i)){
        					obj.income=$("#bar-income"+i).val()
        				}
        				if($("#bar-relationship"+i+"_dummy").val()=="本人"){
        					obj.certName=$("#bar-credentials-typeInput"+i).val()
        				}
        				insuredList.push(obj)
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
    				"jobId":$("#professionTree").val(),
    				"jobName":$("#professionTree_dummy").val(),
        		};
        		if($("#income")){
        			insuredObject.income=$("#income").val()
        		}
        		$(this).attr("href","orderConfirm.html?insuredObject="+JSON.stringify(insuredObject)+"&insuredList="+JSON.stringify(insuredList))
        	}
        }
    })
    
//添加被保人方法
function addBbr(proName,proPrice){
	peopleCount++;
    var html='<ul class="section addBbr">';
        html+='<div class="clearfix">' +
              '<span class="left">添加被保人</span>' +
              '<span class="right"><i class="icon-down"></i></span>' +
              '</div>';
        html+='<li class="clearfix">' +
		        '<div class="left" style="line-height:1.5em">与投保人关系：</div>' +
		        '<div class="right right-position">' +
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
              '<div class="left">被保人姓名：</div>' +
              '<div class="right">' +
              '<input type="text" name="bar-name'+peopleCount+'" id="bar-name'+peopleCount+'" required placeholder="请输入真实姓名" />' +
              '</div>' +
              '</li>';
        html+='<li class="clearfix">' +
             '<div class="left">证件类型：</div>' +
             '<div class="right right-position">' +
             '<input type="text" value="" readonly="readyonly" id="bar-credentials-typeInput'+peopleCount+'" style="display:none">'+
             '<select name="bar-credentials-type'+peopleCount+'" id="bar-credentials-type'+peopleCount+'">' +
             '</select>'+
             '<i class="icon-down" id="bar-credentials-type-icon"></i>' +
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
        html+='<li class="clearfix right-position">' +
	          '<div class="left">出生日期：</div>' +
	          '<div class="right">' +
	          '<input type="text" name="bar-birthday'+peopleCount+'" id="bar-birthday'+peopleCount+'" placeholder="请输入出生日期"/>' +
	          '</div>' +
	          '</li>';
        html+='<li class="clearfix">' +
             '<div class="left">手机号码：</div>' +
             '<div class="right">' +
             '<input type="text" name="bar-phone'+peopleCount+'" id="bar-phone'+peopleCount+'" required placeholder="请输入手机号码"/>' +
             '</div>' +
             '</li>';
        
        html+='<li class="clearfix">' +
              '<div class="left">当前职业：</div>' +
              '<div class="right right-position">' +
              '<select name="bar-profession'+peopleCount+'" id="bar-profession'+peopleCount+'">'+
              '<option value="0" disabled selected>请选择职业</option>'+
              '<option value="1">律师/法律顾问</option>'+
              '<option value="2">商店员工（现场工作，非体力工作）</option>'+
              '<option value="3">非船舶相关勘测员（大多数在办公室工作，很少有出差）</option>'+
              '<option value="4">商人（非体力工作但不包括煤炭商/金属废料商人）</option>'+
              '<option value="5">私营业主（非体力工作）</option>'+
              '<option value="6">销售人员</option>'+
              '<option value="7">服务员（除水上、航空及地下作业的员工）</option>'+
              '<option value="8">拍卖人（不包含家畜）</option>'+
              '<option value="9">酿酒厂员工（不包括运货工人）</option>'+
              '<option value="10">咖啡馆工作人员</option>'+
              '<option value="11">宴席酒会及饮食服务承办人</option>'+
              '<option value="12">办公室、商店、住宅内部清洁工人</option>'+
              '<option value="13">学院工作人员（除讲师外的其他工作人员）</option>'+
              '<option value="14">电脑工程师</option>'+
              '<option value="15">非船舶相关工程师/咨询顾问</option>'+
              '<option value="16">新闻记者(不包括在外国工作者及战地记者)</option>'+
              '<option value="17">摄影师（不包括国外工作者及高空/水下作业者）</option>'+
              '<option value="18">仓库管理员和批发商（轻量货物,不包含易燃、易爆货物仓储）</option>'+
              '<option value="19">估价员、协调人员</option>'+
              '<option value="20">儿童(六个月以上）</option>'+
              '<option value="21">学生</option>'+
              '<option value="22">管理人员(偶尔涉及室外现场工作，但非10米以上高空或地下)</option>'+
              '</select><i class="icon-down"></i>' +
              '</div>' +
              '</li>';
			if (proName.indexOf("C") > 0) {
				 html+='<li class="clearfix">' +
			        '<div class="left">目前收入：</div>' +
			        '<div class="right">' +
			        '<input type="text" name="bar-income'+peopleCount+'" id="bar-income'+peopleCount+'" required placeholder="请输入目前收入" class="bar-incomeC"/>' +
			        '</div>' +
			        '</li>';
			} else if (proName.indexOf("D") > 0) {
				html+='<li class="clearfix">' +
			        '<div class="left">目前收入：</div>' +
			        '<div class="right">' +
			        '<input type="text" name="bar-income'+peopleCount+'" id="bar-income'+peopleCount+'" required placeholder="请输入目前收入"  class="bar-incomeD"/>' +
			        '</div>' +
			        '</li>';
			}
		html+='<li class="clearfix">'+
		        '<div class="left">通讯地址：</div>'+
		        '<div class="right right-position">'+
		           '<select name="selectProvince'+peopleCount+'" id="selectProvince'+peopleCount+'"></select>'+
		           '<i class="icon-down"></i>'+
		        '</div>'+
		      '</li>';
		html+='<li class="clearfix" id="selectCityLi'+peopleCount+'">'+
		        '<div class="left"></div>'+
		        '<div class="right right-position">'+
		           '<select name="selectCity'+peopleCount+'" id="selectCity'+peopleCount+'"><option value="请选择">请选择</option></select>'+
		           '<i class="icon-down"></i>'+
		        '</div>'+
		      '</li>';
		html+='<li class="clearfix" id="selectCountyLi'+peopleCount+'" >'+
		        '<div class="left"></div>'+
		        '<div class="right right-position">'+
		           '<select name="selectCounty'+peopleCount+'" id="selectCounty'+peopleCount+'"><option value="请选择">请选择</option></select>'+
		           '<i class="icon-down"></i>'+
		        '</div>'+
		      '</li>';
		html+='<li class="clearfix">'+
		         '<div class="left">具体地址：</div>'+
		         '<div class="right">'+
		             '<textarea  name="bar-area'+peopleCount+'" id="bar-area'+peopleCount+'" style="width:3.34rem;height:1rem;box-sizing:border-box;padding:.1rem;"></textarea>'+
		         '</div>'+
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
    myMobiscroll("#bar-profession"+peopleCount);
    getCredentialsType("#bar-credentials-type"+peopleCount);
    myMobiscroll("#bar-credentials-type"+peopleCount);
    birthdayScroll('#bar-birthday'+peopleCount);
    getCityList("#selectProvince"+peopleCount,"#selectCityLi"+peopleCount,"#selectCity"+peopleCount,"#selectCountyLi"+peopleCount,"#selectCounty"+peopleCount);
    addMobiscroll("#selectProvince"+peopleCount+",#selectCity"+peopleCount+",#selectCounty"+peopleCount);
    $("#bar-profession"+peopleCount+"_dummy").css("padding-right",".41rem");
    //reg
    $("#bar-name"+peopleCount).on("blur",function(){regName("#bar-name"+peopleCount)});
    $("#bar-credentials-number"+peopleCount).on("blur",function(){regIDRepeat("#bar-credentials-number"+peopleCount)});
    $("#bar-phone"+peopleCount).on("blur",function(){regPhoneRepeat("#bar-phone"+peopleCount)});
    $("#bar-birthday"+peopleCount).on("change",function(){regBithday("#bar-birthday"+peopleCount)});
    $(".bar-incomeC").on("blur",function(){regIncome(".bar-incomeC")});
    $(".bar-incomeD").on("blur",function(){regIncome(".bar-incomeD")});
    $("#bar-area"+peopleCount).on("blur",function(){regAddress("#bar-area"+peopleCount)});
    //金额
    $("ul.money span.left").eq(1).html(proPrice+proPrice*peopleCount);
    $("#bar-relationship"+peopleCount).on("change",function(){
    	if($(this).prev("input").val()=="本人"){
    		$("#bar-name"+peopleCount).val($("#baoren-name").val()).attr("readonly","readonly");
    		$("#bar-credentials-type"+peopleCount+"_dummy").val($("#credentials-type").val());
    		$("#bar-credentials-number"+peopleCount).val($("#credentials").val()).attr("readonly","readonly");
    		$("#bar-credentials-typeInput"+peopleCount).val($("#credentials-type").val()).show();
    		$("#bar-credentials-type-icon").hide();
    		$("#bar-credentials-type"+peopleCount).scroller('destroy').hide();
    		var index=parseInt($("input[name='sex']:checked").attr("value"));
    		$("input[name='bar-sex"+peopleCount+"']").attr("checked",false);
    		$("input[name='bar-sex"+peopleCount+"']").eq(index).attr("checked",true);
    		$("#bar-birthday"+peopleCount).scroller('destroy');
    		$("#bar-birthday"+peopleCount).val($("#birthday").val()).attr("readonly","readonly");
    		$("#bar-phone"+peopleCount).val($("#phone").val()).attr("readonly","readonly");
    		$("#bar-profession"+peopleCount+"_dummy").val($("#professionTree_dummy").val());
    		$("#bar-income"+peopleCount).val($("#income").val());
    		if($("#select-province_dummy").val()!="请选择"){
    			$("#selectProvince"+peopleCount+"_dummy").val($("#select-province_dummy").val());
    		}
    		if($("#select-city_dummy").val()!="请选择"){
    			$("#selectCity"+peopleCount+"_dummy").val($("#select-city_dummy").val());
    		}else{
    			$("#selectCity"+peopleCount+"_dummy").val("请选择");
    		}
    		if($("#select-area_dummy").val()!="请选择"){
    			$("#selectCounty"+peopleCount+"_dummy").val($("#select-area_dummy").val());
    		}else{
    			$("#selectCounty"+peopleCount+"_dummy").val("请选择");
    		}
    		
    		$("#selectCity"+peopleCount).on("change",function(){
    			if($(this).find("option:selected").text()=="请选择"){
    				showPop('<p style="text-align: center;padding:.2rem 0">请先选择省份</p>');
    				return;
    			}
    		})
    		$("#selectCounty"+peopleCount).on("change",function(){
    			if($(this).find("option:selected").text()=="请选择"){
    				showPop('<p style="text-align: center;padding:.2rem 0">请先选择城市</p>');
    				return;
    			}
    		})
    		$("#bar-area"+peopleCount).val($("#area").val());
    		//reg
    		//name,certType,certCode,birth,phone
    		$("#bar-name"+peopleCount).unbind();
    		$("#bar-credentials-number"+peopleCount).unbind();
    		$("#bar-phone"+peopleCount).unbind();
    		$("#bar-birthday"+peopleCount).unbind();
    	}else{
    		$("#bar-name"+peopleCount).val("").removeAttr("readonly");
    		$("#bar-credentials-type"+peopleCount+"_dummy").val("").removeAttr("readonly");
    		$("#bar-credentials-number"+peopleCount).val("").removeAttr("readonly");
    		$("#bar-credentials-typeInput"+peopleCount).hide();
    		$("#bar-credentials-type-icon").show();
    		$("#bar-credentials-type"+peopleCount).show();
    		getCredentialsType("#bar-credentials-type"+peopleCount);
    		myMobiscroll("#bar-credentials-type"+peopleCount);
    		$("input[name='bar-sex"+peopleCount+"']").attr("checked",false);
    		$("#bar-birthday"+peopleCount).val("").removeAttr("readonly");
    		birthdayScroll('#bar-birthday'+peopleCount)
    		$("#bar-phone"+peopleCount).val("").removeAttr("readonly");
    		$("#bar-profession"+peopleCount+"_dummy").val("请选择职业");
    		$("#selectProvince"+peopleCount+"_dummy").val("请选择");
    		$("#selectCity"+peopleCount+"_dummy").val("请选择");
    		$("#selectCounty"+peopleCount+"_dummy").val("请选择");
    		$("#bar-area"+peopleCount).val("");
    		//reg
    		$("#bar-name"+peopleCount).on("blur",function(){regName("#bar-name"+peopleCount)});
    	    $("#bar-credentials-number"+peopleCount).on("blur",function(){regIDRepeat("#bar-credentials-number"+peopleCount)});
    	    $("#bar-phone"+peopleCount).on("blur",function(){regPhoneRepeat("#bar-phone"+peopleCount)});
    	    $("#bar-birthday"+peopleCount).on("change",function(){regBithday("#bar-birthday"+peopleCount)});
    	}
    })
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


//$("input[name='bar-sex"+peopleCount+"']").attr("disabled",true);  设置radio不可用

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
//parseInt(birth.substring(8,10))>curDate
//验证目前收入
function regIncome(id){
	var income=parseFloat($(id).val());
	if($(id).val()=="" || $(id).val()==null || !/^\d+$/g.test($(id).val())){
		showPop('<p style="text-align: center;padding:.2rem 0">目前收入不能为空或无效</p>');
		return false
	}else if(income<0){
		showPop('<p style="text-align: center;padding:.2rem 0">目前收入不能为负数</p>');
		return false
	}else if($(id).val().length>8){
		showPop('<p style="text-align: center;padding:.2rem 0">目前收入不能超8位数字</p>');
		return false
	}else{
		if(id.indexOf("C")>0){
		     if(income<8000){
		    	 showPop('<p style="text-align: center;padding:.2rem 0">目前收入不能低于8000元</p>');
		 		 return false
		     }else{
		    	 return true
		     }
		}else if(id.indexOf("D")>0){
			if(income<15000){
		    	 showPop('<p style="text-align: center;padding:.2rem 0">目前收入不能低于15000元</p>');
		 		 return false
		     }else{
		    	 return true
		     }
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
	$(".dialog-remove .btns span:last").unbind();
    $(".dialog-remove .btns span:last").on("click",function(){
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
    	regAddress("#area")
    })
    $("input[name='sex']").on("change",function(){
    	regSex($("input[name='sex']:checked").val())
    })
    if($(".incomeC").length>0 || $(".incomeD").length>0){
    	$(".incomeC").on("blur",function(){
        	regIncome(".incomeC")
        })
        $(".incomeD").on("blur",function(){
        	regIncome(".incomeD")
        })
    }
}

//验证验证上一个添加的被保人信息
function regPrev(){
	if($("#bar-name"+peopleCount).attr("readonly")=="readonly"){
		if($("#bar-profession"+peopleCount+"_dummy").val()=="请选择职业"){
			showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的职业</p>');
			return false;
		}else{
			if($('.bar-incomeC').length>0){
				if(regIncome('.bar-incomeC')){
					if($("#selectProvince"+peopleCount+"_dummy").val()!="请选择" && $("#selectCity"+peopleCount+"_dummy").val()!="请选择" && $("#selectCounty"+peopleCount+"_dummy").val()!="请选择"){
						if(regAddress("#bar-area"+peopleCount)){
							return true
						}
					}else{
						showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的通讯地址</p>');
						return false;
					}
				}else{
					return false
				}
			}else if($('.bar-incomeD').length>0){
				if(regIncome('.bar-incomeD')){
					if($("#selectProvince"+peopleCount+"_dummy").val()!="请选择" && $("#selectCity"+peopleCount+"_dummy").val()!="请选择" && $("#selectCounty"+peopleCount+"_dummy").val()!="请选择"){
						if(regAddress("#bar-area"+peopleCount)){
							return true
						}
					}else{
						showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的通讯地址</p>');
						return false;
					}
				}else{
					return false
				}
			}else{
				if($("#selectProvince"+peopleCount+"_dummy").val()!="请选择" && $("#selectCity"+peopleCount+"_dummy").val()!="请选择" && $("#selectCounty"+peopleCount+"_dummy").val()!="请选择"){
					if(regAddress("#bar-area"+peopleCount)){
						return true
					}
				}else{
					showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的通讯地址</p>');
					return false;
				}
			}
		}
	}else if(regName("#bar-name"+peopleCount) && regIDRepeat("#bar-credentials-number"+peopleCount) && regPhoneRepeat("#bar-phone"+peopleCount) ){
		if($("#bar-relationship"+peopleCount+"_dummy").val()!="请选择与投保人关系" && $("#bar-credentials-type"+peopleCount+"_dummy").val()!="请选择证件类型"){
			if(!(regNull("input[name='bar-sex"+peopleCount+"']:checked","性别") && regBithday("#bar-birthday"+peopleCount))){
				return false
			}else{
				if($("#bar-profession"+peopleCount+"_dummy").val()=="请选择职业"){
					showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的职业</p>');
					return false;
				}else{
					if($('.bar-incomeC').length>0){
						if(regIncome('.bar-incomeC')){
							if($("#selectProvince"+peopleCount+"_dummy").val()!="请选择" && $("#selectCity"+peopleCount+"_dummy").val()!="请选择" && $("#selectCounty"+peopleCount+"_dummy").val()!="请选择"){
								if(regAddress("#bar-area"+peopleCount)){
									return true
								}
							}else{
								showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的通讯地址</p>');
								return false;
							}
						}else{
							return false
						}
					}else if($('.bar-incomeD').length>0){
						if(regIncome('.bar-incomeD')){
							if($("#selectProvince"+peopleCount+"_dummy").val()!="请选择" && $("#selectCity"+peopleCount+"_dummy").val()!="请选择" && $("#selectCounty"+peopleCount+"_dummy").val()!="请选择"){
								if(regAddress("#bar-area"+peopleCount)){
									return true
								}
							}else{
								showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的通讯地址</p>');
								return false;
							}
						}else{
							return false
						}
					}else{
						if($("#selectProvince"+peopleCount+"_dummy").val()!="请选择" && $("#selectCity"+peopleCount+"_dummy").val()!="请选择" && $("#selectCounty"+peopleCount+"_dummy").val()!="请选择"){
							if(regAddress("#bar-area"+peopleCount)){
								return true
							}
						}else{
							showPop('<p style="text-align: center;padding:.2rem 0">请选择被保人的通讯地址</p>');
							return false;
						}
					}
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
function regAll(peopleCount){
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
					if($("#professionTree_dummy").val()=="请选择职业"){
						showPop('<p style="text-align: center;padding:.2rem 0">请选择职业</p>');
						return false;
					}else{
						if($(".incomeC").length>0){
							if(regIncome(".incomeC")){
								if(peopleCount<0){
									showPop('<p style="text-align: center;padding:.2rem 0">请添加被保人</p>');
									return false;
								}else{
									if(regPrev()){
										return true
									}
								}
							}
						}else if($(".incomeD").length>0){
							if(regIncome(".incomeD")){
								if(peopleCount<0){
									showPop('<p style="text-align: center;padding:.2rem 0">请添加被保人</p>');
									return false;
								}else{
									if(regPrev()){
										return true
									}
								}
							}
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


