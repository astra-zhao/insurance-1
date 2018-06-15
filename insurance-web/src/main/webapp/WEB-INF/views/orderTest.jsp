<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="../../static/jQuery/jquery-1.8.0.js" charset="utf-8"></script>
<script onerror=alert('语法糖')></script>
</head>
<body>
	<div>此页用于测试喵~</div>
	<a href="/user/personalCenter">click it</a>
	<textarea  rows="500" cols="800" id="display"></textarea> 
	<script type="text/javascript">
	
	/* window.setTimeout(function(){
		console.log("miao~");
	},5000); 
	
	 */
	$(document).ready(function(){ 
		
		//uid e3302540-d55f-4552-8e43-10314f696d49
		//proId 412f1313-a65e-11e6-9a57-fcaa14d170d1
		//获取验证码----------------------------------------------
	     /* $.ajax({
            type: "post",
            url: "/user/getValidateCode",
            data: {
	            	key:'18600716457'
	            },
            dataType: "json",
            success: function(data){
            	console.log(data)
                     }
        });   */
		//--------------------------------------------------------
		
		/* var insuredList = new Array();  
        insuredList.push({
    		uname:'喵',
    		certCode:'130602199207164444',
    		relationship:1,
    		relationshipName:'父母',
    		certId:1,
    		certName:'身份证',
    		sex:0,
    		sexName:'女',
    		birthDate:'1992-07-16',
    		mobilenumber:'18600716313',
    		legalBeneficiary:'法定受益人'
    		});   
        insuredList.push({
    		uname:'lalala',
    		certCode:'130602199201014444',
    		relationship:1,
    		relationshipName:'父母',
    		sex:1,
    		sexName:'男',
    		birthDate:'1992-01-11',
    		certId:1,
    		certName:'身份证',
    		mobilenumber:'18600716444',
    		legalBeneficiary:'法定受益人'
    		});   */
       /* var insuredObject={
        		pId:'beb8d7e3e0744ba9aaf2b390925d2c14',
            	proName:'重疾海外安心计划',
            	email:'403633318@qq.com',
            	provinceCode:'130000 ',
            	provinceName:'河北省',
            	sex:0,
            	sexName:'女',
        		birthday:'1992-07-16',
        		cityCode:'130600',
            	cityName:'保定市',
            	fullAddress:'莲池区',
            	guaranteePeriod:'30',
            	paymentAmount:'260.00',
            	insuranceNumber:1
        }  */
        var orderInfo={
            	proName:'大疆无人驾驶飞行器责任保险',
            	startDate:'2017-02-10',
            	customType:0,
            	applicantName:'杨',
            	applicantCertType:1,
            	applicantCertNo:'130602199207174545',
            	contactsName:'15031270716',
            	contactsMobileNum:'15031270716 ',
            	insuredAdress:'河北省 保定市 莲池区',
            	premium:'1200.00',
            	insuranceNumber:4,
            	SNCode:'111111,222222,333333,444444',
            	vailCode:''
        } 
        
		//POST 提交订单
		  /* $.ajax({
	            type: "post",
	            url: "/orders/submitOrder",
	            data: {
	            	insuredObject:JSON.stringify(insuredObject),
	            	insuredList:JSON.stringify(insuredList)
		            },
	            dataType: "json",
	            success: function(data){
	            	console.log(data);
	            	var props=bianli(data);   
	            	$('#display').val(props);
	             }
	        });    */
	    $.ajax({
            type: "post",
            url: "/orders/submitOrderForDaJiang",
            data: {
            	orderInfo:JSON.stringify(orderInfo),
	            },
            dataType: "json",
            success: function(data){
            	console.log(data);
            	var props=bianli(data);   
            	$('#display').val(props);
             }
        });  
		//根据订单状态查询订单
		/* 
		   $.ajax({
	            type: "post",
	            url: "/orders/getOrderByStatus",
	            data: {
	            	status:'0',
	            	page:1,
	            	rows:10
		            },
	            dataType: "json",
	            success: function(data){
	            	console.log(data)
	                     }
	        });   */
	        
	   //获取订单详情
	        
         /* $.ajax({
            type: "post",
            url: "/orders/getOrderDetail",
            data: {
            	orderId:'c3c3169228c94b80867e220bba121e0a'
	            },
            dataType: "json",
            success: function(data){
            	console.log(data)
                     }
        });  */
	 
	})
	
	
	
	</script>
	<script type="text/javascript">
	function bianli(obj){
		var props="";
		// 开始遍历
  	  for(var p in obj){ // 方法
      	  if (typeof (obj[p]) == "object"&&obj[p]!=null){ 
      		 props +=p+"="+ bianli(obj[p]) +" \n ";
      	  } else { 
      		 if(obj[p]!=null){
      			props +=p+"="+ obj[p] +" \n "
      		 }
      	  }
  	  }
  	  return props;
	}
	</script>
	
	
		
</body>
</html>