<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="../../static/jQuery/jquery-1.8.0.js" charset="utf-8"></script>

</head>
<body>
	<div>此页用于测试喵~</div>
	<a href="/user/personalCenter">click it</a>
	 <textarea  rows="500" cols="800" id="display"></textarea>  
	 
	 
  <form action="/user/changeAvatar" method="post" enctype="multipart/form-data">
	图片：<input id="image_input" type="file" name="image_input"></input><br/>
	昵称:<input id="nikeName" type="text" name="nickName" value="杨大仙人"></input><br/>
	sex id:<input id="sex" type="text" name="sex" value="0"></input><br/>
	birthdate:<input id="birthdate" type="text" name="birthdate"></input><br/>
	email:<input id="email" type="text" name="email"></input><br/>
	jobId:<input id="jobId" type="text" name="jobId"></input><br/>
	income:<input id="income" type="text" name="income"></input><br/>
	city:<input id="city" type="text" name="city"></input><br/>
	province:<input id="province" type="text" name="province"></input><br/>
	county:<input id="county" type="text" name="county"></input><br/>
	address:<input id="address" type="text" name="address"></input><br/>
	<input type="submit" value="提交"></input><br/>
	</form>  
	<script type="text/javascript">
	
	/* window.setTimeout(function(){
		console.log("miao~");
	},5000); 
	
	 */
	$(document).ready(function(){ 
		
		//uid e3302540-d55f-4552-8e43-10314f696d49
		//proId 412f1313-a65e-11e6-9a57-fcaa14d170d1
		//获取验证码----------------------------------------------
	    /*  $.ajax({
            type: "post",
            url: "/user/getValidateCode",
            data: {
	            	key:'18600716314'
	            },
            dataType: "json",
            success: function(data){
            	console.log(data)
                     }
        });   */
        
       /*  $.ajax({
	        type: "get",
	        url: "/user/getUserLoginState?url='urlPara'",
	        dataType: "json",
	        success: function(data){
	        	console.log(data)
	                 }
    	});    */
		//--------------------------------------------------------
		
		
		
		//POST 请求个人中心
		  $.ajax({
	            type: "post",
	            url: "/user/personalCenter",
	            data: {
	            	
		            },
	            dataType: "json",
	            success: function(data){
	            	console.log(data);
	            	var props=bianli(data);   
	            	$('#display').val(props);
	             }
	        });   
		
		//POST 修改密码
		   /* $.ajax({
	            type: "post",
	            url: "/user/changePWD",
	            data: {
	            	newPwd:'123',
	            	mobileNumber:'18600716413',
	            	vailCode:'7895'
		            },
	            dataType: "json",
	            success: function(data){
	            	console.log(data);
	            	var props=bianli(data);   
	            	$('#display').val(props);
	             }
	        });    */
	        
	      //POST 重置密码
			    /* $.ajax({
		            type: "post",
		            url: "/user/forgetPWD",
		            data: {
		            	newPwd:'123',
		            	mobileNumber:'18600716314',
		            	vailCode:'7895'
			            },
		            dataType: "json",
		            success: function(data){
		            	console.log(data);
		            	var props=bianli(data);   
		            	$('#display').val(props);
		             }
		        });    */ 
	        
	      //POST 修改头像
			/* $.ajax({
		            type: "post",
		            url: "/user/changePWD",
		            data: {
		            	newPwd:'123',
		            	mobileNumber:'18600716314',
		            	vailCode:'7895'
			            },
		            dataType: "json",
		            success: function(data){
		            	console.log(data);
		            	var props=bianli(data);   
		            	$('#display').val(props);
		             }
		        });   */
		//POST 银行卡列表
		 /* $.ajax({
            type: "post",
            url: "/user/bankcard",
            data: {
	            	
	            },
            dataType: "json",
            success: function(data){
            	console.log(data);
            	var props=bianli(data);   
            	$('#display').val(props);
             }
        });   */
	    //设置银行卡为默认 
      /*  $.ajax({
            type: "post",
            url: "/user/setDefault",
            data: {
            	bankcard:'62220204090123678'
	            },
            dataType: "json",
            success: function(data){
            	console.log(data);
            	var props=bianli(data);   
    	    	$('#display').val(props);
            }
     	});   */
     	//删除银行卡 
         /* $.ajax({
               type: "post",
               url: "/user/deleteBankcard",
               data: {
            	   bankcard:'62220204090123678'
   	            },
               dataType: "json",
               success: function(data){
               	console.log(data);
               	var props=bianli(data);   
       	    	$('#display').val(props);
               }
        	});  */
        //测试银行列表
    	   /* $.ajax({
                type: "post",
                url: "/user/bankList",
                data: {
                	dtype:"0,2"
    	            },
                dataType: "json",
                success: function(data){
                	console.log(data);
                	var props=bianli(data);   
                	$('#display').val(props);
                    }
            }); */ 
          //测试通过六位获取银行
       	  /* $.ajax({
                   type: "post",
                   url: "/user/getBankBySixInfo",
                   data: {
                	   sixInfo:622202
       	            },
                   dataType: "json",
                   success: function(data){
                   	console.log(data);
                   	var props=bianli(data);   
                   	$('#display').val(props);
                       }
           });   */ 
          //测试获取手机验证码（从京东）
        	  /*  $.ajax({
                    type: "post",
                    url: "/user/getValiBankCode",
                    data: {
                    	userName:"苏荣",
                    	idCard:"130682199003153182",
                    	bankNumber:"6217000010023730636",
                    	bankShortName:"CCB",
                    	userPhone:"13260091930"
        	            },
                    dataType: "json",
                    success: function(data){
                    	console.log(data);
                    	var props=bianli(data);   
                    	$('#display').val(props);
                        }
            });     */
         //测试四要素验证银行卡信息
         //String bankcard, String vailCode, String mobileNumber, String userName,String idCard
    	  /*  $.ajax({
                type: "post",
                url: "/user/vailBankcard",
                data: {
                	bankcard:"",
                	vailCode:"058293",
                	mobileNumber:"18600716314",
                	userName:"yjq",
                	idCard:""
    	            },
                dataType: "json",
                success: function(data){
                	console.log(data);
                	var props=bianli(data);   
                	$('#display').val(props);
                    }
        });  */
		//测试添加银行卡
		//String uid,String bankcard,String mobileNumber,String vailCode,String platformType
	   /*  $.ajax({
            type: "post",
            url: "/user/bindBankcard",
            data: {
	            	userName:"杨洁琼",
	            	idCard:"130602199207161545",
	            	bankNumber:"6222020409012367801",
	            	bankShortName:"ICBC",
	            	userPhone:"18600716314",
	            	vailCode:"111111",
	            	platformType:'2',
	            	bId:'1'
	            },
            dataType: "json",
            success: function(data){
            	console.log(data);
            	var props=bianli(data);   
            	$('#display').val(props);
                }
        });      */
        //积分商城
        /*  $.ajax({
            type: "post",
            url: "/user/getIntegralPro",
            dataType: "json",
            success: function(data){
            	console.log(data);
            	var props=bianli(data);   
            	$('#display').val(props);
                }
        });   */
        
        
		//已兑换商品
        /* $.ajax({
            type: "post",
            url: "/user/getExchangeIntegralPro",
            data: {
            	page:1,
            	rows:10
	            },
            dataType: "json",
			success: function(data){
	    	console.log(data);
	    	var props=bianli(data);   
	    	$('#display').val(props);
	        }
        });   */
        //获取商品详情
		/*  $.ajax({
            type: "post",
            url: "/user/getIntegralProByPK",
            data: {
            	proId:'412f1313-a65e-11e6-9a57-fcaa14d170d1'
	            },
            dataType: "json",
            success: function(data){
            	console.log(data);
            	var props=bianli(data);   
    	    	$('#display').val(props);
                     }
        });   */
       <%--  var res = <=request.getAttribute("result")>; 
    	console.log(res);  --%>
        //兑换商品
		/*  $.ajax({
	            type: "post",
	            url: "/user/exchange",
	            data: {
	            	proId:'412f1313-a65e-11e6-9a57-fcaa14d170d1'
		            },
	            dataType: "json",
	            success: function(data){
	            	console.log(data);
	            	var props=bianli(data);   
	    	    	$('#display').val(props);
	            }
	     });   */
	
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