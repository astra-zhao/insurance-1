$(function(){
	back();
	//showFooter	
	getFooter();
	showFooter(1); 
	
	var orderId=null;
	 if(GetQueryString("orderId") != "" && GetQueryString("orderId") != null){
	 	orderId=decodeURIComponent(GetQueryString("orderId"));
	 	 $.ajax({
	 	 	url:commonUrl+"/orders/getOrderDetail",
	 	 	dataType:"json",
	 	 	type:"post",
	 	 	async:false,
	 	 	data:{
	 	 		orderId:orderId
	 	 	},
	 	 	success:function(data){
	 	 		if(data.code==200){
	 	 			var obj=data.obj;
	 	 			$("#proName,#proName2").html(obj.proName);
	 	 			$("#status,#status2").html(obj.statusName);
	 	 			$("#procompany").html();
	 	 			$("#baodanNum").html(obj.policyNo);
	 	 			$("#term").html(obj.guaranteePeriod+"天");
	 	 			$("#proCount").html(obj.insuranceNumber+"份");
	 	 			$("#proPrice").html("¥"+(obj.paymentAmount/obj.insuranceNumber).toFixed(2));
	 	 			$("#orderID").html(obj.id)
	 	 		}
	 	 	},
	 	 	error:function(data){
	 	 		showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
	 	 	}
	 	 });
	 	 
	 	 //被保人
	 	$.ajax({
	 	 	url:commonUrl+"/orders/getOrderDetail",
	 	 	dataType:"json",
	 	 	type:"post",
	 	 	async:false,
	 	 	data:{
	 	 		orderId:orderId
	 	 	},
	 	 	success:function(data){
	 	 		if(data.code==200){
	 	 			var obj=data.obj;
	 	 			$("#proName,#proName2").html(obj.proName);
	 	 			$("#status,#status2").html(obj.statusName);
	 	 			$("#procompany").html(obj.cname);
	 	 			$("#baodanNum").html(obj.policyNo);
	 	 			$("#term").html(obj.guaranteePeriod+"天");
	 	 			$("#proCount").html(obj.insuranceNumber+"份");
	 	 			$("#proPrice").html("¥"+(obj.paymentAmount/obj.insuranceNumber).toFixed(2));
	 	 			$("#orderID").html(obj.id);
	 	 			var obj=JSON.parse(obj.insuredUsers);
	 	 			var html="";
	 	 		    for(var i=0;i<obj.length;i++){
	 	 		    	var cur=obj[i];
	 	 		    	html+='<div class="user-info">';
	 	 		    	   html+='<strong class="block">被保人信息</strong>';
	 	 		    	   html+='<p><label>被保人姓名：</label><span>'+cur.uname+'</span></p>';
	 	 		    	   html+='<p><label>性别：</label><span>'+cur.sexName+'</span></p>';
	 	 		    	   html+='<p><label>证件类型：</label><span>'+cur.certName+'</span></p>';
	 	 		    	   html+='<p><label>证件号码：</label><span>'+cur.certCode.substr(0,3)+'***********'+cur.certCode.substr(cur.certCode.length-4,4)+'</span></p>';
		 		    	   html+='<p><label>出生日期：</label><span>'+new Date(cur.birthDate.time).Format('yyyy/MM/dd')+'</span></p>';
		 		    	   html+='<p><label>手机号：</label><span>'+cur.mobilenumber.substr(0,3)+'****'+cur.mobilenumber.substr(cur.mobilenumber.length-4,4)+'</span></p>';
		 		    	   html+='<p><label>通讯地址：</label><span>'+cur.provinceName+cur.cityName+cur.address+'</span></p>';
	 	 		    	html+='</div>';
	 	 		    }
	 	 		    $(".order-detail-content").append(html)
	 	 		}
	 	 	},
	 	 	error:function(data){
	 	 		showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
	 	 	}
	 	 })
	 }
	 
var height=$(window).height()-$('.header').outerHeight(true)-$('.footer').outerHeight(true);
$(".order-detail").css({"height":height,"overflow":"hidden"});
myScroll(".order-detail")
    
Date.prototype.Format = function (fmt) { //author: meizz 
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


})
