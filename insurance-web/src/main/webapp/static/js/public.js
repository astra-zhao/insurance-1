~function () {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 6.4 + 'px';
    // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
}();


//var commonUrl='http://192.168.1.88:8019';//ajax-url
var commonUrl='http://192.168.1.144:8080';//ajax-url
//var commonUrl='http://test.lingmoney.cn';//ajax-url
//var commonUrl='http://www.needbao.cn';//ajax-url
//var commonUrl='http://192.168.1.133:8080';//ajax-url
var footerHtml=null;
var footerImgs=[];
//platformType 1：h5  2:PC 3:客户端  第一次绑定银行卡的来源  
//enterType    1:微信     0:PC
//platform     1：h5  2:PC

if(getCookie(document.cookie,"platformType")==null || getCookie(document.cookie,"platformType")==""){
	//判断是手机端还是PC端
	~function () {
	  var reg1 = /AppleWebKit.*Mobile/i,
	      reg2 = /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/;
	  //->条件成立说明当前页面是运行在移动端设备中的
	  if (reg1.test(navigator.userAgent) || reg2.test(navigator.userAgent)) {   
	  	document.cookie="platformType=1"; 
	  	document.cookie="enterType=1";
	  	document.cookie="platform=1";
	  }else{
		document.cookie="platformType=2";
		document.cookie="enterType=0";
		document.cookie="platform=2";
	  }   
	}();
}

//加滚动条
function myScroll(selector){
  var myScroll = new IScroll(selector, {
        fadeScrollbars: true,
        mouseWheel: true,
        bounce: false,
        click: true
    });
}
//scroll
function addMobiscroll(id){
	$(id).mobiscroll().select({
    	 mode: 'scroller',
         animate: 'slideup',
         theme: 'default', 
         display: 'bottom'
     });
}

//birthdayMobiscroll
function birthdayScroll(id){
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
        startYear: currYear - 100, //开始年份currYear-5不起作用的原因是加了minDate: new Date()
        //endYear: currYear, //结束年份
        startMonth:0,
        //endMonth: (new Date()).getMonth()+1,
        startDay:1,
        //endDate: (new Date()).getDate(),
        maxDate:new Date()
        //showNow: true //显示当前按钮
    };
    //$("#birthday").val('').scroller('destroy').scroller($.extend(opt['date'], opt['defaults']));
    var optDateTime = $.extend(opt['datetime'], opt['defaults']);
    $(id).mobiscroll(optDateTime).date(optDateTime);
}

function back(){
    var back=$(".back");
    back.on("click",function(){
        window.history.back(-1)
    })
}

function showDialog(classname){
    $(".bgDialog").show();
    $("."+classname).show();
    $(".dialog .head span").on("click",function(){
        $(".bgDialog").hide();
        $(this).parent().parent().hide();
    });
    $(".btns span").on("click",function(){
        $(".bgDialog").hide();
        $("."+classname).hide();
    });
}
function showPop(html){
    $(".bgPop").show();
    $(".pop").show();
    $(".pop>div:eq(0)").html(html);
    var height=$(".pop strong").outerHeight(true)+$(".pop>div:first").outerHeight(true)+$(".pop>div:last").outerHeight(true);
    $(".pop").css({
        "height":height+'px',
        "marginTop":-(height/2)+"px"
    });
/*    $(".pop span").on('touchstart',function(){
    	$(this).css("background","#ccc")
    },false);*/
    $(".pop span").on("click",function(){
        $(".bgPop").hide();
        $(".pop").hide();
    })
}

function showError(text){
    $(".bgError").show();
    $(".error").show();
    $(".error").html(text);
    window.setTimeout(function(){
        $(".bgError").hide();
        $(".error").hide();
    },1000)
}

function getFooter(){
	$.ajax({
    	url:commonUrl+"/home/findFunButton",
    	type:"get",
        dataType:"json",
        async:false,
        success:function(data){
        	if(data.code==200){
        		footerHtml='<footer class="footer">' +
        				     '<ul class="clearfix">';
        		for(var i=0;i<data.total;i++){
    				footerHtml+='<li><a onclick=userLoginStatePara('+ i + ',"'+ data.rows[i].url+'")>';
    				footerHtml+='<img src="'+data.rows[i].icon_static+'"/><p>'+data.rows[i].fbname+'</p>';
    				footerHtml+='</a></li>';
    				var obj={imgList:[data.rows[i].icon_static,data.rows[i].icon_active]};
    				footerImgs.push(obj);
        		}
        		footerHtml+='</ul>'+
        			 '</footer>';
        	}
        },
        error:function(){}
	})		
}

function showFooter(index){
	$(".wrap").append(footerHtml);
	footerActive(index);
}
function footerActive(index){
    $(".footer li").eq(index).addClass("active").siblings().removeClass("active");
    $(".footer li").eq(index).find("img").attr("src",footerImgs[index].imgList[1]);
}


//获取地址栏参数方法
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null){ return decodeURI(r[2])}
     return null;
}
//删除参数值
function delQueStr(url, ref) 
{
    var str = "";
    if (url.indexOf('?') != -1)
        str = url.substr(url.indexOf('?') + 1);
    else
        return url;
    var arr = "",returnurl = "",setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (i in arr) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    }
    else {
        arr = str.split('=');
        if (arr[0] == ref)
            return url.substr(0, url.indexOf('?'));
        else
            return url;
    }
}
//判断用户是否登录 
function userLoginStatePara(i,url){
	if(i==1 || i==3){//需要登录
		$.ajax({
			url: commonUrl + "/user/getUserLoginState",
			dataType:"json",
			type:"get",
			success:function(data){
				if(data.code==200){
					window.location.href = commonUrl+url;
				}else{
					window.location.href= "/html5/login.html?a="+encodeURIComponent(url)
				}
			}
			
		})
	}else{
		window.location.href=url;
	}
	
}

function userLoginState(url){
	$.ajax({
		url:commonUrl + "/user/getUserLoginState",
		dataType:"json",
		type:"get",
		success:function(data){
			if(data.code==200){
				return
			}else{
				if(url){
					window.location.href=commonUrl+"/html5/login.html?a="+encodeURIComponent(url);
				}else{
					window.location.href=commonUrl+"/html5/login.html"
				}
			}
		}
		
	})	
}
//获取指定名的COOKIE
function getCookie(strCookie,name){
	var strCookie=strCookie.replace(/\s/g, "");
	var arrCookie=strCookie.split(";");
    for(var i=0;i<arrCookie.length;i++){
    	var arr=arrCookie[i].split("=");
    	if(name==arr[0]){
    		return arr[1]
    	}
    }
}

//判断时间
function integralTime(year,time){
	var curYear=0,target=0,months=0,days=0,years=0;
	//判断是否为闰年
	if(year%100==0 && year%400==0){
		curYear=366
	}else{
		curYear=365
	}
	//判断参数time
	if(time>0 && time<=30){
		return time+"天";
	}else if(time>30 && time<curYear){
		if(time%30==0){
			target=parseInt(time/30);
			return target+"个月";
		}else{
			months=parseInt(time/30);
			days=parseInt(time%30);
			return months+"个月"+days+"天";
		}
	}else if(time>=curYear){
		if(time%curYear==0){
			target=parseInt(time/curYear);
			return target+"年";
		}else{
			years=parseInt(time/curYear);
			days=parseInt(time%curYear);
			if(days>30){
				if(dyas%30==0){
					months=parseInt(days/30);
					return years+"年"+months+"个月";
				}else{
					months=parseInt(days/30);
					days=parseInt(days%30);
					return years+"年"+months+"个月"+days+"天";
				}
			}else if(days>0 && days<=30){
				return years+"年"+days+"天";
			}
		}
	}    
}

//格式化时间
Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//eq:var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");

//倒计时 60s
var timeinter=null;
function setTime(id){
	clearInterval(timeinter);
    var time=60;
    $(id).addClass('click');
    $(id).text(time+"S");
    timeinter=setInterval(function(){
        time=time-1;
        $(id).text(time+"s");
        if(time<=0){
            $(id).text("重新获取");
            $(id).removeClass("click");
            clearInterval(timeinter);
        }
    },1000);
}

//判断是否实名过
function isRealName(){
	var x = false;
	$.ajax({
 		url:commonUrl+"/user/personalCenter",
 		type:"post",
 		dataType:"json",
 		async:false,
 		success:function(data){
 			if(data.code==200){
 				if(data.obj.realName==1){
 					x = true;
 				}else{
 					showPop('<p style="text-align: center;padding:.2rem 0">您还没有实名认证，请先去实名</p>');
 					$(".pop span").on("click",function(){
		    	        $(".bg").hide();
		    	        $(".pop").hide();
		    	        window.location.href=commonUrl+"/html5/members/members-addBankCard.html";
		    	    })
 				}
 			}
 		},
 		error:function(){}
 	})
 	return x;
}

//获取职业列表接口的方法     
//param id1：职业分类的ID
//param li2：第二级分类 的li-ID
//param id2：第二级分类 的select-ID
//param li2：第三级分类 的li-ID
//param id2：第三级分类 的select-ID
function getProfessionList(id1,li2,id2,li3,id3){
	$.ajax({
		url:commonUrl+"/jobList/queryJobListByBatch",
		type:"get",
		data:{
			batch:1479802000245,
			parentId:0
		},
		async:false,
		dataType:"json",
		success:function(data){
			$(id1+' option').remove();  
	  		$(id1).append('<option value="0" disabled selected style="color:red">请选择职业</option>');
	   		for(var i=0;i<data.length;i++){
	   			var obj=data[i];
	   			$(id1).append("<option value='"+obj.jobId+"'>"+obj.jobName+"</option>");
	   		}
	   		addMobiscroll(id1);
	   		$(id1).unbind();
	   		$(id1).on("change",function(){
	   			$(id1+"_dummy").val($(id1).find("option:selected").text());
	   				$.ajax({
	   					url:commonUrl+"/jobList/queryJobListByBatch",
	   					type:"get",
	   					async:false,
	   					data:{
	   						batch:1479802000245,
	   						parentId:$(this).val()
	   					},
	   					dataType:"json",
	   					success:function(data){
	   						$(id2+" option").remove();
	   						$(id2).append("<option value='0' disabled selected>请选择</option>");
	   	      	    		for(var i=0;i<data.length;i++){
	   	      	    			var obj=data[i];
	   	      	    		$(id2).append("<option value='"+obj.jobId+"'>"+obj.jobName+"</option>");
	   	      	    		}
	   	      	    	    $(li2).show();
	   	      	    	    addMobiscroll(id2);
	   	      	    	   $(id2).unbind();
	   	      	    	   $(id2).on("change",function(){
	   	      	    		  $(id2+"_dummy").val($(id2).find("option:selected").text());
			   	 	   			if($(id1+"_dummy").val()!="请选择职业"){
			   	 	   				$.ajax({
			   	 	   					url:commonUrl+"/jobList/queryJobListByBatch",
			   	 	   					type:"get",
			   	 	   					async:false,
			   	 	   					data:{
			   	 	   						batch:1479802000245,
			   	 	   						parentId:$(this).val()
			   	 	   					},
			   	 	   					dataType:"json",
			   	 	   					success:function(data){
			   	 	   						$(id3+" option").remove();
			   	 	   						$(id3).append("<option value='0' disabled selected>请选择</option>");
			   	 	   	      	    		for(var i=0;i<data.length;i++){
			   	 	   	      	    			var obj=data[i];
			   	 	   	      	    		$(id3).append("<option value='"+obj.jobId+"'>"+obj.jobName+"</option>");
			   	 	   	      	    		}
			   	 	   	      	    	   $(li3).show();
			   	 	   	      	           addMobiscroll(id3);
			   	 	   	      	          $(id3).on("change",function(){
			   	 	   	      	            if($(id2+"_dummy").val()!="请选择"){
			   	 	   	      	                $(id3+"_dummy").val($(id3).find("option:selected").text());
			   	 	   	      	        	  }else{
			   	 	   	      	        	    showPop('<p style="text-align: center;padding:.2rem 0">请先选择二级分类</p>');
			   	 	   	      	        	  }
			   	 	   					  });
			   	 	   					},
			   	 	   					error:function(){
			   	 	   				        $(li3).hide();
			   	 	   					}
			   	 	   				})
			   	 	   			}else{
			   	 	   			    showPop('<p style="text-align: center;padding:.2rem 0">请先选择一级分类</p>');
			   	 	   			}
			   	 	   		})
	   					},
	   					error:function(){}
	   				})
	   		})
		},
     error:function(){}
	})
}

//获取城市列表
//param provinceId：省ID
//param cityLiId：      城市li-ID
//param cityId：            城市ID
//param areaLiId：      区、县li-ID
//param areaId：            区、县ID
function getCityList(provinceId,cityLiId,cityId,areaLiId,areaId){
  $.ajax({
   	url:commonUrl+"/region/queryProvince",
   	type:"get",
   	dataType:"json",
   	async:false,
   	success:function(data){
   		$(provinceId).find('option').remove();
  		$(provinceId).append("<option value='请选择' disabled selected>请选择</option>");
   		for(var i=0;i<data.length;i++){
   			var obj=data[i];
   			if(obj.regionName!="全国"){
   				$(provinceId).append("<option value='"+obj.regionId+"'>"+obj.regionName+"</option>");
   			}
   		}
   		addMobiscroll(provinceId);
   		$(provinceId).unbind();
   		$(provinceId).on("change",function(){
	          $.ajax({
      	    	url:commonUrl+"/region/queryCity",
      	    	type:"get",
      	    	data:{
      	    		id:$(this).val()
      	    	},
      	    	dataType:"json",
      	    	async:false,
      	    	success:function(data){
      	    		$(cityId).find('option').remove();
     	    		$(cityId).append("<option value='请选择' disabled selected>请选择</option>");
      	    		for(var i=0;i<data.length;i++){
      	    			var obj=data[i];
      	    			$(cityId).append("<option value='"+obj.regionId+"'>"+obj.regionName+"</option>");
      	    		}
    	    		$.ajax({
           	    	url:commonUrl+"/region/queryCity",
           	    	type:"get",
           	    	data:{
           	    		id:$(cityId).val()
           	    	},
           	    	dataType:"json",
           	    	async:false,
           	    	success:function(data){
           	    		$(areaId).find('option').remove();
          	    		$(areaId).append("<option value='请选择' disabled selected>请选择</option>");
           	    		for(var i=0;i<data.length;i++){
           	    			var obj=data[i];
           	    			if(obj.regionName!="市辖区"){
           	    				$(areaId).append("<option value='"+obj.regionId+"'>"+obj.regionName+"</option>");
           	    			}
           	    		}
           	    	},
           	       error:function(){}
           	    });
    	     addMobiscroll(cityId);	
    	     $(cityLiId).show();
      	     $(cityId).unbind();
      	     $(cityId).on("change",function(){
      	    	 if($(provinceId+"_dummy").val()!="请选择"){
  		          $.ajax({
         	    	url:commonUrl+"/region/queryCity",
         	    	type:"get",
         	    	data:{
         	    		id:$(this).val()
         	    	},
         	    	dataType:"json",
         	    	async:false,
         	    	success:function(data){
         	    		$(areaId).find('option').remove();
        	    		$(areaId).append("<option value='请选择' disabled>请选择</option>");
         	    		for(var i=0;i<data.length;i++){
         	    			var obj=data[i];
         	    			if(obj.regionName!="市辖区"){
           	    				$(areaId).append("<option value='"+obj.regionId+"'>"+obj.regionName+"</option>");
           	    			}
         	    		}
         	    		addMobiscroll(areaId);
         	    		$(areaLiId).show();
         	    		$(areaId).unbind();
         	    		$(areaId).on("change",function(){
         	    			if($(cityId+"_dummy").val()!="请选择"){
         	    				$(areaId+"_dummy").val($(areaId).find("option:selected").text());
         	    			}else{
         	    				showPop('<p style="text-align: center;padding:.2rem 0">请先选择城市</p>'); 
         	    			}
         	    		})
         	    	},
         	       error:function(){}
         	    });
  		        $(cityId+"_dummy").val($(cityId).find("option:selected").text());
      	       }else{
      	    	 showPop('<p style="text-align: center;padding:.2rem 0">请先选择省份</p>'); 
      	       }
  	         });
           },
          error:function(){}
        });
        $(areaId+"_dummy").val("请选择");
   		});
      },
      error:function(){}
    });
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
